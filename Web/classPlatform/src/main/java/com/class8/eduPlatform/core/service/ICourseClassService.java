package com.class8.eduPlatform.core.service;

import java.util.List;
import java.util.Map;
import com.class8.course.bean.CourseClass;

public interface ICourseClassService {
	
	public Map<String, List<Map<String,Object>>> findStudentClasssDetailByPlanTime(long studentUid,String startPlanTime,String endPlanTime);
	
	public Map<String,List<Map<String,Object>>> findTeacherClasssDetailByPlanTime(long teacherUid,String startPlanTime,String endPlanTime);
	
	public List<CourseClass> listCourseClassByCourseid(long courseid);
	
	

}
