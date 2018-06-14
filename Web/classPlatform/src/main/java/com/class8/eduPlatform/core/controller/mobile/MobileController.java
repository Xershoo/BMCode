package com.class8.eduPlatform.core.controller.mobile;


import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Decoder;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseFile;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.CourseStudentSignupType;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.bean.Message;
import com.class8.eduPlatform.core.bean.MobileCourseMessage;
import com.class8.eduPlatform.core.bean.TeacherShowInfo;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseCommentDto;
import com.class8.eduPlatform.core.dto.CourseDetailDto;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.dto.MessageDto;
import com.class8.eduPlatform.core.dto.TeacherDto;
import com.class8.eduPlatform.core.service.ICourseClassService;
import com.class8.eduPlatform.core.service.ICourseCommentService;
import com.class8.eduPlatform.core.service.ICourseFileService;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.ICourseStudentService;
import com.class8.eduPlatform.core.service.IDetailPageService;
import com.class8.eduPlatform.core.service.IMessageService;
import com.class8.eduPlatform.core.service.ISchoolBannerService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.pay.wxpay.constant.WxTradeType;
import com.class8.pay.common.constants.ChargeorderformTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.pay.wxpay.protocol.unifiedorder.UnifiedOrderReqData;
import com.class8.pay.wxpay.protocol.unifiedorder.UnifiedOrderResData;
import com.class8.pay.wxpay.util.Configure;
import com.class8.pay.wxpay.util.Signature;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.MessageEx;
import com.class8.user.bean.SchoolBanner;
import com.class8.user.bean.SchoolCollegeMajorShowInfo;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherQueryExample;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.MessageTypeConstants;
import com.class8.user.constants.PublishFlagConstants;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;
import com.wanmei.sns.util.DateUtils;

@Controller
public class MobileController {
	
	@Autowired
	IEduCourseService iEduCourseService;
	@Autowired
	IEduUserService iEduUserService;
	@Autowired
	IEduPayService iEduPayService;
	
	@Autowired
	private ICourseService courseService;
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ICourseStudentService courseStudentService;
	
	@Autowired
	IDetailPageService iDetailPageService;
	
	@Autowired
	private ICourseFileService courseFileService;
	
	@Autowired
	private ISchoolBannerService schoolBannerService;
	
	@Autowired
	private IMessageService messageService;
	
	@Autowired
	private ICourseClassService courseClassService;
	
