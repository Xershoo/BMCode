package com.class8.eduPlatform.core.bean;

import java.sql.Timestamp;

import org.springframework.format.annotation.DateTimeFormat;

//老师加入学校，显示的历史记录
public class JsSchoolTeacherRecordInfo {
	
	private long 		schoolid;
	private String		schoolname;
	private String		schoolAdminRealName;
	private String 		schoolAdminNickName;
	private String		applyTime; //申请时间，邀请时间，签约时间
	private String		contractEndTime; //签约结束时间
	private String		schoollogo;
	private int			status;

	public JsSchoolTeacherRecordInfo() {
		// TODO Auto-generated constructor stub
	}

	public long getSchoolid() {
		return schoolid;
	}

	public void setSchoolid(long schoolid) {
		this.schoolid = schoolid;
	}

	public String getSchoolname() {
		return schoolname;
	}

	public void setSchoolname(String schoolname) {
		this.schoolname = schoolname;
	}

	public String getSchoolAdminRealName() {
		return schoolAdminRealName;
	}

	public void setSchoolAdminRealName(String schoolAdminRealName) {
		this.schoolAdminRealName = schoolAdminRealName;
	}

	public String getSchoolAdminNickName() {
		return schoolAdminNickName;
	}

	public void setSchoolAdminNickName(String schoolAdminNickName) {
		this.schoolAdminNickName = schoolAdminNickName;
	}	

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(String applyTime) {
		this.applyTime = applyTime;
	}

	public String getContractEndTime() {
		return contractEndTime;
	}

	public void setContractEndTime(String contractEndTime) {
		this.contractEndTime = contractEndTime;
	}

	public String getSchoollogo() {
		return schoollogo;
	}

	public void setSchoollogo(String schoollogo) {
		this.schoollogo = schoollogo;
	}

	
	
}
