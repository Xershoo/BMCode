package com.class8.eduPlatform.core.service;

import java.util.List;
import java.util.Map;

import com.class8.course.bean.CourseFile;
import com.class8.eduPlatform.common.exception.BusinessException;

public interface ICourseFileService {
	
	public List<Map<String,Object>> listCourseFileByCourseidAndUid(long courseid,long uid) throws Exception ;

	public List<Map<String, Object>> listDisplayCourseFileByCourseid(long courseid);

	public void lockFile(long fileid);
	
	public void unLockFile(long fileid);

	public void deleteFile(List<Long> fileids);
	
	public CourseFile getCourseFileById(long fileid);

	public void renameFile(CourseFile courseFile, String newName) throws BusinessException;
	
	
	
}
