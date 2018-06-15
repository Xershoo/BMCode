package com.class8.eduPlatform.security.bean;

import java.io.Serializable;

public class User implements Serializable {

	private static final long serialVersionUID = 7938844816989193389L;
	
	private String mobile;
	
	private String email;
	
	private String password;
	
	private String confirmPwd;
	
	private String verifyCode;
	
	private Long verifySerialid;

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPwd() {
		return confirmPwd;
	}

	public void setConfirmPwd(String confirmPwd) {
		this.confirmPwd = confirmPwd;
	}

	public String getVerifyCode() {
		return verifyCode;
	}

	public void setVerifyCode(String verifyCode) {
		this.verifyCode = verifyCode;
	}

	public Long getVerifySerialid() {
		return verifySerialid;
	}

	public void setVerifySerialid(Long verifySerialid) {
		this.verifySerialid = verifySerialid;
	}

}
