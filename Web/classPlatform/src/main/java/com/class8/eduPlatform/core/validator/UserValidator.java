package com.class8.eduPlatform.core.validator;

import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.class8.eduPlatform.common.util.RegexUtil;
import com.class8.eduPlatform.security.bean.User;

public class UserValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		User user = (User) obj;
		ValidationUtils.rejectIfEmpty(errors, "mobile", null, "手机号不能为空.");
		if(!RegexUtil.isPhone(user.getMobile())){
			errors.rejectValue("mobile", "", "输入的手机格式有误.");
		}
		ValidationUtils.rejectIfEmpty(errors, "email",  null, "邮箱不能为空.");
		if(!RegexUtil.isEmail(user.getEmail())){
			errors.rejectValue("email", null, "输入的邮箱有误.");
		}
		ValidationUtils.rejectIfEmpty(errors, "password", null, "请输入密码.");
		ValidationUtils.rejectIfEmpty(errors, "confirmPwd", null, "请输入确认密码.");
		if(StringUtils.isNotEmpty(user.getPassword()) && StringUtils.isNotEmpty(user.getConfirmPwd())){
			//TODO 用户密码安全等级校验
			if(user.getPassword() != user.getConfirmPwd()){
				errors.rejectValue("confirmPwd", null, "两次密码不相同.");
			}
		}
		ValidationUtils.rejectIfEmpty(errors, "verifyCode", null, "请填写验证码.");
	}
	
}
