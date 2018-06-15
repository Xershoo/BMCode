package com.class8.eduPlatform.core.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.TeacherDto;
import com.class8.eduPlatform.core.dto.UserAuthStatusDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.user.bean.AuthCertificateInfo;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.StudentQueryExample;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.CerificateTypeConstant;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.dto.TeacherStudentDto;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Service
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private ICourseService courseService;
	
	@Override
	public UserBasicInfo getUserBasicInfo(long uid){
		return eduUserService.getUserBasicInfo(uid);
	}
	
	@Override
	public UserBasicInfo getUserBasicInfoByUname(String uname) {
		return eduUserService.getUserBasicInfoByUname(uname);
	}
	
	@Override
	public AuthTeacherInfo getAuthTeacherInfoByUid(long uid){
		return eduUserService.getAuthTeacherInfo(uid);
	}
	
	@Override
	public AuthSchoolInfo getAuthSchoolInfoByUid(long uid) {
		AuthSchoolInfo info = eduUserService.getSchoolInfoByCreateid(uid);
		if(info == null){
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(uid);
			if(userBasicInfo.getUserType() == UserTypeConstants.SCHOOL_ADMIN){
				info = eduUserService.getSchoolInfoByCreateid(userBasicInfo.getRecommendUid());
			}
		}
		return info;
	}
	
	@Override
	public UserAuthStatusDto getTeacherAuthStatus(long teacherUid) {
		UserAuthStatusDto userAuthStatus = new UserAuthStatusDto();
		//身份证认证
		userAuthStatus.setIdcardAuthStatus(1);
		List<AuthCertificateInfo> authCertificateInfos = eduUserService.listAuthCertificateInfoByUid(teacherUid, CerificateTypeConstant.toAuthTeacher);
		if(authCertificateInfos != null && authCertificateInfos.size()>0){
			for (AuthCertificateInfo authCertificateInfo : authCertificateInfos) {
				int certificateType =authCertificateInfo.getCertificateType();
				if(CerificateTypeConstant.educational == certificateType){
					userAuthStatus.setEducationalAuthStatus(1);
				} 
				if(CerificateTypeConstant.teachercert == certificateType){
					userAuthStatus.setTeachercertAuthStatus(1);
				}
				if(CerificateTypeConstant.other == certificateType){
					userAuthStatus.setOtherProfessionalAuthStatus(1);
				}
			}
		}
		return userAuthStatus;
	}
	
	@Override
	public int countOfTeacherStudent(long teacherUid) {
		return eduUserService.countOfTeacherStudent(teacherUid);
	}
	
	@Override
	public int countOfSchoolStudent(long schoolId) {
		return eduUserService.countOfSchoolStudent(schoolId);
	}
	
	@Override
	public PageInfo<TeacherStudentDto> listTeacherStudentByExamplePage(StudentQueryExample example, int pageNum, int pageSize) {
		PageInfo<TeacherStudentDto> pageInfo = eduUserService.listTeacherStudentByExamplePage(example, pageNum, pageSize) ;
		if(pageInfo != null && pageInfo.getList().size()>0){
			for (TeacherStudentDto teacherStudent : pageInfo.getList()) {
				teacherStudent.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + teacherStudent.getAvatarUrl());
			}
		}
		return pageInfo;
	}
	
	@Override
	public PageInfo<TeacherDto> listSchoolStarTeachersPage(Long schoolId, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduUserService.listSchoolStarTeacherIdsPage(schoolId,pageNum,pageSize);
		return this.queryTeacherDtos(pageInfo);
	}
	
	@Override
	public PageInfo<TeacherDto> listSchoolTeachersPage(Long schoolId, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduUserService.listSchoolTeacherIdsPage(schoolId,pageNum,pageSize);
		return this.queryTeacherDtos(pageInfo);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private PageInfo<TeacherDto> queryTeacherDtos(PageInfo pageInfo){
		List<TeacherDto> teachers = new ArrayList<TeacherDto>();
		if(pageInfo.getList() != null ){
			for (Object teacherUid : pageInfo.getList()) {
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo((Long)teacherUid);
				TeacherDto teacher = new TeacherDto();
				teacher.setTeacherUid(userBasicInfo.getUid());
				teacher.setUname(userBasicInfo.getUname());
				teacher.setNickName(userBasicInfo.getNickName());
				teacher.setRealName(userBasicInfo.getRealName());
				teacher.setSex(userBasicInfo.getSex());
				teacher.setDescription(userBasicInfo.getDescription());
				teacher.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
				teacher.setLargeHeadimge(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getPhotoUrl());
				teacher.setTeachYears(userBasicInfo.getTeachYears());
				teacher.setSchoolClassify(userBasicInfo.getSchoolClassify());
				teacher.setOccupation(userBasicInfo.getOccupation());
				teacher.setCompany(userBasicInfo.getCompany());
				//老师课程的总数
				int countCourse = courseService.countOfTeacherCourse((Long)teacherUid);
				teacher.setCountCourse(countCourse);
				//老师学生的总数
				int countStudent = this.countOfTeacherStudent((Long)teacherUid);
				teacher.setCountStudent(countStudent);
				//老师的评分TODO
				teacher.setAvgScore(5.0f);
				teachers.add(teacher);
			}
		}
		pageInfo.setList(teachers);
		return pageInfo;
	}

	@Override
	public int countOfSchoolStudentByPrincipalId(long uid) {
		return eduUserService.countMySchoolSelfStudents(uid);
	}
	
	@Override
	public int countOfSchoolTeacher(long schoolId) {
		return eduUserService.countOfSchoolTeacher(schoolId);
	}
	
	@Override
	public AuthSchoolInfo getAuthSchoolInfoByTeacherUid(long teacherUid) {
		SchoolsTeacher schoolTeacher = eduUserService.getSchoolTeacherByTeacherUid(teacherUid);
		if(schoolTeacher != null){
			long schoolId = schoolTeacher.getSchoolId();
			AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(schoolId);
			return authSchoolInfo;
		}
		return null;
	}
	
	@Override
	public AuthSchoolInfo getAuthSchoolInfoByRecommendUid(long recommendUid) {
		return eduUserService.getSchoolInfoByCreateid(recommendUid);
	}
	
	public long login(String uname, String password){
		return eduUserService.login(uname, password);
	}
	
	public PageInfo<TeacherDto> listTeachersPageByTeacherName(String teacherName,int pageNum,int pageSize){
		PageInfo<Long> pageInfo = eduUserService.listAuthTeacherIdsPageByTeacherName(teacherName,pageNum,pageSize);
		return this.queryTeacherDtos(pageInfo);
	}

}
