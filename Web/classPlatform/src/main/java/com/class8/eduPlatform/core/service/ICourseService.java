package com.class8.eduPlatform.core.service;

import java.util.List;
import java.util.Map;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseQueryExample;
import com.class8.eduPlatform.core.dto.CourseDetailDto;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.github.pagehelper.PageInfo;

public interface ICourseService {
	
	public CourseDetailDto getCourseDetail(long courseid);
	
	public Map<String, List<Map<String,Object>>> listCourseClassDetail(long studentUid, String startDateTime, String endDateTime);
	
	public List<Map<String, Object>> listCourseNameByTeacherUid(long teacherUid);

	public PageInfo<CourseBasicInfo> listTeacherOtherCoursePage(long courseid,int pageNum,int pageSize);

	public int countOfTeacherCourse(long teacherUid);
	
	public PageInfo<Map<String,Object>> listTeacherCourseDetailPage(CourseQueryExample example,int pageNum,int pageSize);
	
	public PageInfo<Map<String,Object>> listSchoolCourseDetailPage(CourseQueryExample example,int pageNum,int pageSize);

	public PageInfo<CourseDto> listTeacherHotCourses(long teacherUid, int pageNum,int pageSize);

	public PageInfo<CourseDto> listTeacherCoursesPage(long teacherUid, int pageNum,int pageSize);
	
	public PageInfo<CourseDto> listStudentLearningCourses(long studentUid,int pageNum, int pageSize);

	public PageInfo<CourseDto> listStudentLearnedCourses(long studentUid,int pageNum, int pageSize);

	public int countOfSchoolCourse(long id);

	public PageInfo<CourseDto> listSchoolHotCoursesPage(Long schoolId, int pageNum,int pageSize);

	public PageInfo<CourseDto> listSchoolCoursesPage(Long schoolId, int pageNum,int pageSize);

	public PageInfo<Map<String, Object>> listStudentCourseDetailPage(CourseQueryExample example, int page, int pageSize);
	
	public PageInfo<Map<String, Object>> listStudentCourseDetailPageNew(CourseQueryExample example, int page, int pageSixe);
	
	public PageInfo<Map<String,Object>> listTeacherCourseDetailPageNew(CourseQueryExample example,int pageNum,int pageSize);

	public PageInfo<Map<String, Object>> searchCourse(CourseQueryExample example, int pageNum, int pageSize);

	public PageInfo<CourseDto> getWillBeginCourses(int pageNum,int pageSize);

	public PageInfo<CourseDto> getRecommendCourses(int pageNum, int pageSize);

	public PageInfo<Map<String, Object>> listLiveCourse(CourseQueryExample example,int pageNum, int pageSize);

	public CourseClass getCourseClassByCourseid(long courseid);


	
}
