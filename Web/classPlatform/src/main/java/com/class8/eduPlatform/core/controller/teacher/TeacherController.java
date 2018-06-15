package com.class8.eduPlatform.core.controller.teacher;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.log4j.BasicConfigurator;
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
import org.springframework.web.multipart.MultipartHttpServletRequest;

import sun.misc.BASE64Decoder;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseCategory;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseFile;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.bean.CourseStudent;
import com.class8.user.bean.StudentQueryExample;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseOnlineTypeConstants;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.CourseStudentSignupType;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.constants.RecordStateConstants;
import com.class8.course.constants.RefundCourseRateConstants;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.exception.BusinessException;
import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.common.util.ValidatorUtil;
import com.class8.eduPlatform.core.bean.JsSchoolTeacherRecordInfo;
import com.class8.eduPlatform.core.bean.JsStudentOrderShowInfo;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.CourseType;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.dto.CourseClassDto;
import com.class8.eduPlatform.core.dto.CreateCourseDto;
import com.class8.eduPlatform.core.service.ICourseCategoryService;
import com.class8.eduPlatform.core.service.ICourseFileService;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.ISchoolTeacherService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.core.validator.CreateCourseDtoValidator;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.SchoolMemberRightConstant;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.dto.TeacherStudentDto;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/teacher")
public class TeacherController extends BaseController {
	
	private static Logger logger = Logger.getLogger(TeacherController.class);
	
	public static final String INDEX = "/teacher/teacherHomePage";
	public static final String COURSE = "manageCourse";
	public static final String DATAPACK = "";
	public static final String STUDENT = "/teacher/myStudent";
	public static final String ORDER = "";
	public static final String STATISTICAL = "";
	public static final String COUPON = "";
	public static final String AUTHC = "";
	public static final String SCHOOL = "";
	
	public static final String COURSE_MANAGE = "manageCourse";
	public static final String COURSE_CREATE = "";
	public static final String COURSE_UPDATE = "/course/updateCourse";
	public static final String ORDER_LIST = "";
	public static final String DOCUMENT_MANAGE = "/document/docManage";
	public static final String JOIN_SCHOOL = "/school/joinSchool";
	public static final String VIEW_ALL_SCHOOL = "/school/viewAllSchool";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private ICourseFileService courseFileService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ISchoolTeacherService schoolTeacherService;
	
	@Autowired
	private IEduPayService iEduPayService;
	
	@Autowired
	private ICourseCategoryService courseCategoryService;
	
	@RequestMapping(value="/index",method=RequestMethod.GET)
	public void index(Model model){
		
	}
	
	@RequestMapping(value="/center",method=RequestMethod.GET)
	public String center(Model model){
		long teacherUid = getShiroUser().getUid();
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(teacherUid);
		//老师基本信息
		userBasicInfo.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
		model.addAttribute("teacher", userBasicInfo);
		//老师签约的学校信息
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByTeacherUid(teacherUid);
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		//老师课程的总数
		int countCourse = courseService.countOfTeacherCourse(teacherUid);
		model.addAttribute("countCourse", countCourse);
		//老师学生的总数
		int countStudent = userService.countOfTeacherStudent(teacherUid);
		model.addAttribute("countStudent", countStudent);
		return INDEX;
	}
	
	@RequestMapping(value="/course",method=RequestMethod.GET)
	public String coursePage(){
		return COURSE;
	}
	
	@RequestMapping(value="/datapack",method=RequestMethod.GET)
	public String datapackPage(){
		return DATAPACK;
	}
	
	@RequestMapping(value="/student",method=RequestMethod.GET)
	public String studentPage(){
		return STUDENT;
	}
	
	@RequestMapping(value="/order",method=RequestMethod.GET)
	public String orderPage(){
		return ORDER;
	}
	
	@RequestMapping(value="/statistical",method=RequestMethod.GET)
	public String statisticalPage(){
		return STATISTICAL;
	}
	
	@RequestMapping(value="/coupon",method=RequestMethod.GET)
	public String couponPage(){
		return COUPON;
	}
	
	@RequestMapping(value="/authc",method=RequestMethod.GET)
	public String authcPage(){
		return AUTHC;
	}
	
	@RequestMapping(value="/school",method=RequestMethod.GET)
	public String schoolPage(){
		return SCHOOL;
	}
	
