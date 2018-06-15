package com.class8.eduPlatform.core.service;

import java.util.List;
import java.util.Map;

import com.class8.course.bean.CourseCategory;

public interface ICourseCategoryService {
	
	public List<CourseCategory> listCourseCategoryPath(long id);
	
	public List<Map<String, Object>> listCourseCategoryTree();
}
