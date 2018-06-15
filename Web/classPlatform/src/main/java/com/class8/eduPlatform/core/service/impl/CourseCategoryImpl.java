package com.class8.eduPlatform.core.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.bean.CourseCategory;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.service.ICourseCategoryService;
@Service
public class CourseCategoryImpl implements ICourseCategoryService {
	
	@Autowired
	private IEduCourseService eduCourseService;

	@Override
	public List<CourseCategory> listCourseCategoryPath(long id) {
		return eduCourseService.listCourseCategoryPath(id);
	}
	
	@Override
	public List<Map<String, Object>> listCourseCategoryTree() {
		return eduCourseService.listCourseCategoryTree();
	}
	
}
