package com.class8.eduPlatform.security.shiro;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;

import com.class8.eduPlatform.common.util.URLUtil;

public class CaptchaFormAuthenticationFilter extends FormAuthenticationFilter{
	
	private static final Logger log = Logger.getLogger(CaptchaFormAuthenticationFilter.class);
	
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
	    if(isLoginRequest(request, response))
	    {
	        if(isLoginSubmission(request, response))
	        {
	            if(log.isTraceEnabled())
	                log.trace("Login submission detected.  Attempting to execute login.");
	            return executeLogin(request, response);
	        }
	        if(log.isTraceEnabled())
	            log.trace("Login page view.");
	        return true;
	    }
	    if(log.isTraceEnabled())
	        log.trace((new StringBuilder()).append("Attempting to access a path which requires authentication.  Forwarding to the Authentication url [").append(getLoginUrl()).append("]").toString());
	    if(!"XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request) .getHeader("X-Requested-With"))){
	    	saveRequestAndRedirectToLogin(request, response);
	    } else {
	    	WebUtils.toHttp(response).setStatus(401);
	    	WebUtils.toHttp(response).setHeader("sessionstatus", "timeout");
	    }
	    return false;
	}
	
	@Override
	protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
		String loginUrl = getLoginUrl();
		StringBuilder targetUrl = new StringBuilder(loginUrl);
		SavedRequest saveRequest = WebUtils.getSavedRequest(request);
		if(saveRequest != null){
			String returnUrl = saveRequest.getRequestUrl();	
			returnUrl = returnUrl.replace(WebUtils.toHttp(request).getContextPath(), "");
			targetUrl.append("?returnUrl=").append(URLUtil.encode(returnUrl));
		}
        WebUtils.issueRedirect(request, response, targetUrl.toString());
	}
}
