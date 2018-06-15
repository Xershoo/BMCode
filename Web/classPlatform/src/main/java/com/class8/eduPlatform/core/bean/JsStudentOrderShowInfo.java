package com.class8.eduPlatform.core.bean;

//订单显示信息
public class JsStudentOrderShowInfo {

	private String 		orderId;
	private String		courseName;
	private String		coursebgimgUrl;
	private String		teachername;
	private String		schoolname;
	private float		courseprice;
	private String		couponInfo; //优惠方式
	private float 		realprice;
	private int			status;
	private String 		createtime;
	
	public JsStudentOrderShowInfo() {
		// TODO Auto-generated constructor stub
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCoursebgimgUrl() {
		return coursebgimgUrl;
	}

	public void setCoursebgimgUrl(String coursebgimgUrl) {
		this.coursebgimgUrl = coursebgimgUrl;
	}

	public String getTeachername() {
		return teachername;
	}

	public void setTeachername(String teachername) {
		this.teachername = teachername;
	}

	public String getSchoolname() {
		return schoolname;
	}

	public void setSchoolname(String schoolname) {
		this.schoolname = schoolname;
	}

	public float getCourseprice() {
		return courseprice;
	}

	public void setCourseprice(float courseprice) {
		this.courseprice = courseprice;
	}

	public String getCouponInfo() {
		return couponInfo;
	}

	public void setCouponInfo(String couponInfo) {
		this.couponInfo = couponInfo;
	}

	public float getRealprice() {
		return realprice;
	}

	public void setRealprice(float realprice) {
		this.realprice = realprice;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
}
