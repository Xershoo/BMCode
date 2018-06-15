package com.class8.eduPlatform.core.bean;

import java.sql.Timestamp;

//校长里的学生管理显示内容
public class SchoolStudentShowInfo {

	private long 		userid;
	private String		school;
	private String 		college;
	private String 		major;
	private String 		strClass;
	private String		studentId; //教师工号，也是教师的登陆账号名
	private int			sex;
	private int			status;       //表示账号被停用即封号等
	private String 		realName;
	private String		nickName;
	private String 		headimageUrl;
	private String 		homePage;      //个人主页
	private String		signString;    //签名
	private int			buyCourseCount;//购买课程数量
	private float		buyCoursePrice;//购买总金额
	private String		lastBuyTimestamp;//最后购买时间
	private String	 	lastInClassTimestamp;//最后上课时间
	
	public SchoolStudentShowInfo(){};
	
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
	public String getStrClass() {
		return strClass;
	}
	public void setStrClass(String strClass) {
		this.strClass = strClass;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
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
	public int getBuyCourseCount() {
		return buyCourseCount;
	}
	public void setBuyCourseCount(int buyCourseCount) {
		this.buyCourseCount = buyCourseCount;
	}
	public float getBuyCoursePrice() {
		return buyCoursePrice;
	}
	public void setBuyCoursePrice(float buyCoursePrice) {
		this.buyCoursePrice = buyCoursePrice;
	}

	public String getLastBuyTimestamp() {
		return lastBuyTimestamp;
	}

	public void setLastBuyTimestamp(String lastBuyTimestamp) {
		this.lastBuyTimestamp = lastBuyTimestamp;
	}

	public String getLastInClassTimestamp() {
		return lastInClassTimestamp;
	}

	public void setLastInClassTimestamp(String lastInClassTimestamp) {
		this.lastInClassTimestamp = lastInClassTimestamp;
	}
	
	
}
