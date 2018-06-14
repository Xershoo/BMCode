package com.class8.eduPlatform.core.controller.member;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.common.util.RegexUtil;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.MobileVerify;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserSafeCenter;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;

/**
 * 用户注册控制器
 *
 */
@Controller
public class RegisterController {
	
	public static final String REGISTER = "/index/register_bm";
	public static final String REGISTER_THIRD = "/index/registerByThird";
	public static final String FORGET_PASSWORD = "/index/forgetPassword";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduPayService eduPayService;
	
	/**
	 * 跳转用户注册页面
	 * @return
	 */
	@RequestMapping(value="/register",method=RequestMethod.GET)
	public String registerPage(){
		return REGISTER;
	}
	
	/**
	 * 跳转第三方登录页面
	 * @return
	 */
	@RequestMapping(value="/toRegisterByThird",method=RequestMethod.GET)
	public String toRegisterByThird() {
		return REGISTER_THIRD;
	}
	
	/**
	 * 忘记密码
	 */
	@RequestMapping(value="/toForgetPassword",method=RequestMethod.GET)
	public String forgetPassword(){
		return FORGET_PASSWORD;
	}
	
	
	
	/**
	 * 校验用户手机号是否可以注册
	 * @return
	 */
	@RequestMapping("/checkRegMobile")
	@ResponseBody
	public String checkRegMobile(@RequestParam String mobile){
		JSONObject jsonObject = new JSONObject();
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfoByMobile(mobile);
		if(userBasicInfo == null){
			jsonObject.put("success", true);
		} else {
			jsonObject.put("success", false);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 发用手机验证码
	 */
	@RequestMapping("/sendMobileCodeNotLogin")
	@ResponseBody
	public long sendMobileCodeNotLogin(@RequestParam String mobile, @RequestParam int type){
		return eduUserService.sendMobileVerifyCode(mobile, type, 0);
	}
	
	/**
	 * 用户注册
	 */
	@RequestMapping(value="/register",method=RequestMethod.POST)
	@ResponseBody
	public String register(@RequestParam String mobile,@RequestParam String password,@RequestParam String verifyCode,@RequestParam long verifySerialid){
		JSONObject json = new JSONObject();
		if(StringUtils.isEmpty(mobile)){
			json.put("mobile","请输入手机号码");
			return json.toString();
		}
		if(!RegexUtil.isPhone(mobile)){
			json.put("mobile","输入的手机格式有误");
			return json.toString();
		}
		if(StringUtils.isEmpty(password)){
			json.put("password", "请输入密码");
			return json.toString();
		}
		long i = eduUserService.verifyMobile(verifySerialid, verifyCode);
		if(i < 0){
			json.put("verifyCode", "验证码不正确或已过期");
			return json.toString();
		}
		MobileVerify mobileVerify = eduUserService.getMobileVerify(verifySerialid);
		long uid = eduUserService.registerByMobilePhone(verifySerialid, MD5Util.encode(password));
		PayUserSafeInfo payUserSafeInfo = new PayUserSafeInfo();
		payUserSafeInfo.setUid(uid);
		payUserSafeInfo.setSafeMobile(mobileVerify.getMobile());
		eduPayService.updatePayUserSafeInfo(payUserSafeInfo);
		
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping("/verifyMobile")
	@ResponseBody
	public String verifyMobile(@RequestParam long mobileVerifySerialid,@RequestParam String verifyCode,HttpSession session) {
		JSONObject json = new JSONObject();
		int loginCode = 0;
		try {
			loginCode = eduUserService.verifyMobile(mobileVerifySerialid,
					verifyCode);
			if (loginCode >= 0) {
				session.setAttribute("resetpwdpass", "yes");
			}
			json.put("status", loginCode);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}
	
	/**
	 * 通过手机号修改密码
	 */
	@RequestMapping("/changePassByMobile")
	@ResponseBody
	public String changePassByMobile(@RequestParam long mobileVerifySerialid,@RequestParam String newpass,@RequestParam byte pwdlevel,HttpSession session){
		JSONObject json = new JSONObject();
		try {
			String hadCodepass = session.getAttribute("resetpwdpass").toString();
			if (hadCodepass != null && hadCodepass.equals("yes")) {
				int code = eduUserService.changePasswordByMobileCode(mobileVerifySerialid,
						MD5Util.encode(newpass), pwdlevel);				
				if (code >= 0) {
					session.removeAttribute("resetpwdpass");					
					json.put("status", 0);
				}else {
					json.put("status", -1);
				}
			}else {
				json.put("status", -1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -1);
		}
		return json.toString();
	}
	
	/**
	 * 通过账户查询密保问题
	 */
	@ResponseBody
	@RequestMapping(value = "/getVerifyQu")
	public String getVerifyQuestions(@RequestParam String uname)
	{
		JSONObject json = new JSONObject();
		try {
			UserBasicInfo userInfo = eduUserService.getUserBasicInfoByUname(uname);
			if(userInfo == null)
				json.put("status", -1); //用户名不存在
			else {
				UserSafeCenter userSafeCenter = eduUserService.getUserSafeInfo(userInfo.getUid());
				if(userSafeCenter == null)
					json.put("status", -2); //用户没有设置过密保问题
				else {
					json.put("status", 0);
					userSafeCenter.setStrAsk1("");
					userSafeCenter.setStrAsk2("");
					userSafeCenter.setStrAsk3("");
					json.put("question", userSafeCenter);
				}
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			json.put("status", -100);
		}

		
		return json.toString();
	}
	
	/**
	 * 通过密保问题重新设置密码
	 */
	@ResponseBody
	@RequestMapping(value = "/changePassByEncrypted")
	public String changePassByEncrypted(@RequestParam long uid,@RequestParam String newpass,@RequestParam byte pwdlevel
			,HttpSession session)
	{
		JSONObject json = new JSONObject();
		try {
			String vequString = session.getAttribute("verqu").toString();
			if(vequString == null || vequString.compareTo("0") != 0){
				json.put("status", -1);//没正确回答密保问题
				return json.toString();
			}
			session.removeAttribute("verqu");
			UserBasicInfo userInfo = eduUserService.getUserBasicInfo(uid);
			int code = eduUserService.changePasswordByOldPassword(uid, userInfo.getPassword(), MD5Util.encode(newpass));
			UserSafeCenter userSafeCenter = eduUserService.getUserSafeInfo(uid);
			if(userSafeCenter == null){
				userSafeCenter = new UserSafeCenter();
				userSafeCenter.setUid(uid);
			}
			userSafeCenter.setPwdlevel(pwdlevel);
			eduUserService.updateSafeInfo(userSafeCenter);
			
			json.put("status", 0);
			
		} catch (Exception e) {
			// TODO: handle exception
			json.put("status", -2);
		}

		
		return json.toString();
	}
		
	
	/**
	 * 核对个人密保问题是否正确
	 */
	@ResponseBody
	@RequestMapping(value = "/verifyQuestions ")
	public String verifyQuestions(@RequestParam long uid, @RequestParam String answer1,@RequestParam String answer2,@RequestParam String answer3,
			HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			session.removeAttribute("verqu");			
			UserSafeCenter dd = eduUserService.getUserSafeInfo(uid);
			if(dd!=null)
			{
				int nError = 0;
				if(dd.getStrAsk1().equals(answer1)){
					json.put("question1", 0);
				}else{
					json.put("question1", 1);
					nError = -3;
				}
				if(dd.getStrAsk2().equals(answer2)){
					json.put("question2", 0);
				}else{
					json.put("question2", 1);
					nError = -3;
				}
				if(dd.getStrAsk3().equals(answer3)){
					json.put("question3", 0);
				}else{
					json.put("question3", 1);
					nError = -3;
				}
				json.put("status", nError);
				if(nError == 0){
					session.setAttribute("verqu", 0);
				}
			}else{
				json.put("status", -2);
			}		
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			json.put("status", -100);
		}

		return json.toString();

	}
	
	
	
}
