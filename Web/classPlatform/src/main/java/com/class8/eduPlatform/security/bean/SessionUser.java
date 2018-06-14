package com.class8.eduPlatform.security.bean;

import java.io.Serializable;

public class SessionUser implements Serializable {

	private static final long serialVersionUID = 1745059818131729654L;
	
	private Long uid;
	
	private String loginName;
	
	private String nickName;
	
	private int sex;
	
	private String avatarUrl;
	
	private String roleName;
	
	private Long schoolId;
	
	private String schoolName;
	
	private String schoolLogoUrl;

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
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

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Long schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getSchoolLogoUrl() {
		return schoolLogoUrl;
	}

	public void setSchoolLogoUrl(String schoolLogoUrl) {
		this.schoolLogoUrl = schoolLogoUrl;
	}
}
