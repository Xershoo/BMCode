package com.class8.eduPlatform.core.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import com.class8.user.bean.Message;

public class MessageValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Message.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		ValidationUtils.rejectIfEmpty(errors, "title", null, "公告标题不能为空!");
		ValidationUtils.rejectIfEmpty(errors, "content", null, "公告内容不能为空!");
	}

}
