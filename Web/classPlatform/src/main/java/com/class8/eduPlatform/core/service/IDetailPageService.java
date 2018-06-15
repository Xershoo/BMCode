package com.class8.eduPlatform.core.service;

import java.util.List;

import net.sf.json.JSONObject;


public interface IDetailPageService {
	
	//为客户端而定制的一新接口
	JSONObject listCourseByDayToClient(String day,long uid, int usertype);
	
	List<Long> getClassListToClinet(String day,long uid, int usertype);
}
