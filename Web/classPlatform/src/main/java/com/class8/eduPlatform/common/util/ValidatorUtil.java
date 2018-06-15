package com.class8.eduPlatform.common.util;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;

public class ValidatorUtil {
	
	public static void addValidateError(JSONObject json,Errors errors){
		List<ObjectError> objecctErrors = errors.getAllErrors();
		if(objecctErrors != null && objecctErrors.size()>0){
			for (ObjectError objectError : objecctErrors) {
				String fieldName = objectError.getCodes()[1];
				if(json.get(fieldName) == null){
					json.put(fieldName, objectError.getDefaultMessage());
				}
			}
		}
	}
	
	public static void addValidateError(Model model,Errors errors){
		List<ObjectError> objecctErrors = errors.getAllErrors();
		if(objecctErrors != null && objecctErrors.size()>0){
			for (ObjectError objectError : objecctErrors) {
				String fieldName = objectError.getCodes()[1];
				if(!model.containsAttribute(fieldName)){
					model.addAttribute(fieldName, objectError.getDefaultMessage());
				}
			}
		}
	}
}
