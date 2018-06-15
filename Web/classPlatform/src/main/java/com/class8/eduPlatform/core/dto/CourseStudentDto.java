package com.class8.eduPlatform.core.dto;

import java.io.Serializable;

public class CourseStudentDto implements Serializable {
	
	private static final long serialVersionUID = 2655424138986958438L;

	private long studentUid;
	
	private String uname;
	
	private String nickName;
	
	private String realName;
	
	private int sex;
	
	private String avatarUrl;

	public long getStudentUid() {
		return studentUid;
	}

	public void setStudentUid(long studentUid) {
		this.studentUid = studentUid;
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

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
	
}
