package com.class8.eduPlatform.pay.account;

import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.eduPlatform.pay.alipay.controller.AilpayController;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.constants.SchoolMembersStatueConstant;

@Controller
public class AccountPayController  extends PayBaseController{
	private static Logger logger = Logger.getLogger(AccountPayController.class);

	public AccountPayController() {
		// TODO Auto-generated constructor stub
	}

	@ResponseBody
	@RequestMapping(value = "/order/topayorderbyaccount")
	public String getpayaccountinfo(@RequestParam String orderid, @RequestParam String paypwd, HttpSession session,
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
			
			PayUserSafeInfo payUserSafeInfo = iEduPayService.getPayUserSafeInfoById(uid);
			if(payUserSafeInfo == null || StringUtils.isEmpty(payUserSafeInfo.getPayPwd())){
				json.put("status", -2);  //未设置支付密码，请先设置支付密码
				return json.toString();
			}
			
			String pwdMd5 = MD5Util.encode(paypwd);
			if(!payUserSafeInfo.getPayPwd().equals(pwdMd5)){
				json.put("status", -3);  //支付密码出错
				return json.toString();
			}
			
			String optIpString = CommonUtil.getIpAddr(request);
			///TODO:用余额付款，直接扣款并填写流水明细，更改订单状态
			///TODO:更新订单及流水线
			UserOrder userOrder = eduCourseService.getsimpleUserOrder(orderid);
			int nCheck = CheckBeforePay(userOrder);
			if(nCheck < 0){
				System.out.println(" to check payorder errorno:" + nCheck + "  orderid:" + orderid);
				json.put("status", nCheck);  //订单不存在
				return json.toString();
			}
			 				//userOrder.setPaySerialId(paySerialId);
				PayAccount payAccount = iEduPayService.getPayAccount(uid);
				long totalRmb = payAccount.getBlanceOther() + payAccount.getBlanceRmb();
				if( totalRmb < userOrder.getRealPrice() ){
					json.put("status", -6); //余额不够
					System.out.println("用户余额不足，请先充值，userid:" + uid + ", have " + totalRmb + " but to pay:" + userOrder.getRealPrice() + " orderid:" + orderid);
					return json.toString();
				}
				int toPay = userOrder.getRealPrice();
				int payFromRmb = 0;
				int payFromOther = 0;
				if(payAccount.getBlanceRmb() > toPay){
					System.out.println(payAccount.getBlanceRmb() + " stu rmb:" + (payAccount.getBlanceRmb() - toPay));
					payAccount.setBlanceRmb(payAccount.getBlanceRmb() - toPay);
					System.out.println("after opt is: " + payAccount.getBlanceRmb());
					payFromRmb = toPay;
				}
				else {
					payFromRmb = (int)payAccount.getBlanceRmb();
					payAccount.setBlanceRmb(0);
					payFromOther = toPay - payFromRmb;
					payAccount.setBlanceOther(payAccount.getBlanceOther() - payFromOther);					
				}
				payAccount.setPayoutRmbTrade(payAccount.getPayoutRmbTrade() + toPay);
				iEduPayService.updatePayAccount(payAccount);
				System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) +  "pay by account, rmb:" + payFromRmb + ", other:" + payFromOther);
				
				PayAccountBillInfo payAccountBillInfo = new PayAccountBillInfo();
				payAccountBillInfo.setUserid(uid);
				
				//学生的钱流向校长，如果是个人的课，则流向老师本人
				long teacherid = userOrder.getTeacherid();
				CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
				if(courseBasicInfo.getSchoolId() > 0){
					AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
					if(authSchoolInfo != null){
						teacherid = authSchoolInfo.getCreaterUid();
					}
				}
				payAccountBillInfo.setTheOtherUserid(teacherid);
				payAccountBillInfo.setBillid(userOrder.getOrderId());
				payAccountBillInfo.setBillTime(new Timestamp(System.currentTimeMillis()));
				payAccountBillInfo.setBillType(PayAccountBillTypeConstant.pay_trade);
				payAccountBillInfo.setPayoutNormal(userOrder.getRealPrice());
				payAccountBillInfo.setPayFromRmb(payFromRmb);
				payAccountBillInfo.setPayFromOther(payFromOther);
				payAccountBillInfo.setPayGiftVoucher(0);
				payAccountBillInfo.setIp(optIpString);
				payAccountBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
				payAccountBillInfo.setBlanceOther(payAccount.getBlanceOther());
				//加学生的付款流水明细
				long serialid = iEduPayService.UpdatePayAccountBill(payAccountBillInfo);
				System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) + " 学生付款成功，学生的账户流水明细增加，流水号为：" + serialid);
				
				//更新订单状态及其他数据统计
				AfterPayUpdateCourseInfo(serialid, userOrder);
				
				json.put("status", 0);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return json.toString();
	}
	
}
