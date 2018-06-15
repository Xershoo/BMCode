package com.class8.eduPlatform.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.security.bean.SessionUser;

public class StudentInterceptor extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Session session = SecurityUtils.getSubject().getSession();
		SessionUser sessionUser = (SessionUser) session.getAttribute(CommonConstants.USER);
		sessionUser.setRoleName(CommonConstants.STUDENT);
		return true;
	}
	
}
