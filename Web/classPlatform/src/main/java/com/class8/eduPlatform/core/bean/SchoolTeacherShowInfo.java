package com.class8.eduPlatform.core.bean;

import java.sql.Timestamp;

//校长里的老师管理显示内容
public class SchoolTeacherShowInfo {

	private long 		userid;
	private String		school;
	private String 		college;
	private String 		major;
	private String		teacherId; //教师工号，也是教师的登陆账号名
	private int			sex;
	private int			status;       //邀请的老师，老师的申请：老师同意拒绝。已签约的老师：合约到期等.校内的老师，表示账号被停用即封号等
	private int			haveRight; //是否可以授课等
	private String 		realName;
	private String		nickName;
	private String 		headimageUrl;
	private String 		homePage;      //个人主页
	private String		signString;    //签名
	private String		regTimestamp;  //用户注册时间
	private String   	optTimestamp;  //申请/邀请时间
	private int			orderNums;	   //订单数量
	private int			stuNums;	   //学生数量
	private float		comein;		   //老师在该学校的课程收入
	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getCollege() {
		return college;
	}
	public void setCollege(String college) {
		this.college = college;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getHaveRight() {
		return haveRight;
	}
	public void setHaveRight(int haveRight) {
		this.haveRight = haveRight;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getHeadimageUrl() {
		return headimageUrl;
	}
	public void setHeadimageUrl(String headimageUrl) {
		this.headimageUrl = headimageUrl;
	}
	public String getHomePage() {
		return homePage;
	}
	public void setHomePage(String homePage) {
		this.homePage = homePage;
	}
	public String getSignString() {
		return signString;
	}
	public void setSignString(String signString) {
		this.signString = signString;
	}
	
	public String getRegTimestamp() {
		return regTimestamp;
	}
	public void setRegTimestamp(String regTimestamp) {
		this.regTimestamp = regTimestamp;
	}
	public String getOptTimestamp() {
		return optTimestamp;
	}
	public void setOptTimestamp(String optTimestamp) {
		this.optTimestamp = optTimestamp;
	}
	public int getOrderNums() {
		return orderNums;
	}
	public void setOrderNums(int orderNums) {
		this.orderNums = orderNums;
	}
	public int getStuNums() {
		return stuNums;
	}
	public void setStuNums(int stuNums) {
		this.stuNums = stuNums;
	}
	public float getComein() {
		return comein;
	}
	public void setComein(float comein) {
		this.comein = comein;
	}
	
	
}
