package com.class8.eduPlatform.core.controller.teacher;

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

import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/infocenter/teacher")
public class TeacherInfoCenterController {
	
	public static final String CENTER = "/teacher/teacherHomePage";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(value="/{teacherUid}",method=RequestMethod.GET)
	public String center(@PathVariable("teacherUid") long teacherUid,Model model){
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(teacherUid);
		if(userBasicInfo == null){
			throw new ResourceNotFoundException();
		}
		//老师基本信息
		userBasicInfo.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
		model.addAttribute("teacher", userBasicInfo);
		//老师签约的学校信息
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByTeacherUid(teacherUid);
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		//老师课程的总数
		int countCourse = courseService.countOfTeacherCourse(teacherUid);
		model.addAttribute("countCourse", countCourse);
		//老师学生的总数
		int countStudent = userService.countOfTeacherStudent(teacherUid);
		model.addAttribute("countStudent", countStudent);
		model.addAttribute("curPageName", "老师详情");
		return CENTER;
	}
	
	@RequestMapping(value="/getLastestCourses")
	@ResponseBody
	public String getLatestCourses(@RequestParam("teacherUid") long teacherUid,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listTeacherCoursesPage(teacherUid,pageNum,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getHotCourses")
	@ResponseBody
	public String getHotCourses(@RequestParam("teacherUid") Long teacherUid,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listTeacherHotCourses(teacherUid,pageNum,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="getAllCourses")
	@ResponseBody
	public String getAllCourses(@RequestParam("teacherUid") Long teacherUid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<CourseDto> pageInfo = courseService.listTeacherCoursesPage(teacherUid,page,pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", pageInfo);
		return jsonObject.toString();
	}
	
	
	
	
	
	
	
	
	
	

}
