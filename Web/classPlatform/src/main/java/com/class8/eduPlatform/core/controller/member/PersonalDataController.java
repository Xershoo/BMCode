package com.class8.eduPlatform.core.controller.member;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.log4j.BasicConfigurator;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import sun.misc.BASE64Decoder;

import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.core.bean.UserPayAccountInfo;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.MobileVerify;
import com.class8.user.bean.SchoolCollegeMajorShowInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.bean.UserSafeCenter;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.VerifyTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.sun.org.apache.xpath.internal.operations.And;

/*
 * 个人信息接口，包括获取个人的资料，账户信息等，
 */

@Controller
@RequestMapping("/persondata")
public class PersonalDataController  extends BaseController {

	public static final String PAY_SAFE_SET = "/pay/paySafeSet";
	
	public static final String ACCOUNT_SAFE_SET = "/account/courseCentral_bm";
	
	public static final String MY_ACCOUNT = "/myAccount";
	
	@Autowired
	IEduPayService	iEduPayService;
	@Autowired
	IEduUserService eduUserService;

	@RequestMapping(value = "/toSetPaySafety")
	public String toSetPaySafety() {
		
		return PAY_SAFE_SET;
	}
	@RequestMapping(value = "/toAccount")
	public String toAccount() {
		
		return ACCOUNT_SAFE_SET;
	}
	
