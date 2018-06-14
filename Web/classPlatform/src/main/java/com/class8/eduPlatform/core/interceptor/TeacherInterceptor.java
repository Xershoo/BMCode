package com.class8.eduPlatform.core.interceptor;

import java.util.List;
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
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.AuthTeacherStatusConstant;

/**
 * 自定义老师拦截器，来对老师所有的请求进行拦截
 * @author Administrator
 *
 */
public class TeacherInterceptor extends HandlerInterceptorAdapter {
	
	//切换老师的路径
	private static final String SWITCH_TEACHER_URI = "/teacher/index";
	
	//课程管理页面
	private static final String TEACHER_COURSE_URI = "/teacher/course";
	
	//老师认证页面
	private static final String AUTH_TEACHER_URI = "/teacher/techCertification";
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private JdbcRealm jdbcRealm;
	
	private List<String> authValidURIs;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws Exception {
		Subject subject = SecurityUtils.getSubject();
		SessionUser  sessionUser = (SessionUser) subject.getSession().getAttribute(CommonConstants.USER);
		sessionUser.setRoleName(CommonConstants.TEACHER);
		boolean isAuthTeacher = false;
		String requestURI = request.getRequestURI();
		if(requestURI != null && requestURI.indexOf(SWITCH_TEACHER_URI)>-1){
			response.sendRedirect(request.getContextPath() + TEACHER_COURSE_URI);
			return false;
		}
		if(isAuthValidURI(requestURI)){
			if(subject.hasRole(CommonConstants.TEACHER)){
				isAuthTeacher = true;
			} else {
				ShiroUser shiroUser = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
				AuthTeacherInfo authTeacherInfo = userService.getAuthTeacherInfoByUid(shiroUser.getUid());
				if(authTeacherInfo == null){
					//跳转老师认证页面或跳转到无权限页面
					isAuthTeacher = false;
				} else {
					int status = authTeacherInfo.getStatus();
					if(AuthTeacherStatusConstant.pass == status){
						//清除授权缓存
						jdbcRealm.clearCachedAuthorizationInfo(shiroUser.getLoginName());
						isAuthTeacher = true;
					} else {
						//跳转认证失败页面，并显示认证失败信息
						request.setAttribute("status", status);
						if(AuthSchoolStatusConstant.refuse == status){
							String reason = authTeacherInfo.getRefuseReason();
							request.setAttribute("message", reason);
						}
						isAuthTeacher = false;
					}
				}
			}
			if(isAuthTeacher){
				return true;
			} else {
				response.sendRedirect(request.getContextPath() + AUTH_TEACHER_URI);
				return false;
			}
		} 
		return true;
	}
	
	private boolean isAuthValidURI(String requestURI){
		if(authValidURIs != null && authValidURIs.size()>0){
			for (String uri : authValidURIs) {
				if(requestURI != null && requestURI.indexOf(uri)>-1){
					return true;
				}
			}
		}
		return false;
	}

	public List<String> getAuthValidURIs() {
		return authValidURIs;
	}

	public void setAuthValidURIs(List<String> authValidURIs) {
		this.authValidURIs = authValidURIs;
	}
}
