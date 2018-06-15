package com.class8.eduPlatform.core.service.impl;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.bean.CourseFile;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.exception.BusinessException;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.service.ICourseFileService;
import com.class8.user.webservice.intf.IEduUserService;

@Service
public class CourseFileServiceImpl implements ICourseFileService {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Override
	public List<Map<String,Object>> listCourseFileByCourseidAndUid(long courseid,long uid){
		List<Map<String,Object>> files = new ArrayList<Map<String,Object>>();
		List<CourseFile> courseFiles = eduCourseService.listCourseFileByCourseidAndUid(courseid,uid);
		if(courseFiles != null && courseFiles.size()>0){
			for (CourseFile courseFile : courseFiles) {
				Map<String,Object> file = new HashMap<String,Object>();
				file.put("fileid", courseFile.getFileid());
				file.put("courseid", courseFile.getCourseid());
				file.put("filename", courseFile.getFilename());
				file.put("fileUrl", SystemConfigs.CURSEWAVE + courseFile.getFileUrl());
				//是否锁定
				file.put("displayType", courseFile.getDisplayType());
				//显示序号
				file.put("displayOrder", courseFile.getDisplayOrder());
				file.put("size", courseFile.getSize());
				file.put("lastmodified", DateUtil.timestamp2String(courseFile.getLastmodified(),DateUtil.YYYY_MM_DD_HH_MM));
				files.add(file);
			}
		}
		return files;
	}
	
	@Override
	public List<Map<String, Object>> listDisplayCourseFileByCourseid( long courseid) {
		List<Map<String,Object>> files = new ArrayList<Map<String,Object>>();
		List<CourseFile> courseFiles = eduCourseService.listCourseDisplayedFileByCourseid(courseid);
		if(courseFiles != null && courseFiles.size()>0){
			for (CourseFile courseFile : courseFiles) {
				Map<String,Object> file = new HashMap<String,Object>();
				file.put("fileid", courseFile.getFileid());
				file.put("courseid", courseFile.getCourseid());
				file.put("filename", courseFile.getFilename());
				file.put("fileUrl", SystemConfigs.CURSEWAVE + courseFile.getFileUrl());
				file.put("displayOrder", courseFile.getDisplayOrder());
				file.put("size", courseFile.getSize());
				file.put("lastmodified", DateUtil.timestamp2String(courseFile.getLastmodified(),DateUtil.YYYY_MM_DD_HH_MM));
				files.add(file);
			}
		}
		return files;
	}

	@Override
	public void lockFile(long fileid) {
		CourseFile courseFile = eduCourseService.getCourseFileById(fileid);
		courseFile.setDisplayType(DisplayTypeConstants.NOT_DISPLAY);
		eduCourseService.insertOrUpdateCourseFile(courseFile);
	}
	
	@Override
	public void unLockFile(long fileid) {
		CourseFile courseFile = eduCourseService.getCourseFileById(fileid);
		courseFile.setDisplayType(DisplayTypeConstants.DISPLAY);
		eduCourseService.insertOrUpdateCourseFile(courseFile);
	}
	
	@Override
	public void deleteFile(List<Long> fileids) {
		eduCourseService.deleteCourseFiles(fileids);
	}
	
	@Override
	public CourseFile getCourseFileById(long fileid) {
		return eduCourseService.getCourseFileById(fileid);
	}
	
	@Override
	public void renameFile(CourseFile courseFile, String newName) throws BusinessException {
		String oldName = courseFile.getFilename();
		int endIndex = courseFile.getFileUrl().lastIndexOf("/");
		String fileDir = courseFile.getFileUrl().substring(0, endIndex + 1);
		courseFile.setFilename(newName);
		courseFile.setFileUrl(fileDir + newName);
		courseFile.setLastmodified(DateUtil.timestampOfNow());
		
		Map<String, String> params=new HashMap<String, String>();
		params.put("path", SystemConfigs.FILE_UP_BASE_PATH + fileDir);
		try {
			params.put("oldname",URLEncoder.encode(oldName,"UTF-8"));  
			params.put("newname",URLEncoder.encode(newName, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		String result = FileUploadUtil.rename(SystemConfigs.UPDATE_FILENAME, params);
		if(-1 == Integer.parseInt(result)){
			throw new BusinessException("文件不存在或已删除！");
		} else if(-2 == Integer.parseInt(result))
			throw new BusinessException("新的文件名已经存在！");
		if(-3 == Integer.parseInt(result)){
			throw new BusinessException("文件重命名失败！");
		}
		eduCourseService.insertOrUpdateCourseFile(courseFile);
	}
}
