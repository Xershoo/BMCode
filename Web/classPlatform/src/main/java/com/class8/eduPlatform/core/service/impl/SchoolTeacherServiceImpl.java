package com.class8.eduPlatform.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.eduPlatform.core.service.ISchoolTeacherService;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.webservice.intf.IEduUserService;

@Service
public class SchoolTeacherServiceImpl implements ISchoolTeacherService {
	
	@Autowired
	private IEduUserService eduUseService;
	
	public SchoolsTeacher getSchoolTeacherByTeacherUid(long teacherUid){
		return eduUseService.getSchoolTeacherByTeacherUid(teacherUid);
	}
}
