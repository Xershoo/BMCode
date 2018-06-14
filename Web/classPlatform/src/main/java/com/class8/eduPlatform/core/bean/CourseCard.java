package com.class8.eduPlatform.core.bean;

import java.io.Serializable;

public class CourseCard implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7286440855852047400L;
	private int studentCount;
	private int onlineCount;//在线人数
	private long classid;
	private String className; //课节名称
	private String courseName;//课程名称
	private long courseid;
	private String coverUrl;			//课堂背景图
	private long schoolid;
	private String schoolName;
	
	private long teacherUid;   
	private String nickName;
	private String realName;
	private String teacherImage;
	private int teacherSex;
	
	private int classStatus; //课节状态		
	private String startTimePlan; //计划开始时间
	private String endTimePlan;  //计划结束时间		
	private String startTimeReal; //实际开始时间
	private String endTimeReal;  //实际结束时间
	
	private int totalclass;   //本课堂总共课节数
	private int finishedclass;//本课堂上完课节数
	
	private int canEnterClass; //是否可以进入课堂，1 进入课堂， 0不能进入
	
	public CourseCard(){
		
	}

	public int getStudentCount() {
		return studentCount;
	}

	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}

	public int getOnlineCount() {
		return onlineCount;
	}

	public void setOnlineCount(int onlineCount) {
		this.onlineCount = onlineCount;
	}

	public long getClassid() {
		return classid;
	}

	public void setClassid(long classid) {
		this.classid = classid;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public long getCourseid() {
		return courseid;
	}

	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public long getSchoolid() {
		return schoolid;
	}

	public void setSchoolid(long schoolid) {
		this.schoolid = schoolid;
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

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getTeacherImage() {
		return teacherImage;
	}

	public void setTeacherImage(String teacherImage) {
		this.teacherImage = teacherImage;
	}

	public int getTeacherSex() {
		return teacherSex;
	}

	public void setTeacherSex(int teacherSex) {
		this.teacherSex = teacherSex;
	}

	public int getClassStatus() {
		return classStatus;
	}

	public void setClassStatus(int classStatus) {
		this.classStatus = classStatus;
	}

	public String getStartTimePlan() {
		return startTimePlan;
	}

	public void setStartTimePlan(String startTimePlan) {
		this.startTimePlan = startTimePlan;
	}

	public String getEndTimePlan() {
		return endTimePlan;
	}

	public void setEndTimePlan(String endTimePlan) {
		this.endTimePlan = endTimePlan;
	}

	public String getEndTimeReal() {
		return endTimeReal;
	}

	public void setEndTimeReal(String endTimeReal) {
		this.endTimeReal = endTimeReal;
	}

	public int getTotalclass() {
		return totalclass;
	}

	public void setTotalclass(int totalclass) {
		this.totalclass = totalclass;
	}

	public int getFinishedclass() {
		return finishedclass;
	}

	public void setFinishedclass(int finishedclass) {
		this.finishedclass = finishedclass;
	}

	public String getStartTimeReal() {
		return startTimeReal;
	}

	public void setStartTimeReal(String startTimeReal) {
		this.startTimeReal = startTimeReal;
	}

	public int getCanEnterClass() {
		return canEnterClass;
	}

	public void setCanEnterClass(int canEnterClass) {
		this.canEnterClass = canEnterClass;
	}
	
	
	
}
