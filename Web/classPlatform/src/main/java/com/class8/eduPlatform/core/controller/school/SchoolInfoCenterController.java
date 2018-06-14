package com.class8.eduPlatform.core.controller.school;

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
import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.dto.MessageDto;
import com.class8.eduPlatform.core.dto.TeacherDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IMessageService;
import com.class8.eduPlatform.core.service.ISchoolBannerService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.Message;
import com.class8.user.bean.SchoolBanner;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.MessageTypeConstants;
import com.class8.user.constants.PublishFlagConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/infocenter/school")
public class SchoolInfoCenterController {
	
	public static final String CENTER = "/school/schoolHomePage";
	public static final String MESSAGE_DETAIL = "/school/viewCampusBulletin";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IMessageService messageService;
	
	@Autowired
	private ISchoolBannerService schoolBannerService;
	
	@RequestMapping(value="/{schoolId}",method=RequestMethod.GET)
	public String center(@PathVariable("schoolId") long schoolId,Model model){
		AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(schoolId);
		if(authSchoolInfo == null){
			throw new ResourceNotFoundException();
		}
		
		//学校基本信息
		authSchoolInfo.setLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
		model.addAttribute("authSchoolInfo", authSchoolInfo);
		
		//学校banner图片
		List<SchoolBanner> schoolBanners = schoolBannerService.listSchoolBanner(schoolId);
		model.addAttribute("schoolBanners", schoolBanners);
		
		//校长基本信息
		UserBasicInfo principalBasicInfo = eduUserService.getUserBasicInfo(authSchoolInfo.getCreaterUid());
		model.addAttribute("principalBasicInfo", principalBasicInfo);
		
		//学校总课程数
		int countCourse = courseService.countOfSchoolCourse(authSchoolInfo.getId());
		model.addAttribute("countCourse",countCourse);
		
		//学校学生总数改为查询校内学生总数
		int countStudent = userService.countOfSchoolStudentByPrincipalId(principalBasicInfo.getUid());
		model.addAttribute("countStudent", countStudent);
		
		//学校老师总数
		int countTeacher = userService.countOfSchoolTeacher(schoolId);
		model.addAttribute("countTeacher", countTeacher);
		
		return CENTER;
	}
	
	@RequestMapping(value="/message/{messageid}")
	@ResponseBody
	public String getSchoolMessage(@PathVariable Long messageid,Model model){
		JSONObject json = new JSONObject();
		if(messageid == null){
			new ResourceNotFoundException();
		}
		Message message = messageService.getMessage(messageid);
		if(message == null){
			new ResourceNotFoundException();
		}
		
		MessageDto messageDto = new MessageDto();
		messageDto.setMessageid(message.getMessageid());
		messageDto.setTitle(message.getTitle());
		messageDto.setContent(message.getContent());
		messageDto.setMessageType(message.getMessageType());
		messageDto.setPublishFlag(message.getPublishFlag());
		//消息发布人
		UserBasicInfo userBasicInfo = userService.getUserBasicInfo(message.getPublishUid());
		messageDto.setPublishRealName(userBasicInfo.getRealName());
		messageDto.setCreateTime(DateUtil.seconds2String(message.getCreateTime(), DateUtil.YYYY_MM_DD_HH_MM));
		messageDto.setPublishTime(DateUtil.seconds2String(message.getPublishTime(), DateUtil.YYYY_MM_DD_HH_MM));
		messageDto.setStrSchool(message.getStrSchool());
		messageDto.setSchoolId(message.getSchoolId());
		messageDto.setLinkUrl(message.getLinkUrl());
		
		json.put("success", true);
		json.put("message", messageDto);
		return json.toString();
	}
	
	@RequestMapping(value="/getMessages")
	@ResponseBody
	public String getSchoolMessages(@RequestParam("schoolId") long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="5") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<MessageDto> pageInfo = messageService.listSchoolMessageByPublishFlagPage(schoolId, MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE,PublishFlagConstants.PUBLISHED, page, pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", pageInfo);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getHotCourses")
	@ResponseBody
	public String getHotCourses(@RequestParam("schoolId") long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<CourseDto> courses = courseService.listSchoolHotCoursesPage(schoolId,page,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	} 
	
	@RequestMapping(value="/getStarTeachers")
	@ResponseBody
	public String getStarTeachers(@RequestParam("schoolId") long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		List<TeacherDto> teachers = userService.listSchoolStarTeachersPage(schoolId,page,pageSize).getList();
		jsonObject.put("status", 0);
		jsonObject.put("result", teachers);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getAllCourses")
	@ResponseBody
	public String getAllCourses(@RequestParam(required=false) long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<CourseDto> courses = courseService.listSchoolCoursesPage(schoolId,page,pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", courses);
		return jsonObject.toString();
	}
	
	@RequestMapping(value="/getAllTeachers")
	@ResponseBody
	public String getAllTeacher(@RequestParam("schoolId") long schoolId,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="6") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<TeacherDto> teachers = userService.listSchoolTeachersPage(schoolId,page,pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", teachers);
		return jsonObject.toString();
	}
	
}
