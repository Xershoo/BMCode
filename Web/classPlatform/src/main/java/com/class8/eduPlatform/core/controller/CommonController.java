package com.class8.eduPlatform.core.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseComment;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseOnlineTypeConstants;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.weixin.service.CoreService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.common.util.SignUtil;
import com.class8.eduPlatform.core.bean.JsShowSchoolInfo;
import com.class8.eduPlatform.core.bean.NameAndIdShow;
import com.class8.eduPlatform.core.bean.SchoolStudentShowInfo;
import com.class8.eduPlatform.core.bean.TeacherShowInfo;
import com.class8.eduPlatform.core.bean.UserPayAccountInfo;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.SchoolCollegeInfo;
import com.class8.user.bean.SchoolMajorInfo;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.SearchUserInfoEx;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.sun.xml.internal.bind.v2.model.core.Element;
import com.sun.xml.internal.txw2.Document;
import com.wanmei.sns.util.ProtocalUtils;

/*
 * 一些公共接口，各种身份都可以调用的，特别是一些公共查询接口等，
 */

@Controller
public class CommonController  extends BaseController {

	@Autowired
	private IEduUserService eduUserService;
	@Autowired
	private IEduCourseService eduCourseService;
	@Autowired
	private IUserService userService;

	@ResponseBody
	@RequestMapping(value = "/allschoolcount ", produces = "application/json;charset=UTF-8")
	public String getAllSchoolCount(HttpSession session,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {
			
			int ncount = eduUserService.countAllAuthSchool();
			json.put("count", ncount);
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		json.put("status", 0);
		return json.toString();
	}
	
//	@ResponseBody
//	@RequestMapping(value = "/allschoollist ", produces = "application/json;charset=UTF-8")
//	public String getAllSchoolList(HttpSession session,HttpServletResponse response) {
//		JSONObject json = new JSONObject();
//		
//		try {
//			List<AuthSchoolInfo> schoolList = eduUserService.listAllAuthSchool();
//			if(schoolList != null){
//				List<JsShowSchoolInfo> nameList = new ArrayList<JsShowSchoolInfo>();
//				for (AuthSchoolInfo authSchoolInfo : schoolList) {
//					JsShowSchoolInfo jsShowSchoolInfo = new JsShowSchoolInfo();
//					jsShowSchoolInfo.setName(authSchoolInfo.getName());
//					jsShowSchoolInfo.setId(authSchoolInfo.getId());
//					nameList.add(jsShowSchoolInfo);
//				}
//				json.put("status", 0);
//				json.put("schools", nameList);
//			}else
//				json.put("status", -1);
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			json.put("status", -1);
//		}
//		return json.toString();
//	}
	@ResponseBody
	@RequestMapping(value = "/allschoollist ", produces = "application/json;charset=UTF-8")
	public ModelAndView getAllSchoolList(HttpSession session,HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("/school/viewAllSchool");
		
		try {
			List<AuthSchoolInfo> schoolList = eduUserService.listAllAuthSchool();
			if(schoolList != null && schoolList.size() > 0){
				List<JsShowSchoolInfo> nameList = new ArrayList<JsShowSchoolInfo>();
				for (AuthSchoolInfo authSchoolInfo : schoolList) {
					JsShowSchoolInfo jsShowSchoolInfo = new JsShowSchoolInfo();
					jsShowSchoolInfo.setName(authSchoolInfo.getName());
					jsShowSchoolInfo.setId(authSchoolInfo.getId());
					nameList.add(jsShowSchoolInfo);
				}
				mav.addObject("schools",nameList);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			mav.addObject("schools",null);
		}
		return mav;
	}

	// 查找学生老师列表
	@ResponseBody
	@RequestMapping(value = "/searchschooluserlist")
	public String searchUserList(@RequestParam int from, @RequestParam(required=false) long collegeid, @RequestParam(required=false) long majorid,
			@RequestParam(required=false) String strclass, @RequestParam(required=false) String username, @RequestParam(required=false) String sid, @RequestParam int usertype,
			HttpSession session,HttpServletRequest req, HttpServletResponse response) {
		
			
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			List<SearchUserInfoEx> userlist = null;
			if(username != null)
				username = username.trim();
			if(sid != null)
				sid = sid.trim();
			if(StringUtils.isEmpty(username) && StringUtils.isEmpty(sid)){
				if(usertype == UserTypeConstants.TEACHER)
					userlist = eduUserService.listTeachersByMajorid(majorid);
				else if(usertype == UserTypeConstants.STUDENT){
					userlist = eduUserService.listStudentsByClass(majorid, strclass);
				}
			} else {
				long schoolid = 10001;
				// from 0 学校搜索成员， 1 老师搜索成员
				if (from == 0) {
					AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
					if (authSchoolInfo != null)
						schoolid = authSchoolInfo.getId();
				} else {
					List<SchoolsTeacher> list = eduUserService
							.listMySchoolsBystatus(uid,
									SchoolMembersStatueConstant.pass);
					if (list != null && list.size() > 0)
						schoolid = list.get(0).getSchoolId();
				}
				System.out.println("school id:" + schoolid);
				userlist = eduUserService.SearchUserList(schoolid, collegeid, majorid, 
						strclass, username, sid, 0, 0, usertype);
			}
			if(userlist != null){
				List<SchoolStudentShowInfo> toReList = new ArrayList<SchoolStudentShowInfo>();
				for (SearchUserInfoEx searchUserInfoEx : userlist) {
					SchoolStudentShowInfo showInfo = new SchoolStudentShowInfo();
					showInfo.setUserid(searchUserInfoEx.getUid());
					showInfo.setRealName(searchUserInfoEx.getStrUserName());
					showInfo.setStudentId(searchUserInfoEx.getStudentid());
					showInfo.setCollege(searchUserInfoEx.getCollege());
					showInfo.setMajor(searchUserInfoEx.getMajor());
					showInfo.setStrClass(searchUserInfoEx.getCollegeClassName());
					showInfo.setSex(searchUserInfoEx.getnSex());
					toReList.add(showInfo);
				}
				json.put("userlist", toReList);
			}
			
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}

	private long getmySchoolid(long uid){
		long schoolid = 0;
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		if(authSchoolInfo != null)
			schoolid = authSchoolInfo.getId();
		else {
			List<SchoolsTeacher> list =  eduUserService.listmyAllSchools(uid);
			if(list != null){
				for (SchoolsTeacher schoolsTeacher : list) {
					if(schoolsTeacher.getStatus() == SchoolMembersStatueConstant.pass){
						schoolid = schoolsTeacher.getSchoolId();
						break;
					}
				}
			}
		}
		return schoolid;
	}
	//获取学院列表
	@ResponseBody
	@RequestMapping(value = "/getcollegelist")
	public String getCollegelist(HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			long schoolid = getmySchoolid(uid);
			if(schoolid == 0){
				json.put("status", -2);
				System.out.println("未加入学校，不能获取学院列表");
				return json.toString();
			}
			List<SchoolCollegeInfo> list = eduUserService.getCollegesBySchoolid(schoolid);
			if(list != null)
				json.put("college", list);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}	
	
	//获取专业列表列表
	@ResponseBody
	@RequestMapping(value = "/getmajorlist")
	public String getMajorlist(@RequestParam long collegeid, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			List<SchoolMajorInfo> list = eduUserService.getMajorsByCollegeid(collegeid);
			if(list != null)
				json.put("major", list);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}
	//获取班级列表
	@ResponseBody
	@RequestMapping(value = "/getclasslist")
	public String getClasslist(@RequestParam long majorid, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			List<String>  list = eduUserService.listClassByMajor(majorid);
			if(list != null)
				json.put("classs", list);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}	
	
	//获取班级里的学生列表
	@ResponseBody
	@RequestMapping(value = "/getstudentlist")
	public String getStudentlist(@RequestParam long majorid, @RequestParam String strClass, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			List<SearchUserInfoEx> list = eduUserService.listStudentsByClass(majorid, strClass);
			if(list != null){
				
				for (SearchUserInfoEx searchUserInfoEx : list) {
					System.out.println(searchUserInfoEx.getCollege() + searchUserInfoEx.getMajor() + searchUserInfoEx.getStrUserName());
				}
				json.put("userlist", list);
			}
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}	
	
	//获取专业里的老师列表
	@ResponseBody
	@RequestMapping(value = "/getteacherlist")
	public String getTeacherlist(@RequestParam long majorid, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			List<SearchUserInfoEx> list = eduUserService.listTeachersByMajorid(majorid);
			if(list != null){				
				json.put("userlist", list);
				/*for (SearchUserInfoEx searchUserInfoEx : list) {
					System.out.println(searchUserInfoEx.getCollege() + searchUserInfoEx.getMajor() + searchUserInfoEx.getStrUserName());
				}*/
			}
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/gettoken")
	public String gettoken(HttpSession session) {
		JSONObject json=new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		String username ;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			username = shiroUser.getLoginName();
		}
		try {
			String token = eduUserService.gentoken("autologin", uid, "0");			
			  json.put("username", username);
			 json.put("uid", uid);
			 json.put("token", token);
				json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", -2);
		}

		return json.toString();
	}	
	

	
	//获取明星老师
	@ResponseBody
	@RequestMapping(value = "/getstarTeachers")
	public String getStarTeachers(@RequestParam int count, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		
		try {
			List<AuthTeacherInfo> list = eduUserService.getStarTeachers(count);			
			if(list != null){
				List<TeacherShowInfo> toShowList = new ArrayList<TeacherShowInfo>();
				for (AuthTeacherInfo authTeacherInfo : list) {
					UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(authTeacherInfo.getUid());
					TeacherShowInfo teacherShowInfo = new TeacherShowInfo();
					teacherShowInfo.setUserid(authTeacherInfo.getUid());
					teacherShowInfo.setSex(userBasicInfo.getSex());
					teacherShowInfo.setRealName(userBasicInfo.getRealName());
					teacherShowInfo.setNickName(userBasicInfo.getNickName());
					teacherShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
					teacherShowInfo.setLargeHeadimge(SystemConfigs.PIC_URL_PERFIX + authTeacherInfo.getHeadImage());
					teacherShowInfo.setSignature(userBasicInfo.getSignature());
					teacherShowInfo.setDescription(userBasicInfo.getDescription());
					teacherShowInfo.setTeachYears(userBasicInfo.getTeachYears());
					teacherShowInfo.setPriceMin(authTeacherInfo.getPriceMin());
					
					toShowList.add(teacherShowInfo);
				}
				json.put("teachers", toShowList);
			}
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//获取最新老师
	@ResponseBody
	@RequestMapping(value = "/getnewTeachers")
	public String getNewTeachers(@RequestParam int count, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		
		try {
			List<AuthTeacherInfo> list = eduUserService.getNewTeachers(count);			
			if(list != null){
				List<TeacherShowInfo> toShowList = new ArrayList<TeacherShowInfo>();
				for (AuthTeacherInfo authTeacherInfo : list) {
					UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(authTeacherInfo.getUid());
					TeacherShowInfo teacherShowInfo = new TeacherShowInfo();
					teacherShowInfo.setUserid(authTeacherInfo.getUid());
					teacherShowInfo.setSex(userBasicInfo.getSex());
					teacherShowInfo.setRealName(userBasicInfo.getRealName());
					teacherShowInfo.setNickName(userBasicInfo.getNickName());
					teacherShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
					teacherShowInfo.setLargeHeadimge(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getPhotoUrl());
					teacherShowInfo.setSignature(userBasicInfo.getSignature());
					teacherShowInfo.setDescription(userBasicInfo.getDescription());
					teacherShowInfo.setTeachYears(userBasicInfo.getTeachYears());
					teacherShowInfo.setPriceMin(authTeacherInfo.getPriceMin());
					
					toShowList.add(teacherShowInfo);
				}
				json.put("teachers", toShowList);
			}
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}
	@RequestMapping(value="/weixinservlet",method=RequestMethod.GET)
	public String weixinservlet(HttpSession session,HttpServletRequest request,HttpServletResponse response){
		System.out.println("weixin recv get");
		Map requestParams = request.getParameterMap();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			
			System.out.println(name + "=" + valueStr);
		}
		// 微信加密签名   
        String signature = request.getParameter("signature");  
	        // 时间戳   
	        String timestamp = request.getParameter("timestamp");  
		        // 随机数   
		        String nonce = request.getParameter("nonce");  
	        // 随机字符串   
		        String echostr = request.getParameter("echostr");  
	  
		        PrintWriter out;
				try {
					out = response.getWriter();
					 if (SignUtil.checkSignature(signature, timestamp, nonce)) {  
				            out.print(echostr);  
					        }  
					        out.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}  
	        // 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败   
	         
        out = null;
        System.out.println("echostr: " + echostr);
		return echostr;  
	}
	
	@RequestMapping(value="/weixinservlet",method=RequestMethod.POST)
	public String recvmesg(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws IOException{
		System.out.println("weixin recv post");
		Map requestParams = request.getParameterMap();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			
			System.out.println(name + "=" + valueStr);
		}
		
		
		 // 从request中取得输入流   
		/*InputStream inputStream = request.getInputStream();  
		Scanner scanner = new Scanner(inputStream, "UTF-8");
        String text = scanner.useDelimiter("\\A").next();
       
        scanner.close();
		   // 释放资源   
		    inputStream.close();  
		   inputStream = null;  
		System.out.println("recv msg:" + text);*/
		
		 String respMessage = CoreService.processRequest(request);  
			          
			        // 响应消息   
		        PrintWriter out = response.getWriter();  
		        out.print(respMessage);  
		        out.close();  

		
		
		return "success";
	}
}
