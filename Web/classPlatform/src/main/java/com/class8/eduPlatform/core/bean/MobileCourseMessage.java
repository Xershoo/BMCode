package com.class8.eduPlatform.core.bean;

import java.util.List;

public class MobileCourseMessage {
	private String courseName;
	private long teacherUid;
	private int onlineType;
	private String startTimePlan;
	private String teacherNickName;
	private String teacherName;
	private String week;
	private String endTimePlan;
	private long courseid;
	private int teacherSex;
	private int compulsoryType;
	private int studentsCount;
	private String weekSeq;
	private long classid;
	private String coverUrl ;
	private String offline_classroomaddress;
	private int CourseOnlineType;
	public int getCourseOnlineType() {
		return CourseOnlineType;
	}

	public void setCourseOnlineType(int courseOnlineType) {
		CourseOnlineType = courseOnlineType;
	}

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public String getOffline_classroomaddress() {
		return offline_classroomaddress;
	}

	public void setOffline_classroomaddress(String offline_classroomaddress) {
		this.offline_classroomaddress = offline_classroomaddress;
	}

	public long getClassid() {
		return classid;
	}

	public void setClassid(long classid) {
		this.classid = classid;
	}

	public String getWeekSeq() {
		return weekSeq;
	}

	public void setWeekSeq(String weekSeq) {
		this.weekSeq = weekSeq;
	}

	public int getCompulsoryType() {
		return compulsoryType;
	}

	public void setCompulsoryType(int compulsoryType) {
		this.compulsoryType = compulsoryType;
	}

	public int getStudentsCount() {
		return studentsCount;
	}

	public void setStudentsCount(int studentsCount) {
		this.studentsCount = studentsCount;
	}

	public int getLessonsNum() {
		return lessonsNum;
	}

	public void setLessonsNum(int lessonsNum) {
		this.lessonsNum = lessonsNum;
	}

	private String teacherImage;
	private int lessonsNum;
	private int hason;

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public int getOnlineType() {
		return onlineType;
	}

	public void setOnlineType(int onlineType) {
		this.onlineType = onlineType;
	}

	public String getStartTimePlan() {
		return startTimePlan;
	}

	public void setStartTimePlan(String startTimePlan) {
		this.startTimePlan = startTimePlan;
	}

	public String getTeacherNickName() {
		return teacherNickName;
	}

	public void setTeacherNickName(String teacherNickName) {
		this.teacherNickName = teacherNickName;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public String getEndTimePlan() {
		return endTimePlan;
	}

	public void setEndTimePlan(String endTimePlan) {
		this.endTimePlan = endTimePlan;
	}

	public long getCourseid() {
		return courseid;
	}

	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}

	public int getTeacherSex() {
		return teacherSex;
	}

	public void setTeacherSex(int teacherSex) {
		this.teacherSex = teacherSex;
	}

	public String getTeacherImage() {
		return teacherImage;
	}

	public void setTeacherImage(String teacherImage) {
		this.teacherImage = teacherImage;
	}

	public int getHason() {
		return hason;
	}

	public void setHason(int hason) {
		this.hason = hason;
	}

	private List<WeekCourse> weekCourseList;

	public List<WeekCourse> getWeekCourseList() {
		return weekCourseList;
	}

	public void setWeekCourseList(List<WeekCourse> weekCourseList) {
		this.weekCourseList = weekCourseList;
	}

	private String CourseMessage;

	public String getCourseMessage() {
		return CourseMessage;
	}

	public void setCourseMessage(String courseMessage) {
		CourseMessage = courseMessage;
	}

}
