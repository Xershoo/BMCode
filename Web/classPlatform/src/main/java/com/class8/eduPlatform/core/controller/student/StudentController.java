package com.class8.eduPlatform.core.controller.student;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.CourseStudentSignupType;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.constants.RefundCourseRateConstants;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.bean.JsStudentOrderShowInfo;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;
/**
 * 学生个人操作相关的控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/student")
public class StudentController extends BaseController {
	
	public static final String CENTER = "/student/studentIndex";
	public static final String COURSE = "/studentCourse";
	public static final String ORDER = "";
	public static final String DATAPACK = "";
	public static final String COUPON = "";
	public static final String INDEX = "/student/studentIndex";
	
	public static final String PAY_DETAIL = "/course/payCourses";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduPayService	eduPayService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(value="/index",method=RequestMethod.GET)
	public String index(Model model){
		long uid = getShiroUser().getUid();
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
		userBasicInfo.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
		model.addAttribute("student", userBasicInfo);
		//查询学生所属的学校信息
		AuthSchoolInfo authSchoolInfo = null;
		if(userBasicInfo.getRecommendUid() != 0){
			authSchoolInfo = userService.getAuthSchoolInfoByRecommendUid(userBasicInfo.getRecommendUid());
		}
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		return INDEX;
	}
	
	@RequestMapping(value="/course",method=RequestMethod.GET)
	private String coursePage(){
		return COURSE;
	}
	
	@RequestMapping(value="/order",method=RequestMethod.GET)
	public String orderPage(){
		return ORDER;
	}
	
	@RequestMapping(value="/datapack",method=RequestMethod.GET)
	public String datapackPage(){
		return DATAPACK;
	}
	
	@RequestMapping(value="/coupon",method=RequestMethod.GET)
	public String couponPage(){
		return COUPON;
	}
	
	@RequestMapping("/course/list")
	@ResponseBody
	public String listCourse(@RequestParam(required=false) String courseName, @RequestParam(required=false) String startSignupTime,@RequestParam(required=false)  String endSignupTime,@RequestParam(defaultValue="0") Integer courseStatus, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		//当前登录学生的id
		long studentUid = this.getShiroUser().getUid();
		JSONObject json = new JSONObject();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setStudentUid(studentUid);
		example.setCourseName(courseName);
		example.setStartSignupTime(startSignupTime);
		example.setEndSignupTime(endSignupTime);
		if(Integer.valueOf(1).equals(courseStatus)){					//已完成(现在只查询课程的所有课节已经完成)
			example.getCourseStatus().add(CourseStateConstants.COURSE_FINISH);
		} else if(Integer.valueOf(2).equals(courseStatus)){				//已取消(查询课程付款后被取消的课程)
			example.getSignupStatus().add(OrderStatusConstant.autocancel);
			example.getSignupStatus().add(OrderStatusConstant.refunding);
			example.getSignupStatus().add(OrderStatusConstant.refunded);
		} else {														//全部(只包括订单状态为付款后的所有状态的课程，只报名或取消的课程不属于我的课程)
			example.getSignupStatus().add(OrderStatusConstant.hadpay);
			example.getSignupStatus().add(OrderStatusConstant.paytoteacher);
			example.getSignupStatus().add(OrderStatusConstant.autocancel);
			example.getSignupStatus().add(OrderStatusConstant.refunding);
			example.getSignupStatus().add(OrderStatusConstant.refunded);
		}
		
		PageInfo<Map<String,Object>> pageInfo = courseService.listStudentCourseDetailPage(example,page,pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping("/searchCourse")
	@ResponseBody
	public String searchCourse(String keyword,Double minPrice,Double maxPrice, String startSignupTime,String endSignupTime, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		//当前登录学生的id
		long studentUid = this.getShiroUser().getUid();
		JSONObject json = new JSONObject();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setStudentUid(studentUid);
		example.setKeyword(keyword);
		example.setStartSignupTime(startSignupTime);
		example.setEndSignupTime(endSignupTime);
		
		PageInfo<Map<String,Object>> pageInfo = courseService.listStudentCourseDetailPageNew(example,page,pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/toPayCourse/{courseId}")
	public String payDetailPage(@PathVariable("courseId") long courseId,Model model){
		model.addAttribute("courseId", courseId);
		return PAY_DETAIL;  
	}

	//点击报名,classid暂时为0
	@RequestMapping("/tosignupcourse")
	@ResponseBody
	public String toSignupCourse(@RequestParam long courseid,@RequestParam long classid,
			HttpServletRequest request,HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		classid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(uid, courseid, classid);
		if(courseStudent != null){
			if(courseStudent.getSignupType() == CourseStudentSignupType.SCHOOL )
			{
				json.put("status", -2); //学校已经把学生加入课程，不需要再报名
				return json.toString();
			}else if(courseStudent.getSignupStatus() != OrderStatusConstant.cancel &&
					courseStudent.getSignupStatus() != OrderStatusConstant.autocancel )
			{
				json.put("status", -3); //学生已经报名了，不用重复报，或者已经付款了
				return json.toString();
			}
		}
		
		
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(courseid);
		if(null == course) {  
			json.put("message", "参数错误！");
			json.put("status", -4);
			return json.toString();
		} 
		
		
		if(course.getTeacherUid() == uid){
			json.put("message", "不能报名自己的课");
			json.put("status", -6);
			return json.toString();
		}
		
		json.put("cousename", course.getCourseName());
		json.put("courseimg", course.getCoverUrl());
		if(course.getSchoolId() > 0){
			AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(course.getSchoolId());
			if(authSchoolInfo != null)
				json.put("schoolname", authSchoolInfo.getName());
		}
		UserBasicInfo teacherinfo = eduUserService.getUserBasicInfo(course.getTeacherUid());
		if(!StringUtils.isEmpty(teacherinfo.getRealName()))
			json.put("teachername", teacherinfo.getRealName());
		else {
			json.put("teachername", teacherinfo.getNickName());
		}
		json.put("price", course.getPriceTotal());
		json.put("topay", course.getPriceTotal());
		json.put("status", 0);
		///TODO:课堂上课时间，没有。先不管，待定
		//json.put("time", ) 
		//查询课程的计划上课时间和计划结束时间
		List<CourseClass> courseClasss = eduCourseService.listCourseClass(course.getCourseid());
		if(courseClasss != null){
			CourseClass courseClass = courseClasss.get(0);
			json.put("startTimePlan", DateUtil.timestamp2String(courseClass.getStartTimePlan(), DateUtil.YYYY_MM_DD_HH_MM));
			json.put("endTimePlan", DateUtil.timestamp2String(courseClass.getEndTimePlan(), DateUtil.YYYY_MM_DD_HH_MM));
		}
		json.put("status", 0);
		return json.toString();
	}
	
	//提交订单，couponid 为 0， classid 暂时为0
	@RequestMapping("/submitOrder")
	@ResponseBody
	public String submitOrder(@RequestParam long courseid,@RequestParam long classid,@RequestParam long couponid,
			HttpServletRequest request,HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		classid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(uid, courseid, classid);
		if(courseStudent != null){
			if(courseStudent.getSignupType() == CourseStudentSignupType.SCHOOL )
			{
				json.put("status", -2); //学校已经把学生加入课程，不需要再报名
				return json.toString();
			}else if(courseStudent.getSignupStatus() != OrderStatusConstant.cancel && 
					courseStudent.getSignupStatus() != OrderStatusConstant.autocancel)
			{
				json.put("status", -3); //学生已经报名了，不用重复报，或者已经付款了
				return json.toString();
			}
		}
		
		
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(courseid);
		if(null == course) {
			json.put("message", "参数错误！");
			json.put("status", -4);
			return json.toString();
		}
		
		int nHadSignup = eduCourseService.countCourseStudentStatus(courseid, classid, OrderStatusConstant.hadpay);
		//nHadSignup += eduCourseService.countCourseStudentStatus(courseid, classid, OrderStatusConstant.topay);  //报名的还没付款的也先算上
		if(course.getnMaxStudents() <= nHadSignup){
			json.put("message", "报名人数已满");
			json.put("status", -6);
			return json.toString();
		}
		
		UserOrder userOrder = new UserOrder();
		userOrder.setUserid(uid);
		userOrder.setTeacherid(course.getTeacherUid());
		userOrder.setCourseId(courseid);
		userOrder.setClassId(classid);
		int nPrice = (int)(course.getPriceTotal() * 100);
		userOrder.setCoursePrice(nPrice);
		//获取优惠价格等，如果有优惠券之类的，学生实际付款和老师实际到账的金额会不一致，这是正常的
		userOrder.setRealPrice(nPrice);
		userOrder.setTeacherIncomePrice(nPrice);
		long nowMi = System.currentTimeMillis();
		userOrder.setCreateDate(new Timestamp(nowMi));
		userOrder.setLastPayDate(new Timestamp(nowMi + 1800000));//30分钟的付款时间，超过自动取消
		userOrder.setStatus(OrderStatusConstant.topay);
		userOrder = eduCourseService.StudentSignupCourse(userOrder);
		if( userOrder != null){
			json.put("status", 0);
			json.put("orderid",	userOrder.getOrderId());
		}
		else {
			json.put("status", -5); //不知明错误
		}
		
		return json.toString();
	}
	
	@RequestMapping("/getsordercount")
	@ResponseBody
	public String GetStudentOrdersCount(HttpServletRequest request,HttpServletResponse response){
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
			int ncount = eduCourseService.countMyAllOrders(uid);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	@RequestMapping("/getsorderlist")
	@ResponseBody
	public String GetStudentOrdersList(@RequestParam int page, @RequestParam int nRows,HttpServletRequest request,HttpServletResponse response){
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
			List<UserOrder> list = eduCourseService.listMyOrders(uid, nstart, nRows);
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
					AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(courseBasicInfo.getTeacherUid());
					showInfo.setTeachername(authTeacherInfo.getRealName());
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
	
	@RequestMapping("/getsorderstatuscount")
	@ResponseBody
	public String GetStudentOrdersstatusCount(@RequestParam int status, HttpServletRequest request,HttpServletResponse response){
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
			int ncount = eduCourseService.countMyAllOrdersStatus(uid, status);
			json.put("count", ncount);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return json.toString();
	}
	
	@RequestMapping("/getsorderstatuslist")
	@ResponseBody
	public String GetStudentOrdersstatusList(@RequestParam int status,@RequestParam int page, @RequestParam int nRows,HttpServletRequest request,HttpServletResponse response){
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
			List<UserOrder> list = eduCourseService.listMyOrdersStatus(uid, status, nstart, nRows);
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
					AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(courseBasicInfo.getTeacherUid());
					showInfo.setTeachername(authTeacherInfo.getRealName());
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
	
	@RequestMapping("/refundorder")
	@ResponseBody
	public String refundOrder(@RequestParam String orderid,HttpServletRequest request,HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();		
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			long uid = 0;
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			try {
				UserOrder userOrder = eduCourseService.getsimpleUserOrder(orderid);
				if(uid != userOrder.getUserid()){
					json.put("status", -2); //订单用户不是本人的
					return json.toString();
				}
				if(userOrder.getStatus() != OrderStatusConstant.hadpay){
					json.put("status", -3); //订单不是已支付的状态，或者没付款，或者已经退款
					return json.toString();
				}
				CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
				//只有处于报名中的课程才能申请退款
				if(courseBasicInfo.getCourseStatus() != CourseStateConstants.besignuping){
					json.put("status", -4); //课程已经开始，暂时不允许退款
					return json.toString();
				}
				PayBaseController.RefundOrder(userOrder, RefundCourseRateConstants.studentrefund_notbegin);
				json.put("status", 0);
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
				json.put("status", -100);
			}
			
			
		}
		
		return json.toString();
	}
	
}
