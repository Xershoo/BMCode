package com.class8.eduPlatform.pay.threadtask;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Service
public class CheckCourseThreadTask  implements  Runnable{

	private static CheckCourseThreadTask  instance = null;
	
	@Autowired
	protected IEduPayService iEduPayService;
	@Autowired
	protected IEduCourseService  eduCourseService;
	@Autowired
	protected IEduUserService eduUserService;
	
	
	private Thread thread;
	private List<CourseBasicInfo> theCheckList;
	
	@Override
	public void run() {
		while (true) {
			//检测课程已全部完成，需要打款给老师
			theCheckList.clear();
			BuildCheckMap();
			
			for (CourseBasicInfo courseBasicInfo : theCheckList) {
				///TODO：目前是课堂一结束就把钱打给老师，未来可能结束后一定时间后才打给老师。
				PayTheCourse(courseBasicInfo);
			}
			
			//课程被自动取消，需要退款给学生，原款退还
			CheckAutoCancelCourselist();
			
			try {
				Thread.sleep(60000);  //一分钟遍历一次
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

	}	
	
	private void BuildCheckMap(){
		try {
			List<Long> list = eduCourseService.listCourseidByStatus(CourseStateConstants.COURSE_FINISH);
			if(list != null){
				for (Long long1 : list) {
					CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(long1);
					if(courseBasicInfo != null && courseBasicInfo.getCourseStatus() == CourseStateConstants.COURSE_FINISH)
						theCheckList.add(courseBasicInfo);
					else {
						System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) + "pay thread coursebasic get error");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void PayTheCourse(CourseBasicInfo courseBasicInfo){
		System.out.println("to paythecourse:" + courseBasicInfo.getCourseid());
		List<UserOrder> list = eduCourseService.listOrdersByCourseid(courseBasicInfo.getCourseid());
		if(list != null){
			for (UserOrder userOrder : list) {
				//钱处于支付的状态才进行操作
				if(userOrder.getStatus() == OrderStatusConstant.hadpay){
					//学校的课把钱转给校长，即学校的创建者。个人的课把钱转给老师本人
					long uid = userOrder.getTeacherid();
					if(courseBasicInfo.getSchoolId() > 0){
						AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
						if(authSchoolInfo == null){
							System.out.println(DateUtil.millisecond2String(System.currentTimeMillis()) + " get authschool error, id:" + courseBasicInfo.getSchoolId());
							continue;
						}
						uid = authSchoolInfo.getCreaterUid();
					}
					PayAccount payAccount = iEduPayService.getPayAccount(uid);
					if(payAccount == null){
						payAccount = new PayAccount();
						payAccount.setUserid(uid);
					}
					System.out.println("老师余额增加，" + payAccount.getBlanceRmb() + " + " + userOrder.getTeacherIncomePrice());
					payAccount.setBlanceRmb(payAccount.getBlanceRmb() + userOrder.getTeacherIncomePrice());
					payAccount.setIncomeRmbTrade(payAccount.getIncomeRmbTrade() + userOrder.getTeacherIncomePrice());
					iEduPayService.updatePayAccount(payAccount);
					
					//更新订单状态
					userOrder.setStatus(OrderStatusConstant.paytoteacher);
					eduCourseService.updateUserOrder(userOrder);
					
					PayAccountBillInfo teacherBillInfo = new PayAccountBillInfo();
					teacherBillInfo.setTheOtherUserid(userOrder.getUserid());
					teacherBillInfo.setUserid(uid);
					teacherBillInfo.setBillid(userOrder.getOrderId());
					teacherBillInfo.setBillTime(new Timestamp(System.currentTimeMillis()));
					teacherBillInfo.setBillType(PayAccountBillTypeConstant.income_trade);
					teacherBillInfo.setIncomeNormal(userOrder.getTeacherIncomePrice());	
					teacherBillInfo.setBlanceRmb(payAccount.getBlanceRmb());
					teacherBillInfo.setBlanceOther(payAccount.getBlanceOther());
					//加老师的付款流水明细
					long serialid = iEduPayService.UpdatePayAccountBill(teacherBillInfo);
					System.out.println(DateUtil.seconds2String(DateUtil.secondsOfNow()) + " 学生付款成功，老师的账户流水明细增加，流水号为：" + serialid);
					
					
				}
			}
			
		}
		int pageNum = 0;
		PageInfo<Long> studentPage = null;
		do {
			pageNum++;
			studentPage = eduCourseService.listCourseStudentIdPage(courseBasicInfo.getCourseid(), pageNum, 200);
			List<Long> stulist = studentPage.getList();				
			if (stulist != null) {
				System.out.println("get page" + pageNum + " list size:" + stulist.size());
				for (Long long1 : stulist) {
					// 更新学生报名状态
					CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(long1,courseBasicInfo.getCourseid(), 0);
					if (courseStudent != null) {
						courseStudent.setSignupStatus(OrderStatusConstant.paytoteacher);
						eduCourseService.updateCourseStudent(courseStudent);
					}
				}
			}
		} while (studentPage.isHasNextPage());
		//订单转款完成，更新课程的状态
		courseBasicInfo.setCourseStatus(CourseStateConstants.COURSE_BALANCE);
		eduCourseService.updataCourseBasicInfo(courseBasicInfo);
	}
	
	private void CheckAutoCancelCourselist(){
		try {
			List<Long> list = eduCourseService.listCourseidByStatus(CourseStateConstants.autocancel);
			if(list != null){
				for (Long long1 : list) {
					CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(long1);
					RefundToStudent(courseBasicInfo);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//课程取消，订单钱返回给学生
	private void RefundToStudent(CourseBasicInfo courseBasicInfo){
		List<UserOrder> list = eduCourseService.listOrdersByCourseid(courseBasicInfo.getCourseid());
		if(list != null){
			for (UserOrder userOrder : list) {
				//钱处于支付的状态才进行操作
				if(userOrder.getStatus() == OrderStatusConstant.hadpay){
					PayBaseController.RefundOrder(userOrder,0);
				}
			}
			//订单转款完成，更新课程的状态
			courseBasicInfo.setCourseStatus(CourseStateConstants.COURSE_CANCEL_REFUND);
			eduCourseService.updataCourseBasicInfo(courseBasicInfo);
		}
	}
	
	@PostConstruct
    public void init(){
		if(instance != null)
		{
			return;
		}
		
		instance = this;
		theCheckList = new ArrayList<CourseBasicInfo>();
		
		try{
			thread = new Thread(this);
			thread.start();
	    }catch (Exception e) {
	         e.printStackTrace();
	    }
		
    }
	
}
