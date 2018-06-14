package com.class8.eduPlatform.core.service;

import com.class8.eduPlatform.core.dto.CourseCommentDto;
import com.github.pagehelper.PageInfo;

public interface ICourseCommentService {

	PageInfo<CourseCommentDto> listCourseCommentPage(long courseid, int pageNum, int pageSize);

}