	@RequestMapping(value="/myAccount")
	public String myAccount(){
		return MY_ACCOUNT;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getpayaccountinfo ")
	public String getpayaccountinfo(HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", 1);
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				System.out.println("getpayaccountinfo: " + uid);
				PayAccount payAccount = iEduPayService.getPayAccount(uid);
				UserPayAccountInfo userPayAccountInfo = new UserPayAccountInfo();
				userPayAccountInfo.setUserid(uid);
				if(payAccount != null){				
					double myMoeny = payAccount.getBlanceRmb() + payAccount.getBlanceOther();					
					myMoeny = myMoeny / 100;					
					DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");//格式化设置  
			        System.out.println(decimalFormat.format(myMoeny));  
					userPayAccountInfo.setBalanceSum(decimalFormat.format(myMoeny)) ;
				}else {
					userPayAccountInfo.setBalanceSum("0.00");
			}
				json.put("userpayaccountinfo", userPayAccountInfo);
				json.put("status", 0);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/hadsetpaypwd ")
	public String checkUserHadSetPayPwd(HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
				if(payUserSafeInfo == null){
					json.put("status", -2);
				}
				else{
					json.put("status", 0);
					if(payUserSafeInfo.getPayPwd() != null && payUserSafeInfo.getPayPwd().length() == 32){
						json.put("pwd", 0);
					}
					else {
						json.put("pwd", -1);
					}
					if(payUserSafeInfo.getSafeMobile() != null && payUserSafeInfo.getSafeMobile().length() > 10){
						String mobile = payUserSafeInfo.getSafeMobile();
						json.put("mobile", mobile.replaceAll(mobile.substring(3, 8), "*****"));
					}
					else {
						json.put("mobile", "-1");
					}
				}
			}
			
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/setpaypwd ")
	public String SetPayPwd(@RequestParam String paypwd, HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				String pwdMd5 = MD5Util.encode(paypwd);
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
				if(pwdMd5.equals(userBasicInfo.getPassword())){
					json.put("status", -2); //与登录密码一致，请修改，不允许一致。
					return json.toString();
				}
				PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
				if(payUserSafeInfo == null){
					payUserSafeInfo = new PayUserSafeInfo();
					payUserSafeInfo.setUid(uid);
				}else {
					if(payUserSafeInfo.getPayPwd() != null && payUserSafeInfo.getPayPwd().length() > 0){
						json.put("status", -3); //之前设置过密码，只能通过手机重置密码，不能用这个
						return json.toString();
					}
				}
				payUserSafeInfo.setPayPwd(pwdMd5);
				iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
				json.put("status", 0); 
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/resetpaypwdbyoldpwd")
	public String ReSetPayPwd(@RequestParam String payoldpwd, @RequestParam String paynewpwd, HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				String pwdoldMd5 = MD5Util.encode(payoldpwd);
				String pwdnewMd5 = MD5Util.encode(paynewpwd);
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
				if(pwdnewMd5.equals(userBasicInfo.getPassword())){
					json.put("status", -2); //与登录密码一致，请修改，不允许一致。
					return json.toString();
				}
				PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
				if(payUserSafeInfo == null || !pwdoldMd5.equals(payUserSafeInfo.getPayPwd())){
					json.put("status", -3); //老密码不对
					return json.toString();
				}
				payUserSafeInfo.setPayPwd(pwdnewMd5);
				iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
				json.put("status", 0); 
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	private boolean mobileHadReg(String mobile){
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfoByMobile(mobile);
		if(userBasicInfo == null)
			return false;
		else
			return true;
	}
	
	//type:表示短信用途，不同用途会有相应的检测从而决定是否发送短信
	@RequestMapping("/sendMobileCode")
	@ResponseBody
	public long sendMobileCode(@RequestParam String mobile, @RequestParam int type){
		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				return -1;
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				///TODO:得判断手机没被使用过
				if(type == VerifyTypeConstants.SET_PAY_MOBILE){
					
					PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
					if(payUserSafeInfo != null && !StringUtils.isEmpty(payUserSafeInfo.getSafeMobile())){
						return -20; //已经绑定过手机号，只能更改
					}
					if(mobileHadReg(mobile))
						return -21;  //手机被使用过了，换手机号
				}else if(type == VerifyTypeConstants.FORGET_PAY_PASSWORD){
					PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
					if(payUserSafeInfo == null || StringUtils.isEmpty(payUserSafeInfo.getSafeMobile()))
						return -22;//没有设置过手机号码
					mobile = payUserSafeInfo.getSafeMobile();
				}else if(type == VerifyTypeConstants.CHANGE_PAY_MOBILE){
					if(mobileHadReg(mobile))
						return -21;  //手机被使用过了，换手机号
				}
				return eduUserService.sendMobileVerifyCode(mobile, type, 0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -100;
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
				session.setAttribute("mobileVerifySerialid", mobileVerifySerialid);
			}
			else {
				session.removeAttribute("mobileVerifySerialid");
			}
			json.put("status", loginCode);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}
	
	// 通过手机重置支付密码，先验证码通过，保存serialid,然后把老手机号码及serialid传过来
	@RequestMapping("/resetpaypwdbymobile")
	@ResponseBody
	public String resetPaypwdByMobile(@RequestParam long mobileVerifySerialid,
			@RequestParam String paypwd,@RequestParam String verifyCode, HttpSession session) {
		JSONObject json = new JSONObject();
		int verCode = 0;
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -10);
				return json.toString();
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				String pwdMd5 = MD5Util.encode(paypwd);
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
				if(pwdMd5.equals(userBasicInfo.getPassword())){
					json.put("status", -20); // 支付密码和登录密码一致
					json.put("msg", "支付密码不能和登录密码一致");
					return json.toString();
				}
				verCode = eduUserService.verifyMobile(mobileVerifySerialid,verifyCode);
				if(verCode < 0){
					json.put("status", verCode); // 验证码错误
					json.put("msg", "验证码错误");
					return json.toString();
				}
				PayUserSafeInfo payUserSafeInfo = iEduPayService
						.getPayUserSafeInfoById(uid);
				if (payUserSafeInfo == null) {
					json.put("status", -30); // 用户没有设置过手机，接口调用错误
					return json.toString();
				}
				payUserSafeInfo.setPayPwd(pwdMd5);
				iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
				json.put("status", 0);
			}

		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}

	@RequestMapping("/setpaymobile")
	@ResponseBody
	public String setPayMobile(@RequestParam long mobileVerifySerialid,@RequestParam String verifyCode,HttpSession session) {
		JSONObject json = new JSONObject();
		int loginCode = 0;
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -10);
				return json.toString();
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				loginCode = eduUserService.verifyMobile(mobileVerifySerialid,verifyCode);
				if (loginCode >= 0) {
					MobileVerify mobileVerify = eduUserService.getMobileVerify(mobileVerifySerialid);

					PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
					if(payUserSafeInfo == null){
						payUserSafeInfo = new PayUserSafeInfo();
						payUserSafeInfo.setUid(uid);						
					}
					payUserSafeInfo.setSafeMobile(mobileVerify.getMobile());
					iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
					UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
					userBasicInfo.setMobile(mobileVerify.getMobile());
					eduUserService.updateUserBasicInfo(userBasicInfo);
					
				}
				else {
					session.removeAttribute("mobileVerifySerialid");				
				}
				json.put("status", loginCode);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}
	
	//更新手机号码，先验证码通过，保存serialid,然后把老手机号码及serialid传过来
	@RequestMapping("/resetpaymobile")
	@ResponseBody
	public String resetPayMobile(@RequestParam long mobileVerifySerialid,@RequestParam String oldmobile,@RequestParam String verifyCode,HttpSession session) {
		JSONObject json = new JSONObject();
		int loginCode = 0;
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -10);
				return json.toString();
			} else {
				ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
				uid = shiroUser.getUid();
				loginCode = eduUserService.verifyMobile(mobileVerifySerialid,verifyCode);
				if(loginCode < 0){
					json.put("status", loginCode); //验证码错误
					return json.toString();	
				}
				
				PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
				if(payUserSafeInfo == null){
					json.put("status", -20); //用户没有设置过手机，接口调用错误
					return json.toString();					
				}
				if(!oldmobile.equals(payUserSafeInfo.getSafeMobile())){
					json.put("status", -30); //旧手机填写错误
					return json.toString();					
				}
				MobileVerify mobileVerify = eduUserService.getMobileVerify(mobileVerifySerialid);
				payUserSafeInfo.setSafeMobile(mobileVerify.getMobile());
				iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
				userBasicInfo.setMobile(mobileVerify.getMobile());
				eduUserService.updateUserBasicInfo(userBasicInfo);				
				json.put("status", 0);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}
	