	@RequestMapping(value = "/toJoinSchool",method=RequestMethod.GET)
	public String toJoinSchool() {
		
		return JOIN_SCHOOL;
	}
	
	@RequestMapping(value = "/goAllSchools",method=RequestMethod.GET)
	public String goAllSchools() {
		
		return VIEW_ALL_SCHOOL;
	}
	
	@RequestMapping(value="/course/create",method=RequestMethod.GET)
	public String createCoursePage(){
		long teacherUid = this.getShiroUser().getUid();
		SchoolsTeacher schoolTeacher = schoolTeacherService.getSchoolTeacherByTeacherUid(teacherUid);
		String viewName = "";
		if(schoolTeacher != null && SchoolMemberRightConstant.createcourse == schoolTeacher.getHaveRight()){
			viewName = "/creatCourse";
		} else {
			viewName = "/course/creatTeacherCourse";
		}
		return viewName;
	}
	@ResponseBody
	@RequestMapping(value="/course/create",method=RequestMethod.POST)
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
		
		CourseBasicInfo courseBasicInfo = new CourseBasicInfo();
		courseBasicInfo.setCourseName(course.getCourseName());
		courseBasicInfo.setItemsType(course.getClassifyId());
		courseBasicInfo.setCoverUrl(course.getCoverUrl());
		courseBasicInfo.setDescription(course.getDescription());
		courseBasicInfo.setTarget(course.getTarget());
		courseBasicInfo.setPeople(course.getPeople());
		courseBasicInfo.setnMinStudents(course.getMinStudents());
		courseBasicInfo.setnMaxStudents(course.getMaxStudents());
		if(course.getSignupStartTime() !=null && course.getSignupEndTime() != null){
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
		courseBasicInfo.setRecordStatus(RecordStateConstants.recode); //默认 允许录像
		courseBasicInfo.setTeacherUid(uid);
		
		//校验老师是否有创建校内课的权限
		SchoolsTeacher schoolTeacher = null;
		if(CourseType.INSIDE_SCHOOL_COURSE == courseType || CourseType.PUBLIC_SCHOOL_COURSE == courseType){
			schoolTeacher = schoolTeacherService.getSchoolTeacherByTeacherUid(uid);
			if(schoolTeacher == null || SchoolMemberRightConstant.createcourse != schoolTeacher.getHaveRight()){
				json.put("message", "参数有误！");
				return json.toString();
			}
		}
		
		if(CourseOnlineTypeConstants.PUBLIC_PERSONAL_COURSE == courseType){//个人公开课程
			courseBasicInfo.setOnlineType(CourseOnlineTypeConstants.PUBLIC_PERSONAL_COURSE);
		} else if(CourseOnlineTypeConstants.PUBLIC_SCHOOL_COURSE == courseType){//学校公开课
			courseBasicInfo.setOnlineType(CourseOnlineTypeConstants.PUBLIC_SCHOOL_COURSE);
			courseBasicInfo.setSchoolId(schoolTeacher.getSchoolId());
		} else if(CourseOnlineTypeConstants.INSIDE_SCHOOL_COURSE == courseType){//校内课程
			courseBasicInfo.setOnlineType(CourseOnlineTypeConstants.INSIDE_SCHOOL_COURSE);
			courseBasicInfo.setCourseStatus(CourseStateConstants.endsignup);
			courseBasicInfo.setSchoolId(schoolTeacher.getSchoolId());
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
				//设置课节的价格为课程的价格
				courseClass.setPrice(course.getPrice());
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
						TeacherStudent teacherStudent = eduUserService.getTeacherStudent(uid, stuId);
						if(teacherStudent == null){
							teacherStudent = new TeacherStudent();
							teacherStudent.setUserid(stuId);
							teacherStudent.setTeacherId(uid);
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
	
	@RequestMapping(value="/course/update/{courseid}")
	public String updateCoursePage(@PathVariable("courseid") long courseid,HttpServletResponse response,Model model){
		//查询课程的基本信息
		CourseBasicInfo  courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		if(courseBasicInfo != null){
			Long teacherUid = this.getShiroUser().getUid();
			if(courseBasicInfo != null && courseBasicInfo.getCreateUid() == teacherUid){
				//查找课程的课节信息
				List<CourseClass> courseClasss = eduCourseService.listCourseClass(courseBasicInfo.getCourseid());
				//查找课程的老师信息
				UserBasicInfo teacherBasicInfo = eduUserService.getUserBasicInfo(courseBasicInfo.getTeacherUid());
				//查找课程的学生信息(pageSize为0表示不分页)
				List<Long> studentIds = eduCourseService.listCourseStudent(courseBasicInfo.getCourseid(), 0, 0);
				//课程分类信息
				List<CourseCategory> categoryPath = courseCategoryService.listCourseCategoryPath(courseBasicInfo.getItemsType());
				
				model.addAttribute("studentids", StringUtils.join(studentIds, ","));
				model.addAttribute("courseBasicInfo", courseBasicInfo);
				model.addAttribute("courseClasss", courseClasss);
				model.addAttribute("teacherBasicInfo", teacherBasicInfo);
				model.addAttribute("studentIds",studentIds);
				model.addAttribute("studentCount",studentIds.size());
				model.addAttribute("categoryPath", categoryPath);
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
	
	// 申请加入学校
	@ResponseBody
	@RequestMapping(value = "/applyToSchool")
	public String applyToSchool(@RequestParam long schoolid, HttpSession session,
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
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo == null){
				json.put("status", -100); //未成为老师，无权限进行该操作
				return json.toString();
			}
			List<SchoolsTeacher> list =  eduUserService.listmyAllSchools(uid);
			boolean bHadSchool = false;
			if (list != null) {
				for (SchoolsTeacher schoolsTeacher : list) {
					int nTemp = schoolsTeacher.getStatus();
					if (nTemp == SchoolMembersStatueConstant.pass
							|| nTemp == SchoolMembersStatueConstant.apply) {
						bHadSchool = true;
						break;
					}
				}
			}
			if (bHadSchool){
				json.put("status", -2); //已经加入过学校，不能再申请学校了
				return json.toString();
			}
			SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(schoolid, uid);
			if(schoolsTeacher == null){
				schoolsTeacher = new SchoolsTeacher();
				schoolsTeacher.setUserid(uid);
				schoolsTeacher.setSchoolId(schoolid);
			}
			schoolsTeacher.setJoinType(SchoolMembersStatueConstant.userapply);
			schoolsTeacher.setJoinDate(new Timestamp(System.currentTimeMillis()));
			schoolsTeacher.setStatus(SchoolMembersStatueConstant.apply);
			eduUserService.updateSchoolsTeacher(schoolsTeacher);
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}
	
	private List<JsSchoolTeacherRecordInfo> GetSchoolTeacherRecords(List<SchoolsTeacher> list){
		if(list != null){
			List<JsSchoolTeacherRecordInfo> toList = new ArrayList<JsSchoolTeacherRecordInfo>();
			for (SchoolsTeacher schoolsTeacher : list) {
				JsSchoolTeacherRecordInfo jsSchoolTeacherRecordInfo = new JsSchoolTeacherRecordInfo();
				jsSchoolTeacherRecordInfo.setSchoolid(schoolsTeacher.getSchoolId());
				AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(schoolsTeacher.getSchoolId());
				jsSchoolTeacherRecordInfo.setSchoolname(authSchoolInfo.getName());
				jsSchoolTeacherRecordInfo.setApplyTime(DateUtil.timestamp2String(schoolsTeacher.getJoinDate()));
				jsSchoolTeacherRecordInfo.setStatus(schoolsTeacher.getStatus());
				jsSchoolTeacherRecordInfo.setSchoollogo(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(authSchoolInfo.getCreaterUid());
				jsSchoolTeacherRecordInfo.setSchoolAdminRealName(userBasicInfo.getRealName());
				jsSchoolTeacherRecordInfo.setSchoolAdminNickName(userBasicInfo.getNickName());
				toList.add(jsSchoolTeacherRecordInfo);
			}
			
			return toList;
		}
		else {
			return null;
		}
	}
	
	
	// 我的学校列表
	@ResponseBody
	@RequestMapping(value = "/myjoinschools")
	public String myJoinSchools(HttpSession session,
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
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo == null){
				json.put("status", -100); //未成为老师，无权限进行该操作
				return json.toString();
			}
			List<SchoolsTeacher> list =  eduUserService.listMySchoolsBystatus(uid, SchoolMembersStatueConstant.pass);
			List<JsSchoolTeacherRecordInfo> toList = GetSchoolTeacherRecords(list);			
			if(toList != null)
				json.put("myschools", toList);
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}	
		
	
	
	// 申请加入学校所有记录
	@ResponseBody
	@RequestMapping(value = "/applySchoolRecords")
	public String applySchoolRecords(HttpSession session,
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
			List<SchoolsTeacher> list =  eduUserService.listMySchoolsByWay(uid, SchoolMembersStatueConstant.userapply);
			List<JsSchoolTeacherRecordInfo> toList = GetSchoolTeacherRecords(list);	
			if(toList != null)
				json.put("records", toList);
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}	
	
	// 学校邀请我的所有记录
	@ResponseBody
	@RequestMapping(value = "/schoolInviteRecords")
	public String schoolInviteRecords(HttpSession session,
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
			List<SchoolsTeacher> list =  eduUserService.listMySchoolsByWay(uid, SchoolMembersStatueConstant.admininvite);
			List<JsSchoolTeacherRecordInfo> toList = GetSchoolTeacherRecords(list);	
			if(toList != null)
				json.put("records", toList);
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}	

	// 我的签约解约记录
	@ResponseBody
	@RequestMapping(value = "/schoolContractRecords")
	public String schoolContractRecords(HttpSession session,
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
			List<SchoolsTeacher> list =  eduUserService.listmyAllSchools(uid);
			if(list != null){
				List<JsSchoolTeacherRecordInfo> toList = new ArrayList<JsSchoolTeacherRecordInfo>();
				for (SchoolsTeacher schoolsTeacher : list) {
					if(schoolsTeacher.getJoinType() != SchoolMembersStatueConstant.schoolimport &&
							(schoolsTeacher.getStatus() == SchoolMembersStatueConstant.pass ||
							schoolsTeacher.getStatus() == SchoolMembersStatueConstant.endcontract))
					{
						JsSchoolTeacherRecordInfo jsSchoolTeacherRecordInfo = new JsSchoolTeacherRecordInfo();
						jsSchoolTeacherRecordInfo.setSchoolid(schoolsTeacher.getSchoolId());
						jsSchoolTeacherRecordInfo.setContractEndTime(DateUtil.timestamp2String(schoolsTeacher.getContractEndTime()));
						jsSchoolTeacherRecordInfo.setApplyTime(DateUtil.timestamp2String(schoolsTeacher.getJoinDate()));
						jsSchoolTeacherRecordInfo.setStatus(schoolsTeacher.getStatus());
						AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(schoolsTeacher.getSchoolId());
						jsSchoolTeacherRecordInfo.setSchoolname(authSchoolInfo.getName());
						UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(authSchoolInfo.getCreaterUid());
						jsSchoolTeacherRecordInfo.setSchoolAdminRealName(userBasicInfo.getRealName());
						jsSchoolTeacherRecordInfo.setSchoolAdminNickName(userBasicInfo.getNickName());
						
						toList.add(jsSchoolTeacherRecordInfo);
					}
				}
				json.put("records", toList);
			}
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}		
	
	// 取消我的申请
	@ResponseBody
	@RequestMapping(value = "/cancelMyApply")
	public String cancelMyApply(@RequestParam long schoolid, HttpSession session,
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
			SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(schoolid, uid);
			if(schoolsTeacher == null || schoolsTeacher.getStatus() != SchoolMembersStatueConstant.apply){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				schoolsTeacher.setStatus(SchoolMembersStatueConstant.cancel);
				schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
				eduUserService.updateSchoolsTeacher(schoolsTeacher);
			}
			

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}	
	
	// 取消我的申请
	@ResponseBody
	@RequestMapping(value = "/reapplyToSchool")
	public String reapplyToSchool(@RequestParam long schoolid, HttpSession session,
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
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo == null){
				json.put("status", -100); //未成为老师，无权限进行该操作
				return json.toString();
			}
			SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(schoolid, uid);
			if(schoolsTeacher == null || schoolsTeacher.getStatus() != SchoolMembersStatueConstant.refuse){
				json.put("status", -2);
			}
			else {
				json.put("status", 0);
				schoolsTeacher.setStatus(SchoolMembersStatueConstant.apply);
				schoolsTeacher.setJoinDate(new Timestamp(System.currentTimeMillis()));
				eduUserService.updateSchoolsTeacher(schoolsTeacher);
			}
			

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return json.toString();
	}
	
	// 同意或者拒绝学校的邀请，nAgree ：1 同意， 2 拒绝
	@ResponseBody
	@RequestMapping(value = "/dealSchoolInvite",produces="application/json;charset=UTF-8")
	public String dealSchoolInvite(@RequestParam long schoolid, @RequestParam int nAgree, HttpSession session,
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
			SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(schoolid, uid);
			if(schoolsTeacher != null){
				schoolsTeacher.setOptDate(new Timestamp(System.currentTimeMillis()));
				if(nAgree == 1){
					//同意
					schoolsTeacher.setStatus(SchoolMembersStatueConstant.pass);
					schoolsTeacher.setHaveRight(SchoolMemberRightConstant.createcourse);
				}else {
					schoolsTeacher.setStatus(SchoolMembersStatueConstant.refuse);
				}
				eduUserService.updateSchoolsTeacher(schoolsTeacher);
				json.put("status", 0); 				
			}else {
				json.put("status", -1);
			}			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return json.toString();
	}
	
	@RequestMapping(value="/course/manage",method=RequestMethod.GET)
	public String manageCourse(HttpServletRequest request){
		request.setAttribute("curPageName", "我的课程");
		return COURSE_MANAGE;
	}
	

	@RequestMapping(value="/course/list")
	@ResponseBody
	public String listCourse(Integer courseType,String courseName, String creatorName, Integer courseStatus, String startCreateTime,String endCreateTime, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10")int pageSize){
		JSONObject json = new JSONObject();
		long teacherUid = this.getShiroUser().getUid();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setOnlineType(courseType);
		example.setTeacherUid(teacherUid);
		example.setCourseName(courseName);
		example.setCreatorName(creatorName);
		if(courseStatus == Integer.valueOf(1)){					//已完成(查询所有课节都完成的课程)
			example.getCourseStatus().add(CourseStateConstants.COURSE_FINISH);
		} else if(courseStatus == Integer.valueOf(2)){			//已取消(查询课程状态为取消的课程：自动取消)
			example.getCourseStatus().add(CourseStateConstants.COURSE_CANCEL_REFUND);
		} else {												//查询全部
			
		}
		example.setStartCreateTime(startCreateTime);
		example.setEndCreateTime(endCreateTime);
		
		PageInfo<Map<String,Object>> pageInfo = courseService.listTeacherCourseDetailPage(example, page, pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/searchCourse")
	@ResponseBody
	public String searchCourse(String keyword,Double minPrice,Double maxPrice, String startCreateTime,String endCreateTime, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10")int pageSize){
		JSONObject json = new JSONObject();
		long teacherUid = this.getShiroUser().getUid();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setTeacherUid(teacherUid);
		example.setKeyword(keyword);
		example.setMinPrice(minPrice);
		example.setMaxPrice(maxPrice);
		example.setStartCreateTime(startCreateTime);
		example.setEndCreateTime(endCreateTime);
		
		PageInfo<Map<String,Object>> pageInfo = courseService.listTeacherCourseDetailPageNew(example, page, pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	/**
	 * 发布和取消发布课程(老师只能发布和取消发布自己创建的课程)
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
			json.put("statue", -1);
		} else {
			if(uid != course.getCreateUid()){
				json.put("status", -3);
				json.put("message", "课程发布失败，您只能发布自己创建的课程.");
				return json.toString();
			}
			//产品需求，如果课程报名开始后再点发布，需要修改报名时间晚于此时才能发布
			if(course.getCourseStatus() != CourseStateConstants.had_created ){
				json.put("message", "课程状态不对，无法进行发布或取消发布，请修改课程信息，再进行发布");
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
			
			if (course.getTeacherUid() != uid) {
				//不是自己的课，核对是否为学校的课
				boolean bOpt = true;
				if (course.getSchoolId() > 0) {
					AuthSchoolInfo authSchoolInfo = eduUserService
							.getSchoolInfoById(course.getSchoolId());
					if (authSchoolInfo.getCreaterUid() != uid) {					
						bOpt = false;
					}
				}else {
					bOpt = false;				
				}
				if(!bOpt){
					json.put("message", "你没权限停止该课，请核对信息");
					json.put("statue", -3);
					return json.toString();
				}
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
		int toStopFee = Integer.parseInt(session.getAttribute("stoptopayfee").toString());
		long toStopCourseid = Long.parseLong(session.getAttribute("stopcourseid").toString());
		if(toStopCourseid != courseid){
			json.put("message", "参数错误！");
			json.put("statue", -1);
			return json.toString();
		}
//		session.removeAttribute("stoptopayfee");
//		session.removeAttribute("stopcourseid");
		CourseBasicInfo course = eduCourseService.getCourseBasicInfoByCourseidAndCreateUid(courseid, uid);
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
	
	/**
	 * 删除课程
	 * 	1.课程没有人报名
	 *  2.课程已经完成
	 *  3.课程已经取消
	 * @param courseid 课程id
	 * @return 
	 */
	@RequestMapping(value="/course/delete",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public String deleteCourse(@RequestParam("courseid") long courseid){
		JSONObject jsonObject = new JSONObject();
		CourseClass courseClass = eduCourseService.getCourseClassByCourseid(courseid);
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		if(courseClass == null || courseBasicInfo == null){
			jsonObject.put("message", "您要删除的课程已经 不存在");
			return jsonObject.toString();
		} 
		if(courseBasicInfo.getTeacherUid() != this.getShiroUser().getUid()){
			jsonObject.put("message", "您没有删除此课程的权限");
			return jsonObject.toString();
		} 
		if( courseClass.getClassState() != CourseStateConstants.COURSE_CLASS_CANCEL&&courseClass.getClassState() != CourseStateConstants.COURSE_END ){
			jsonObject.put("message", "课程不允许删除");
			return jsonObject.toString();
		}
		eduCourseService.updateCourseDisplayType(courseid,DisplayTypeConstants.NOT_DISPLAY);
		jsonObject.put("success", true);
		return jsonObject.toString();
	}
	
	
	@RequestMapping(value="/listOrders")
	@ResponseBody
	public String listOrders(){
		return "";
	}
	
	@RequestMapping(value="/listSchools")
	@ResponseBody
	public String listSchools(){
		return null;
	}
	
	@RequestMapping(value="/listStudents")
	@ResponseBody
	public String listStudents(@RequestParam(defaultValue="1") int type,StudentQueryExample example,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		JSONObject json = new JSONObject();
		long teacherUid = this.getShiroUser().getUid();
		example.setTeacherUid(teacherUid);
		PageInfo<TeacherStudentDto> pageInfo = null;
		if(type == 1){
			//TODO 校内学生
			example.setInsideSchool(1);
			pageInfo = userService.listTeacherStudentByExamplePage(example,page,pageSize);
		} else if(type == 2){
			//TODO 校外学生
			example.setOutsideSchool(1);
			pageInfo = userService.listTeacherStudentByExamplePage(example,page,pageSize);
		} else {
			json.put("status", -1);
			return json.toString();
		}
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("status", 0);
		return json.toString();
	}
	
	@RequestMapping(value = "/toDocManage")
	public String docManage(HttpServletRequest request) {
		request.setAttribute("curPageName", "教学资料库");
		return DOCUMENT_MANAGE;
	}
	
	@RequestMapping("/listCourseName")
	@ResponseBody
	public String listCourseName(){
		JSONObject json = new JSONObject();
		long teacherUid = this.getShiroUser().getUid();
		List<Map<String,Object>> result = courseService.listCourseNameByTeacherUid(teacherUid);
		json.put("result", result);
		json.put("status", 0);
		return json.toString();
	}
	
	@RequestMapping("/file/list")
	@ResponseBody
	public String listCourseFile(@RequestParam long courseid){
		JSONObject json = new JSONObject();
		try {
			long uid = this.getShiroUser().getUid();
			List<Map<String,Object>> files = courseFileService.listCourseFileByCourseidAndUid(courseid,uid);
			json.put("result", files);
			json.put("status", 0);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -100);
		}
		return json.toString();
	}
	
	/**
	 * 课件资料上传 吗,(单次文件上传的数量限制为20个，并且限制单个文件的上传大小为50M)
	 * @param courseid
	 * @param request
	 * @return 
	 */
	@RequestMapping(value="uploadFile",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFile(@RequestParam long courseid,HttpServletRequest request){
		long uid = this.getShiroUser().getUid();
		JSONObject json = new JSONObject();
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;     
        List<MultipartFile> fielItems = multipartRequest.getFiles("fileField");
        
        if(fielItems == null){
        	json.put("status", -1);
        	json.put("message", "请选择要上传的文件！");
        	return json.toString();
        } 
        /*else if(fielItems.size() > 20){
        	json.put("status", -1);
        	json.put("message", "每堂课上传课件数量不能超过20个!");
        	return json.toString();
        }*/
        if(courseid != 1){
        	List<CourseFile> courseFiles = eduCourseService.listCourseFileByCourseid(courseid);
            if(fielItems.size() + (courseFiles == null?0:courseFiles.size()) > 20){
            	json.put("status", -1);
            	json.put("message", "每堂课上传课件数量不能超过20个!");
            	return json.toString();
            }
        }
        String fileName = "";
		String tempFilePath = "";
		String filemd5 = "";
		String token = "";
		File tempFile = null;
		
		int totalNum = fielItems.size();
		int successNum = 0;
		int failNum = 0;
		
        if(fielItems != null && fielItems.size()>0){
        	for (MultipartFile fileItem : fielItems) {
        		try {
    				fileName = fileItem.getOriginalFilename();
    				//文件类型校验
    				String fileExt = StringUtils.substringAfterLast(fileName, ".").toLowerCase();
    				String[] allowFileExtArr = SystemConfigs.allowFileExt.split(",");
    				if(!ArrayUtils.contains(allowFileExtArr, fileExt)){
    					throw new IllegalStateException();
    				}
    				//文件大小校验
    				long fileSize = fileItem.getSize();
    				if(fileSize>SystemConfigs.fileSizeLimit){
    					throw new IllegalStateException();
    				}
    				tempFilePath = SystemConfigs.FILE_UP_TEMP_PATH +  courseid + "_" + fileName;
    				tempFile = new File(tempFilePath);
    				FileUtils.copyInputStreamToFile(fileItem.getInputStream(), tempFile);
    				filemd5 = FileUploadUtil.getFileMD5(tempFile) + "." + fileExt;
    				
    				String result = FileUploadUtil.upfile(SystemConfigs.EDUUPTOKEN, null, null);
					token = (String) JSONObject.fromObject(result).get("token");
					Map<String, String> params=new HashMap<String, String>();
					params.put("uid", String.valueOf(uid));
					params.put("t", token);
					params.put("old",fileName);
					params.put("filemd5", filemd5);
					params.put("POS", "1");  //1表示WEB端上传，2 客户端上传， 3手机客户端上传
					Map<String, File> files = new HashMap<String, File>();
					files.put("myfile", tempFile);
					FileUploadUtil.upfile(SystemConfigs.USER_FILE + courseid + "/0", params, files);
					successNum += 1;
        		}  catch (Exception e) {
        			failNum += 1;
        			logger.error(e.getMessage(), e);
        		}
			}
        }
        json.put("status", 0);
        json.put("message", "总共上传[" +totalNum + "]个文件，成功[" + successNum + "]个，失败[" + failNum +"]个." );
		return json.toString();
	}
	
	@RequestMapping("/deleteFile")
	@ResponseBody
	public String deleteFile(@RequestParam(value="fileids[]") List<Long> fileids){
		JSONObject json = new JSONObject();
		if(fileids == null || fileids.size()== 0){
			json.put("status", -1);
		} else {
			courseFileService.deleteFile(fileids);
			json.put("status", 0);
		}
		return json.toString();
	}
	
	@RequestMapping(value="/renameFile",method=RequestMethod.POST)
	@ResponseBody
	public String renameFile(@RequestParam long fileid,@RequestParam String newName){
		JSONObject json = new JSONObject();
		if(StringUtils.isEmpty(newName)){
			json.put("status", -1);
			json.put("message","新文件名称不能为空！");
			return json.toString();
		} 
		CourseFile courseFile = courseFileService.getCourseFileById(fileid);
		if(courseFile.getFilename().equals(newName)){
			json.put("status", -1);
			json.put("message", "新名称不能与旧名称相同！");
			return json.toString();
		}
		try {
			courseFileService.renameFile(courseFile, newName);
			json.put("status", 0);
		} catch (BusinessException e) {
			json.put("status", -2);
			json.put("message", e.getMessage());
		}
		return json.toString();
	}
	
	@RequestMapping("/lockFile")
	@ResponseBody
	public String lockFile(@RequestParam long fileid){
		JSONObject json = new JSONObject();
		courseFileService.lockFile(fileid);
		json.put("status", 0);
		return json.toString();
	}
	
	@RequestMapping("/unLockFile")
	@ResponseBody
	public String unLockFile(@RequestParam long fileid){
		JSONObject json = new JSONObject();
		courseFileService.unLockFile(fileid);
		json.put("status", 0);
		return json.toString();
	}
	
	@RequestMapping("/gettordercount")
	@ResponseBody
	public String GetTeacherOrdersCount(HttpServletRequest request,HttpServletResponse response){
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
			int ncount = eduCourseService.countMyAllOrdersTeacher(uid);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	@RequestMapping("/gettorderlist")
	@ResponseBody
	public String GetTeacherOrdersList(@RequestParam int page, @RequestParam int nRows,HttpServletRequest request,HttpServletResponse response){
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
			int nstart = 0;
			if(page != 1){
				nstart = (page-1)*nRows;
			}
			List<UserOrder> list = eduCourseService.listMyOrdersTeacher(uid, nstart, nRows);
			if(list != null){
				List<JsStudentOrderShowInfo> toList = new ArrayList<JsStudentOrderShowInfo>();
				for (UserOrder userOrder : list) {
					JsStudentOrderShowInfo showInfo = new JsStudentOrderShowInfo();
					showInfo.setOrderId(userOrder.getOrderId());
					showInfo.setCourseprice((float)userOrder.getCoursePrice() / 100);
					///TODO:优惠方式待加
					showInfo.setStatus(userOrder.getStatus());
					showInfo.setRealprice((float)userOrder.getRealPrice() / 100);
					showInfo.setCreatetime(DateUtil.timestamp2String(userOrder.getCreateDate()));
					CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
					showInfo.setCourseName(courseBasicInfo.getCourseName());
					showInfo.setCoursebgimgUrl(courseBasicInfo.getCoverUrl());
					UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(userOrder.getUserid());
					showInfo.setTeachername(userBasicInfo.getNickName());
					if(courseBasicInfo.getSchoolId() > 0){
						AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
						if(authSchoolInfo != null){
							showInfo.setSchoolname(authSchoolInfo.getName());
						}
					}
					toList.add(showInfo);
				}	
				json.put("orders", toList);
			}
			
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	@RequestMapping("/gettorderstatuscount")
	@ResponseBody
	public String GetTeacherOrdersstatusCount(@RequestParam int status, HttpServletRequest request,HttpServletResponse response){
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
			int ncount = eduCourseService.countMyAllOrdersStatusTeacher(uid, status);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	@RequestMapping("/gettorderstatuslist")
	@ResponseBody
	public String GetTeacherOrdersstatusList(@RequestParam int status,@RequestParam int page, @RequestParam int nRows,HttpServletRequest request,HttpServletResponse response){
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
			int nstart = 0;
			if(page != 1){
				nstart = (page-1)*nRows;
			}
			List<UserOrder> list = eduCourseService.listMyOrdersStatusTeacher(uid, status, nstart, nRows);
			if(list != null){
				List<JsStudentOrderShowInfo> toList = new ArrayList<JsStudentOrderShowInfo>();
				for (UserOrder userOrder : list) {
					JsStudentOrderShowInfo showInfo = new JsStudentOrderShowInfo();
					showInfo.setOrderId(userOrder.getOrderId());
					showInfo.setCourseprice(userOrder.getCoursePrice());
					///TODO:优惠方式待加
					showInfo.setStatus(userOrder.getStatus());
					showInfo.setRealprice(userOrder.getRealPrice());
					showInfo.setCreatetime(DateUtil.timestamp2String(userOrder.getCreateDate()));
					CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
					showInfo.setCourseName(courseBasicInfo.getCourseName());
					showInfo.setCoursebgimgUrl(courseBasicInfo.getCoverUrl());
					UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(userOrder.getUserid());
					showInfo.setTeachername(userBasicInfo.getNickName());
					if(courseBasicInfo.getSchoolId() > 0){
						AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
						if(authSchoolInfo != null){
							showInfo.setSchoolname(authSchoolInfo.getName());
						}
					}
					toList.add(showInfo);
				}	
				json.put("orders", toList);
			}
			
			
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	
	//更改老师形象照头像
	@ResponseBody
	@RequestMapping(value = "/upteacherimage", produces = "application/json;charset=UTF-8")
	public String upteacherimage(HttpServletRequest request,HttpServletResponse response ,@RequestParam String filepath)
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
				AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
				authTeacherInfo.setHeadImage(name);
				eduUserService.UpdateAuthTeacherInfo(authTeacherInfo);
				json.put("status", 0);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		
	
		
		return json.toString();
	}
	
	
	
}
