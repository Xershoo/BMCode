package com.class8.eduPlatform.core.service.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.class8.course.bean.CourseComment;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseCommentDto;
import com.class8.eduPlatform.core.service.ICourseCommentService;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Service
public class CourseCommentImpl implements ICourseCommentService {
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Override
	public PageInfo<CourseCommentDto> listCourseCommentPage(long courseid, int pageNum, int pageSize) {
		List<CourseCommentDto> courseCommentDtos = new ArrayList<CourseCommentDto>();
		PageInfo pageInfo = eduCourseService.listCourseCommentPage(courseid,pageNum,pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (CourseComment courseComment : (List<CourseComment>)pageInfo.getList()) {
				CourseCommentDto courseCommentDto = new CourseCommentDto();
				try {
					BeanUtils.copyProperties(courseCommentDto, courseComment);
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(courseComment.getUid());
				courseCommentDto.setNickName(userBasicInfo.getNickName());
				courseCommentDto.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
				courseCommentDtos.add(courseCommentDto);
			}
		}
		pageInfo.setList(courseCommentDtos);
		return pageInfo;
	}
}