	/////////////////////////////////////
	//个人中心，自己的资料修改等获取，从原来的2B项目copy过来的。后续再修改
	
	//更新个人资料
	@ResponseBody
	@RequestMapping(value = "/updatepersonaldata ")
	public String updatepersonaldata(@RequestParam int usersex,@RequestParam int year,@RequestParam int month,@RequestParam int day,
			HttpServletRequest request,  HttpServletResponse response) {
		JSONObject json = new JSONObject();		
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
			String strPara = request.getParameter("realname"); //真实名字
			if(strPara != null)
				userBasicInfo.setRealName(strPara);
			strPara = request.getParameter("nickname"); //昵称
			if(userBasicInfo.getNickName() != null && userBasicInfo.getNickName() != ""){
				if(strPara != null && strPara.compareTo(userBasicInfo.getNickName()) != 0){
					UserBasicInfo nickUserBasicInfo = eduUserService.getUserBasicInfoByNickName(strPara);
					if(nickUserBasicInfo != null){
						json.put("status", -2); //用户昵称已经存在，换请个名字
						return json.toString();
					}
					userBasicInfo.setNickName(strPara);
				}
			}
			userBasicInfo.setSex(usersex);
			userBasicInfo.setBirthYear(year);
			userBasicInfo.setBirthMonth(month);
			userBasicInfo.setBirthDay(day);
			strPara = request.getParameter("teachyears");  //教龄
			if(strPara != null)
				userBasicInfo.setTeachYears(Float.parseFloat(strPara));
			strPara = request.getParameter("courseclassify"); //授课分类
			if(strPara != null)
				userBasicInfo.setSchoolClassify(Integer.parseInt(strPara));
			strPara = request.getParameter("occupation");//职业
			if(strPara != null)
				userBasicInfo.setOccupation(strPara);
			strPara = request.getParameter("company");//公司
			if(strPara != null)
				userBasicInfo.setCompany(strPara);
			strPara = request.getParameter("sign");//签名
			if(strPara != null)
				userBasicInfo.setSignature(strPara);
			strPara = request.getParameter("desc");//简介
			if(strPara != null)
				userBasicInfo.setDescription(strPara);
			int cc = eduUserService.updateUserBasicInfo(userBasicInfo);			
			if (cc >= 1) {
				cc = 0;
				//重新设置用户的信息
				Session session = SecurityUtils.getSubject().getSession();
				SessionUser user = (SessionUser) session.getAttribute(CommonConstants.USER);
				user.setLoginName(userBasicInfo.getUname());
				user.setNickName(userBasicInfo.getNickName());
				user.setSex(userBasicInfo.getSex());
				session.setAttribute(CommonConstants.USER, user);
			}
			json.put("status", cc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}

	//获取自己的个人资料
	@ResponseBody
	@RequestMapping(value = "/listpersonaldata ")
	public String listpersonaldata(HttpSession session,
			HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserSafeCenter dd = eduUserService.getUserSafeInfo(uid);
			String safeLevel="弱";
			if(dd!=null)
			{
				if(dd.getPwdlevel()==1)
				{
					safeLevel="弱";	
				}
				else if (dd.getPwdlevel()==2)
				{
					safeLevel="中";	
				}
				else if (dd.getPwdlevel()==3)
				{
					safeLevel="强";	
				}
				if(dd.getStrAsk1() != null)
					dd.setStrAsk1("");
				if(dd.getStrAsk2() != null)
					dd.setStrAsk2( "");
				if(dd.getStrAsk3() != null)
					dd.setStrAsk3("");
				json.put("safequestion", dd.toString());
				//safeLevel =String.valueOf( dd.getPwdlevel());
			}
			
			UserBasicInfo cc = eduUserService.getUserBasicInfo(uid);
			cc.setPassword("");
			String strMobileString = cc.getMobile();
			if(strMobileString != null && strMobileString.length() >= 11 )
			{
				String subStr = strMobileString.substring(2,9);
				strMobileString = strMobileString.replace(subStr, "*******");
				cc.setMobile(strMobileString);
			}
			cc.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX+cc.getAvatarUrl());
			cc.setPhotoUrl(SystemConfigs.PIC_URL_PERFIX+cc.getPhotoUrl());
			json.put("status", 0);
			json.put("safeLevel", safeLevel);
			json.put("personaldata", cc.toJSONString());
			
			int toShowTeacher = -1;
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo != null && (authTeacherInfo.getStatus() == AuthTeacherStatusConstant.pass ||
									authTeacherInfo.getStatus() == AuthTeacherStatusConstant.schoolimport)){
				toShowTeacher = 0;
			}
			json.put("showteacherinfo", toShowTeacher); //显示教龄等信息
			UserEduInfo userEduInfo = eduUserService.getUserEduInfo(cc.getUid());
			if(userEduInfo != null)
			{
				SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = eduUserService.getMajorShowInfo(userEduInfo.getMajorId(), 0);
				
				if(schoolCollegeMajorShowInfo != null)
				{
					userEduInfo.setUniversity(schoolCollegeMajorShowInfo.getSchoolName());
					userEduInfo.setCollege(schoolCollegeMajorShowInfo.getCollegeName());
					userEduInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());
				}
				json.put("personeduinfo", userEduInfo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			json.put("status", 1);
		}

