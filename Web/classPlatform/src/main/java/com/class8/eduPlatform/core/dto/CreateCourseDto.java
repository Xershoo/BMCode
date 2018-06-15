package com.class8.eduPlatform.core.dto;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class CreateCourseDto implements Serializable {

	private static final long serialVersionUID = 1702880753151677701L;
	
	//课程类型
	private int courseType;
	
	//课程id
	private long courseid;
	
	//课程名称
	private String courseName;
	
	//课程分类id
	private int classifyId;
	
	//课程老师
	private long teacherId;
	
	//课程封面图片
	private String coverUrl;
	
	//课程描述
	private String description;
	
	//教学目标
	private String target;
	
	//适合人群
	private String people;
	
	//最少报名人数
	private int minStudents;
	
	//最大报名人数
	private int maxStudents;
	
	//起始报名时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date signupStartTime;
	
	//终止报名时间
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date signupEndTime;
	
	//课程价格
	private float price;
	
	//是否录像，1 录，0不录。
	private int toRecode;
	
	public int getCourseType() {
		return courseType;
	}
	public void setCourseType(int courseType) {
		this.courseType = courseType;
	}
	public long getCourseid() {
		return courseid;
	}
	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public int getClassifyId() {
		return classifyId;
	}
	public void setClassifyId(int classifyId) {
		this.classifyId = classifyId;
	}
	public String getCoverUrl() {
		return coverUrl;
	}
	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getPeople() {
		return people;
	}
	public void setPeople(String people) {
		this.people = people;
	}
	public int getMinStudents() {
		return minStudents;
	}
	public void setMinStudents(int minStudents) {
		this.minStudents = minStudents;
	}
	public int getMaxStudents() {
		return maxStudents;
	}
	public void setMaxStudents(int maxStudents) {
		this.maxStudents = maxStudents;
	}
	public Date getSignupStartTime() {
		return signupStartTime;
	}
	public void setSignupStartTime(Date signupStartTime) {
		this.signupStartTime = signupStartTime;
	}
	public Date getSignupEndTime() {
		return signupEndTime;
	}
	public void setSignupEndTime(Date signupEndTime) {
		this.signupEndTime = signupEndTime;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public long getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(long teacherId) {
		this.teacherId = teacherId;
	}
	public int getToRecode() {
		return toRecode;
	}
	public void setToRecode(int toRecode) {
		this.toRecode = toRecode;
	}
	

}
