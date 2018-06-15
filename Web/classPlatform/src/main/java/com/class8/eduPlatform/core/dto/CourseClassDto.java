package com.class8.eduPlatform.core.dto;

import java.util.List;

public class CourseClassDto {
	
	//课节id
	private long classid;
	
	//课程id
	private long courseid;
	
	//课节名称
	private String className;
	
	//课节计划开始时间
	private String startTimePlan;
	
	//课节计划结束时间
	private String endTimePlan;
	
	//课节状态
	private int classState;
	
	//课节价格
	private float price;
	
	//录播视屏地址
	private List<String> recordDataUrls;
	
	//课程老师uid
	private long teacherUid;
	
	//课程老师名称
	private String teacherName;
	
	//课程封面图片
	protected String coverUrl;
		
	//课程描述
	protected String description;

	public long getClassid() {
		return classid;
	}

	public void setClassid(long classid) {
		this.classid = classid;
	}

	public long getCourseid() {
		return courseid;
	}

	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
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

	public List<String> getRecordDataUrls() {
		return recordDataUrls;
	}

	public void setRecordDataUrls(List<String> recordDataUrls) {
		this.recordDataUrls = recordDataUrls;
	}

	public long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
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
	
}
