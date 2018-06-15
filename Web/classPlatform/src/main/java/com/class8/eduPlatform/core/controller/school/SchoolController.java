package com.class8.eduPlatform.core.controller.school;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseCategory;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseOnlineTypeConstants;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.CourseStudentSignupType;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.constants.RecordStateConstants;
import com.class8.course.constants.RefundCourseRateConstants;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.excel.ReadExcel;
import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.common.util.ValidatorUtil;
import com.class8.eduPlatform.core.bean.SchoolStudentShowInfo;
import com.class8.eduPlatform.core.bean.SchoolTeacherShowInfo;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.CourseType;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.dto.CourseClassDto;
import com.class8.eduPlatform.core.dto.CreateCourseDto;
import com.class8.eduPlatform.core.dto.MessageDto;
import com.class8.eduPlatform.core.service.ICourseCategoryService;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IMessageService;
import com.class8.eduPlatform.core.service.ISchoolBannerService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.core.validator.CreateCourseDtoValidator;
import com.class8.eduPlatform.core.validator.MessageValidator;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolApplyInfo;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.Message;
import com.class8.user.bean.SchoolBanner;
import com.class8.user.bean.SchoolCollegeMajorShowInfo;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherQueryExample;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.BanTypeConstants;
import com.class8.user.constants.MessageTypeConstants;
import com.class8.user.constants.PublishFlagConstants;
import com.class8.user.constants.SchoolMemberRightConstant;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.SexConstants;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/school")
public class SchoolController extends BaseController {
	
	private static final Logger logger = Logger.getLogger(SchoolController.class);
	
	public static final String INDEX = "/school/schoolHomePage";
	public static final String TEACHER = "/school/teacherManage";
	public static final String STUDENT = "/school/studentManage";
	public static final String COURSE = "/course/schoolCourse";
	public static final String DATAPACK = "";
	public static final String ORDER = "";
	public static final String COUPON = "";
	public static final String STATISTICAL = "";
	
	public static final String BASICINFO = "/school/schoolHomeManage";
	public static final String COURSE_CREATE = "/course/creatSchoolCourse";
	public static final String COURSE_UPDATE = "/course/updateSchoolCourse";
	public static final String CREATE_SCHOOL = "/school/creatSchoolApply";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private ICourseCategoryService courseCategoryService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IMessageService messageService;
	
	@Autowired
	private ISchoolBannerService schoolBannerService;
	
	@Autowired
	private IEduPayService iEduPayService;
	
	@RequestMapping(value="/index",method=RequestMethod.GET)
	public void index(Model model){
		
	}
	
	@RequestMapping(value="/center",method=RequestMethod.GET)
	public String center(Model model){
		//判断是否已经认证学校
		long uid = getShiroUser().getUid();
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		if(null == authSchoolInfo){
			return CREATE_SCHOOL;
		}
		long schoolId = authSchoolInfo.getId();
		authSchoolInfo.setLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		
		//获取学校banner
		List<SchoolBanner> schoolBanners = schoolBannerService.listSchoolBanner(schoolId);
		model.addAttribute("schoolBanners", schoolBanners);
		
		//校长基本信息
		UserBasicInfo principalBasicInfo = eduUserService.getUserBasicInfo(authSchoolInfo.getCreaterUid());
		model.addAttribute("principalBasicInfo", principalBasicInfo);
		
		//学校总课程数
		int countCourse = courseService.countOfSchoolCourse(authSchoolInfo.getId());
		model.addAttribute("countCourse",countCourse);
		
		//学校学生总数改为查询校内学生总数
		int countStudent = userService.countOfSchoolStudentByPrincipalId(principalBasicInfo.getUid());
		model.addAttribute("countStudent", countStudent);
		
		//学校老师总数
		int countTeacher = userService.countOfSchoolTeacher(schoolId);
		model.addAttribute("countTeacher", countTeacher);
		
		return INDEX;
	}
	
	@RequestMapping(value="/teacher",method=RequestMethod.GET)
	public String teacherPage(){
		return TEACHER;
	}
	
	@RequestMapping(value="/student",method=RequestMethod.GET)
	public String studentPage(){
		return STUDENT;
	}
	
	@RequestMapping(value="/course",method=RequestMethod.GET)
	public String coursePage(){
		return COURSE;
	}
	
	@RequestMapping(value="/datapack",method=RequestMethod.GET)
	public String datapackPage(){
		return DATAPACK;
	}
	
	@RequestMapping(value="/order",method=RequestMethod.GET)
	public String orderPage(){
		return ORDER;
	}
	
	@RequestMapping(value="/coupon",method=RequestMethod.GET)
	public String couponPage(){
		return COUPON;
	}
	
	@RequestMapping(value="/statistical",method=RequestMethod.GET)
	public String statisticalPage(){
		return STATISTICAL;
	}
	
	@RequestMapping(value="/course/create",method=RequestMethod.GET)
	public String createCoursePage(){
		return COURSE_CREATE;
	}
	
	@RequestMapping(value="/basicInfo",method=RequestMethod.GET)
	public String basicInfo(Model model){
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(this.getShiroUser().getUid());
		authSchoolInfo.setLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		return BASICINFO;
	}
	
