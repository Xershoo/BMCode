package com.class8.eduPlatform.core.dto;

import java.sql.Timestamp;

public class CourseClassDetailDto extends CourseDetailDto {

	private static final long serialVersionUID = 3146844512766950737L;

	private long classid;
	
	private String courseName;
	
	private String className;
	
	private Timestamp startTimePlan;
	
	private Timestamp endTimePlan;
	
	private int classState;
	
	private float price;
	
	private int onlineType;
	
	private long schoolId;
	
	private String schoolName;
	
	private long teacherUid;
	
	private String nickName;
	
	private String teacherName;
	
	private int courseStatus;
	
	private int classTotal;
	
	private int classHadFinished;

	public long getClassid() {
		return classid;
	}

	public void setClassid(long classid) {
		this.classid = classid;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Timestamp getStartTimePlan() {
		return startTimePlan;
	}

	public void setStartTimePlan(Timestamp startTimePlan) {
		this.startTimePlan = startTimePlan;
	}

	public Timestamp getEndTimePlan() {
		return endTimePlan;
	}

	public void setEndTimePlan(Timestamp endTimePlan) {
		this.endTimePlan = endTimePlan;
	}

	public int getClassState() {
		return classState;
	}

	public void setClassState(int classState) {
		this.classState = classState;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getOnlineType() {
		return onlineType;
	}

	public void setOnlineType(int onlineType) {
		this.onlineType = onlineType;
	}

	public long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(long schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public int getCourseStatus() {
		return courseStatus;
	}

	public void setCourseStatus(int courseStatus) {
		this.courseStatus = courseStatus;
	}

	public int getClassTotal() {
		return classTotal;
	}

	public void setClassTotal(int classTotal) {
		this.classTotal = classTotal;
	}

	public int getClassHadFinished() {
		return classHadFinished;
	}

	public void setClassHadFinished(int classHadFinished) {
		this.classHadFinished = classHadFinished;
	}

}
