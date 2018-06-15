package com.class8.eduPlatform.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.eduPlatform.security.shiro.JdbcRealm;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;

public class SchoolInterceptor extends HandlerInterceptorAdapter {
	
	//学校切换uri
	private static final String SWITCH_SCHOOL_URI = "/school/index";
	
	//认证首页
	private static final String AUTH_INDEX_URI = "/auth/creatSchoolApply";
	
	//学校主页uri
	private static final String SCHOOL_CENTER_URI = "/school/teacher";
	
	//学校认证页面
	private static final String AUTH_SCHOOL_URI = "/auth/toCreatSchool";
	
	//个人认证页面
	private static final String AUTH_PERSONAL_URI = "";
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private JdbcRealm jdbcRealm;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Subject subject = SecurityUtils.getSubject();
		SessionUser sessionUser = (SessionUser) subject.getSession().getAttribute(CommonConstants.USER);
		sessionUser.setRoleName(CommonConstants.SCHOOL);
		String requestURI = request.getRequestURI();
		//如果不是学校认证页面uri
		if(requestURI.indexOf(AUTH_INDEX_URI)<0 && requestURI.indexOf(AUTH_SCHOOL_URI)<0){
			if(subject.hasRole(CommonConstants.SCHOOL)){
				//如果是切换到学校的uri,则重定向到学校主页uri
				if(requestURI.indexOf(SWITCH_SCHOOL_URI)>=0){
					response.sendRedirect(request.getContextPath() + SCHOOL_CENTER_URI);
					return false;
				}
				return true;
			} else {
				ShiroUser shiroUser = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
				AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(shiroUser.getUid());
				if(authSchoolInfo == null){
					//TODO 跳转老师认证页面或跳转到无权限页面
					response.sendRedirect(request.getContextPath() + AUTH_INDEX_URI);
					return false;
				} else {
					int status = authSchoolInfo.getStatus();
					if(AuthSchoolStatusConstant.pass == status){
						//清除授权缓存
						jdbcRealm.clearCachedAuthorizationInfo(shiroUser.getLoginName());
						//如果是切换到学校的uri,则重定向到学校主页uri
						if(requestURI.indexOf(SWITCH_SCHOOL_URI)>=0){
							response.sendRedirect(request.getContextPath() + SCHOOL_CENTER_URI);
							return false;
						}
						return true;
					} else {
						//TODO 正在审核或审核失败都将调整至认证首页,前端根据认证状态显示“正在审核。。”或“审核失败。。”
						request.setAttribute("status", status);
						String reason = authSchoolInfo.getRefuseReason();
						request.setAttribute("message", reason);
						response.sendRedirect(request.getContextPath() + AUTH_INDEX_URI);
						return false;
					}
				}
			}
		}
		return true;
	}
}
