package com.class8.eduPlatform.core.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.bean.CourseStudent;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseStudentDto;
import com.class8.eduPlatform.core.service.ICourseStudentService;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;
@Service
public class CourseStudentServiceImpl implements ICourseStudentService {
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Override
	public Map<String,Object> getSignedStudentByCourseidPage(long courseid, int pageNum, int pageSize) {
		Map<String,Object> result = new HashMap<String,Object>();
		PageInfo<Long> pageInfo = eduCourseService.listCourseStudentIdPage(courseid, pageNum, pageSize);
		result.put("total", pageInfo.getTotal());
		List<CourseStudentDto> students = new ArrayList<CourseStudentDto>();
		if(pageInfo.getList() != null){
			for (Long studentId : pageInfo.getList()) {
				UserBasicInfo studentBasicInfo = eduUserService.getUserBasicInfo(studentId);
				CourseStudentDto student = new CourseStudentDto();
				student.setStudentUid(studentBasicInfo.getUid());
				if(StringUtils.isEmpty(studentBasicInfo.getNickName())){
					student.setNickName(studentBasicInfo.getUname().substring(0, 1) + "**");
				} else {
					student.setNickName(studentBasicInfo.getNickName().substring(0, 1) + "**");
				}
				if(!StringUtils.isEmpty(studentBasicInfo.getRealName()))
					student.setRealName(studentBasicInfo.getRealName().substring(0, 1) + "**");
				student.setUname(studentBasicInfo.getUname());
				student.setSex(studentBasicInfo.getSex());
				student.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + studentBasicInfo.getAvatarUrl());
				students.add(student);
			}
		}
		result.put("students", students);
		return result;
	}
	
	@Override
	public CourseStudent getCourseStudentByStudentUidAndCourseid(long studentUid,long courseid) {
		return eduCourseService.getCourseStudentByStudentUidAndCourseid(studentUid,courseid);
	}

}
