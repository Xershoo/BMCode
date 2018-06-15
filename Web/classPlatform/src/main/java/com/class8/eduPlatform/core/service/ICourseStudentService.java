package com.class8.eduPlatform.core.service;

import java.util.List;
import java.util.Map;

import com.class8.course.bean.CourseStudent;
import com.class8.eduPlatform.core.dto.CourseStudentDto;

public interface ICourseStudentService {
	
	public Map<String,Object> getSignedStudentByCourseidPage(long courseid,int pageNum,int pageSize);
	
	public CourseStudent getCourseStudentByStudentUidAndCourseid(long studentUid,long courseid);
	
}
