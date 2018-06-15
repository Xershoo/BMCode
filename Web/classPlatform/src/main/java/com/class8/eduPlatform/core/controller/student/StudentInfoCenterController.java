package com.class8.eduPlatform.core.controller.student;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;

@Controller
@RequestMapping("/infocenter/student")
public class StudentInfoCenterController {
	
	private static final String CENTER = "/student/studentIndex";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(value="/{studentUid}",method=RequestMethod.GET)
	public String center(@PathVariable("studentUid") long studentUid,Model model){
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(studentUid);
		userBasicInfo.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
		model.addAttribute("student", userBasicInfo);
		//查询学生所属的学校信息
		AuthSchoolInfo authSchoolInfo = null;
		if(userBasicInfo.getRecommendUid() != 0){
			authSchoolInfo = userService.getAuthSchoolInfoByRecommendUid(userBasicInfo.getRecommendUid());
		}
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		return CENTER;
	}
	
	@RequestMapping(value="/getLearningCourses")
	@ResponseBody
	public String getLearningCourses(@RequestParam("studentUid") long studentUid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listStudentLearningCourses(studentUid,page,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	} 
	
	@RequestMapping(value="/getLearnedCourses")
	@ResponseBody
	public String getLearnedCourses(@RequestParam("studentUid") long studentUid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listStudentLearnedCourses(studentUid,page,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	} 
}
