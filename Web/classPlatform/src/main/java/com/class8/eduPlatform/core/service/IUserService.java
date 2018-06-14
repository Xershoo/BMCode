package com.class8.eduPlatform.core.service;

import java.util.List;

import com.class8.eduPlatform.core.dto.TeacherDto;
import com.class8.eduPlatform.core.dto.UserAuthStatusDto;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.StudentQueryExample;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.dto.TeacherStudentDto;
import com.github.pagehelper.PageInfo;

public interface IUserService {
	
	public UserBasicInfo getUserBasicInfo(long uid);
	
	public UserBasicInfo getUserBasicInfoByUname(String uname);
	
	public AuthTeacherInfo getAuthTeacherInfoByUid(long uid);

	public AuthSchoolInfo getAuthSchoolInfoByUid(long uid);
	
	public UserAuthStatusDto getTeacherAuthStatus(long teacherUid);

	public int countOfTeacherStudent(long teacherUid);
	
	public int countOfSchoolStudent(long id);

	public PageInfo<TeacherStudentDto> listTeacherStudentByExamplePage(StudentQueryExample example, int pageNum, int pageSize);

	public PageInfo<TeacherDto> listSchoolStarTeachersPage(Long schoolId, int pageNum,int pageSize);

	public PageInfo<TeacherDto> listSchoolTeachersPage(Long schoolId, int page,int pageSize);

	public int countOfSchoolStudentByPrincipalId(long uid);

	public int countOfSchoolTeacher(long schoolId);

	public AuthSchoolInfo getAuthSchoolInfoByTeacherUid(long teacherUid);

	public AuthSchoolInfo getAuthSchoolInfoByRecommendUid(long recommendUid);
	
	public long login(String uname, String password);
	
	public PageInfo<TeacherDto> listTeachersPageByTeacherName(String teacherName,int pageNum,int pageSize);
}
