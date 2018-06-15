package com.class8.eduPlatform.core.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.service.ICourseClassService;
import com.class8.user.webservice.intf.IEduUserService;
import com.class8.course.bean.CourseClass;

@Service
public class CourseClassServiceImpl implements ICourseClassService {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Override
	public Map<String, List<Map<String,Object>>> findStudentClasssDetailByPlanTime(long studentUid, String startDateTime, String endDateTime) {
		Map<String,List<Map<String,Object>>> result = new HashMap<String,List<Map<String,Object>>>();
		List<Long> courseids = eduCourseService.findStudentCourseIdsByStatus(studentUid,OrderStatusConstant.hadpay);
		if(courseids != null && courseids.size()>0){
			for (Long courseid : courseids) {
				List<Map<String,Object>> courseClassDetails = eduCourseService.listCourseClassDetail(courseid,startDateTime,endDateTime);
				for (Map<String, Object> courseClassDetail : courseClassDetails) {
					Timestamp startTimePlan = (Timestamp) courseClassDetail.get("startTimePlan");
					courseClassDetail.put("week", DateUtil.containStime2Week(startTimePlan.getTime()));
					String key = DateUtil.time2String(startTimePlan.getTime());
					if(result.containsKey(key)){
						result.get(key).add(courseClassDetail);
					} else {
						List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
						list.add(courseClassDetail);
						result.put(key, list);
					}
				}
			}
		}
		return result;
	}
	
	@Override
	public Map<String, List<Map<String, Object>>> findTeacherClasssDetailByPlanTime( long teacherUid, String startPlanTime, String endPlanTime) {
		Map<String,List<Map<String,Object>>> result = new HashMap<String,List<Map<String,Object>>>();
		List<Long> courseids = eduCourseService.findTeacherCourseIds(teacherUid);
		if(courseids != null && courseids.size()>0){
			for (Long courseid : courseids) {
				List<Map<String,Object>> courseClassDetails = eduCourseService.listCourseClassDetail(courseid,startPlanTime,endPlanTime);
				for (Map<String, Object> courseClassDetail : courseClassDetails) {
					Timestamp startTimePlan = (Timestamp) courseClassDetail.get("startTimePlan");
					courseClassDetail.put("week", DateUtil.containStime2Week(startTimePlan.getTime()));
					String key = DateUtil.time2String(startTimePlan.getTime());
					if(result.containsKey(key)){
						result.get(key).add(courseClassDetail);
					} else {
						List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
						list.add(courseClassDetail);
						result.put(key, list);
					}
				}
			}
		}
		return result;
	}
	
	@Override
	public List<CourseClass> listCourseClassByCourseid(long courseid) {
		return eduCourseService.listCourseClass(courseid);
	}

}
