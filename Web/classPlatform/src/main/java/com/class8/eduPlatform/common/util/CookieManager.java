package com.class8.eduPlatform.common.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieManager {

	public static void addCookie(HttpServletResponse response,String name,String value,int maxAge){
		Cookie cookie = new Cookie(name,value);
		cookie.setPath("/");
		if(maxAge>0){  
			cookie.setMaxAge(maxAge);
		}
		response.addCookie(cookie);
		}

	public static Cookie getCookieByName(HttpServletRequest request,String name){
		Map<String,Cookie> coMap = ReadCookieMap(request);
		if(coMap.containsKey(name)){
		  Cookie cookie = (Cookie)coMap.get(name);
		  return cookie;
		}else{
		  return null;
		} 
		}
	private static Map<String,Cookie> ReadCookieMap(HttpServletRequest request){ 
	Map<String,Cookie> coMap = new HashMap<String,Cookie>();
	Cookie[] cookies = request.getCookies();
	if(null!=cookies){
	  for(Cookie cookie : cookies){
		  coMap.put(cookie.getName(), cookie);
	  }
	}
	return coMap;
	}
	


}
