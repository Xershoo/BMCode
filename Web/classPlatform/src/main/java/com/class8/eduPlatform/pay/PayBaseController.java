package com.class8.eduPlatform.pay;

import java.sql.Timestamp;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.pay.alipay.controller.AilpayController;
import com.class8.pay.common.bean.Chargeorderform;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.bean.PayUserSafeInfo;
import com.class8.pay.common.constants.ChargeorderformTypeConstant;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.webservice.intf.IEduUserService;

public  class PayBaseController extends BaseController {
	
	private static Logger logger = Logger.getLogger(PayBaseController.class);

	@Autowired
	protected IEduPayService iEduPayService;
	@Autowired
	protected IEduCourseService  eduCourseService;
	@Autowired
	protected IEduUserService		eduUserService;
	
	static protected IEduPayService seduPayServervice = null;
	static protected IEduCourseService seduCourseService = null;
	static protected IEduUserService	seduUserService = null;
	
	@PostConstruct
	public void init(){
		if (seduPayServervice == null)
			seduPayServervice = iEduPayService;
		if(seduCourseService == null)
			seduCourseService = eduCourseService;
		if(seduUserService == null)
			seduUserService = eduUserService;
	}
	
	protected int CheckBeforePay(UserOrder userOrder) {
		if(userOrder == null){
			 //订单不存在
			return -4;
		}
		else if(userOrder.getStatus() != OrderStatusConstant.topay ){
			//订单不处于待支付的状态
			return -5;
		}
		int nHadSignup = eduCourseService.countCourseStudentStatus(userOrder.getCourseId(), userOrder.getClassId(), OrderStatusConstant.hadpay);
		CourseBasicInfo course = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
		if(null == course) {			
			return -4; //订单不存在
		}
		if(nHadSignup >= course.getnMaxStudents()){
			return -7;//人数已满
		}
		return 0;
	}

