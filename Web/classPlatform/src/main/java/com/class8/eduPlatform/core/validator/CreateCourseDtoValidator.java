package com.class8.eduPlatform.core.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.class8.course.constants.CourseOnlineTypeConstants;
import com.class8.eduPlatform.core.dto.CreateCourseDto;

public class CreateCourseDtoValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return CreateCourseDto.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		CreateCourseDto createCourseDto = (CreateCourseDto) obj;
		ValidationUtils.rejectIfEmpty(errors, "courseName", null, "课程名称不能为空！");
		ValidationUtils.rejectIfEmpty(errors, "classifyId", null, "课程分类不能为空！");
//		ValidationUtils.rejectIfEmpty(errors, "coverUrl", null, "请上传课程图片！");
		if(CourseOnlineTypeConstants.PUBLIC_PERSONAL_COURSE == createCourseDto.getCourseType()){
//			ValidationUtils.rejectIfEmpty(errors, "signupStartTime", null, "报名起始时间不能为空！");
//			ValidationUtils.rejectIfEmpty(errors, "signupEndTime", null, "报名终止时间不能为空！" );
		}
	}

}