	@Autowired
	private ICourseCommentService courseCommentService;
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/detail",produces="application/json;charset=UTF-8")
	public String courseDetailpage(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid,@RequestParam long courseid,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {			
			CourseDetailDto courseDetail = courseService.getCourseDetail(courseid);
			CourseStudent courseStudent = courseStudentService.getCourseStudentByStudentUidAndCourseid(uid, courseid);
			if(courseStudent != null && courseDetail != null && courseStudent.getSignupStatus() >= OrderStatusConstant.hadpay){
				courseDetail.setSingupStatus(1);
			}
			json.put("result", JSONUtil.objectToJson(courseDetail, DateUtil.YYYY_MM_DD_HH_MM));
			json.put("status", 0);			

		} catch (Exception e) {
			json.put("status", 1);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/StudentList ",produces="application/json;charset=UTF-8")
	public String studentList(@PathVariable(value = "mobileType") int mobileType,@RequestParam long courseid,
			@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="12") int pageSize,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {
			json.put("result", courseStudentService.getSignedStudentByCourseidPage(courseid, pageNum, pageSize));
			json.put("status", 0);
		} catch (Exception e) {
			json.put("status", 1);
		}
		return json.toString();
	}
	
	@SuppressWarnings("static-access")
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/courseList ",produces="application/json;charset=UTF-8")
	public String courseList(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid,@RequestParam int starts ,@RequestParam int rows,
			@RequestParam int nUserType,HttpServletResponse response)
	{
		List<CourseDto> lismobile=new ArrayList<CourseDto> ();
		DateUtils dateutil=new DateUtils();
		JSONObject json2=new JSONObject();
		try {
			List<Long> courseidList = null;
			if(nUserType == UserTypeConstants.STUDENT){
				courseidList = iEduCourseService.findStudentCourseIdsByStatus(uid,null);
				if(courseidList != null)
					courseidList = courseidList.subList(Math.min(starts, courseidList.size()), Math.min(starts + rows, courseidList.size()));
			}else if(nUserType == UserTypeConstants.TEACHER){
				courseidList = iEduCourseService.findTeacherCourseIds(uid);
			}
			for (Long courseid : courseidList) {
				CourseDto course = new CourseDto();
				CourseBasicInfo courseBasicInfo = iEduCourseService.getCourseBasicInfo((Long)courseid);
				course.setCourseid(courseBasicInfo.getCourseid());
				course.setCourseName(courseBasicInfo.getCourseName());
				course.setCourseType(courseBasicInfo.getOnlineType());
				course.setCategoryId(courseBasicInfo.getItemsType());
				course.setTeacherUid(courseBasicInfo.getTeacherUid());
				course.setSchoolId(courseBasicInfo.getSchoolId());
				course.setCoverUrl(courseBasicInfo.getCoverUrl());
				course.setPriceTotal(courseBasicInfo.getPriceTotal());
				course.setTotalclass(courseBasicInfo.getClassTotal());
				course.setFinishedclass(courseBasicInfo.getClassHadFinished());
				//老师名称
				UserBasicInfo teacherBasicInfo = iEduUserService.getUserBasicInfo(courseBasicInfo.getTeacherUid());
				course.setTeacherName(teacherBasicInfo.getRealName());
				
				//学校名称
				if(courseBasicInfo.getSchoolId() != 0){
					AuthSchoolInfo authSchoolInfo = iEduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
					course.setSchoolName(authSchoolInfo.getName());
				}
				
				//分类路径
				course.setCategotyPath(iEduCourseService.listCourseCategoryPath(courseBasicInfo.getItemsType()));
				
				List<CourseClass> classlist = iEduCourseService.listCourseClass(courseid);
				if(classlist != null){
					for (CourseClass courseClass : classlist) {
						if(courseClass.getClassState() == CourseStateConstants.COURSE_IS_PROCESSING){
							course.setClassingid(courseClass.getClassid());
							break;
						}
					}
					if (course.getClassingid() == 0) {
						long now = System.currentTimeMillis();
						for (CourseClass courseClass : classlist) {
							if (courseClass.getClassState() == CourseStateConstants.COURSE_NOT_BEGIN) {
								long thestarttime = courseClass.getStartTimePlan().getTime();
								if (thestarttime - now <= 600000)// 小于10分钟可以进入
								{
									course.setClassingid(courseClass.getClassid());
									break;
								}
							}
						}
					}
				}

				lismobile.add(course);
			}

			  SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
			  byte[]  cc=JSON.toJSONBytes(lismobile,feature);
			json2.put("list", new String(cc,"utf-8"));
			  json2.put("status", 0);
		} catch (Exception e) {
			e.printStackTrace();
			json2.put("status", 1);
		}
		return json2.toString();
	}
	
	private   String containStime2Week(long seconds) {
		 String[] weekDays = {"7", "1", "2", "3", "4", "5", "6"};
		 
		Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue();
		c.setTimeInMillis(millions);
		        int w = c.get(Calendar.DAY_OF_WEEK) - 1;
		        if (w < 0)
		            w = 0;
		        return weekDays[w];

	}
	
	private static String containStime2String(long seconds) {
		Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue();
		c.setTimeInMillis(millions);
		String time = c.getTime().toLocaleString();
		String hours = String.valueOf(c.getTime().getHours());
		if (hours.length() == 1) {
			hours = "0" + hours;
		}
		String minutes = String.valueOf(c.getTime().getMinutes());
		if (minutes.length() == 1) {
			minutes = "0" + minutes;
		}
		String output = hours + ":" + minutes;
		return output;
	}

	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mgetusermobile ", produces = "application/json;charset=UTF-8")
	public String getusermobile(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {
			UserBasicInfo userbasicInfo = iEduUserService.getUserBasicInfo(uid);
			String mobile = userbasicInfo.getMobile();
			json.put("status",0);
			json.put("mobile", mobile);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status",1);
		}
		return json.toString();

	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mchangepasswordbyold",produces="application/json;charset=UTF-8")
	public String mobilechangepasswordbyold(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid,@RequestParam String oldPassword,@RequestParam String newPassword,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {
			
			int cc = iEduUserService.changePasswordByOldPassword(uid, oldPassword, newPassword);
			if (cc==1)
			{
				cc=0;
			}
			json.put("status",cc);
		} catch (Exception e) {
			
			e.printStackTrace();
			json.put("status",1);
		}
	
		
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mlistpersonaldata ",produces="application/json;charset=UTF-8")
	public String mobilelistpersonaldata(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid, @RequestParam int userType, HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {
			UserBasicInfo cc = iEduUserService.getUserBasicInfo(uid);
			if(cc==null)
			{
				json.put("status",2);
			}
			else
			{
				cc.setPassword("");
				json.put("status",0);
				UserEduInfo userEduInfo = iEduUserService.getUserEduInfo(uid);
				if(userEduInfo != null)
				{
					SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = iEduUserService.getMajorShowInfo(userEduInfo.getMajorId(), 0);
					
					if(schoolCollegeMajorShowInfo != null)
					{
						userEduInfo.setUniversity(schoolCollegeMajorShowInfo.getC8schoolName());
						userEduInfo.setCollege(schoolCollegeMajorShowInfo.getCollegeName());
						userEduInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());
					}
					json.put("eduinfo", userEduInfo);
				}
				json.put("personaldata", cc.toJSONString());
				if(userType == UserTypeConstants.TEACHER){
					//老师课程的总数
					int countCourse = courseService.countOfTeacherCourse(uid);
					json.put("coursecount", countCourse);
					//老师学生的总数
					int countStudent = userService.countOfTeacherStudent(uid);
					json.put("coursestudent", countStudent);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			json.put("status",1);
		}

		return json.toString();
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobileupdatepersonaldata",produces="application/json;charset=UTF-8")
	public String mobileupdatepersonaldata(@PathVariable(value = "mobileType") int mobileType,@RequestParam long userid,String usernickname,Integer usersex,String userdesc ,
			String newResiCity ,String avatarUrl ,Integer  newBirthDay,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();
		try {
			UserBasicInfo userBasicInfo = iEduUserService.getUserBasicInfo(userid);
			if(StringUtils.isNotEmpty(usernickname)){
				userBasicInfo.setNickName(usernickname);
			}
			if(usersex != null){
				userBasicInfo.setSex(usersex);
			}
			if(StringUtils.isNotEmpty(userdesc)){
				userBasicInfo.setDescription(userdesc);
			}
			if(StringUtils.isNotEmpty(newResiCity)){
				userBasicInfo.setResiCity(newResiCity);
			}
			if(StringUtils.isNotEmpty(avatarUrl)){
				if(StringUtils.startsWith(avatarUrl, SystemConfigs.PIC_URL_PERFIX)){
					userBasicInfo.setAvatarUrl(avatarUrl.substring(SystemConfigs.PIC_URL_PERFIX.length(), avatarUrl.length()));
				}
			}
			if(newBirthDay != null){
				userBasicInfo.setBirthDay(newBirthDay);
			}
			int cc = iEduUserService.updateUserBasicInfo(userBasicInfo);
			if(cc > 0)
			{
				cc=0;
			}
			json.put("status", cc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}

	// 发送验证码，根据类型进行相应处理
	@RequestMapping(value = "/{mobileType}/msendBindMobileVerifyCode")
	@ResponseBody
	public String sendBindMobileVerifyCode(
			@PathVariable(value = "mobileType") int mobileType,
			@RequestParam long uid, @RequestParam String telnum,
			@RequestParam int nType) {
		JSONObject json = new JSONObject();
		long loginCode = 0;
		try {

			loginCode = iEduUserService
					.sendMobileVerifyCode(telnum, nType, uid);
			json.put("status", 0);
			json.put("verifycode", loginCode);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", 1);
		}

		return json.toString();
	}
	
	@RequestMapping(value = "/{mobileType}/mverifyBindMobile")
	@ResponseBody
	public String verifyBindMobile(@PathVariable(value = "mobileType") int mobileType,@RequestParam long uid,@RequestParam long mobileVerifySerialid,
			@RequestParam String verifyCode,@RequestParam String telNum) {
		JSONObject json=new JSONObject();
		int loginCode = 0;
		try {
			 loginCode = iEduUserService.verifyMobile(mobileVerifySerialid, verifyCode);
			 System.out.println(loginCode+"=====");
			 int cc = 0;
			 if(loginCode > 0){
				 UserBasicInfo userBasicInfo = iEduUserService.getUserBasicInfo(uid);
				 userBasicInfo.setMobile(telNum);
				 cc = iEduUserService.updateUserBasicInfo(userBasicInfo);
			 }
			 else {
				cc = -3;
			}
			 System.out.println(loginCode+"==="+cc);
			 json.put("status", 0);
			 json.put("verifycode", loginCode);
			 json.put("updatecode", cc);
			 
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobilelistCourseByDay ",produces="application/json;charset=UTF-8")
	public String mobilelistCourseByDay(@PathVariable(value = "mobileType") int mobileType,@RequestParam String day,
			@RequestParam long uid, @RequestParam int nUserType,HttpServletResponse response)
	{
		JSONObject json=new JSONObject();

		try {
			json = iDetailPageService.listCourseByDayToClient(day,uid, nUserType);
			
			json.put("status", 0);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", 1);
		}

		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobilemessageAll", produces = "application/json;charset=UTF-8")
	public String mobilemessageAll(@PathVariable(value = "mobileType") int mobileType, @RequestParam long uid,
			@RequestParam int type, @RequestParam int notread, 
			@RequestParam int start, @RequestParam int count, HttpSession session, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
		try {
			List<MessageEx> mes = null;
			mes = iEduUserService.listMessgeByReceiverUid(uid,start, count, type, notread);
			
			List<Message> list = new ArrayList<Message>();
			for (MessageEx messageEx : mes) {
				
				Message Mess = new Message();
				//查看消息详情，重新调用一新接口。因此消息列表时不再传回消息内容
				//Mess.setContent(messageEx.getContent());
				Mess.setCreateTime(DateUtil.seconds2String(messageEx.getCreateTime()));
				
				Mess.setTitle(messageEx.getTitle());
				long teacheruid = messageEx.getPublishUid();
				UserBasicInfo teacherBasicInfo = iEduUserService
						.getUserBasicInfo(teacheruid);
				if(teacherBasicInfo != null)
				{
					Mess.setUserImg(SystemConfigs.PIC_URL_PERFIX + teacherBasicInfo.getAvatarUrl());
					Mess.setSex(teacherBasicInfo.getSex());
					Mess.setUserType(teacherBasicInfo.getUserType());
				}
				Mess.setReadFlag(messageEx.getReadFlag());
				Mess.setReadTimeString(DateUtil.seconds2String(messageEx.getReadTime()));
				Mess.setStrPublicName(messageEx.getStrPublicName()+"老师");
				int msgType = messageEx.getMessageType();
				if(msgType == MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE || msgType == MessageTypeConstants.PUBLIC_SYSTEM_MESSAGE)
				{
					//Mess.setMsgName(MessageTypeConstants.SYSTEM_MEEAGE_STR);
					if(msgType==60)
					{
					Mess.setStrPublicName(messageEx.getStrSchool());
					Mess.setMsgName("学校公告");
					}
					else{
						Mess.setMsgName("系统消息");
						Mess.setStrPublicName("class8");
					}
				}
				else if(msgType == MessageTypeConstants.PRIVATE_MESSAGE){
					Mess.setMsgName("《"+MessageTypeConstants.PRIVATE_MSG_STR+"》");
					//Mess.setStrPublicName("1");
				}
				else {
					Mess.setMsgName("《"+messageEx.getStrSchool()+"》");
					//Mess.setStrPublicName("2");
				}
				Mess.setMsgId(messageEx.getMessageid());
				Mess.setMsgType(msgType);
				Mess.setSenderid(messageEx.getPublishUid());

				list.add(Mess);
			}
			byte[] cc = JSON.toJSONBytes(list, feature);
			json.put("list", new String(cc, "utf-8"));
			json.put("status", 0);

		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", 1);

		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobileshowMessagePage", produces = "application/json;charset=UTF-8")
	public String showMessagePage(@PathVariable(value = "mobileType") int mobileType, @RequestParam int messageid,@RequestParam long uid,HttpSession session,
			HttpServletRequest req, ModelMap model ) {
		iEduUserService.markMessageAlreadyRead(messageid, uid);
		JSONObject json = new JSONObject();
		json.put("status", 0);
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobileDeleteMessage", produces = "application/json;charset=UTF-8")
	public String deleteMessage(@PathVariable(value = "mobileType") int mobileType, @RequestParam int messageid,@RequestParam long uid,HttpSession session,
			HttpServletRequest req, ModelMap model ) {
		iEduUserService.deleteMessageFromInbox(messageid, uid);
		JSONObject json = new JSONObject();
		json.put("status", 0);
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/setCourseRemind ", produces = "application/json;charset=UTF-8")
	public String setCourseRemind(@PathVariable(value = "mobileType") int mobileType, @RequestParam int remindTime,@RequestParam long uid,
			HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject json = new JSONObject();
		try {
			int cc = iEduCourseService.setCourseRemind(uid, remindTime);
			json.put("status", cc);				
			
		} catch (Exception e) {
			json.put("status", 0);	
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobilelistpersonaledudata ", produces = "application/json;charset=UTF-8")
	public String mobilelistpersonaledudata(@PathVariable(value = "mobileType") int mobileType, @RequestParam long uid,
			HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject json = new JSONObject();
		try {
			UserEduInfo eduInfo = iEduUserService.getUserEduInfo(uid);
			if(eduInfo != null)
			{				
				SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = iEduUserService.getMajorShowInfo(eduInfo.getMajorId(), 0);
				
				if(schoolCollegeMajorShowInfo != null)
				{
					eduInfo.setUniversity(schoolCollegeMajorShowInfo.getSchoolName());
					eduInfo.setCollege(schoolCollegeMajorShowInfo.getCollegeName());
					eduInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());
				}
				json.put("info", eduInfo);
			}
			json.put("status", 0);	
			
		} catch (Exception e) {
			json.put("status", 1);	
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/mobileresetpwd", produces = "application/json;charset=UTF-8")
	public String mobileResetPassword(@PathVariable(value = "mobileType") int mobileType,@RequestParam String strMobile, @RequestParam long mobileVerifySerialid,
			 @RequestParam String verifyCode,  @RequestParam String strNewPwd,	HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject json = new JSONObject();
		
		try {
			 int loginCode = iEduUserService.verifyMobile(mobileVerifySerialid,
					verifyCode);
			 int nResult = 0;
			 System.out.println("mobileResetPassword code " + verifyCode + " sessionid: " + mobileVerifySerialid + "returncode: " + loginCode );
			 if(loginCode > 0)
			 {
				 
				 UserBasicInfo sInfo = iEduUserService.getUserBasicInfoByMobile(strMobile);
				 if(sInfo != null){					 
					 int cc = iEduUserService.changePasswordByOldPassword(sInfo.getUid(),
								sInfo.getPassword(), strNewPwd);
					 System.out.println("mobile reset pwd resutl " + cc);
						//iEduUserService.setUserSafePwdLevel(Integer.parseInt(session.getAttribute("uid").toString()), nLevel);
						if (cc != 1)
							nResult = cc; //更改错误
				 }
				 else {
					 //该手机号未被绑定
					nResult = -4;
				}
					 
			 }
			 else
				 nResult = -3; //验证码错误
			 
			 json.put("status", 0);
			 json.put("updatecode", nResult);
		} catch (Exception e) {
			json.put("status", 1);	
		}
		return json.toString();
	}

	@ResponseBody
	@RequestMapping(value = "/{mobileType}/getCourseFileList", produces = "application/json;charset=UTF-8")
	public String getCourseFileList(@PathVariable(value = "mobileType") int mobileType, @RequestParam long uid,@RequestParam long courseid,
			HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject json = new JSONObject();
		List<Map<String,Object>> files = courseFileService.listDisplayCourseFileByCourseid(courseid);
		json.put("result", files);
		json.put("status", true);
		return json.toString();
	}
	
	//移动端老师主页
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/getTeacherPageInfo", produces = "application/json;charset=UTF-8")
	public String getTeacherPageInfo(@PathVariable(value = "mobileType") int mobileType, @RequestParam long teacherUid,
			HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject json = new JSONObject();
		UserBasicInfo cc = iEduUserService.getUserBasicInfo(teacherUid);
		if(cc==null)
		{
			json.put("status",-1);
			return json.toString();
		}
		cc.setPassword("");
		json.put("baseinfo", cc);
		UserEduInfo userEduInfo = iEduUserService.getUserEduInfo(teacherUid);
		if (userEduInfo != null) {
			SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = iEduUserService
					.getMajorShowInfo(userEduInfo.getMajorId(), 0);

			if (schoolCollegeMajorShowInfo != null) {
				userEduInfo.setUniversity(schoolCollegeMajorShowInfo
						.getC8schoolName());
				userEduInfo.setCollege(schoolCollegeMajorShowInfo
						.getCollegeName());
				userEduInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());
			}
			json.put("eduinfo", userEduInfo);
		}				
		
		//老师课程的总数
		int countCourse = courseService.countOfTeacherCourse(teacherUid);
		json.put("coursecount", countCourse);
		//老师学生的总数
		int countStudent = userService.countOfTeacherStudent(teacherUid);
		json.put("coursestudent", countStudent);
		json.put("status",0);
		return json.toString();
	}
	
	//移动端老师主页里的最新课程
	@ResponseBody
	@RequestMapping(value = "/{mobileType}/getLastestCourses", produces = "application/json;charset=UTF-8")
	public String getTeacherLastestCourse(@PathVariable(value = "mobileType") int mobileType, @RequestParam long teacherUid,
			@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="6") int pageSize,
			HttpSession session, HttpServletRequest req, ModelMap model ) {
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listTeacherCoursesPage(teacherUid,pageNum,pageSize).getList();
		jsonObject.put("lastest", JSONUtil.listToJson(courses, DateUtil.YYYY_MM_DD_HH_MM));
		List<CourseDto> hot = courseService.listTeacherHotCourses(teacherUid,pageNum,pageSize).getList();
		jsonObject.put("hot", JSONUtil.listToJson(hot, DateUtil.YYYY_MM_DD_HH_MM));
		jsonObject.put("status", 0);
		return jsonObject.toString();
	}
	//移动端老师主页里的所有课程
	@RequestMapping(value="/{mobileType}/getAllCourses", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getAllCourses(@RequestParam("teacherUid") Long teacherUid,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="10") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<CourseDto> pageInfo = courseService.listTeacherCoursesPage(teacherUid,pageNum,pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", pageInfo);
		return jsonObject.toString();
	}
	
	//学生主页，获取正在学习的课程
	@RequestMapping(value="/{mobileType}/getLearningCourses")
	@ResponseBody
	public String getLearningCourses(@RequestParam("studentUid") long studentUid,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listStudentLearningCourses(studentUid,pageNum,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	} 
	
	//学生主页，获取已经学习完的课程
	@RequestMapping(value="/{mobileType}/getLearnedCourses")
	@ResponseBody
	public String getLearnedCourses(@RequestParam("studentUid") long studentUid,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listStudentLearnedCourses(studentUid,pageNum,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	} 
	
	/**
	 * 上传用户图像
	 * @param request
	 * @param dataUrl 图片base64编码
	 * @return 0：上传成功，返回url -1：上传失败 -100：服务器端错误
	 */
	@RequestMapping(value="/{mobileType}/upload/avatar",method=RequestMethod.POST)
	@ResponseBody
	public String uploadAvatar(HttpServletRequest request,@RequestParam long uid,@RequestParam String dataUrl){
		JSONObject json = new JSONObject();
		File tempFile = null;
		try {
			String realPath = request.getSession().getServletContext().getRealPath("/upload");
			dataUrl = dataUrl.replace("data:image/png;base64,", "");
	        tempFile = File.createTempFile(UUID.randomUUID().toString(), ".jpg", new File(realPath));
        
	        BASE64Decoder decoder = new BASE64Decoder();
			byte[] b = decoder.decodeBuffer(dataUrl);
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
			
			String uploadResult = FileUploadUtil.upfile(SystemConfigs.USER_AVATAR, params, files);
			JSONObject jsonUploadResult = JSONObject.fromObject(uploadResult);
			
			if(Integer.valueOf(jsonUploadResult.get("code").toString()) == HttpStatus.SC_OK){
				json.put("url", SystemConfigs.PIC_URL_PERFIX + jsonUploadResult.get("url"));
				json.put("status", 0);
			} 
			return json.toString();
		} catch (Exception e) {
			json.put("status", -100);
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		
		json.put("status", -1);
		return json.toString();
	}
	
	/**
	 * 学校主页基本信息
	 * @param uid 用户id
	 * @return -1：用户id对应的用户不存在 -2：用户id没有找到对应的学校 
	 */
	@RequestMapping(value="/{mobileType}/getSchoolInfo",produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSchoolInfoByUid(@RequestParam("uid") long uid){
		JSONObject jsonObject = new JSONObject();
		try {
			AuthSchoolInfo authSchoolInfo = this.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo == null){
				UserBasicInfo userBasicInfo = iEduUserService.getUserBasicInfo(uid);
				if(userBasicInfo == null){
					jsonObject.put("status", -1);
					return jsonObject.toString();
				} else {
					if(userBasicInfo.getRecommendUid() != 0){
						authSchoolInfo = this.getAuthSchoolInfoByUid(userBasicInfo.getRecommendUid());
					}
					if(authSchoolInfo == null){
						jsonObject.put("status", -2);
						return jsonObject.toString();
					}
				}
			} 
			long schoolId = authSchoolInfo.getId();
			authSchoolInfo.setLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
			jsonObject.put("schoolId", schoolId);
			jsonObject.put("schoolInfo", authSchoolInfo);
			
			List<SchoolBanner> schoolBanners = schoolBannerService.listSchoolBanner(schoolId);
			jsonObject.put("schoolBanners", schoolBanners);
					
			UserBasicInfo principalBasicInfo = iEduUserService.getUserBasicInfo(authSchoolInfo.getCreaterUid());
			jsonObject.put("principalBasicInfo", principalBasicInfo);
					
			int countCourse = courseService.countOfSchoolCourse(authSchoolInfo.getId());
			jsonObject.put("countCourse",countCourse);
					
			int countTeacher = userService.countOfSchoolTeacher(schoolId);
			jsonObject.put("countTeacher", countTeacher);
			
			int countStudent = userService.countOfSchoolStudentByPrincipalId(principalBasicInfo.getUid());
			jsonObject.put("countStudent", countStudent);
			
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 学校公告
	 * @param schoolId 学校id
	 * @param page 页码，默认为1
	 * @param rows 条目，默认为6
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/school/messages",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getSchoolMessagesByPage(@RequestParam("schoolId") long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			int messageType = MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE;
			int publishFlag = PublishFlagConstants.PUBLISHED;
			PageInfo<MessageDto> pageInfo = messageService.listSchoolMessageByPublishFlagPage(schoolId, messageType,publishFlag, page, rows);
			jsonObject.put("status", 0);
			jsonObject.put("result", pageInfo);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 学校课程
	 * @param schoolId 学校id
	 * @param sort 排序规则，1：热门 ，为空按照默认规则
	 * @param page 页码，默认为1
	 * @param rows 条目，默认为6
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/school/courses",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getSchoolCoursesByPage(@RequestParam("schoolId") long schoolId, @RequestParam(required=false) Integer sort,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			PageInfo<CourseDto> courses;
			if(Integer.valueOf(1).equals(sort)){
				courses = courseService.listSchoolHotCoursesPage(schoolId,page,rows);
			} else {
				courses = courseService.listSchoolCoursesPage(schoolId,page,rows);
			}
			jsonObject.put("status", 0);
			jsonObject.put("result", courses);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 学校老师
	 * @param schoolId 学校id
	 * @param sort 排序规则，1：明星 ，为空按照默认规则
	 * @param page 页码，默认为1
	 * @param rows 条目，默认为6
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/school/teachers",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getSchoolTeachersByPage(@RequestParam("schoolId") long schoolId,@RequestParam(required=false) Integer sort,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			PageInfo<TeacherDto> teachers;
			if(Integer.valueOf(1).equals(sort)){
				teachers = userService.listSchoolStarTeachersPage(schoolId,page,rows);
			} else {
				teachers = userService.listSchoolTeachersPage(schoolId,page,rows);
			}
			jsonObject.put("status", 0);
			jsonObject.put("result", teachers);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 课程目录
	 * @param courseid 课程id
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/course/classs",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getCourseClasss(@RequestParam("courseid") long courseid){
		JSONObject jsonObject = new JSONObject();
		try {
			List<CourseClass> courseClasss = courseClassService.listCourseClassByCourseid(courseid);
			jsonObject.put("result", JSONUtil.listToJson(courseClasss, DateUtil.YYYY_MM_DD_HH_MM_SS));
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 课程评价
	 * @param courseid 课程id
	 * @param page 页码，默认为1
	 * @param rows 条目，默认为10
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/course/comments",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getCourseCommentsByPage(@RequestParam("courseid") long courseid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int rows){
		JSONObject jsonObejct = new JSONObject();
		try {
			PageInfo<CourseCommentDto> pageInfo = courseCommentService.listCourseCommentPage(courseid,page,rows);
			jsonObejct.put("status", 0);
			jsonObejct.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM_SS));
		} catch (Exception e) {
			jsonObejct.put("status", -100);
		}
		return jsonObejct.toString();
	}
	
	/**
	 * 根据用户id查找认证学校信息
	 * @param uid
	 * @return
	 */
	private AuthSchoolInfo getAuthSchoolInfoByUid(long uid){
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		if(authSchoolInfo != null && authSchoolInfo.getStatus() == AuthSchoolStatusConstant.pass){
			return authSchoolInfo;
		} else {
			long schoolId = 0;
			List<SchoolsTeacher> schoolsTeachers =  iEduUserService.listmyAllSchools(uid);
			if(schoolsTeachers != null){
				for (SchoolsTeacher schoolsTeacher : schoolsTeachers) {
					if(schoolsTeacher.getStatus() == SchoolMembersStatueConstant.pass){
						schoolId = schoolsTeacher.getSchoolId();
						break;
					}
				}
			}
			if(schoolId != 0){
				return iEduUserService.getSchoolInfoById(schoolId);
			}
		}
		return null;
	}
	
	/**
	 * 推荐课程
	 */
	@RequestMapping(value="/{mobileType}/getRecommendCourses",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getRecommendCourses(@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="8") int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			PageInfo<CourseDto> courses = courseService.getRecommendCourses(page,rows);
			jsonObject.put("status", 0);
			jsonObject.put("result", JSONUtil.objectToJson(courses, "MM-dd HH:mm"));
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 新荐老师
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/getNewRecommendTeachers",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getNewRecommendTeachers(@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="8") int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			List<AuthTeacherInfo> list = iEduUserService.getNewTeachers(rows);			
			List<TeacherShowInfo> toShowList = new ArrayList<TeacherShowInfo>();
			for (AuthTeacherInfo authTeacherInfo : list) {
				UserBasicInfo userBasicInfo = iEduUserService.getUserBasicInfo(authTeacherInfo.getUid());
				TeacherShowInfo teacherShowInfo = new TeacherShowInfo();
				teacherShowInfo.setUserid(authTeacherInfo.getUid());
				teacherShowInfo.setSex(userBasicInfo.getSex());
				teacherShowInfo.setRealName(userBasicInfo.getRealName());
				teacherShowInfo.setNickName(userBasicInfo.getNickName());
				teacherShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
				teacherShowInfo.setLargeHeadimge(SystemConfigs.PIC_URL_PERFIX +authTeacherInfo.getHeadImage());
				teacherShowInfo.setSignature(userBasicInfo.getSignature());
				teacherShowInfo.setDescription(userBasicInfo.getDescription());
				teacherShowInfo.setTeachYears(userBasicInfo.getTeachYears());
				teacherShowInfo.setPriceMin(authTeacherInfo.getPriceMin());
				toShowList.add(teacherShowInfo);
			}
			jsonObject.put("teachers", toShowList);
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 关键字查询
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/getCoursesByCondition",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getCoursesByCondition(String keyword,Double minPrice,Double maxPrice,String startTime,String endTime,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="10")int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseQueryExample example = new CourseQueryExample();
			if(keyword != null && keyword  != ""){
				keyword = URLDecoder.decode(keyword,"utf-8");
			}
			example.setKeyword(keyword);
			example.setMinPrice(minPrice);
			example.setMaxPrice(maxPrice);
			example.setStartTime(startTime);
			example.setEndTime(endTime);
			PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,page,rows);
			jsonObject.put("status", 0);
			jsonObject.put("courses", JSONUtil.objectToJson(courses, "MM-dd HH:mm"));
		} catch (UnsupportedEncodingException e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 订购的课程
	 */
	@RequestMapping(value="/{mobileType}/getMyOrderedCourses",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getMyOrderedCourses(@RequestParam("uid")long uid,@RequestParam(required=false) Integer status,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="10")int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseQueryExample example = new CourseQueryExample();
			example.setStudentUid(uid);
			if(Integer.valueOf(0).equals(status)){							//全部(只包括订单状态为付款后的所有状态的课程，只报名或取消的课程不属于我的课程)
				example.getSignupStatus().add(OrderStatusConstant.hadpay);
				example.getSignupStatus().add(OrderStatusConstant.paytoteacher);
				example.getSignupStatus().add(OrderStatusConstant.autocancel);
				example.getSignupStatus().add(OrderStatusConstant.refunding);
				example.getSignupStatus().add(OrderStatusConstant.refunded);
			} else if(Integer.valueOf(1).equals(status)){					//已完成(现在只查询课程的所有课节已经完成)
				example.getCourseStatus().add(CourseStateConstants.COURSE_FINISH);
			} else if(Integer.valueOf(2).equals(status)){					//已取消(查询课程付款后被取消的课程)
				example.getSignupStatus().add(OrderStatusConstant.autocancel);
				example.getSignupStatus().add(OrderStatusConstant.refunding);
				example.getSignupStatus().add(OrderStatusConstant.refunded);
			} else {
				jsonObject.put("message", "参数错误！");
				return jsonObject.toString();
			}
			
			PageInfo<Map<String,Object>> pageInfo = courseService.listStudentCourseDetailPage(example,page,rows);
			jsonObject.put("result", JSONUtil.objectToJson(pageInfo, "MM-dd HH:mm"));
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	} 
	
	/**
	 * 创建的课程
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/getMyCreatedCourses",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getMyCreatedCourses(@RequestParam("uid") long uid,@RequestParam(required=false)Integer status,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="10")int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseQueryExample example = new CourseQueryExample();
			example.setTeacherUid(uid);
			if(status == Integer.valueOf(1)){					//已完成(查询所有课节都完成的课程)
				example.getCourseStatus().add(CourseStateConstants.COURSE_FINISH);
			} else if(status == Integer.valueOf(2)){			//已取消(查询课程状态为取消的课程：自动取消)
				example.getCourseStatus().add(CourseStateConstants.COURSE_CANCEL_REFUND);
			} 
			PageInfo<Map<String,Object>> pageInfo = courseService.listTeacherCourseDetailPage(example, page, rows);
			jsonObject.put("result", JSONUtil.objectToJson(pageInfo, "MM-dd HH:mm"));
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 查询老师
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/getTeachersByCondition",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getTeachersByCondition(@RequestParam(required=false)String teacherName,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="10")int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			teacherName = teacherName == null ? null : URLDecoder.decode(teacherName, "UTF-8");
			PageInfo<TeacherDto> teachers = userService.listTeachersPageByTeacherName(teacherName,page,rows);
			jsonObject.put("result", JSONUtil.objectToJson(teachers, "MM-dd HH:mm"));
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 立即报名
	 * @param uid 用户id
	 * @param courseid 课程id
	 * @param classid 课节id
	 * @return 
	 * 	0:可以报名
	 * 	1:报名成功
	 * -1:学校已经把学生加入课程，不需要报名
	 * -2:学生已经报名了，不用重复报，或者已经付款了
	 * -3:课程id对应的课程不存在
	 * -4:报名人数已满
	 * -100:服务器端错误
	 */
	@RequestMapping(value="/{mobileType}/signup",produces="application/json;charset=utf-8")
	@ResponseBody
	public String signup(@RequestParam long uid,@RequestParam long courseid,@RequestParam long classid){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseStudent courseStudent = iEduCourseService.getCourseStudentByIds(uid, courseid, classid);
			if(courseStudent != null){
				if(courseStudent.getSignupType() == CourseStudentSignupType.SCHOOL )
				{
					jsonObject.put("status", -1); //学校已经把学生加入课程，不需要再报名
					return jsonObject.toString();
				}else if(courseStudent.getSignupStatus() != OrderStatusConstant.cancel && 
						courseStudent.getSignupStatus() != OrderStatusConstant.autocancel)
				{
					jsonObject.put("status", -2); //学生已经报名了，不用重复报，或者已经付款了
					return jsonObject.toString();
				}
			}
			CourseBasicInfo course = iEduCourseService.getCourseBasicInfo(courseid);
			if(null == course) {
				jsonObject.put("status", -3); //课程id对应的课程不存在
				return jsonObject.toString();
			}
			
			int nHadSignup = iEduCourseService.countCourseStudentStatus(courseid, classid, OrderStatusConstant.hadpay);
			if(course.getnMaxStudents() <= nHadSignup){
				jsonObject.put("status", -4);//报名人数已满
				return jsonObject.toString();
			}
			
			if(Float.valueOf(0.0F).equals(course.getPriceTotal())){
				//直接报名成功
				CourseStudent st = new CourseStudent();
				st.setCourseid(courseid);
				st.setClassid(0L);
				st.setStudentUid(uid);
				st.setSignupTime(new Timestamp(new Date().getTime()));
				st.setSignupType(CourseStudentSignupType.PERSONAL);
				st.setSignupStatus(OrderStatusConstant.hadpay);
				iEduCourseService.addCourseStudent(st);
				
				jsonObject.put("status", 1);
			} else {
				jsonObject.put("status", 0);
			}
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}	
		return jsonObject.toString();
	}
	
	
	
	
	/**
	 * 查询课程的基本信息
	 * @param courseid
	 * @return
	 */
	@RequestMapping(value="/{mobileType}/getCourse",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getCourse(@RequestParam long courseid){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseClass course = courseService.getCourseClassByCourseid(courseid);
			jsonObject.put("result", JSONUtil.objectToJson(course, DateUtil.YYYY_MM_DD_HH_MM));
			jsonObject.put("status", 0);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 提交订单
	 * @param uid
	 * @param courseid
	 * @param classid
	 * @return 
	 * 	status:
	 * 		0:成功
	 * 	   -1:学校已经把学生加入课程，不需要报名
	 *     -2:学生已经报名了，不用重复报，或者已经付款了
	 *     -3:课程id对应的课程不存在
	 *     -4:报名人数已满
	 *     -5:订单创建失败
	 *   -100:服务器端错误
	 *  orderid:订单id，只有status为0时返回
	 *  course:课程基本信息，只有status为0时返回
	 */
	@RequestMapping(value="/{mobileType}/commitOrder",produces="application/json;charset=utf-8")
	@ResponseBody
	public String commitOrder(HttpServletRequest request,@RequestParam long uid,@RequestParam long courseid,@RequestParam long classid){
		JSONObject jsonObject = new JSONObject();
		try {
			CourseStudent courseStudent = iEduCourseService.getCourseStudentByIds(uid, courseid, classid);
			if(courseStudent != null){
				if(courseStudent.getSignupType() == CourseStudentSignupType.SCHOOL )
				{
					jsonObject.put("status", -1); //学校已经把学生加入课程，不需要再报名
					return jsonObject.toString();
				}else if(courseStudent.getSignupStatus() != OrderStatusConstant.cancel && 
						courseStudent.getSignupStatus() != OrderStatusConstant.autocancel)
				{
					jsonObject.put("status", -2); //学生已经报名了，不用重复报，或者已经付款了
					return jsonObject.toString();
				}
			}
			CourseBasicInfo course = iEduCourseService.getCourseBasicInfo(courseid);
			if(null == course) {
				jsonObject.put("status", -3); //课程id对应的课程不存在
				return jsonObject.toString();
			}
			
			int nHadSignup = iEduCourseService.countCourseStudentStatus(courseid, classid, OrderStatusConstant.hadpay);
			if(course.getnMaxStudents() <= nHadSignup){
				jsonObject.put("status", -4);//报名人数已满
				return jsonObject.toString();
			}
			
			UserOrder userOrder = new UserOrder();
			userOrder.setUserid(uid);
			userOrder.setTeacherid(course.getTeacherUid());
			userOrder.setCourseId(courseid);
			userOrder.setClassId(0);//课节id必须为0
			int nPrice = (int)(course.getPriceTotal() * 100);
			userOrder.setCoursePrice(nPrice);
			//获取优惠价格等，如果有优惠券之类的，学生实际付款和老师实际到账的金额会不一致，这是正常的
			userOrder.setRealPrice(nPrice);
			userOrder.setTeacherIncomePrice(nPrice);
			long nowMi = System.currentTimeMillis();
			userOrder.setCreateDate(new Timestamp(nowMi));
			userOrder.setLastPayDate(new Timestamp(nowMi + 1800000));//30分钟的付款时间，超过自动取消
			userOrder.setStatus(OrderStatusConstant.topay);
			userOrder = iEduCourseService.StudentSignupCourse(userOrder);
			if( userOrder != null){
				jsonObject.put("status", 0);
				jsonObject.put("orderid", userOrder.getOrderId());
				jsonObject.put("course", course);
			} else {
				jsonObject.put("status", -5);//订单创建失败
				return jsonObject.toString();
			}
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 支付订单
	 * @param uid
	 * @param orderid
	 * @return 0:成功返回 	-1:订单不存在	-100:服务器端错误
	 */
	@RequestMapping(value="/{mobileType}/payOrder",produces="application/json;charset=utf-8")
	@ResponseBody
	public String payOrder(HttpServletRequest request,@RequestParam long uid,@RequestParam String orderid){
		JSONObject jsonObject = new JSONObject();
		try {
			UserOrder userOrder = iEduCourseService.getPayOrderByUidAndOrderid(uid,orderid);
			if(userOrder == null){
				jsonObject.put("status", -1);
				return jsonObject.toString();
			}
			int fRmbs = userOrder.getRealPrice();	
			//商品描述
			String body = "账户支付";
			//ip地址
			String spbill_create_ip = CommonUtil.getIpAddr(request);
			//交易类型
			String trade_type = WxTradeType.APP;
			//商品id
			String product_id = String.valueOf(userOrder.getCourseId());
			//支付类型
			int payType = ChargeorderformTypeConstant.PAY;
			//赠送金额
			int nGifeS = 0;
			UnifiedOrderReqData reqData = new UnifiedOrderReqData(Configure.APP_APPID,Configure.APP_MCH_ID,body,userOrder.getOrderId(),fRmbs,spbill_create_ip,trade_type,product_id);
			UnifiedOrderResData resData = iEduPayService.unifiedOrder(reqData,uid,payType,fRmbs,nGifeS);
			
			//生成签名信息
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("appid", Configure.APP_APPID);
			params.put("partnerid", Configure.APP_MCH_ID);
			params.put("prepayid",resData.getPrepay_id());
			params.put("noncestr", CommonUtil.randomStr(32));
			params.put("timestamp", new Date().getTime()/1000);
			params.put("package", "Sign=WXPay");
			params.put("sign", Signature.getSign(params));
			jsonObject.put("status", 0);
			jsonObject.put("params", params);
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	/**
	 * 查询订单的支付结果
	 * @param uid 用户ID
	 * @param orderid 订单ID
	 * @return -1:订单不存在
	 */
	@RequestMapping(value="/getOrderPayResult",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getOrderPayResult(@RequestParam long uid,@RequestParam String orderid){
		JSONObject jsonObject = new JSONObject();
		try {
			UserOrder order = iEduCourseService.getPayOrderByUidAndOrderid(uid,orderid);
			if(order == null){
				jsonObject.put("status", -1);
				return jsonObject.toString();
			}
			jsonObject.put("status", 0);
			jsonObject.put("order", JSONUtil.objectToJson(order, DateUtil.YYYY_MM_DD_HH_MM));
		} catch (Exception e) {
			jsonObject.put("status", -100);
		}
		return jsonObject.toString();
	}
	
	public static void main(String[] args) {
		try {
			String str = "中文";
			String e = URLEncoder.encode(str,"UTF-8");
			System.out.println(e);
			String d = URLDecoder.decode(e, "UTF-8");
			System.out.println(d);
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}