		return json.toString();

	}

	//得到自己的手机号
	@ResponseBody
	@RequestMapping(value = "/getusermobile ", produces = "application/json;charset=UTF-8")
	public String getusermobile(HttpSession session,
			HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserBasicInfo userbasicInfo = eduUserService.getUserBasicInfo(uid);
			String mobile = userbasicInfo.getMobile();
			json.put("status", 0);
			json.put("mobile", mobile);
		} catch (Exception e) {
			// TODO: handle exception
			json.put("status", 1);
		}
		return json.toString();
	}

	//通过老密码修改密码
	@ResponseBody
	@RequestMapping(value = "/changepasswordbyold", produces = "application/json;charset=UTF-8")
	public String changepasswordbyold(@RequestParam String oldPassword,
			@RequestParam String newPassword, HttpSession session, @RequestParam byte nLevel,
			HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			int cc = eduUserService.changePasswordByOldPassword(uid,
					MD5Util.encode(oldPassword), MD5Util.encode(newPassword));
			UserSafeCenter userSafeCenter = eduUserService.getUserSafeInfo(uid);
			if(userSafeCenter == null){
				userSafeCenter = new UserSafeCenter();
				userSafeCenter.setUid(uid);
			}
			userSafeCenter.setPwdlevel(nLevel);
			eduUserService.updateSafeInfo(userSafeCenter);				
			
			if (cc == 1) {
				cc = 0;
			}
			json.put("status", cc);
		} catch (Exception e) {
			// TODO: handle exception
			json.put("status", 1);
		}
		return json.toString();
	}
	

	//更新手机号，或者直接绑定手机号。如果以前没设置过手机号，而 oldmobile设置为""即空.
	@RequestMapping(value = "/updateBindMobile")
	@ResponseBody
	public String updateBindMobile(@RequestParam long mobileVerifySerialid,@RequestParam String oldmobile,
			@RequestParam String verifycode) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
			if(!StringUtils.isEmpty(userBasicInfo.getMobile()) && !userBasicInfo.getMobile().equals(oldmobile)){
				json.put("status", -2); //之前设置过手机号，之前的手机号填写有误
				return json.toString();
			}
			
			long nCode = eduUserService.verifyMobile(mobileVerifySerialid, verifycode);
			if(nCode < 0){
				json.put("status", nCode); //验证码错误
				return json.toString();	
			}
			
			MobileVerify mobileVerify = eduUserService.getMobileVerify(mobileVerifySerialid);
			userBasicInfo.setMobile(mobileVerify.getMobile());
			eduUserService.updateUserBasicInfo(userBasicInfo);
			///TODO:把支付手机号也更改了
			PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
			if(payUserSafeInfo == null)
			{
				payUserSafeInfo = new PayUserSafeInfo();
				payUserSafeInfo.setUid(uid);
			}
			payUserSafeInfo.setSafeMobile(mobileVerify.getMobile());
			iEduPayService.updatePayUserSafeInfo(payUserSafeInfo);
			json.put("status", 0);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", 1);
		}
		return json.toString();
	}

	//设置三个密保问题，重新设置的话，是先通过三个问题的回答通过后，也调用该接口
	@RequestMapping(value = "/setUserSafeQuetions")
	@ResponseBody
	public String setUserSafeQuetions(HttpSession session,
			@RequestParam String strQuestion1, @RequestParam String strAsk1,
			@RequestParam String strQuestion2, @RequestParam String strAsk2,
			@RequestParam String strQuestion3, @RequestParam String strAsk3) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserSafeCenter userSafeCenter = eduUserService.getUserSafeInfo(uid);
			if(userSafeCenter == null){
				userSafeCenter = new UserSafeCenter();
				userSafeCenter.setUid(uid);
			}
			userSafeCenter.setStrAsk1(strAsk1);
			userSafeCenter.setStrAsk2(strAsk2);
			userSafeCenter.setStrAsk3(strAsk3);
			userSafeCenter.setStrQuestion1(strQuestion1);
			userSafeCenter.setStrQuestion2(strQuestion2);
			userSafeCenter.setStrQuestion3(strQuestion3);
			eduUserService.updateSafeInfo(userSafeCenter);
			json.put("status", 0);
		} catch (Exception e) {
			json.put("status", 1);
		}
		return json.toString();
	}
	
	//更改头像
	@ResponseBody
	@RequestMapping(value = "/upuserimage", produces = "application/json;charset=UTF-8")
	public String upuserimage(HttpServletRequest request,HttpServletResponse response ,@RequestParam String filepath)
			throws UnsupportedOperationException, IOException {
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		}		
		ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
		uid = shiroUser.getUid();
		
		filepath = filepath.replace("data:image/png;base64,", "");
		response.addHeader("Access-Control-Allow-Origin", "*");
		BASE64Decoder decoder = new BASE64Decoder();
		
		String realPath = request.getSession().getServletContext().getRealPath("/upload");
		File tempFile = File.createTempFile(String.valueOf(System.currentTimeMillis()), ".jpg" , new File(realPath));
		try {
			byte[] b = decoder.decodeBuffer(filepath);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {
					b[i] += 256;
				}
			}
			OutputStream out = new FileOutputStream(tempFile);
			out.write(b);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		BasicConfigurator.configure();
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("uid", Long.toString(uid));
		Map<String, String> files = new HashMap<String, String>();
		files.put("myfile", tempFile.getAbsolutePath());
		
		CloseableHttpResponse httpResponse = null;
		String results = null;
		CloseableHttpClient httpClient = null;
		HttpPost httpPost = null;
		StringWriter writer = null;
		
		try {
			String postUrl = SystemConfigs.USER_AVATAR;
			httpClient = HttpClients.createDefault();
			httpPost = new HttpPost(postUrl);
			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			
			if(params != null && params.size()>0){
				for (String key : params.keySet()) {
					StringBody value = new StringBody(params.get(key),ContentType.TEXT_PLAIN);
					builder.addPart(key, value);
				}
			}

			if (files != null && files.size() > 0) {
				for (String key : files.keySet()) {
					String value = files.get(key);
					FileBody body = new FileBody(new File(value));
					builder.addPart(key, body);
				}
			}

			HttpEntity reqEntity = builder.build();
			httpPost.setEntity(reqEntity);

			try {
				httpResponse = httpClient.execute(httpPost);
			} catch (IOException e) {
				e.printStackTrace();
			}

			HttpEntity entity = httpResponse.getEntity();
			if (entity != null) {
				writer = new StringWriter();
				IOUtils.copy(entity.getContent(), writer, "UTF-8");
				results = writer.toString();
			}
			JSONObject resultimg = JSONObject.fromObject(results);
			if (Integer.parseInt((resultimg.get("code").toString())) != 200) {
				json.put("status", 1);
				return json.toString();
			} else {
				String name = String.valueOf(resultimg.get("url"));
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
				userBasicInfo.setAvatarUrl(name);
				eduUserService.updateUserBasicInfo(userBasicInfo);
				json.put("status", 0);
				String userImage = SystemConfigs.PIC_URL_PERFIX + name;
				///TODO:头像是否设置在seesion里
				request.getSession().setAttribute("userImage",
						new String(userImage.getBytes("iso-8859-1"), "utf-8"));
				
				//重新设置用户的图像
				Session session = SecurityUtils.getSubject().getSession();
				SessionUser user = (SessionUser) session.getAttribute(CommonConstants.USER);
				user.setAvatarUrl(userImage);
				session.setAttribute(CommonConstants.USER, user);

			}

		} finally {
			close(tempFile, writer, httpPost, httpClient);
		}
		
		return json.toString();
	}
	
	/**
	 * 上传形象照
	 * @param request
	 * @param filepath
	 * @return
	 */
	@RequestMapping(value="/uploadPhoto",method=RequestMethod.POST)
	@ResponseBody
	public String uploadPhoto(HttpServletRequest request,@RequestParam String filepath){
		JSONObject json = new JSONObject();
		long uid = this.getShiroUser().getUid();
		File tempFile = null;
		try {
			String realPath = request.getSession().getServletContext().getRealPath("/upload");
			filepath = filepath.replace("data:image/png;base64,", "");
	        tempFile = File.createTempFile(UUID.randomUUID().toString(), ".jpg", new File(realPath));
        
	        BASE64Decoder decoder = new BASE64Decoder();
			byte[] b = decoder.decodeBuffer(filepath);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {
					b[i] += 256;
				}
			}
			OutputStream out = new FileOutputStream(tempFile);
			out.write(b);
			out.flush();
			out.close();
			
			Map<String,File> files = new HashMap<String,File>();
			files.put("myfile", tempFile);
			Map<String, String> params = new HashMap<String, String>();
			params.put("uid", Long.toString(uid));
			String uploadResult = FileUploadUtil.upfile(SystemConfigs.USER_PHOTO, params, files);
			JSONObject jsonUploadResult = JSONObject.fromObject(uploadResult);
			
			if(Integer.valueOf(jsonUploadResult.get("code").toString()) == 200){
				eduUserService.updateUserPhoto(uid,(String)jsonUploadResult.get("url"));
				json.put("url", SystemConfigs.PIC_URL_PERFIX + jsonUploadResult.get("url"));
				json.put("success", true);
			} 
			
			return json.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		json.put("message", "文件上传失败,请稍后重试！");
		return json.toString();
	}
	
	private void close(File tempFile,StringWriter writer,HttpPost httpPost,CloseableHttpClient httpClient){
		if(tempFile != null){
			tempFile.delete();
		}
		if(httpPost != null){
			httpPost.abort();
		}
		if(writer != null){
			try {
				writer.close();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(httpClient != null){
					try {
						httpClient.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
}
