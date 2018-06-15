package com.class8.eduPlatform.core.controller.teacher;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.service.ICourseClassService;
import com.class8.eduPlatform.core.service.impl.CourseClassServiceImpl;

/**
 * 老师课表相关控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/teacher/schedule")
public class TeacherScheduleController extends BaseController {
	
	private static final Logger logger = Logger.getLogger(TeacherScheduleController.class);
	
	public static final String MY_COURSE = "/course/teacherCourse";
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private ICourseClassService courseClassService;
	
	@RequestMapping(value = "/toMyCourse")
	public String toMyCourse() {		
		return MY_COURSE;
	}
	
	@RequestMapping("/listCourseName")
	@ResponseBody
	public String listCourseNames(){
		JSONObject json = new JSONObject();
		long teacherUid = this.getShiroUser().getUid();
		List<Long> courseids = eduCourseService.findTeacherCourseIds(teacherUid);
		if(courseids != null && courseids.size()>0){
			List<Map<String,Object>> courses = new ArrayList<Map<String,Object>>();
			for (Long courseid : courseids) {
				Map<String,Object> course = new HashMap<String,Object>();
				CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
				course.put("courseid", courseBasicInfo.getCourseid());
				course.put("courseName", courseBasicInfo.getCourseName());
				courses.add(course);
			}
			json.put("result", courses);
		}
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping("/listCourseClass")
	@ResponseBody
	public String listCourseClasss(@RequestParam String startDate,@RequestParam String endDate){
		long teacherUid = this.getShiroUser().getUid();
		JSONObject json = new JSONObject();
		startDate = startDate.replace("_", "-");
		endDate = endDate.replace("_", "-");
		try {
			if(DateUtil.startByTime(startDate) > DateUtil.startByTime(endDate)){
				json.put("message", "开始日期不能大于结束日期！");
			} else {
				String startPlanTime = startDate + " 00:00:00";
				String endPlanTime = endDate + " 23:59:59";
				json.put("result", JSONUtil.objectToJson(courseClassService.findTeacherClasssDetailByPlanTime(teacherUid,startPlanTime,endPlanTime),DateUtil.YYYY_MM_DD_HH_MM));
				json.put("success", true);
			}
		} catch (ParseException e) {
			json.put("message", "参数错误！");
			logger.error(e.getMessage(), e);
		}
		return json.toString();
	}
	
}
