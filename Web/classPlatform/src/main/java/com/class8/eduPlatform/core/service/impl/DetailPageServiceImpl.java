package com.class8.eduPlatform.core.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseFile;
import com.class8.course.bean.ShowCourseClass;
import com.class8.course.bean.SignMessage;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.bean.ClientCourselist;
import com.class8.eduPlatform.core.bean.CourseCard;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.service.IDetailPageService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.wanmei.sns.util.DateUtils;

@Service("IDetailPageService")
public class DetailPageServiceImpl implements IDetailPageService {
	@Autowired
	private com.class8.course.webservice.intf.IEduCourseService iEduCourseService;

	@Autowired
	IEduUserService iEduUserService;

	
	public JSONObject listCourseByDayToClient(String day,long uid,  int usertype)
	{
		long startTime = 0, endTime = 0;
		JSONObject json = new JSONObject();
		try {
			startTime = DateUtil.startByTime(day) ;
			endTime = DateUtil.endByTime(day) ;
		
		//UserConstants.UID = uid;
		List<Long> classidAll = null;
		
		if(usertype == UserTypeConstants.STUDENT)
			classidAll = iEduCourseService.listClassidByStudentUidAndTime(uid, startTime,endTime);
		else if(usertype == UserTypeConstants.TEACHER)
			classidAll = iEduCourseService.listClassidByTeacherUidAndTime(uid, startTime, endTime);
		
		List<CourseCard> curCard = courseCardClassfic(classidAll);
	    
	    if(curCard != null){
	    	json.put("courselist", curCard);
	    }
	 
		return json;
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<CourseCard> courseCardClassfic(List<Long> classidAll) {
		if(classidAll == null || classidAll.size() == 0)
			return null;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		DateUtil dateUtil = new DateUtil();
		List<CourseCard> courseCardAl = new ArrayList<CourseCard>();
		long now = System.currentTimeMillis();
		for (long classid : classidAll) {
			ShowCourseClass showCourseClass = iEduCourseService.getShowCourseClass(classid);
			//课堂未发布，不显示
			if(showCourseClass == null || showCourseClass.getCourseBasicInfo().getDisplayType() != DisplayTypeConstants.DISPLAY)
				continue;			
			
			CourseCard courseCard = new CourseCard();			
			courseCard.setClassid(classid);
			courseCard.setStudentCount(iEduCourseService.countCourseStudent(showCourseClass.getCourseid()));
			courseCard.setOnlineCount(showCourseClass.getCourseBasicInfo().getnOnlineCount());
			courseCard.setClassName(showCourseClass.getCourseClass().getClassName());
			courseCard.setCourseName(showCourseClass.getCourseBasicInfo().getCourseName());
			courseCard.setCourseid(showCourseClass.getCourseid());
			courseCard.setCoverUrl(showCourseClass.getCourseBasicInfo().getCoverUrl());
			courseCard.setSchoolid(showCourseClass.getCourseBasicInfo().getSchoolId());
			if(courseCard.getSchoolid() > 0){
				AuthSchoolInfo authSchoolInfo  = iEduUserService.getSchoolInfoById(courseCard.getSchoolid());
				if(authSchoolInfo != null)
					courseCard.setSchoolName(authSchoolInfo.getName());
			}
			
			courseCard.setTeacherUid(showCourseClass.getCourseBasicInfo().getTeacherUid());
			UserBasicInfo userBasicInfo = iEduUserService.getUserBasicInfo(courseCard.getTeacherUid());
			if(userBasicInfo == null){
				System.out.println("老师不存在，课程ID：" + showCourseClass.getCourseid());
				continue;
			}
			courseCard.setNickName(userBasicInfo.getNickName());
			courseCard.setRealName(userBasicInfo.getRealName());
			courseCard.setTeacherImage(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
			courseCard.setTeacherSex(userBasicInfo.getSex());

			courseCard.setClassStatus(showCourseClass.getCourseClass().getClassState());
			int canEnter = 0;
			if(courseCard.getClassStatus() == CourseStateConstants.COURSE_NOT_BEGIN){
				long thestarttime = showCourseClass.getCourseClass().getStartTimePlan().getTime();
				if(thestarttime - now <= 600000)//小于10分钟可以进入
					canEnter = 1;
			}			
			courseCard.setCanEnterClass(canEnter);
			
			
			courseCard.setStartTimePlan(DateUtil.timestamp2String(showCourseClass.getCourseClass().getStartTimePlan()));
			courseCard.setEndTimePlan(DateUtil.timestamp2String(showCourseClass.getCourseClass().getEndTimePlan()));
			if(showCourseClass.getCourseClass().getStartTimeActual() != null)
				courseCard.setStartTimeReal(DateUtil.timestamp2String(showCourseClass.getCourseClass().getStartTimeActual()));
			if(showCourseClass.getCourseClass().getEndTimeActual() != null)
				courseCard.setEndTimeReal(DateUtil.timestamp2String(showCourseClass.getCourseClass().getEndTimeActual()));
			courseCard.setTotalclass(showCourseClass.getCourseBasicInfo().getClassTotal());
			courseCard.setFinishedclass(showCourseClass.getCourseBasicInfo().getClassHadFinished());
			
			courseCardAl.add(courseCard);
		}
		return courseCardAl;
	}
	
	public List<Long> getClassListToClinet(String day, long uid, int usertype) {
		long startTime = 0, endTime = 0;

		try {
			startTime = DateUtil.startByTime(day);
			endTime = DateUtil.endByTime(day);

			// UserConstants.UID = uid;
			List<Long> classidAll = null;

			if (usertype == UserTypeConstants.STUDENT)
				classidAll = iEduCourseService.listClassidByStudentUidAndTime(
						uid, startTime, endTime);
			else if (usertype == UserTypeConstants.TEACHER)
				classidAll = iEduCourseService.listClassidByTeacherUidAndTime(
						uid, startTime, endTime);

			return classidAll;
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		
	}
}
