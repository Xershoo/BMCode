package com.class8.eduPlatform.security.bean;

import java.io.Serializable;

public class ShiroUser implements Serializable {

	private static final long serialVersionUID = -8114182338295414352L;
	
	private Long uid;
	
	//登录名
	private String loginName;
	
	//昵称
	private String nickName;
	
	public ShiroUser(Long uid,String loginName,String nickName){
		this.uid = uid;
		this.loginName = loginName;
		this.nickName = nickName;
		
	}
	
	public Long getUid(){
		return uid;
	}
	
	public String getLoginName() {
		return loginName;
	}

	public String getNickName() {
		return nickName;
	}
	
	@Override
	public String toString() {
		return loginName;
	}
}