	@RequestMapping("/updateBasicInfo")
	@ResponseBody
	public String updateBasicinfo(@RequestParam(value="file",required=false) MultipartFile file,AuthSchoolInfo school,HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		if(file != null && file.getSize()>0){
			String message = FileUploadUtil.checkUploadFile(file);
			if(message != null){
				jsonObject.put("message", message);
				return jsonObject.toString();
			}
		}
		if(StringUtils.isEmpty(school.getName())){
			jsonObject.put("message", "学校名称不能为空!");
			return jsonObject.toString();
		}
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(this.getShiroUser().getUid());
		if(!StringUtils.isEmpty(school.getSecondDomain())){
			if(!school.getSecondDomain().equalsIgnoreCase(authSchoolInfo.getSecondDomain())){
				AuthSchoolInfo schoolInfo = eduUserService.getSchoolInfoBySecondDomain(school.getSecondDomain());
				if(schoolInfo != null){
					jsonObject.put("message", "该二级域名已经被占用，请更改");
					return jsonObject.toString();
				}
			}				
			authSchoolInfo.setSecondDomain(school.getSecondDomain());
		}
		else {
			authSchoolInfo.setSecondDomain("");
		}
		File tempFile = null;
		try {
			JSONObject jsonUploadResult = null;
			if(file != null && file.getSize()>0){
				String fileName = file.getOriginalFilename();
				String imageExt = StringUtils.substringAfterLast(fileName, ".").toLowerCase();
				tempFile = File.createTempFile(UUID.randomUUID().toString(), "." + imageExt, new File(request.getSession().getServletContext().getRealPath("/upload")));
				FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
				
				Map<String,String> params = new HashMap<String,String>();
				params.put("uid", String.valueOf(this.getShiroUser().getUid()));
				Map<String,File> files = new HashMap<String,File>();
				files.put("file", tempFile);
				String uploadResult = FileUploadUtil.upfile(SystemConfigs.UPLOAD_LOGO_IMAGE, params, files);
				
				jsonUploadResult = JSONObject.fromObject(uploadResult);
			}
			
			if(jsonUploadResult != null){
				int code = Integer.valueOf(jsonUploadResult.get("code").toString());
				if(code == 200){
					
					authSchoolInfo.setLogoUrl(jsonUploadResult.get("url").toString());
					authSchoolInfo.setName(school.getName());
					authSchoolInfo.setMark(school.getMark());
					authSchoolInfo.setIntroduce(school.getIntroduce());
					
					eduUserService.updateAuthSchoolInfo(authSchoolInfo);
					
					//重新设置学校logo地址和学校名称
					Session session = SecurityUtils.getSubject().getSession();
					SessionUser user = (SessionUser) session.getAttribute(CommonConstants.USER);
					user.setSchoolLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
					user.setSchoolName(authSchoolInfo.getName());
					session.setAttribute(CommonConstants.USER, user);
					jsonObject.put("success", true);
				} else {
					jsonObject.put("message", "学校logo上传失败，请稍后重试!");
				}
			} else {				
				authSchoolInfo.setName(school.getName());
				authSchoolInfo.setMark(school.getMark());
				authSchoolInfo.setIntroduce(school.getIntroduce());
				eduUserService.updateAuthSchoolInfo(authSchoolInfo);
				
				//重新设置学校logo地址和学校名称
				Session session = SecurityUtils.getSubject().getSession();
				SessionUser user = (SessionUser) session.getAttribute(CommonConstants.USER);
				user.setSchoolLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
				user.setSchoolName(authSchoolInfo.getName());
				session.setAttribute(CommonConstants.USER, user);
				jsonObject.put("success", true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getBanners")
	@ResponseBody
	public String getBanners(){
		JSONObject jsonObject = new JSONObject();
		long schoolId = userService.getAuthSchoolInfoByUid(this.getShiroUser().getUid()).getId();
		List<SchoolBanner> schoolBanners = eduUserService.listSchoolBannerBySchoolId(schoolId);
		if(schoolBanners != null && schoolBanners.size()>0){
			for (SchoolBanner schoolBanner : schoolBanners) {
				schoolBanner.setBannerUrl(SystemConfigs.PIC_URL_PERFIX + schoolBanner.getBannerUrl());
			}
		}
		jsonObject.put("status", 0);
		jsonObject.put("result", schoolBanners);
		return jsonObject.toString();
	}  
	
	@RequestMapping(value="/updateBanner")
	@ResponseBody
	public String updateBanner(@RequestParam(value="banner",required=false) MultipartFile file,SchoolBanner schoolBanner,HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		if(schoolBanner.getBannerid() == 0){
			jsonObject.put("message", "参数错误!");
			return jsonObject.toString();
		}
		
		if(file != null && file.getSize()>0){
			String message = FileUploadUtil.checkUploadFile(file);
			if(message != null){
				jsonObject.put("message", message);
				return jsonObject.toString();
			}
		}
		File tempFile = null;
		try {
			JSONObject jsonUploadResult = null;
			if(file != null && file.getSize()>0){
				String fileName = file.getOriginalFilename();
				String imageExt = StringUtils.substringAfterLast(fileName, ".").toLowerCase();
				tempFile = File.createTempFile(UUID.randomUUID().toString(), "." + imageExt, new File(request.getSession().getServletContext().getRealPath("/upload")));
				FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
				Map<String,String> params = new HashMap<String,String>();
				params.put("uid", String.valueOf(this.getShiroUser().getUid()));
				Map<String,File> files = new HashMap<String,File>();
				files.put("file", tempFile);
				String uploadResult = FileUploadUtil.upfile(SystemConfigs.UPLOAD_BANNER_IMAGE, params, files);
				jsonUploadResult = JSONObject.fromObject(uploadResult);
			}
			
			if(jsonUploadResult != null && jsonUploadResult.getInt("code") != 200){
				jsonObject.put("message", "图片上传失败，请稍后重试！");
			}
			
			SchoolBanner banner = eduUserService.getSchoolBanner(schoolBanner.getBannerid());
			banner.setDescription(schoolBanner.getDescription());
			banner.setLinkUrl(schoolBanner.getLinkUrl());
			if(jsonUploadResult != null && jsonUploadResult.getInt("code") == 200){
				banner.setBannerUrl(jsonUploadResult.getString("url"));
			}
			eduUserService.insertOrUpdateSchoolBanner(banner);
			jsonObject.put("success", true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		return jsonObject.toString();
	}
	
	
	@RequestMapping(value="/createBanner")
	@ResponseBody
	public String createBanner(@RequestParam("banner") MultipartFile file,SchoolBanner schoolBanner,HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		String message = FileUploadUtil.checkUploadFile(file);
		if(message != null){
			jsonObject.put("message", message);
			return jsonObject.toString();
		}
		
		long schoolId = userService.getAuthSchoolInfoByUid(this.getShiroUser().getUid()).getId();
		//校验已添加banner的个数
		if(schoolBanner.getBannerid() == 0){
			int countOfSchoolBanner = eduUserService.countOfSchoolBanner(schoolId);
			if(countOfSchoolBanner == 5){
				jsonObject.put("message", "学校广告图片数已达到上限！");
				return jsonObject.toString();
			}
		}
		
		File tempFile = null;
		try {
			JSONObject jsonUploadResult = null;
			if(file != null && file.getSize()>0){
				String fileName = file.getOriginalFilename();
				String imageExt = StringUtils.substringAfterLast(fileName, ".").toLowerCase();
				tempFile = File.createTempFile(UUID.randomUUID().toString(), "." + imageExt, new File(request.getSession().getServletContext().getRealPath("/upload")));
				FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
				Map<String,String> params = new HashMap<String,String>();
				params.put("uid", String.valueOf(this.getShiroUser().getUid()));
				Map<String,File> files = new HashMap<String,File>();
				files.put("file", tempFile);
				String uploadResult = FileUploadUtil.upfile(SystemConfigs.UPLOAD_BANNER_IMAGE, params, files);
				jsonUploadResult = JSONObject.fromObject(uploadResult);
			}
			
			if(jsonUploadResult == null || jsonUploadResult.getInt("code") != 200){
				jsonObject.put("message", "图片上传失败，请稍后重试！");
				return jsonObject.toString();
			}
			
			schoolBanner.setSchoolId(schoolId);
			schoolBanner.setBannerUrl(jsonUploadResult.getString("url"));
			eduUserService.insertOrUpdateSchoolBanner(schoolBanner);
			jsonObject.put("success", true);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		return jsonObject.toString();
	}
	
	@RequestMapping("/deleteBanner")
	@ResponseBody
	public String deleteBanner(@RequestParam long bannerid){
		JSONObject jsonObject = new JSONObject();
		eduUserService.deleteSchoolBanner(bannerid);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getAllMessage")
	@ResponseBody
	public String getAllMessage(@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		JSONObject jsonObject = new JSONObject();
		long schoolId = userService.getAuthSchoolInfoByUid(this.getShiroUser().getUid()).getId();
		PageInfo<MessageDto> pageInfo = messageService.listSchoolMessagePage(schoolId, MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE, page, pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", pageInfo);
		return jsonObject.toString();
	}
	
	
	@RequestMapping(value="/createMessage")
	@ResponseBody
	public String createMessage(Message message,Errors errors){
		JSONObject jsonObject = new JSONObject();
		//数据校验
		/*MessageValidator validator = new MessageValidator();
		validator.validate(message, errors);
		if(errors.hasErrors()){
			ValidatorUtil.addValidateError(jsonObject, errors);
			return jsonObject.toString();
		}*/
		
		long uid = this.getShiroUser().getUid();
		long schoolId = userService.getAuthSchoolInfoByUid(uid).getId();
		message.setSchoolId(schoolId);
		message.setMessageType(MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE);
		message.setPublishUid(uid);
		int secondsOfNow = DateUtil.secondsOfNow();
		message.setCreateTime(secondsOfNow);
		message.setPublishFlag(PublishFlagConstants.PUBLISHED);//TODO 测试阶段创建完成后即发布
		message.setPublishTime(secondsOfNow);
		
		messageService.createSchoolMessage(message);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	@RequestMapping("/publishMessage")
	@ResponseBody
	public String publishMessage(@RequestParam long messageid){
		JSONObject jsonObject = new JSONObject();
		messageService.updateMessagePublishFlag(messageid,PublishFlagConstants.PUBLISHED);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	@RequestMapping("/deleteMessage")
	@ResponseBody
	public String deleteMessage(@RequestParam long messageid){
		JSONObject jsonObject = new JSONObject();
		messageService.deleteMessage(messageid);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	@RequestMapping("/setTopMessage")
	@ResponseBody
	public String stickyMessage(@RequestParam long messageid){
		JSONObject jsonObject = new JSONObject();
		messageService.setTopMessage(messageid);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	
	
	@RequestMapping(value="/course/create",method=RequestMethod.POST)
	@ResponseBody
	public String createCourse(@RequestParam int courseType,CreateCourseDto course,@RequestParam String classs,@RequestParam(value="stuIds[]",required=false) List<Long> stuIds,Errors errors){
		JSONObject json = new JSONObject();
		//数据校验
		CreateCourseDtoValidator validator = new CreateCourseDtoValidator();
		validator.validate(course, errors);
		if(errors.hasErrors()){
			ValidatorUtil.addValidateError(json, errors);
			return json.toString();
		}
		
		//课节信息
		List<CourseClassDto> cClasss ;
		if(StringUtils.isEmpty(classs)){
			json.put("message", "至少需要一个课节信息！");
			return json.toString();
		} else {
			try {
				cClasss = JSONArray.toList(JSONArray.fromObject(classs), CourseClassDto.class);
			} catch (Exception e) {
				e.printStackTrace();
				json.put("message", "参数有误，请确认后再提交！");
				return json.toString();
			}
		}
		
		//当前登录用户id
		Long uid = getShiroUser().getUid();
		//查找当前用户认证的学校信息
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		
		CourseBasicInfo courseBasicInfo = new CourseBasicInfo();
		courseBasicInfo.setCourseName(course.getCourseName());
		courseBasicInfo.setItemsType(course.getClassifyId());
		courseBasicInfo.setCoverUrl(course.getCoverUrl());
		courseBasicInfo.setDescription(course.getDescription());
		courseBasicInfo.setTarget(course.getTarget());
		courseBasicInfo.setPeople(course.getPeople());
		courseBasicInfo.setnMinStudents(course.getMinStudents());
		courseBasicInfo.setnMaxStudents(course.getMaxStudents());
		if(course.getSignupStartTime() != null && course.getSignupEndTime() != null){
			courseBasicInfo.setSignupStartTime(new Timestamp(course.getSignupStartTime().getTime()));
			courseBasicInfo.setSignupEndTime(new Timestamp(course.getSignupEndTime().getTime()));
		}
		courseBasicInfo.setPriceTotal(course.getPrice());
		courseBasicInfo.setClassTotal(cClasss.size());
		courseBasicInfo.setCourseStatus(CourseStateConstants.had_created);
		courseBasicInfo.setDisplayType(DisplayTypeConstants.DISPLAY);//TODO 测试阶段课程创建完成默认为发布状态，上线为未发布状态
		courseBasicInfo.setClassHadFinished(0);
		courseBasicInfo.setCreateTime(new Timestamp(new Date().getTime()));
		courseBasicInfo.setCreateUid(uid);
		courseBasicInfo.setSchoolId(authSchoolInfo.getId());
		courseBasicInfo.setRecordStatus(RecordStateConstants.recode);
		
	    if(CourseType.PUBLIC_SCHOOL_COURSE == courseType){//学校公开课
			courseBasicInfo.setOnlineType(CourseOnlineTypeConstants.PUBLIC_SCHOOL_COURSE);
			courseBasicInfo.setTeacherUid(course.getTeacherId());
		} else if(CourseType.INSIDE_SCHOOL_COURSE == courseType){//校内课程
			courseBasicInfo.setOnlineType(CourseOnlineTypeConstants.INSIDE_SCHOOL_COURSE);
			courseBasicInfo.setTeacherUid(course.getTeacherId());
		} else {
			json.put("message", "参数有误!");
			return json.toString();
		}
		try {
			List<CourseClass> courseClasss = new ArrayList<CourseClass>();
			for (int i = 0;i<cClasss.size() ;i++) {
				CourseClass courseClass = new CourseClass();
				courseClass.setClassName(cClasss.get(i).getClassName());
				courseClass.setStartTimePlan(DateUtil.parseToTimestamp(cClasss.get(i).getStartTimePlan(), DateUtil.YYYY_MM_DD_HH_MM_SS));
				courseClass.setEndTimePlan(DateUtil.parseToTimestamp(cClasss.get(i).getEndTimePlan(), DateUtil.YYYY_MM_DD_HH_MM_SS));
				courseClass.setCreateTime(new Timestamp(new Date().getTime()));
				courseClass.setSeqNum(i+1);
				courseClass.setClassState(CourseStateConstants.COURSE_NOT_BEGIN);
				courseClasss.add(courseClass);
			}
			List<CourseStudent> courseStudnets = null;
			if(CourseType.INSIDE_SCHOOL_COURSE == courseType){
				courseStudnets = new ArrayList<CourseStudent>();
				if(stuIds != null && stuIds.size()>0){
					for (Long stuId : stuIds) {
						CourseStudent courseStudent = new CourseStudent();
						courseStudent.setStudentUid(stuId);
						courseStudent.setSignupTime(new Timestamp(new Date().getTime()));
						courseStudent.setSignupType(CourseStudentSignupType.SCHOOL);
						courseStudent.setSignupStatus(OrderStatusConstant.hadpay);
						courseStudnets.add(courseStudent);
						
						//把学生加入老师的校内学生列表中
						TeacherStudent teacherStudent = eduUserService.getTeacherStudent(course.getTeacherId(), stuId);
						if(teacherStudent == null){
							teacherStudent = new TeacherStudent();
							teacherStudent.setUserid(stuId);
							teacherStudent.setTeacherId(course.getTeacherId());
							teacherStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
						}
						if(teacherStudent.getInsideSchool() == 0){
							teacherStudent.setInsideSchool(1);
							eduUserService.updateTeacherStudent(teacherStudent);
						}
					}
				}
			}
			eduCourseService.createCourse(courseBasicInfo, courseClasss, courseStudnets);
			json.put("success", true);
		} catch (Exception e) {
			json.put("message", "内部错误！");
			logger.error("CourseController.create():"+e.getMessage());
		}
		return json.toString();
	}
	
	@RequestMapping(value="/course/update/{courseid}",method=RequestMethod.GET)
	public String updateCoursePage(@PathVariable("courseid") long courseid,HttpServletResponse response,Model model){
		//查询课程的基本信息
		CourseBasicInfo  courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		if(courseBasicInfo != null){
			Long uid = this.getShiroUser().getUid();
			if(courseBasicInfo != null && courseBasicInfo.getCreateUid() == uid){
				//查找课程的课节信息
				List<CourseClass> courseClasss = eduCourseService.listCourseClass(courseBasicInfo.getCourseid());
				//查找课程的老师信息
				UserBasicInfo teacherBasicInfo = eduUserService.getUserBasicInfo(courseBasicInfo.getTeacherUid());
				//查找课程的学生信息(pageSize为0表示不分页)
				List<Long> studentIds =eduCourseService.listCourseStudent(courseBasicInfo.getCourseid(), 0, 0);
				//课程分类信息
				List<CourseCategory> categoryPath = courseCategoryService.listCourseCategoryPath(courseBasicInfo.getItemsType());
				
				model.addAttribute("studentids", StringUtils.join(studentIds, ","));
				model.addAttribute("courseBasicInfo", courseBasicInfo);
				model.addAttribute("courseClasss", courseClasss);
				model.addAttribute("teacherBasicInfo", teacherBasicInfo);
				model.addAttribute("studentIds", studentIds);
				model.addAttribute("categoryPath", categoryPath);
				model.addAttribute("studentCount",studentIds.size());
				return COURSE_UPDATE;
			} 
		}
		throw new ResourceNotFoundException();
	}
	

	@RequestMapping(value="/course/update",method=RequestMethod.POST)
	@ResponseBody
	public String updateCourse(@RequestParam int courseType,CreateCourseDto course,@RequestParam String classs,@RequestParam(value="stuIds[]",required=false) List<Long> stuIds,Errors errors){
		JSONObject json = new JSONObject();
		//数据校验
		CreateCourseDtoValidator validator = new CreateCourseDtoValidator();
		validator.validate(course, errors);
		if(errors.hasErrors()){
			ValidatorUtil.addValidateError(json, errors);
			return json.toString();
		}
		
		//课节信息
		List<CourseClassDto> cClasss ;
		if(StringUtils.isEmpty(classs)){
			json.put("message", "至少需要一个课节信息！");
			return json.toString();
		} else {
			try {
				cClasss = JSONArray.toList(JSONArray.fromObject(classs), CourseClassDto.class);
			} catch (Exception e) {
				e.printStackTrace();
				json.put("message", "参数有误，请确认后再提交！");
				return json.toString();
			}
		}
		
		long courseid = course.getCourseid();
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		if(courseBasicInfo == null){
			json.put("message", "参数错误.");
			return json.toString();
		}
		//修改课程基本信息
		courseBasicInfo.setCourseName(course.getCourseName());	
		courseBasicInfo.setItemsType(course.getClassifyId());
		courseBasicInfo.setCoverUrl(course.getCoverUrl());
		courseBasicInfo.setDescription(course.getDescription());
		courseBasicInfo.setTarget(course.getTarget());
		courseBasicInfo.setPeople(course.getPeople());
		courseBasicInfo.setnMinStudents(course.getMinStudents());
		courseBasicInfo.setnMaxStudents(course.getMaxStudents());
		courseBasicInfo.setTeacherUid(course.getTeacherId());
		
		List<CourseClass> courseClasss = null;
		List<CourseStudent> courseStudents = null;
		if(courseBasicInfo.getDisplayType() == DisplayTypeConstants.NOT_DISPLAY || courseBasicInfo.getCourseStatus() < CourseStateConstants.endsignup){
			//修改课程除基本课程信息之外的其他信息
			if(course.getSignupStartTime() != null && course.getSignupEndTime() != null){
				courseBasicInfo.setSignupStartTime(new Timestamp(course.getSignupStartTime().getTime()));
				courseBasicInfo.setSignupEndTime(new Timestamp(course.getSignupEndTime().getTime()));
			}
			courseBasicInfo.setPriceTotal(course.getPrice());
			courseBasicInfo.setClassTotal(cClasss.size());
			
			//课节信息
			courseClasss = new ArrayList<CourseClass>();
			for (int i = 0;i<cClasss.size() ;i++) {
				CourseClass courseClass = new CourseClass();
				courseClass.setCourseid(courseBasicInfo.getCourseid());
				courseClass.setClassName(cClasss.get(i).getClassName());
				courseClass.setStartTimePlan(DateUtil.parseToTimestamp(cClasss.get(i).getStartTimePlan(), DateUtil.YYYY_MM_DD_HH_MM_SS));
				courseClass.setEndTimePlan(DateUtil.parseToTimestamp(cClasss.get(i).getEndTimePlan(), DateUtil.YYYY_MM_DD_HH_MM_SS));
				courseClass.setCreateTime(new Timestamp(new Date().getTime()));
				courseClass.setSeqNum(i+1);
				courseClass.setClassState(CourseStateConstants.COURSE_NOT_BEGIN);
				courseClasss.add(courseClass);
			}
			
			//学生信息
			if(CourseType.INSIDE_SCHOOL_COURSE == courseBasicInfo.getOnlineType()){
				courseStudents = new ArrayList<CourseStudent>();
				if(stuIds != null && stuIds.size()>0){
					for (Long stuId : stuIds) {
						CourseStudent courseStudent = new CourseStudent();
						courseStudent.setCourseid(courseBasicInfo.getCourseid());
						courseStudent.setStudentUid(stuId);
						courseStudent.setCourseid(courseBasicInfo.getCourseid());
						courseStudent.setSignupTime(new Timestamp(new Date().getTime()));
						courseStudent.setSignupType(CourseStudentSignupType.SCHOOL);
						courseStudent.setSignupStatus(OrderStatusConstant.hadpay);
						courseStudents.add(courseStudent);
					}
				}
			}
		}
		eduCourseService.updateCourse(courseBasicInfo,courseClasss,courseStudents);
		json.put("success", true);
		return json.toString();
	}
	
	/**
	 * 发布课程和取消发布(校长能发布该学校下边的所有课程)
	 * @param courseid
	 * @return
	 */
	@RequestMapping("/course/publishOrUnpublish")
	@ResponseBody
	public String publishOrUnpublishCourse(@RequestParam long courseid){
		JSONObject json = new JSONObject();
		long uid = this.getShiroUser().getUid();
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(courseid);
		if(null == course) {
			json.put("message", "参数错误！");
		} else {
			//产品需求，如果课程报名开始后再点发布，需要修改报名时间晚于此时才能发布
			if(course.getCourseStatus() != CourseStateConstants.had_created ){
				json.put("message", "课程状态不对，无法进行发布，请修改课程信息，再进行发布");
				return json.toString();
			}
			if(DisplayTypeConstants.DISPLAY == course.getDisplayType()){
				course.setDisplayType(DisplayTypeConstants.NOT_DISPLAY);
			} else {
				course.setDisplayType(DisplayTypeConstants.DISPLAY);
			}
			eduCourseService.updataCourseBasicInfo(course);
			json.put("success", true);
		}
		return json.toString();
	}
	
	/**
	 * 学校课程查询
	 * @param courseType
	 * @param courseName
	 * @param creatorName
	 * @param courseStatus
	 * @param startCreateTime
	 * @param endCreateTime
	 * @param page
	 * @param pageSize
	 * @return
	 */
	@RequestMapping(value="/listCourses")
	@ResponseBody
	public String listCourses(@RequestParam int courseType,String courseName, String creatorName,@RequestParam int courseStatus, String startCreateTime,String endCreateTime, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10")int pageSize){
		JSONObject jsonObject = new JSONObject();
		long uid = this.getShiroUser().getUid();
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		long schoolId = authSchoolInfo.getId();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setSchoolId(schoolId);
		example.setOnlineType(courseType);
		example.setCourseName(courseName);
		example.setCreatorName(creatorName);
		if(courseStatus == 1){				//已完成
			example.getCourseStatus().add(CourseStateConstants.COURSE_FINISH);
		} else if(courseStatus == 2){		//已取消
			example.getCourseStatus().add(CourseStateConstants.COURSE_CANCEL_REFUND);
		} else {								//全部
			
		}
		example.setStartCreateTime(startCreateTime);
		example.setEndCreateTime(endCreateTime);
		
		PageInfo<Map<String,Object>> pageInfo = courseService.listSchoolCourseDetailPage(example, page, pageSize);
		jsonObject.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	
	
	@ResponseBody
    @RequestMapping(value="/importTeacher")
    public String importTeacher(@RequestParam MultipartFile[] myFiles,HttpServletRequest request,HttpServletResponse response) throws IOException{
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
		String result = importExcel(myFiles, request, UserTypeConstants.TEACHER, uid);
    	return result;
    }
	
	
	@ResponseBody
    @RequestMapping(value="/importStudent")
    public String importStudent(@RequestParam MultipartFile[] myFiles,HttpServletRequest request,HttpServletResponse response) throws IOException{
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
		String result = importExcel(myFiles, request, UserTypeConstants.STUDENT, uid);    	
    	return result;
    }
	
	 private String importExcel(MultipartFile[] myFiles,HttpServletRequest request,int userType, long uid) throws UnsupportedEncodingException{
	    	JSONObject json = new JSONObject();
	    	
	    	AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
	    	if(authSchoolInfo == null){
	    		json.put("status", -1);
	    		json.put("msg", "你没有创建学校，无法导入数据！");
				return json.toString();
	    	}
	    	
	    	String oriNameString = myFiles[0].getOriginalFilename();
			if(StringUtils.isEmpty(oriNameString)){
				json.put("status", -2);
				return json.toString();
			}
			
			
			if(!oriNameString.endsWith(".xls") && !oriNameString.endsWith(".xlsx")){
				json.put("status", -3);
				json.put("msg", "导入失败，不支持此类文件的导入！");
				return json.toString();
			}
			
			String ext = oriNameString.substring(oriNameString.lastIndexOf(".") + 1,oriNameString.length());
			String fileSavePath = SystemConfigs.FILE_UP_TEMP_PATH + Long.toString(System.currentTimeMillis()) + "." + ext;
			System.out.println("save import excel: " + fileSavePath);
			if(CommonUtil.getFile(myFiles[0], fileSavePath) < 0){
				json.put("status", -3);
				json.put("msg", "文件上传失败，请重试");
				return json.toString();
			}
			
			File file = new File(fileSavePath);
			if(!file.exists() || file.length() > 4194304){
				json.put("msg", "导入失败，文件大小不能超过4M!");
				json.put("status", -4);
				return json.toString();
			}			
			
			List<List<Object>> items = null;
			//读取文件
			try {
				
				items = ReadExcel.readExcel(file);
			} catch (IOException e) {
				e.printStackTrace();
				json.put("msg", "导入失败,文件读取错误！");
			}
			
			
			
			int srecord = 0;	//成功记录数
			int frecord = 0;	//失败记录数
			if(items != null && items.size()>0){
				for (int i = 1;i<items.size();i++) {
					List<Object> item = items.get(i);
					long rsCode = 0;
					try {
						if(userType == UserTypeConstants.STUDENT){
							//学生导入
							if(item.size()<9){
								continue;
							}
							if(validate(item, userType)){
								//获得学校名称
								String universityName = item.get(1).toString();
								AuthSchoolInfo authSchoolApplyInfo = eduUserService.getSchoolInfoByName(universityName);
								if(authSchoolApplyInfo != null){
									if(authSchoolInfo.getId() != authSchoolApplyInfo.getId()){
										json.put("status", -5);
										String strMsg = "数据有误，第" + Long.toString(i) + "行大学名称填写有误，请核对后再重试";
										json.put("msg",strMsg);
										return json.toString();
									}
									UserBasicInfo userBasicInfo = eduUserService.importByUserName(item.get(8).toString(), MD5Util.encode(CommonConstants.DEFAULT_PWD),uid);
									if(userBasicInfo == null){
										json.put("status", -6);
										String strMsg = "数据有误，第" + Long.toString(i) + "行用户已被占用，请修改后再重试";
										json.put("msg",strMsg);
										return json.toString();
									}
									int newSex = SexConstants.UNKNOWN;
									String newAvatarUrl = null;
									if("男".equals(item.get(7).toString().trim())){
										newSex = SexConstants.MALE;
										newAvatarUrl = CommonConstants.MALE_PICTURE_URL;
									} else{
										newSex = SexConstants.FEMALE;
										newAvatarUrl = CommonConstants.FEMALE_PICTURE_URL;
									}
									userBasicInfo.setAvatarUrl(newAvatarUrl);
									userBasicInfo.setSex(newSex);
									//userBasicInfo.setNickName(item.get(6).toString());
									userBasicInfo.setRealName( item.get(6).toString());
									userBasicInfo.setUserType(userType);
									userBasicInfo.setOccupation("学生");
									userBasicInfo.setCompany(universityName);
									eduUserService.updateUserBasicInfo(userBasicInfo);
									eduUserService.addUserEduInfo(userBasicInfo.getUid(), authSchoolApplyInfo.getId(), item.get(2).toString(), item.get(3).toString(), item.get(4).toString(),item.get(5).toString(), uid);
							        
									/* //学生加入学校导入学生列表时加入了导入人，因此不把学习导到该表，需要时再改
							        SchoolsStudent schoolsStudent = eduUserService.getSchoolsStudentById(authSchoolApplyInfo.getSchoolId(), userBasicInfo.getUid());
							        if(schoolsStudent == null){
							        	schoolsStudent = new SchoolsStudent();
							        	schoolsStudent.setSchoolId(authSchoolApplyInfo.getSchoolId());
							        	schoolsStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
							        	schoolsStudent.setOptDate(new Timestamp(System.currentTimeMillis()));
							        }else {
							        	schoolsStudent.setOptDate(new Timestamp(System.currentTimeMillis()));
									}
							        schoolsStudent.setJoinType(SchoolMembersStatueConstant.schoolimport);
							        schoolsStudent.setStatus(SchoolMembersStatueConstant.pass);
							        eduUserService.updateSchoolsStudent(schoolsStudent);*/
							        
								} else {
									json.put("status", -7);
									String strMsg = "数据有误，第" + Long.toString(i) + "行大学名称填写有误，请核对后再重试";
									json.put("msg",strMsg);
									return json.toString();
								}
							} else {
								json.put("status", -8);
								String strMsg = "数据有误，第" + Long.toString(i) + "行内容填写有误，请核对后再重试";
								json.put("msg",strMsg);
								return json.toString();
							}
						} else if(userType == UserTypeConstants.TEACHER){
							//老师导入
							if(item.size()<8){
								continue;
							}
							if(validate(item, userType)){
								String universityName = item.get(1).toString();								
								AuthSchoolInfo authSchoolApplyInfo = eduUserService.getSchoolInfoByName(universityName);
								if(authSchoolApplyInfo != null){
									if(authSchoolInfo.getId() != authSchoolApplyInfo.getId()){
										json.put("status", -5);
										String strMsg = "数据有误，第" + Long.toString(i) + "行大学名称填写有误，请核对后再重试";
										json.put("msg",strMsg);
										return json.toString();
									}
									UserBasicInfo userBasicInfo = eduUserService.importByUserName(item.get(7).toString(), MD5Util.encode(CommonConstants.DEFAULT_PWD),uid);
									if(userBasicInfo == null){
										json.put("status", -6);
										String strMsg = "数据有误，第" + Long.toString(i) + "行用户已被占用，请修改后再重试";
										json.put("msg",strMsg);
										return json.toString();
									}
									int newSex = SexConstants.UNKNOWN;
									String newAvatarUrl = null;
									if("男".equals(item.get(6).toString().trim())){
										newSex = SexConstants.MALE;
										newAvatarUrl = CommonConstants.MALE_PICTURE_URL;
									} else{
										newSex = SexConstants.FEMALE;
										newAvatarUrl = CommonConstants.FEMALE_PICTURE_URL;
									}
									userBasicInfo.setAvatarUrl(newAvatarUrl);
									userBasicInfo.setSex(newSex);
									//userBasicInfo.setNickName( item.get(5).toString());
									userBasicInfo.setRealName( item.get(5).toString());
									userBasicInfo.setUserType(userType);
									userBasicInfo.setOccupation("老师");
									userBasicInfo.setCompany(universityName);
									eduUserService.updateUserBasicInfo(userBasicInfo);
							        // 加入教育信息
									eduUserService.addUserEduInfo(userBasicInfo.getUid(), authSchoolApplyInfo.getId(), item.get(2).toString(), item.get(3).toString(), null,item.get(4).toString(), uid);
							        
							        //加入老师认证表里
									AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(userBasicInfo.getUid());
							        if(authTeacherInfo == null){
							        	authTeacherInfo = new AuthTeacherInfo();
							        	authTeacherInfo.setUid(userBasicInfo.getUid());							        	
							        }
							        authTeacherInfo.setRealName(userBasicInfo.getRealName());
							        authTeacherInfo.setApplyforDate(new Timestamp(System.currentTimeMillis()));
							        authTeacherInfo.setApplyLastDate(new Timestamp(System.currentTimeMillis()));
							        authTeacherInfo.setStatus(AuthTeacherStatusConstant.schoolimport);

							        eduUserService.UpdateAuthTeacherInfo(authTeacherInfo);
							        //老师加入学校
							        SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(authSchoolApplyInfo.getId(), userBasicInfo.getUid());
							        if(schoolsTeacher == null){
							        	schoolsTeacher = new SchoolsTeacher();
							        	schoolsTeacher.setSchoolId(authSchoolApplyInfo.getId());
							        	schoolsTeacher.setUserid(userBasicInfo.getUid());
							        	schoolsTeacher.setJoinDate(new Timestamp(System.currentTimeMillis()));
							        	schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
							        }else {
							        	schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
									}
							        schoolsTeacher.setJoinType(SchoolMembersStatueConstant.schoolimport);
							        schoolsTeacher.setStatus(SchoolMembersStatueConstant.pass);
							        eduUserService.updateSchoolsTeacher(schoolsTeacher);
							        
								} else {
									json.put("status", -7);
									String strMsg = "数据有误，第" + Long.toString(i) + "行大学名称填写有误，请核对后再重试";
									json.put("msg",strMsg);
									return json.toString();
								}
							} else {
								json.put("status", -8);
								String strMsg = "数据有误，第" + Long.toString(i) + "行内容填写有误，请核对后再重试";
								json.put("msg",strMsg);
								return json.toString();
							}
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			frecord = (frecord-1)<0?0:(frecord-1);
			json.put("success", true);
			json.put("msg", "操作成功!");
			return json.toString();
	    }
	 
	 private boolean validate(List<Object> item,int userType){
	    	try {
				String university = item.get(1).toString();
				String college = item.get(2).toString();
				String major = item.get(3).toString();
				String collegeClassName = null;
				String num = null;
				String name = null;
				String sex = null;
				if(UserTypeConstants.STUDENT == userType){
					collegeClassName = item.get(4).toString();
					num = item.get(5).toString();
					name = item.get(6).toString();
					sex = item.get(7).toString();
				} else if(UserTypeConstants.TEACHER == userType){
					collegeClassName = "class8";
					num = item.get(4).toString();
					name = item.get(5).toString();
					sex = item.get(6).toString();
				}
				if(StringUtils.isBlank(university)){
					return false;
				}
				if(StringUtils.isBlank(college)){
					return false;
				}
				if(StringUtils.isBlank(college)){
					return false;
				}
				if(StringUtils.isBlank(major)){
					return false;
				}
				if(StringUtils.isBlank(major)){
					return false;
				}
				if(StringUtils.isBlank(collegeClassName)){
					return false;
				}
				if(StringUtils.isBlank(num)){
					return false;
				}
				if(StringUtils.isBlank(name)){
					return false;
				}
				if(StringUtils.isBlank(sex)){
					return false;
				}
				return true;
			} catch (NumberFormatException e) {
				e.printStackTrace();
				return false;
			}
	    }
	private List<SchoolTeacherShowInfo> GetShowTeachersInfo(List<SchoolsTeacher> teachers, int nType ){		
		if(teachers != null){
			List<SchoolTeacherShowInfo> toshowlistInfos = new ArrayList<SchoolTeacherShowInfo>();		
			for (SchoolsTeacher teacher1 : teachers) {
				SchoolTeacherShowInfo schoolTeacherShowInfo = new SchoolTeacherShowInfo();
				schoolTeacherShowInfo.setUserid(teacher1.getUserid());
				
				AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(teacher1.getUserid());
				schoolTeacherShowInfo.setHomePage(authTeacherInfo.getHomePageUrl());
				
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(teacher1.getUserid());
				schoolTeacherShowInfo.setRealName(userBasicInfo.getRealName());
				schoolTeacherShowInfo.setNickName(userBasicInfo.getNickName());
				schoolTeacherShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
				schoolTeacherShowInfo.setSex(userBasicInfo.getSex());
				schoolTeacherShowInfo.setTeacherId(userBasicInfo.getUname());
				
				if(nType == SchoolMembersStatueConstant.admininvite ||
						nType == SchoolMembersStatueConstant.userapply){
					schoolTeacherShowInfo.setRegTimestamp(DateUtil.timestamp2String(userBasicInfo.getCreateTime()));
					schoolTeacherShowInfo.setOptTimestamp(DateUtil.timestamp2String(teacher1.getJoinDate()));
					schoolTeacherShowInfo.setStatus(teacher1.getStatus());
				}
				else if(nType == SchoolMembersStatueConstant.schoolimport){
					schoolTeacherShowInfo.setStatus(userBasicInfo.getBanType());
					schoolTeacherShowInfo.setHaveRight(teacher1.getHaveRight());
					
					UserEduInfo userEduInfo = eduUserService.getUserEduInfo(teacher1.getUserid());
					SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = eduUserService.getMajorShowInfo(userEduInfo.getMajorId(), 0);
					schoolTeacherShowInfo.setSchool(schoolCollegeMajorShowInfo.getC8schoolName());
					schoolTeacherShowInfo.setCollege(schoolCollegeMajorShowInfo.getCollegeName());
					schoolTeacherShowInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());	
					schoolTeacherShowInfo.setTeacherId(userEduInfo.getStudentid());
				}
				else if(nType == SchoolMembersStatueConstant.pass){
					schoolTeacherShowInfo.setOptTimestamp(DateUtil.timestamp2String(teacher1.getOptDate())); //签约时间
					///TODO：订单数据，学生数量，收入待加入
				}
				
				
				toshowlistInfos.add(schoolTeacherShowInfo);
			}
			return toshowlistInfos;
		}
		else {
			return null;
		}
		
	}
	 
	@ResponseBody
	@RequestMapping(value = "/getschoolselfteacherscount"  )
	public String getSchoolselfTeachersCount(TeacherQueryExample example,HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			int ncount = eduUserService.countSchoolTeachers(schoolid,
					SchoolMembersStatueConstant.schoolimport, example);
			json.put("status", 0);
			json.put("count", ncount);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}	

	@ResponseBody
	@RequestMapping(value = "/getschoolselfteachers"  )
	public String getSchoolselfTeachers(@RequestParam int page, TeacherQueryExample example,HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
			
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			
			List<SchoolsTeacher> teachers  = eduUserService.getSchoolTeachers(schoolid, SchoolMembersStatueConstant.schoolimport, nstart, nRows, example);			
			List<SchoolTeacherShowInfo> toshowlistInfos = GetShowTeachersInfo(teachers, SchoolMembersStatueConstant.schoolimport);
			if(toshowlistInfos == null || toshowlistInfos.size() < 1){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				json.put("teachers", toshowlistInfos);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//获取已申请的老师个数
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersapplycount"  )
	public String getSchoolTeachersApplyCount(TeacherQueryExample example, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			int ncount = eduUserService.countSchoolTeachers(schoolid,
					SchoolMembersStatueConstant.userapply, example);
			json.put("status", 0);
			json.put("count", ncount);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}	
	//获取已申请的老师
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersapply"  )
	public String getSchoolTeachersApply(@RequestParam int page, TeacherQueryExample example,HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			List<SchoolsTeacher> teachers  = eduUserService.getSchoolTeachers(schoolid, SchoolMembersStatueConstant.userapply, nstart, nRows,example);			
			List<SchoolTeacherShowInfo> toshowlistInfos = GetShowTeachersInfo(teachers,SchoolMembersStatueConstant.userapply);
			if(toshowlistInfos == null || toshowlistInfos.size() < 1){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				json.put("teachers", toshowlistInfos);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	//获取已邀请的老师个数
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersinvitecount")
	public String getSchoolTeachersInviteCount(TeacherQueryExample example,HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			int ncount = eduUserService.countSchoolTeachers(schoolid,
					SchoolMembersStatueConstant.admininvite,example);
			json.put("status", 0);
			json.put("count", ncount);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}	

	//获取已邀请的老师
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersinvite")
	public String getSchoolTeachersInvite(@RequestParam int page, TeacherQueryExample example, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			List<SchoolsTeacher> teachers  = eduUserService.getSchoolTeachers(schoolid, SchoolMembersStatueConstant.admininvite, nstart, nRows,example);			
			List<SchoolTeacherShowInfo> toshowlistInfos = GetShowTeachersInfo(teachers, SchoolMembersStatueConstant.admininvite);
			if(toshowlistInfos == null || toshowlistInfos.size() < 1){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				json.put("teachers", toshowlistInfos);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//获取已签约的老师个数
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersagreementcount")
	public String getSchoolTeachersAgreeCount(TeacherQueryExample example,HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			int ncount = eduUserService.countSchoolTeachersHadpass(schoolid,example);
			json.put("status", 0);
			json.put("count", ncount);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}	
	//获取已签约的老师
	@ResponseBody
	@RequestMapping(value = "/getschoolteachersagreement")
	public String getSchoolTeachersAgreement(@RequestParam int page,TeacherQueryExample example, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			
			List<SchoolsTeacher> teachers  = eduUserService.getSchoolTeachersHadPass(schoolid,  nstart, nRows,example);			
			List<SchoolTeacherShowInfo> toshowlistInfos = GetShowTeachersInfo(teachers, SchoolMembersStatueConstant.pass);
			if(toshowlistInfos == null || toshowlistInfos.size() < 1){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				json.put("teachers", toshowlistInfos);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	// 审核老师的申请
	@ResponseBody
	@RequestMapping(value = "/verifyteacherapply")
	public String verifyTeacherApply(@RequestParam int nAgree,@RequestParam long teacherid, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if (authSchoolInfo == null) {
				json.put("status", -2);
			} else {
				SchoolsTeacher schoolsTeacher = eduUserService
						.getSchoolsTeacherById(authSchoolInfo.getId(), teacherid);
				if (schoolsTeacher != null) {
					schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
					if (nAgree == 1) {
//						int nHadRight = Integer.parseInt(req.getParameter("cancrete"));
						// 同意
						schoolsTeacher.setStatus(SchoolMembersStatueConstant.pass);
						schoolsTeacher.setHaveRight(SchoolMemberRightConstant.createcourse);

					} else {
						schoolsTeacher.setStatus(SchoolMembersStatueConstant.refuse);
					}
					eduUserService.updateSchoolsTeacher(schoolsTeacher);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	// 处理 邀请的老师，主要是取消，和再次邀请 inviteagain: 1 两次邀请， 2 取消邀请
	@ResponseBody
	@RequestMapping(value = "/dealinviteteacher")
	public String dealinviteTeacher(@RequestParam int inviteagain,@RequestParam long teacherid,
			HttpSession session, HttpServletRequest req,
			HttpServletResponse response) {
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
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if (authSchoolInfo == null) {
				json.put("status", -2);
			} else {
				SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(authSchoolInfo.getId(), teacherid);
				if (schoolsTeacher != null) {
					schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
					if (inviteagain == 1) {						
						schoolsTeacher.setStatus(SchoolMembersStatueConstant.apply);
					} else if (inviteagain == 2) {
						schoolsTeacher.setStatus(SchoolMembersStatueConstant.cancel);
					}else {
						json.put("status", -3);
						return json.toString();
					}
					eduUserService.updateSchoolsTeacher(schoolsTeacher);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	// 授权给老师是否能创建课程 allow 1 允许创建， 2 不允许创建
	@ResponseBody
	@RequestMapping(value = "/setcreateright")
	public String setCreateRight(@RequestParam int allow,@RequestParam long teacherid,
			HttpSession session, HttpServletRequest req,
			HttpServletResponse response) {
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
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if (authSchoolInfo == null) {
				json.put("status", -2);
			} else {
				SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(authSchoolInfo.getId(), teacherid);
				if (schoolsTeacher != null) {
					schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
					if (allow == 1) {						
						schoolsTeacher.setHaveRight(SchoolMemberRightConstant.createcourse);
					} else if (allow == 2) {
						schoolsTeacher.setHaveRight(SchoolMemberRightConstant.noright);
					}else {
						json.put("status", -3);
						return json.toString();
					}
					eduUserService.updateSchoolsTeacher(schoolsTeacher);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	//重置学生密码
	@ResponseBody
	@RequestMapping(value = "/resetpwd")
	public String ResetUserPassword(@RequestParam long userid, HttpSession session,
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
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(userid);
			if(userBasicInfo == null){
				json.put("status", -2);
			}else {
				userBasicInfo.setPassword(MD5Util.encode(CommonConstants.DEFAULT_PWD));
				eduUserService.updateUserBasicInfo(userBasicInfo);
				json.put("status", 0);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return json.toString();
	}	
	
	//停用/启用用户, nforbid 1 停用， 0 启用
	@ResponseBody
	@RequestMapping(value = "/forbiduser")
	public String ForbidUser(@RequestParam long userid, @RequestParam int nforbid, HttpSession session,
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
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(userid);
			if(userBasicInfo == null){
				json.put("status", -2);
				return json.toString();
			}
			if(nforbid == 1)
				userBasicInfo.setBanType(BanTypeConstants.USER_BANNED);
			else if(nforbid == 0)
				userBasicInfo.setBanType(BanTypeConstants.NORMAL);
			else {
				json.put("status", -3);
				return json.toString();
			}
			eduUserService.updateUserBasicInfo(userBasicInfo);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}	



	// 获取校内学生个数
	@ResponseBody
	@RequestMapping(value = "/getschoolselfstudentcount")
	public String getSchoolStudentCount(HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			String strSearchKey = req.getParameter("searchKey");
			String strStatusString = req.getParameter("nStatus");
			int nStatus = -1;
			if(strStatusString != null)
				nStatus = Integer.parseInt(strStatusString);
			if(!StringUtils.isEmpty(strSearchKey) || nStatus >= 0){
				//关键字不为空，表示条件查询				
				int ncount = 0;
				List<UserBasicInfo> students = eduUserService.searchScoolSelfStudents(uid, strSearchKey, nStatus);
				if(students != null)
					ncount = students.size();
				json.put("count", ncount);
				json.put("status", 0);			
				return json.toString();
			}
			int ncount = eduUserService.countMySchoolSelfStudents(uid);//(schoolid, SchoolMembersStatueConstant.schoolimport);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}

	// 获取校内学生信息
	@ResponseBody
	@RequestMapping(value = "/getschoolselfstudents")
	public String getSchoolselfStudents(@RequestParam int page, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
				
			String strSearchKey = req.getParameter("searchKey");
			String strStatusString = req.getParameter("nStatus");
			int nStatus = -1;
			if(strStatusString != null)
				nStatus = Integer.parseInt(strStatusString);
			if(!StringUtils.isEmpty(strSearchKey) || nStatus >= 0){
							
				List<UserBasicInfo> students = eduUserService.searchScoolSelfStudents(uid, strSearchKey, nStatus);
				if(students != null){
					students = students.subList(Math.min(nstart, students.size()), Math.min(nstart + nRows, students.size()));
					List<SchoolStudentShowInfo> toList = toGetSelfStudentInfo(students);
					json.put("students", toList);
				}
				
				json.put("status", 0);			
				return json.toString();
			}
			
			List<UserBasicInfo> students = eduUserService.listMySchoolSelfStudents(uid, nstart, nRows);//(
					//schoolid, SchoolMembersStatueConstant.schoolimport, nstart,nRows);			
			if (students == null || students.size() < 1) {
				json.put("status", -2);
			} else {
				List<SchoolStudentShowInfo> toList = toGetSelfStudentInfo(students);
				json.put("status", 0);
				json.put("students", toList);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}

	
	// 获取校外学生个数
	@ResponseBody
	@RequestMapping(value = "/getschooloutdoorstudentcount")
	public String getSchoolStudentoutdoorCount(HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			
			String strSearchKey = req.getParameter("searchKey");
			String strStatusString = req.getParameter("nStatus");
			int nStatus = -1;
			if(strStatusString != null)
				nStatus = Integer.parseInt(strStatusString);
			if(!StringUtils.isEmpty(strSearchKey) || nStatus >= 0){
				//关键字不为空，表示条件查询
				
				int ncount = 0;
				List<SchoolsStudent> students = eduUserService.searchSchoolStudents(schoolid, strSearchKey, nStatus);
				if(students != null)
					ncount = students.size();
				json.put("count", ncount);
				json.put("status", 0);			
				return json.toString();
			}
			
			int ncount = eduUserService.countMySchoolStudents(schoolid, SchoolMembersStatueConstant.stupaycoursejoin);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json.toString();
	}
	
	// 获取校外学生信息
	@ResponseBody
	@RequestMapping(value = "/getschooloutdoorsstudents")
	public String getSchooloutdoorsStudents(@RequestParam int page, HttpSession session,
			HttpServletRequest req, HttpServletResponse response) {
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
			int nstart = Integer.parseInt(req.getParameter("start"));
			int nRows = Integer.parseInt(req.getParameter("rows"));
			if(page != 1){
				nstart = (page-1)*nRows;
			}else{
				nstart = 0;
			}
			
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			String strStatusString = req.getParameter("nStatus");
			int nStatus = -1;
			if(strStatusString != null)
				nStatus = Integer.parseInt(strStatusString);
			String strSearchKey = req.getParameter("searchKey");
			if(!StringUtils.isEmpty(strSearchKey) || nStatus >= 0){
				//关键字不为空，表示条件查询
				
				List<SchoolsStudent> students = eduUserService.searchSchoolStudents(schoolid, strSearchKey, nStatus);
				if(students != null){
					students = students.subList(Math.min(nstart, students.size()), Math.min(nstart + nRows, students.size()));
					List<SchoolStudentShowInfo> toList = toGetOutdoorStudentInfo(students);
					json.put("students", toList);
				}			
				json.put("status", 0);			
				return json.toString();
			}
			
			
			List<SchoolsStudent> students = eduUserService.listMySchoolStudents(
					schoolid, SchoolMembersStatueConstant.stupaycoursejoin, nstart,nRows);			
			if (students == null || students.size() < 1) {
				json.put("status", -2);
			} else {
				List<SchoolStudentShowInfo> toList = toGetOutdoorStudentInfo(students);
				json.put("status", 0);
				json.put("students", toList);
			}
		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
		}
		return json.toString();
	}
	
	private List<SchoolStudentShowInfo> toGetOutdoorStudentInfo(List<SchoolsStudent>students){
		List<SchoolStudentShowInfo> toList = new ArrayList<SchoolStudentShowInfo>();
		for (SchoolsStudent schoolsStudent : students) {
			SchoolStudentShowInfo schoolStudentShowInfo = new SchoolStudentShowInfo();
			schoolStudentShowInfo.setUserid(schoolsStudent.getUserid());
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(schoolsStudent.getUserid());
			schoolStudentShowInfo.setRealName(userBasicInfo.getRealName());
			schoolStudentShowInfo.setNickName(userBasicInfo.getNickName());
			schoolStudentShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
			schoolStudentShowInfo.setSex(userBasicInfo.getSex());
			schoolStudentShowInfo.setStudentId(userBasicInfo.getUname());
			schoolStudentShowInfo.setSignString(userBasicInfo.getSignature());
			
			schoolStudentShowInfo.setBuyCourseCount(schoolsStudent.getBuyCourses());
			schoolStudentShowInfo.setBuyCoursePrice((float)schoolsStudent.getBuyPrices() / 100);
			schoolStudentShowInfo.setLastBuyTimestamp(DateUtil.timestamp2String(schoolsStudent.getLastBuyDate()));
			
			toList.add(schoolStudentShowInfo);
			///TODO:购买课程，金额等信息后续加上
			
		}
		
		return toList;
	}
	
	private List<SchoolStudentShowInfo> toGetSelfStudentInfo(List<UserBasicInfo>students){
		List<SchoolStudentShowInfo> toList = new ArrayList<SchoolStudentShowInfo>();
		for (UserBasicInfo userBasicInfo : students) {
			SchoolStudentShowInfo schoolStudentShowInfo = new SchoolStudentShowInfo();
			schoolStudentShowInfo.setUserid(userBasicInfo.getUid());
			schoolStudentShowInfo.setStatus(userBasicInfo.getBanType());
			UserEduInfo userEduInfo = eduUserService.getUserEduInfo(userBasicInfo.getUid());
			SchoolCollegeMajorShowInfo schoolCollegeMajorShowInfo = eduUserService.getMajorShowInfo(userEduInfo.getMajorId(), 0);
			schoolStudentShowInfo.setSchool(schoolCollegeMajorShowInfo.getC8schoolName());
			schoolStudentShowInfo.setCollege(schoolCollegeMajorShowInfo.getCollegeName());
			schoolStudentShowInfo.setMajor(schoolCollegeMajorShowInfo.getMajorName());	
			schoolStudentShowInfo.setStrClass(userEduInfo.getCollegeClassName());
			schoolStudentShowInfo.setRealName(userBasicInfo.getRealName());
			schoolStudentShowInfo.setNickName(userBasicInfo.getNickName());
			schoolStudentShowInfo.setHeadimageUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
			schoolStudentShowInfo.setSex(userBasicInfo.getSex());
			schoolStudentShowInfo.setStudentId(userEduInfo.getStudentid());
			schoolStudentShowInfo.setSignString(userBasicInfo.getSignature());
			toList.add(schoolStudentShowInfo);
		}
		return toList;
	}

	// 校长搜索学生列表, nStatus表示用户状态 from： 120校外学生 其他校内学生
	@ResponseBody
	@RequestMapping(value = "/searchstudents")
	public String searchStudents(@RequestParam String searchKey,@RequestParam int nStatus, @RequestParam int from,
			HttpSession session, HttpServletRequest req,
			HttpServletResponse response) {
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
		
		if(nStatus != BanTypeConstants.NORMAL && nStatus != BanTypeConstants.USER_BANNED){
			json.put("status", -2); //参数不对
			return json.toString();
		}
		
		
		//校外学生
		if(from == SchoolMembersStatueConstant.stupaycoursejoin){
			long schoolid = 0;//Long.parseLong(session.getAttribute("schoolid").toString());
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null)
				schoolid = authSchoolInfo.getId();
			else {
				json.put("status", -3); //不是学校创建者，不能搜索校内学生
				return json.toString();
			}
			List<SchoolsStudent> students = eduUserService.searchSchoolStudents(schoolid, searchKey, nStatus);
			if(students != null){
				List<SchoolStudentShowInfo> toList = toGetOutdoorStudentInfo(students);
				json.put("students", toList);
			}			
			json.put("status", 0);			
		}else {
			//校内学生
			List<UserBasicInfo> students = eduUserService.searchScoolSelfStudents(uid, searchKey, nStatus);
			if(students != null){
				List<SchoolStudentShowInfo> toList = toGetSelfStudentInfo(students);
				json.put("students", toList);
			}
			json.put("status", 0);
			
		}
		
		return json.toString();
	}
	
	//停售课之前调用该接口，查询能否进行停课，并把停课需要交的费用返回给老师
	@RequestMapping("/course/tostopcourse")
	@ResponseBody
	public String toStopCourse(@RequestParam long courseid, HttpSession session ){
		JSONObject json = new JSONObject();
		long uid = this.getShiroUser().getUid();
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(courseid);		
		session.removeAttribute("stoptopayfee");
		session.removeAttribute("stopcourseid");
		if(null == course) {
			json.put("message", "参数错误！");
			json.put("statue", -1);
		} else {
			if(course.getCourseStatus() >= CourseStateConstants.autocancel){
				json.put("message", "该状态下无法停售课程");
				json.put("statue", -2);
				return json.toString();
			}
			
			int nHadSignup = eduCourseService.countCourseStudentStatus(courseid, 0, OrderStatusConstant.hadpay);
			int toStopFee = 0; 
			if(course.getCourseStatus() == CourseStateConstants.besignuping){
				toStopFee = (int)(course.getPriceTotal() * 100);
				toStopFee = toStopFee * nHadSignup * RefundCourseRateConstants.teacherstopcourse_whensigning / 100;
			}else if(course.getCourseStatus() == CourseStateConstants.endsignup){
				toStopFee = (int)(course.getPriceTotal() * 100) * nHadSignup;
				if(course.getClassHadFinished() > 0){
					int nTotal = toStopFee ;
					toStopFee = toStopFee  * RefundCourseRateConstants.teacherstopcourse_processing / 100;
					toStopFee = toStopFee * course.getClassHadFinished() / course.getClassTotal();  //给老师的费用，那么给平台的费用为总数减去这个值
					toStopFee = nTotal - toStopFee;
				}else {
					toStopFee = toStopFee  * RefundCourseRateConstants.teacherstopcourse_waitprocess / 100;
				}
			}
			
			session.setAttribute("stoptopayfee", toStopFee);
			session.setAttribute("stopcourseid", courseid);
			float fFee = (float)toStopFee;
			fFee = fFee / 100;
			json.put("stoptopayfee",fFee);
			PayAccount payAccount = iEduPayService.getPayAccount(uid);
			double myMoeny = 0.0d;
			int bPay = -1;
			if(payAccount != null){				
				myMoeny = payAccount.getBlanceRmb() + payAccount.getBlanceOther();					
				myMoeny = myMoeny / 100;	
				if(payAccount.getBlanceRmb() + payAccount.getBlanceOther() >= toStopFee)
					bPay = 1;
			}
			DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");//格式化设置  
		    System.out.println(decimalFormat.format(myMoeny));  		        
			json.put("account", decimalFormat.format(myMoeny));
			json.put("canpay", bPay);  //1 表示余额足够支付费用， -1表示余额不足，则先充值
			json.put("success", true);
		}
		return json.toString();
	}
	
	//停售课程
	@RequestMapping("/course/stopcourse")
	@ResponseBody
	public String stopCourse(@RequestParam long courseid,@RequestParam String paypwd, 
			@RequestParam int stopreason, @RequestParam String strReason ,
			HttpSession session,HttpServletRequest request){
		JSONObject json = new JSONObject();
		long uid = this.getShiroUser().getUid();
		
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(courseid);
		if(null == course) {
			json.put("message", "参数错误！");
			json.put("statue", -2);
		} else {
			//校内课的停售，不需要什么密码之类的
			if(course.getOnlineType() == CourseOnlineTypeConstants.INSIDE_SCHOOL_COURSE){
				course.setCourseStatus(CourseStateConstants.COURSE_DELETE);
				course.setStatusAddInfo(stopreason);
				course.setStatusReason(strReason);
				eduCourseService.updataCourseBasicInfo(course);
				json.put("success", true);
				return json.toString();
			}
			
			int toStopFee = Integer.parseInt(session.getAttribute("stoptopayfee").toString());
			long toStopCourseid = Long.parseLong(session.getAttribute("stopcourseid").toString());
			if(toStopCourseid != courseid){
				json.put("message", "参数错误！");
				json.put("statue", -1);
				return json.toString();
			}
			session.removeAttribute("stoptopayfee");
			session.removeAttribute("stopcourseid");
			
			PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
			if(payUserSafeInfo == null || StringUtils.isEmpty(payUserSafeInfo.getPayPwd())){
				json.put("message", "请先设置支付密码再支付");  //未设置支付密码，请先设置支付密码
				json.put("statue", -3);
				return json.toString();
			}
			
			String pwdMd5 = MD5Util.encode(paypwd);
			if(!payUserSafeInfo.getPayPwd().equals(pwdMd5)){
				json.put("message", "支付密码错误，请重试");  //支付密码出错
				json.put("statue", -4);
				return json.toString();
			}
			
			PayAccount payAccount = iEduPayService.getPayAccount(uid);
			long totalRmb = payAccount.getBlanceOther() + payAccount.getBlanceRmb();
			if( totalRmb < toStopFee ){
				json.put("message", "余额不足"); //余额不够
				json.put("statue", -5);
				System.out.println("退课支付用户余额不足，请先充值，userid:" + uid + ", have " + totalRmb + " but to pay:" + toStopFee);
				return json.toString();
			}
			int payFromRmb = 0;
			int payFromOther = 0;
			if(payAccount.getBlanceRmb() > toStopFee){
				System.out.println(payAccount.getBlanceRmb() + " stu rmb:" + (payAccount.getBlanceRmb() - toStopFee));
				payAccount.setBlanceRmb(payAccount.getBlanceRmb() - toStopFee);
				System.out.println("after opt is: " + payAccount.getBlanceRmb());
				payFromRmb = toStopFee;
			}
			else {
				payFromRmb = (int)payAccount.getBlanceRmb();
				payAccount.setBlanceRmb(0);
				payFromOther = toStopFee - payFromRmb;
				payAccount.setBlanceOther(payAccount.getBlanceOther() - payFromOther);					
			}
			payAccount.setPayoutRmbTrade(payAccount.getPayoutRmbTrade() + toStopFee);
			iEduPayService.updatePayAccount(payAccount);
			System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) +  "pay by account, rmb:" + payFromRmb + ", other:" + payFromOther);
		
			//增加停课扣款流水号
			PayAccountBillInfo payAccountBillInfo = new PayAccountBillInfo();
			payAccountBillInfo.setUserid(uid);
			payAccountBillInfo.setBillTime(new Timestamp(System.currentTimeMillis()));
			payAccountBillInfo.setBillType(PayAccountBillTypeConstant.pay_stop_course_fee);
			payAccountBillInfo.setPayoutNormal(toStopFee);
			payAccountBillInfo.setPayFromRmb(payFromRmb);
			payAccountBillInfo.setPayFromOther(payFromOther);
			payAccountBillInfo.setPayGiftVoucher(0);
			String optIpString = request.getRemoteAddr();
			payAccountBillInfo.setIp(optIpString);
			payAccountBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
			payAccountBillInfo.setBlanceOther(payAccount.getBlanceOther());
			long serialid = iEduPayService.UpdatePayAccountBill(payAccountBillInfo);
			
			//设置课程为自动取消状态，由工作线程去统一退款
			course.setCourseStatus(CourseStateConstants.autocancel);
			course.setStatusAddInfo(stopreason);
			course.setStatusReason(strReason);
			eduCourseService.updataCourseBasicInfo(course);
			
			//把报名的还没付款的订单全部置为取消状态
			List<UserOrder> orders = eduCourseService.listOrdersByCourseid(courseid);
			if(orders != null){
				for (UserOrder userOrder : orders) {
					if(userOrder.getStatus() == OrderStatusConstant.topay){
						userOrder.setStatus(OrderStatusConstant.autocancel);
						eduCourseService.updateUserOrder(userOrder);
					}
				}
			}
			json.put("success", true);
		}
		return json.toString();
	}

}
