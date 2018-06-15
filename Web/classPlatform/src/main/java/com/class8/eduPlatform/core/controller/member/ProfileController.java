package com.class8.eduPlatform.core.controller.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.class8.eduPlatform.core.controller.BaseController;
/**
 * 用户个人信息设置相关控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/profile/setting")
public class ProfileController extends BaseController {
	
	@RequestMapping("/basic")
	public String basic(){
		return "";
	}
	
	@RequestMapping("/education")
	public String education(){
		return "";
	}
	
	@RequestMapping("/security")
	public String security(){
		return "";
	}
	
}
