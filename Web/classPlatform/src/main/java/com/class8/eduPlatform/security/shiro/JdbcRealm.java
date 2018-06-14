package com.class8.eduPlatform.security.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.BanTypeConstants;
import com.class8.user.constants.UserTypeConstants;

public class JdbcRealm extends AuthorizingRealm {
	
	@Autowired
	private IUserService userService;
	
	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalcollection) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		if(principalcollection != null){
			info.addRole(CommonConstants.STUDENT);
		}
		ShiroUser shiroUser = (ShiroUser) principalcollection.fromRealm(getName()).iterator().next();
		AuthTeacherInfo authTeacherInfo = userService.getAuthTeacherInfoByUid(shiroUser.getUid());
		if(authTeacherInfo != null){
			int teacherStatus = authTeacherInfo.getStatus();
			if(AuthTeacherStatusConstant.pass == teacherStatus || AuthTeacherStatusConstant.schoolimport == teacherStatus){
				info.addRole(CommonConstants.TEACHER);
			}
		}
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(shiroUser.getUid());
		if(authSchoolInfo != null){
			int schoolStatus = authSchoolInfo.getStatus();
			if(AuthSchoolStatusConstant.pass == schoolStatus){
				info.addRole(CommonConstants.SCHOOL);
			}
		}
		return info;
	}
	
	/**
	 * 认证回调函数, 登录时调用.
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationtoken)throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authenticationtoken;
		String uname = token.getUsername();
		String pwd = new String(token.getPassword());
		long uid = userService.login(uname, pwd);
		if(uid == -7){
			throw new ExcessiveAttemptsException();
		}
		if(uid == -6){
			throw new LockedAccountException();
		}
		if(uid == -2)
			throw new UnknownAccountException();
		
		UserBasicInfo user = userService.getUserBasicInfoByUname(uname);
		if(user == null){
			throw new UnknownAccountException();
		}	
		
		AuthenticationInfo info = new SimpleAuthenticationInfo(new ShiroUser(user.getUid(),user.getUname(), user.getNickName()),user.getPassword(),getName());
		return info;
	}
	
	/**
	 * 更新用户授权信息缓存.
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
		clearCachedAuthorizationInfo(principals);
	}
	
	/**
	 * 清除所有用户授权信息缓存.
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			for (Object key : cache.keys()) {
				cache.remove(key);
			}
		}
	}

}
