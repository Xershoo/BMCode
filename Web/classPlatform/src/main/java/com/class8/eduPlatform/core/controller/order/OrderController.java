package com.class8.eduPlatform.core.controller.order;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.OrderQueryExample;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.bean.JsShowSchoolInfo;
import com.class8.eduPlatform.core.bean.JsStudentOrderShowInfo;
import com.class8.eduPlatform.core.bean.StudentOrder;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.core.bean.JsTradeRecordInfo;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.Chargeorderform;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.ChargePaygatewayConstant;
import com.class8.pay.common.constants.ChargeorderformTypeConstant;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
/**
 * 订单操作相关的控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/order")
public class OrderController extends BaseController {
	public static final String STUDENT_ORDER = "/order/studentOrder";
	public static final String TEACHER_ORDER = "/order/manageOrder";
	public static final String SHOW_TRADE_RECORD = "/pay/showTradeRecord";
	
	@Autowired
	IEduPayService iEduPayService;
	@Autowired
	IEduCourseService  eduCourseService;
	@Autowired
	IEduUserService		eduUserService;
	
	@RequestMapping("/list")
	public String list(){
		return "";
	}
	
	@RequestMapping("/cancel")
	public String cancel(){
		return "";
	}
	
	@RequestMapping("/delete")
	public String delete(){
		return "";
	}
	//学生订单页面
	@RequestMapping(value="/studentOrder")
	public  String studentOrder(HttpServletRequest request){
		JSONObject jsonObject  = new JSONObject(); 
		Subject subject = SecurityUtils.getSubject();  
        if (!subject.isAuthenticated()) {  
        	return "/index";
        }
        
        request.setAttribute("curPageNum", "我的订单");
		return STUDENT_ORDER;
	}
	//老师订单页面
	@RequestMapping(value="/manageOrder")
	public  String manageOrder(){
		JSONObject jsonObject  = new JSONObject(); 
		Subject subject = SecurityUtils.getSubject();  
        if (!subject.isAuthenticated()) {  
        	return "/index";
        }
		return TEACHER_ORDER;
	}
	@RequestMapping(value = "/toShowTradeRecord")
	public String showTradeRecord(HttpServletRequest request) {
		request.setAttribute("curPageName", "我的财富");
		return SHOW_TRADE_RECORD;
	}
	
	//取消订单
	@ResponseBody
	@RequestMapping(value = "/cancelorder ")
	public String CancelOrder(@RequestParam String orderid, HttpSession session,
			HttpServletRequest request,HttpServletResponse response) {
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
			
			UserOrder userOrder = eduCourseService.getsimpleUserOrder(orderid);
			if(userOrder == null || userOrder.getUserid() != uid){
				json.put("status", -2); //订单号错误,不存在或者不是自己的订单，一般是号错误
				return json.toString();
			} 
			if(userOrder.getStatus() != OrderStatusConstant.topay){
				json.put("status", -3); //订单不能取消
				return json.toString();
			} 
			
			userOrder.setStatus(OrderStatusConstant.cancel);
			eduCourseService.updateUserOrder(userOrder);
			
			CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(uid, userOrder.getCourseId(), userOrder.getClassId());
			courseStudent.setSignupStatus(OrderStatusConstant.cancel);
			eduCourseService.updateCourseStudent(courseStudent);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return json.toString();
	}
	

	@RequestMapping(value = "/payStudentOrder ")
	public ModelAndView getAllSchoolList( StudentOrder studentOrder,HttpSession session,HttpServletResponse response,HttpServletRequest request) {
		ModelAndView mav = new ModelAndView("/pay/payStudentOrder");
		try {
			String courseName=URLDecoder.decode(studentOrder.getCourseName(),"utf-8");
			String orderId=URLDecoder.decode(studentOrder.getOrderId(),"utf-8");
			String price=URLDecoder.decode(studentOrder.getPrice(),"utf-8");
			String schoolName=URLDecoder.decode(studentOrder.getSchoolname(),"utf-8");
			String teacherName=URLDecoder.decode(studentOrder.getTeacherName(),"utf-8");
			mav.addObject("courseName",courseName);
			mav.addObject("orderId",orderId);
			mav.addObject("price",price);
			mav.addObject("schoolName",schoolName);
			mav.addObject("teacherName",teacherName);
			
		} catch (Exception e) {
			e.printStackTrace();
			mav.addObject("orders",null);
		}
		
		request.setAttribute("curPageName", "订单支付");
		return mav;
	}
	
	//type < 0 获取所有的记录，否则获取相应的记录个数，类型见 PayAccountBillTypeConstant
	@ResponseBody
	@RequestMapping(value = "/getaccountbillscount ")
	public String GetAccountBillsCount(@RequestParam int type,
			HttpSession session, HttpServletRequest request,
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

			int ncount = iEduPayService.countPayAccountBill(uid, type);
			json.put("status", 0);
			json.put("count", ncount);

		} catch (Exception e) {
			json.put("status", -100);
			// TODO: handle exception
		}

		return json.toString();
	}
	// 获取交易记录 
	//type < 0 获取所有的记录，否则获取相应的记录个数，类型见 PayAccountBillTypeConstant
	@ResponseBody
	@RequestMapping(value = "/getaccountbills ")
	public String GetAccountBills(@RequestParam int type,@RequestParam int page, @RequestParam int rows, 
			HttpSession session, HttpServletRequest request,
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
			int nstart = 0;
			if(page != 1){
				nstart = (page-1) * rows;
			}

			List<PayAccountBillInfo> list = iEduPayService.listPayAccountBill(uid, type, nstart, rows);
			if(list != null && list.size() > 0){
				List<JsTradeRecordInfo> toList = new ArrayList<JsTradeRecordInfo>();
				for (PayAccountBillInfo payAccountBillInfo : list) {
					JsTradeRecordInfo jsTradeRecordInfo = new JsTradeRecordInfo();
					jsTradeRecordInfo.setTradeNo(Long.toString(payAccountBillInfo.getSerialId()));
					jsTradeRecordInfo.setTradeTime(DateUtil.timestamp2String(payAccountBillInfo.getBillTime()));
					jsTradeRecordInfo.setType(payAccountBillInfo.getBillType());
					if(payAccountBillInfo.getBillType() == PayAccountBillTypeConstant.pay_trade){
						UserOrder userOrder = eduCourseService.getsimpleUserOrder(payAccountBillInfo.getBillid());
						if(userOrder != null){
							CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
							jsTradeRecordInfo.setCourseName(courseBasicInfo.getCourseName());
							AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(courseBasicInfo.getTeacherUid());
							jsTradeRecordInfo.setOtherName(authTeacherInfo.getRealName());
						}
						int toGetAll = payAccountBillInfo.getPayoutNormal() + payAccountBillInfo.getPayoutFee();
						float price = BigDecimal.valueOf(toGetAll).divide(new BigDecimal(100)).floatValue();
						jsTradeRecordInfo.setPrice(price);
					}
					else if(payAccountBillInfo.getBillType() == PayAccountBillTypeConstant.income_trade){
						UserOrder userOrder = eduCourseService.getsimpleUserOrder(payAccountBillInfo.getBillid());
						if(userOrder != null){
							CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
							jsTradeRecordInfo.setCourseName(courseBasicInfo.getCourseName());
							UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(payAccountBillInfo.getTheOtherUserid());
							jsTradeRecordInfo.setOtherName(userBasicInfo.getNickName());
						}
						int toGetAll = payAccountBillInfo.getIncomeNormal() + payAccountBillInfo.getIncomeFee();
						float price = BigDecimal.valueOf(toGetAll).divide(new BigDecimal(100)).floatValue();
						jsTradeRecordInfo.setPrice(price);
					}
					else if(payAccountBillInfo.getBillType() == PayAccountBillTypeConstant.charge){
						if(payAccountBillInfo.getTheOtherUserid() == ChargePaygatewayConstant.alipapa)
							jsTradeRecordInfo.setOtherName("支付宝");
						else if(payAccountBillInfo.getTheOtherUserid() == ChargePaygatewayConstant.weixin)
							jsTradeRecordInfo.setOtherName("微信");
						jsTradeRecordInfo.setCourseName(Float.toString(payAccountBillInfo.getBlanceOther() + payAccountBillInfo.getBlanceOther()));
						int toGetAll = payAccountBillInfo.getIncomeNormal() + payAccountBillInfo.getIncomeFee();
						float price = BigDecimal.valueOf(toGetAll).divide(new BigDecimal(100)).floatValue();
						jsTradeRecordInfo.setPrice(price);
					}
					toList.add(jsTradeRecordInfo);
				}
				json.put("status", 0);
				json.put("list", toList);
			}
			else {
				json.put("status", -2);//未获取到
			}

		} catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
			// TODO: handle exception
		}

		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/searchorders ")
	public String searchOrders(@RequestParam int usertype,
			HttpSession session, HttpServletRequest request,
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
			
			String orderkey = request.getParameter("order");
			String coursenamekey = request.getParameter("coursename");
			String buyerkey = request.getParameter("buyer");
			String datekey = request.getParameter("date");
			
			OrderQueryExample orderQueryExample = new OrderQueryExample();
			if(!StringUtils.isEmpty(orderkey))
				orderQueryExample.setOrderKey(orderkey);
			if(!StringUtils.isEmpty(coursenamekey))
				orderQueryExample.setCourseName(coursenamekey);
			if(!StringUtils.isEmpty(buyerkey))
				orderQueryExample.setBuyerName(buyerkey);
			if(!StringUtils.isEmpty(datekey)){
				long startTime = DateUtil.startByTime(datekey) ;
				long endTime = DateUtil.endByTime(datekey) ;
				orderQueryExample.setDateBegin(new Timestamp(startTime));
				orderQueryExample.setDateEnd(new Timestamp(endTime));
			}
			
			if(usertype == UserTypeConstants.STUDENT){
				orderQueryExample.setStudentuid(uid);
				orderQueryExample.setBuyerName(null);//学生查询，不能查询购买者
			}else if(usertype == UserTypeConstants.TEACHER){
				orderQueryExample.setTeacheruid(uid);
			}
			
			List<UserOrder> list = eduCourseService.searchListOrders(orderQueryExample);
			if(list != null){
				if(usertype == UserTypeConstants.STUDENT){
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
				}else if(usertype == UserTypeConstants.TEACHER){
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
			}
			
		}catch (Exception e) {
			json.put("status", -100);
			e.printStackTrace();
			// TODO: handle exception
		}

		return json.toString();
		 
	}
	
}
