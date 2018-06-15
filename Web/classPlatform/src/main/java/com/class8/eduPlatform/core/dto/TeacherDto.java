package com.class8.eduPlatform.core.dto;

import java.io.Serializable;

public class TeacherDto implements Serializable {

	private static final long serialVersionUID = -2348607144333979693L;
	
	private long teacherUid;
	
	private String uname;
	
	private String nickName;
	
	private String realName;
	
	private String description;
	
	private String avatarUrl;
	
	private float teachYears;
	
	private int schoolClassify;
	
	private String occupation;
	
	private String company;
	
	private int sex;
	
	private float avgScore;
	
	private int countCourse;
	
	private int countStudent;
	
	private String largeHeadimge;
	
	private String      majorLevel;
	
	private int         priceMin;

	public long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public float getTeachYears() {
		return teachYears;
	}

	public void setTeachYears(float teachYears) {
		this.teachYears = teachYears;
	}

	public int getSchoolClassify() {
		return schoolClassify;
	}

	public void setSchoolClassify(int schoolClassify) {
		this.schoolClassify = schoolClassify;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public float getAvgScore() {
		return avgScore;
	}

	public void setAvgScore(float avgScore) {
		this.avgScore = avgScore;
	}

	public int getCountCourse() {
		return countCourse;
	}

	public void setCountCourse(int countCourse) {
		this.countCourse = countCourse;
	}

	public int getCountStudent() {
		return countStudent;
	}

	public void setCountStudent(int countStudent) {
		this.countStudent = countStudent;
	}

	public String getLargeHeadimge() {
		return largeHeadimge;
	}

	public void setLargeHeadimge(String largeHeadimge) {
		this.largeHeadimge = largeHeadimge;
	}

	public String getMajorLevel() {
		return majorLevel;
	}

	public void setMajorLevel(String majorLevel) {
		this.majorLevel = majorLevel;
	}

	public int getPriceMin() {
		return priceMin;
	}

	public void setPriceMin(int priceMin) {
		this.priceMin = priceMin;
	}
	
	
	
}
