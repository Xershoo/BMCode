package com.class8.eduPlatform.core.dto;

import java.io.Serializable;

/**
 * 用户认证状态 0：没有认证  1：已经认证
 * @author Administrator
 *
 */
public class UserAuthStatusDto implements Serializable {
	
	private static final long serialVersionUID = 2107043642915478414L;

	//身份证认证状态
	private int idcardAuthStatus;
	
	//学历证书认证状态
	private int educationalAuthStatus;
	
	//教师证认证状态
	private int teachercertAuthStatus;
	
	//其他专业认证
	private int otherProfessionalAuthStatus;
	
	//已经创建学校标识状态
	private int createSchoolFlag;
	
	//平台签约老师标识
	private int contractedTeacherFlag;

	public int getIdcardAuthStatus() {
		return idcardAuthStatus;
	}

	public void setIdcardAuthStatus(int idcardAuthStatus) {
		this.idcardAuthStatus = idcardAuthStatus;
	}

	public int getEducationalAuthStatus() {
		return educationalAuthStatus;
	}

	public void setEducationalAuthStatus(int educationalAuthStatus) {
		this.educationalAuthStatus = educationalAuthStatus;
	}

	public int getTeachercertAuthStatus() {
		return teachercertAuthStatus;
	}

	public void setTeachercertAuthStatus(int teachercertAuthStatus) {
		this.teachercertAuthStatus = teachercertAuthStatus;
	}

	public int getOtherProfessionalAuthStatus() {
		return otherProfessionalAuthStatus;
	}

	public void setOtherProfessionalAuthStatus(int otherProfessionalAuthStatus) {
		this.otherProfessionalAuthStatus = otherProfessionalAuthStatus;
	}

	public int getCreateSchoolFlag() {
		return createSchoolFlag;
	}

	public void setCreateSchoolFlag(int createSchoolFlag) {
		this.createSchoolFlag = createSchoolFlag;
	}

	public int getContractedTeacherFlag() {
		return contractedTeacherFlag;
	}

	public void setContractedTeacherFlag(int contractedTeacherFlag) {
		this.contractedTeacherFlag = contractedTeacherFlag;
	}
	
}
