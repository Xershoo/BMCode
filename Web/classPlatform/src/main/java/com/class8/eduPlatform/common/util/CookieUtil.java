package com.class8.eduPlatform.common.util;

import java.util.Arrays;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections.CollectionUtils;

public class CookieUtil {
	/**
	 * 添加Cookie 浏览器进程
	 * @param response Response
	 * @param name 名
	 * @param value 值
	 */
	public static void add(HttpServletResponse response, String name, String value) {
		add(response, name, value, -1);
	}

	/**
	 * 添加Cookie 保存maxAge秒
	 * @param response Response
	 * @param name 名
	 * @param value 值
	 * @param maxAge 保存多少秒
	 */
	public static void add(HttpServletResponse response, String name, String value, int maxAge) {
		// 实例化Cookie
		Cookie cookie = new Cookie(name, value);
		// 设置Cookie过期时间
		cookie.setMaxAge(maxAge);
		cookie.setDomain(".class8.com");
		// 设置目录
		cookie.setPath("/");
		// 添加Cookie
		response.addCookie(cookie);
	}

	/**
	 * 删除Cookie
	 * @param response Response
	 * @param name 名
	 */
	public static void remove(HttpServletResponse response, String name) {
		add(response, name, null, 0);
	}

	/**
	 * 根据name获得Cookie 没找到返回null
	 * @param request Request
	 * @param name CookieName
	 * @return Cookie
	 */
	public static Cookie getCookie(HttpServletRequest request, String name) {
		// 获得所有Cookie
		Cookie[] cookies = request.getCookies();
		// 判断有Cookie
		if (cookies == null|| CollectionUtils.isEmpty(Arrays.asList(cookies))) {
			return null;
		}
		// 声明一个Cookie,用户保存临时Cookie
		Cookie cookie = null;
		// 循环Cookie
		for (int i = 0; i < cookies.length; i++) {
			// 获得Cookie
			cookie = cookies[i];
			// 判断Cookie
			if (cookie.getName().equals(name)) {
				// 相等返回Cookie
				return cookie;
			}
		}
		// 返回Cookie
		return null;
	}

	/**
	 * 根据name获得CookieValue 没找到返回""
	 * @param request Request
	 * @param name CookieName
	 * @return CookieValue
	 */
	public static String getCookieValue(HttpServletRequest request, String name) {
		// 根据name获得Cookie
		Cookie cookie = getCookie(request, name);
		// 如果Cookie为空返回空串,不为空返回Value
		return cookie == null || CollectionUtils.isEmpty(Arrays.asList(cookie)) ? "" : cookie.getValue();
	}
	
	

	/**
	 * 静态构造
	 */
	private CookieUtil() {}

	public static void printallcookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		// 判断有Cookie
		if (cookies == null|| CollectionUtils.isEmpty(Arrays.asList(cookies))) {
			return ;
		}
		// 声明一个Cookie,用户保存临时Cookie
		Cookie cookie = null;
		// 循环Cookie
		for (int i = 0; i < cookies.length; i++) {
			// 获得Cookie
			cookie = cookies[i];
			
			System.out.println("key:" + cookie.getName() + " value:"+ cookie.getValue());
			
		}
	}
}