	protected int UpdateOrderAccoutInfos(Chargeorderform chargeorderform) {
		if (chargeorderform == null)
			return -1;

		if (chargeorderform.getChargetype() == ChargeorderformTypeConstant.CHARGE) {
			PayAccount payAccount = iEduPayService
					.getPayAccount(chargeorderform.getUserid());
			PayAccountBillInfo payAccountBillInfo = new PayAccountBillInfo();
			payAccountBillInfo.setUserid(chargeorderform.getUserid());
			payAccountBillInfo.setBillid(chargeorderform.getBillid());
			payAccountBillInfo.setTheOtherUserid(chargeorderform
					.getPaymentGateway()); // 充值方式加入
			payAccountBillInfo.setBillTime(new Timestamp(System
					.currentTimeMillis()));
			payAccountBillInfo.setBillType(PayAccountBillTypeConstant.charge);
			payAccountBillInfo.setIncomeNormal(chargeorderform.getPayamount());
			payAccountBillInfo.setIncomeFee(chargeorderform.getGiftamount());
			payAccountBillInfo.setIp(chargeorderform.getIp());
			payAccountBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
			payAccountBillInfo.setBlanceOther(payAccount.getBlanceOther());
			// 充值的流水明细
			iEduPayService.UpdatePayAccountBill(payAccountBillInfo);
		} else if (chargeorderform.getChargetype() == ChargeorderformTypeConstant.PAY) {
			// /TODO:更新订单及流水线
			UserOrder userOrder = eduCourseService
					.getsimpleUserOrder(chargeorderform.getBillid());
			if (userOrder == null)
				System.out.println("userorder get failid. billid:"
						+ chargeorderform.getBillid());
			else {
				PayAccount payAccount = iEduPayService.getPayAccount(userOrder
						.getUserid());
				PayAccountBillInfo payAccountBillInfo = new PayAccountBillInfo();
				payAccountBillInfo.setUserid(userOrder.getUserid());
				
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
				payAccountBillInfo.setBillTime(new Timestamp(System
						.currentTimeMillis()));
				payAccountBillInfo
						.setBillType(PayAccountBillTypeConstant.pay_trade);
				payAccountBillInfo.setPayoutNormal(userOrder.getRealPrice());
				payAccountBillInfo.setPayFromBank(userOrder.getRealPrice());
				payAccountBillInfo.setIp(chargeorderform.getIp());
				payAccountBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
				payAccountBillInfo.setBlanceOther(payAccount.getBlanceOther());
				// 加学生的付款流水明细
				long serialid = iEduPayService
						.UpdatePayAccountBill(payAccountBillInfo);
				System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow())
						+ " 学生付款成功，学生的账户流水明细增加，流水号为：" + serialid);

				//更新订单状态及其他数据统计
				AfterPayUpdateCourseInfo(serialid, userOrder);

			}
		}

		return 0;
	}
	
	//付款成功后，把统计相关数据加上，比如学生买了老师多少课，学校多少费用及课程数等
	protected void AfterPayUpdateCourseInfo(long serialid, UserOrder userOrder) {
		
		//更新订单的状态等信息
		userOrder.setStatus(OrderStatusConstant.hadpay);
		userOrder.setPaySerialId(serialid);
		userOrder.setMergeOrder(userOrder.getOrderId());	
		userOrder.setLastPayDate(new Timestamp(System.currentTimeMillis()));
		eduCourseService.updateUserOrder(userOrder);
		//更新学生购买课程表的状态
		CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(userOrder.getUserid(),
				userOrder.getCourseId(), userOrder.getClassId());
		courseStudent.setSignupStatus(OrderStatusConstant.hadpay);				
		eduCourseService.updateCourseStudent(courseStudent);
		
		//更新学生购买课程信息等
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(userOrder.getCourseId());
		//学校的课程，得更新相关信息
		if(courseBasicInfo.getSchoolId() > 0){
			SchoolsStudent schoolsStudent = eduUserService.getSchoolsStudentById(courseBasicInfo.getSchoolId(), userOrder.getUserid());
			if(schoolsStudent == null){
				schoolsStudent = new SchoolsStudent();
				schoolsStudent.setUserid(userOrder.getUserid());
				schoolsStudent.setSchoolId(courseBasicInfo.getSchoolId());
				schoolsStudent.setFirstBuyDate(new Timestamp(System.currentTimeMillis()));
				schoolsStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
				schoolsStudent.setJoinType(SchoolMembersStatueConstant.stupaycoursejoin);
			}
			schoolsStudent.setLastBuyDate(new Timestamp(System.currentTimeMillis()));
			schoolsStudent.setBuyCourses(schoolsStudent.getBuyCourses() + 1);
			schoolsStudent.setBuyPrices(schoolsStudent.getBuyPrices() + userOrder.getTeacherIncomePrice());
			eduUserService.updateSchoolsStudent(schoolsStudent);
			
			SchoolsTeacher schoolsTeacher = eduUserService.getSchoolsTeacherById(courseBasicInfo.getSchoolId(), userOrder.getTeacherid());
			schoolsTeacher.setOrderCounts(schoolsTeacher.getOrderCounts() + 1);
			schoolsTeacher.setIncomeTotal(schoolsTeacher.getIncomeTotal() + userOrder.getTeacherIncomePrice());
			eduUserService.updateSchoolsTeacher(schoolsTeacher);
			
			System.out.println("更改学校老师，学校学生表信息，主要是统计用的");
		}
	
		//增加老师的统计，每个学生买了多少
		TeacherStudent teacherStudent = eduUserService.getTeacherStudent(userOrder.getTeacherid(), userOrder.getUserid());
		if(teacherStudent == null){
			teacherStudent = new TeacherStudent();
			teacherStudent.setUserid(userOrder.getUserid());
			teacherStudent.setTeacherId(userOrder.getTeacherid());
			teacherStudent.setJoinType(SchoolMembersStatueConstant.stupaycoursejoin);
			teacherStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
			teacherStudent.setFirstBuyDate(new Timestamp(System.currentTimeMillis()));
		}
		teacherStudent.setBuyCourses(teacherStudent.getBuyCourses() + 1);
		teacherStudent.setBuyPrices(teacherStudent.getBuyPrices() + userOrder.getTeacherIncomePrice());
		teacherStudent.setLastBuyDate(new Timestamp(System.currentTimeMillis()));
		eduUserService.updateTeacherStudent(teacherStudent);	
		
	}
	
	//订单退款，包括系统自动退款和个人主动退款。 上次支持全额退，如果只退部分，需要修改.订单的原先状态等判断，由调用者判断, nRefundRate 手续费率 0 -- 100
	public static void RefundOrder(UserOrder userOrder, int nRefundRate){
		userOrder.setStatus(OrderStatusConstant.refunding); //设置为准备退款的状态，避免出现多次退款，哪怕没退成功也无所谓，但不能出现多次退款
		seduCourseService.updateUserOrder(userOrder);
		//找回流水号，把钱返回到相应的项里，礼品券返回礼品券，现金返回到现金，银行卡返回到现金
		PayAccount payAccount = seduPayServervice.getPayAccount(userOrder.getUserid());
		if(payAccount == null){
			payAccount = new PayAccount();
			payAccount.setUserid(userOrder.getUserid());
		}
		PayAccountBillInfo payAccountBillInfo = seduPayServervice.getSinglePayAccountBill(userOrder.getPaySerialId(), userOrder.getUserid());
		if(payAccountBillInfo == null){
			System.out.println(DateUtil.millisecond2String((int)System.currentTimeMillis())  +" 账户资金流水号居然没找到，id: " + userOrder.getPaySerialId() + " 订单号：" + userOrder.getOrderId());
			return;
		}
			
		int nReturnTotal = payAccountBillInfo.getPayFromRmb() + payAccountBillInfo.getPayFromOther() + payAccountBillInfo.getPayFromBank() + payAccountBillInfo.getPayGiftVoucher();
		int nRefundfee = nReturnTotal * nRefundRate / 100;  //退款费用
		nReturnTotal -= nRefundfee;
		System.out.println("由于课程取消，学生收到退款，" + payAccount.getBlanceRmb() + " + " + userOrder.getTeacherIncomePrice() + " - " + nRefundfee);
		System.out.println("退款金额为: " + nReturnTotal + ". 其中 rmbs:" + payAccountBillInfo.getPayFromRmb() +
				", other:" + payAccountBillInfo.getPayFromOther() +
				", bank:" + payAccountBillInfo.getPayFromBank() + ", gift:" + payAccountBillInfo.getPayGiftVoucher() + ", 退款费用：" + nRefundfee );
		payAccount.setBlanceRmb(payAccount.getBlanceRmb() + payAccountBillInfo.getPayFromRmb() + payAccountBillInfo.getPayFromBank());
		payAccount.setBlanceOther(payAccount.getBlanceOther() + payAccountBillInfo.getPayFromOther());
		payAccount.setGiftVoucher(payAccount.getGiftVoucher() + payAccountBillInfo.getPayGiftVoucher());
		payAccount.setIncomeRefundTrade(payAccount.getIncomeRefundTrade() + nReturnTotal);
		payAccount.setIncomeOther(payAccount.getIncomeOther() + payAccountBillInfo.getPayFromOther());
		payAccount.setPayoutRefundTradefee(payAccount.getPayoutRefundTradefee() + nRefundfee);
		
		if(payAccount.getBlanceRmb() >= nRefundfee)
			payAccount.setBlanceRmb(payAccount.getBlanceRmb() - nRefundfee);
		else if(payAccount.getBlanceOther() >= nRefundfee)
			payAccount.setBlanceOther(payAccount.getBlanceOther() - nRefundfee);
		else if(payAccount.getGiftVoucher() >= nRefundfee)
			payAccount.setGiftVoucher(payAccount.getGiftVoucher() - nRefundfee);
		else {
			nRefundfee = nRefundfee - (int)payAccount.getBlanceRmb();
			payAccount.setBlanceRmb(0);
			if(payAccount.getBlanceOther() >= nRefundfee){
				payAccount.setBlanceOther(payAccount.getBlanceOther() - nRefundfee);				
			}else {
				nRefundfee = nRefundfee - (int)payAccount.getBlanceOther();
				payAccount.setBlanceOther(0);
				payAccount.setGiftVoucher(payAccount.getGiftVoucher() - nRefundfee);
			}
		}
		seduPayServervice.updatePayAccount(payAccount);
		
		PayAccountBillInfo refundBillInfo = new PayAccountBillInfo();
		refundBillInfo.setUserid(userOrder.getUserid());
		refundBillInfo.setTheOtherUserid(userOrder.getTeacherid());
		refundBillInfo.setBillid(userOrder.getOrderId());
		refundBillInfo.setBillTime(new Timestamp(System.currentTimeMillis()));
		refundBillInfo.setBillType(PayAccountBillTypeConstant.income_refund_trade);
		refundBillInfo.setIncomeNormal(nReturnTotal);	
		refundBillInfo.setPayoutFee(nRefundfee);
		refundBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
		refundBillInfo.setBlanceOther(payAccount.getBlanceOther());
		//学生退款流水明细
		long serialid = seduPayServervice.UpdatePayAccountBill(refundBillInfo);
		System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) + " 学生付款成功，老师的账户流水明细增加，流水号为：" + serialid);
		
		//更新学生报名状态
		CourseStudent courseStudent = seduCourseService.getCourseStudentByIds(userOrder.getUserid(), userOrder.getCourseId(), userOrder.getClassId());
		if(courseStudent != null){
			courseStudent.setSignupStatus(OrderStatusConstant.refunded);
			seduCourseService.updateCourseStudent(courseStudent);
		}
		
		//更新订单状态
		userOrder.setStatus(OrderStatusConstant.refunded);
		userOrder.setRefundSerialId(serialid);
		userOrder.setRefundPrice(nReturnTotal);
		seduCourseService.updateUserOrder(userOrder);
		
		
		//更新学生购买课程信息等
		CourseBasicInfo courseBasicInfo = seduCourseService.getCourseBasicInfo(userOrder.getCourseId());
		//学校的课程，得更新相关信息
		if(courseBasicInfo.getSchoolId() > 0){
			SchoolsStudent schoolsStudent = seduUserService.getSchoolsStudentById(courseBasicInfo.getSchoolId(), userOrder.getUserid());
			if(schoolsStudent == null){
				schoolsStudent = new SchoolsStudent();
				schoolsStudent.setUserid(userOrder.getUserid());
				schoolsStudent.setSchoolId(courseBasicInfo.getSchoolId());
				schoolsStudent.setFirstBuyDate(new Timestamp(System.currentTimeMillis()));
				schoolsStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
				schoolsStudent.setJoinType(SchoolMembersStatueConstant.stupaycoursejoin);
			}
			
			schoolsStudent.setReturnCoursesFull(schoolsStudent.getReturnCoursesFull() + 1);
			schoolsStudent.setRefundPrices(schoolsStudent.getRefundPrices() + nReturnTotal);
			seduUserService.updateSchoolsStudent(schoolsStudent);
			
			SchoolsTeacher schoolsTeacher = seduUserService.getSchoolsTeacherById(courseBasicInfo.getSchoolId(), userOrder.getTeacherid());
			schoolsTeacher.setReturnOrderCountsFull(schoolsTeacher.getReturnOrderCountsFull() + 1);
			schoolsTeacher.setRefundTotal(schoolsTeacher.getRefundTotal() + nReturnTotal);
			seduUserService.updateSchoolsTeacher(schoolsTeacher);
			
			System.out.println("退款 更改学校老师，学校学生表信息，主要是统计用的");
		}
	
		//增加老师的统计，每个学生退了多少课及多少钱
		TeacherStudent teacherStudent = seduUserService.getTeacherStudent(userOrder.getTeacherid(), userOrder.getUserid());
		if(teacherStudent == null){
			teacherStudent = new TeacherStudent();
			teacherStudent.setUserid(userOrder.getUserid());
			teacherStudent.setTeacherId(userOrder.getTeacherid());
			teacherStudent.setJoinType(SchoolMembersStatueConstant.stupaycoursejoin);
			teacherStudent.setJoinDate(new Timestamp(System.currentTimeMillis()));
			teacherStudent.setFirstBuyDate(new Timestamp(System.currentTimeMillis()));
		}
		if(teacherStudent.getOutsideSchool() == 0){
			//表示是第一次买课
			teacherStudent.setFirstBuyDate(new Timestamp(System.currentTimeMillis()));
		}
		teacherStudent.setOutsideSchool(1);
		teacherStudent.setReturnCoursesFull(teacherStudent.getReturnCoursesFull() + 1);
		teacherStudent.setRefundPrices(teacherStudent.getRefundPrices() + nReturnTotal);
		seduUserService.updateTeacherStudent(teacherStudent);	
	}
	
	
	public static String TopayByAccount(long uid , int topay, String paypwd){
		String strResult = "success";
		PayUserSafeInfo payUserSafeInfo = seduPayServervice.getPayUserSafeInfoById(uid);
		if(payUserSafeInfo == null || StringUtils.isEmpty(payUserSafeInfo.getPayPwd())){
			strResult ="请先设置支付密码再支付";  //未设置支付密码，请先设置支付密码
			return strResult;
		}
		
		String pwdMd5 = MD5Util.encode(paypwd);
		if(!payUserSafeInfo.getPayPwd().equals(pwdMd5)){
			strResult = "支付密码错误，请重试";  //支付密码出错
			return strResult;
		}		
		
		PayAccount payAccount = seduPayServervice.getPayAccount(uid);
		long totalRmb = payAccount.getBlanceOther() + payAccount.getBlanceRmb();
		if( totalRmb < topay ){
			strResult = "余额不足"; //余额不够
			System.out.println("退课支付用户余额不足，请先充值，userid:" + uid + ", have " + totalRmb + " but to pay:" + topay);
			return strResult;
		}
		int payFromRmb = 0;
		int payFromOther = 0;
		if(payAccount.getBlanceRmb() > topay){
			System.out.println(payAccount.getBlanceRmb() + " stu rmb:" + (payAccount.getBlanceRmb() - topay));
			payAccount.setBlanceRmb(payAccount.getBlanceRmb() - topay);
			System.out.println("after opt is: " + payAccount.getBlanceRmb());
			payFromRmb = topay;
		}
		else {
			payFromRmb = (int)payAccount.getBlanceRmb();
			payAccount.setBlanceRmb(0);
			payFromOther = topay - payFromRmb;
			payAccount.setBlanceOther(payAccount.getBlanceOther() - payFromOther);					
		}
		payAccount.setPayoutRmbTrade(payAccount.getPayoutRmbTrade() + topay);
		seduPayServervice.updatePayAccount(payAccount);
		System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) +  "pay by account, rmb:" + payFromRmb + ", other:" + payFromOther);
	
		return strResult;
	}
}
