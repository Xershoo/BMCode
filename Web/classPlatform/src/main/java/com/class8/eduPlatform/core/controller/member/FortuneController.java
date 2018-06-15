package com.class8.eduPlatform.core.controller.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.class8.eduPlatform.core.controller.BaseController;
/**
 * 我的财富相关控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/user/fortune")
public class FortuneController extends BaseController {
	
	@RequestMapping("/account")
	public String account(){
		return "";
	}
	
	@RequestMapping("/transactions")
	public String transactions(String type){
		return "";
	}
	
	@RequestMapping("/safecenter")
	public String safecenter(){
		return "";
	}
	
}
