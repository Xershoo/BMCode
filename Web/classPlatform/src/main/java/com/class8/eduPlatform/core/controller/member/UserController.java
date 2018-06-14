package com.class8.eduPlatform.core.controller.member;

import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
/**
 * 用户未登录之前相关操作控制器
 * @author yuzc
 *
 */
@Controller
public class UserController   {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduPayService eduPayService;
	
	@Autowired
	private IUserService userService;
	
	
	@RequestMapping("/switchusertype")
	@ResponseBody
	public String SwitchUserType(@RequestParam int toType,HttpSession session){
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			} 
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			if(toType == UserTypeConstants.TEACHER){
				AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
				if(authTeacherInfo == null){
					json.put("status", -2); //没申请老师
				}else if(authTeacherInfo.getStatus() != AuthTeacherStatusConstant.pass ){
					json.put("status", -3); //申请老师还没通过
				}
				else {
					json.put("status", 0);
				}
			}else if(toType == UserTypeConstants.SCHOOL_ADMIN){
				AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
				if(authSchoolInfo == null){
					json.put("status", -2); //没申请学校
				}else if(authSchoolInfo.getStatus() != AuthSchoolStatusConstant.pass ){
					json.put("status", -3); //申请老师还没通过
				}
				else {
					json.put("status", 0);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -1);
		}
		return json.toString();
	}
	
	
}
