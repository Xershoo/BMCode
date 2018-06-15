package com.class8.eduPlatform.core.bean;

import java.sql.Timestamp;

//校长里的老师管理显示内容
public class TeacherShowInfo {

	private long 		userid;
	private int			sex;	
	private String 		realName;
	private String		nickName;
	private String 		headimageUrl;       //老师头像
	private String 		largeHeadimge;      //头像大图，主要是放在首页显示的那张大图
	private String		signature;
	private String      description;
	private String      majorLevel;
	private float       teachYears;
	private int         priceMin;

	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
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
	public String getLargeHeadimge() {
		return largeHeadimge;
	}
	public void setLargeHeadimge(String largeHeadimge) {
		this.largeHeadimge = largeHeadimge;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getMajorLevel() {
		return majorLevel;
	}
	public void setMajorLevel(String majorLevel) {
		this.majorLevel = majorLevel;
	}
	public float getTeachYears() {
		return teachYears;
	}
	public void setTeachYears(float teachYears) {
		this.teachYears = teachYears;
	}
	public int getPriceMin() {
		return priceMin;
	}
	public void setPriceMin(int priceMin) {
		this.priceMin = priceMin;
	}
	
}
