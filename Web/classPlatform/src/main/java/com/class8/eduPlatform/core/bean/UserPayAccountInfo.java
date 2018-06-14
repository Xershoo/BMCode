package com.class8.eduPlatform.core.bean;

public class UserPayAccountInfo {
	
	private long userid;
	private String balanceSum; //余额， 单位元

	public UserPayAccountInfo() {
		
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

	public String getBalanceSum() {
		return balanceSum;
	}

	public void setBalanceSum(String balanceSum) {
		this.balanceSum = balanceSum;
	}

	
	
	

}
