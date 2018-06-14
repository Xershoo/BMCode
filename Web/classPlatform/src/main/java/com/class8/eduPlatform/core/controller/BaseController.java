package com.class8.eduPlatform.core.controller;

import javax.servlet.http.HttpServletRequest;
import org.apache.shiro.SecurityUtils;
import com.class8.eduPlatform.security.bean.ShiroUser;

public class BaseController {
	
	protected ShiroUser getShiroUser(){
		Object principal = SecurityUtils.getSubject().getPrincipal();
		if(principal != null){
			return (ShiroUser) principal;
		}
		return null;
	}

	protected final String getAppbaseUrl(HttpServletRequest request, String url) {  
        return request.getContextPath() + url;  
    }  
	
}
