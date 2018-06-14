package com.class8.eduPlatform.security.controller;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.webservice.intf.IEduUserService;


public class URLFilter implements Filter {


	private IEduUserService eduUserService;
	
	private static final String DOMAIN_END = ".class8.com"; // .you.com

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		ServletContext servletContext = filterConfig.getServletContext();
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
		eduUserService = applicationContext.getBean(IEduUserService.class);
	}

	@Override  
  
	public void destroy() {  
  
	}	
	@Override
	public void doFilter(ServletRequest servletRequest,
			ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) servletRequest;

		String requestURI = request.getRequestURI();

		String serverName = request.getServerName().toLowerCase();

		String realURI = getRealRequestURI(serverName, requestURI);

		request.getRequestDispatcher(realURI).forward(request, response);

	}

	private String getRealRequestURI(String serverName, String requestURI) {  
		
		
		if (serverName.equalsIgnoreCase("2c.class8.com") || serverName.equalsIgnoreCase("www.class8.com") 
				 || serverName.equalsIgnoreCase("hn.class8.com") ) {  
  
			return requestURI;  
  
		}  
		
		if (serverName.endsWith(DOMAIN_END)) {  
  
			String secondDomain = serverName.substring(0, serverName.indexOf("."));  
  
			
			//AuthSchoolInfo authSchoolInfo = FilterController.getAuthSchoolInfo(secondDomain);
			AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoBySecondDomain(secondDomain);
			if(authSchoolInfo == null){
				return "/message?msg=不存在二级域名" + secondDomain;  
			}
			if (requestURI.equals("/")) {  
				  
				return "/infocenter/school/" + authSchoolInfo.getId();  
	  
			} else {  
	  
				return  requestURI;  
	  
			}  
			
		}else {
			return requestURI;
		} 
  
	}	
	
	
}
