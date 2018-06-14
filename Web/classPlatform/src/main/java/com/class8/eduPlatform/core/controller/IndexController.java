package com.class8.eduPlatform.core.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.CourseQueryExample;
import com.class8.course.constants.CourseOnlineType;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.dto.TeacherDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.github.pagehelper.PageInfo;

@Controller
public class IndexController {
	
	private static final Logger logger = Logger.getLogger(IndexController.class);
	
	public static final String INDEX = "index_bm";
	public static final String APP_DOWNLOAD = "index/download_bm";
	public static final String SEARCH_COURSES = "/course/searchCourses";
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping("/")
	public String index(Model model){
		model.addAttribute("page", "index");
		return INDEX;
	}
	
	@RequestMapping("/index")
	public String home(){
		return INDEX;
	}
	
	@RequestMapping("/app/download")
	public String appDownload(Model model){
		model.addAttribute("page", "appDownload");
		return APP_DOWNLOAD;
	}
	
	@RequestMapping("/videoOnline")
	public String videoOnline(){
		return "/course/videoOnline";
	}
	
	@RequestMapping("/searchAllTeacher")
	public String searchAllTeacher(String keyWord, HttpServletRequest request){
		request.setAttribute("keyWord", keyWord);
		request.setAttribute("page", "allTeachers");
		return "/teacher/allTeacher_bm";
	}
	
	/**
	 * 课程查询
	 * @return
	@RequestMapping("/course/list")
	public String searchCourse(String keyword,Double minPrice,Double maxPrice,Integer onlineType,String startTime,String endTime,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="10") int pageSize,Model model){
		CourseQueryExample example = new CourseQueryExample();
		try {
			if(keyword != null && keyword  != ""){
				keyword = URLDecoder.decode(keyword,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		example.setKeyword(keyword);
		example.setMinPrice(minPrice);
		example.setMaxPrice(maxPrice);
		example.setOnlineType(onlineType);
		example.setStartTime(startTime);
		example.setEndTime(endTime);
		PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,pageNum,pageSize);
		
		model.addAttribute("keyword", keyword);
		model.addAttribute("minPrice", minPrice);
		model.addAttribute("maxPrice", maxPrice);
		model.addAttribute("onlineType", onlineType);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endTime", endTime);
		model.addAttribute("courses", courses);
		return SEARCH_COURSES;
	}
	*/
	
	/**
	 * 在线课程
	 * @return
	 */
	@RequestMapping("/onlineCourse")
	public String onlineCourse(String keyword,Double minPrice,Double maxPrice,String startTime,String endTime,@RequestParam(defaultValue="1")int pageNum,@RequestParam(defaultValue="10")int pageSize,Model model){
		CourseQueryExample example = new CourseQueryExample();
		try {
			if(keyword != null && keyword  != ""){
				keyword = URLDecoder.decode(keyword,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		example.setKeyword(keyword);
		example.setMinPrice(minPrice);
		example.setMaxPrice(maxPrice);
		example.setOnlineType(CourseOnlineType.ONLINE);
		example.setStartTime(startTime);
		example.setEndTime(endTime);
		PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,pageNum,pageSize);
		
		model.addAttribute("keyword", keyword);
		model.addAttribute("minPrice", minPrice);
		model.addAttribute("maxPrice", maxPrice);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endTime", endTime);
		model.addAttribute("courses", courses);
		//TODO
		return "";
	}
	
	/**
	 * 录播课程
	 * @return
	 */
	@RequestMapping("/recordCourse")
	public String recordedCourse(String keyword,Double minPrice,Double maxPrice,String startTime,String endTime,@RequestParam(defaultValue="1")int pageNum,@RequestParam(defaultValue="10")int pageSize,Model model){
		CourseQueryExample example = new CourseQueryExample();
		try {
			if(keyword != null && keyword  != ""){
				keyword = URLDecoder.decode(keyword,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		example.setKeyword(keyword);
		example.setMinPrice(minPrice);
		example.setMaxPrice(maxPrice);
		example.setOnlineType(CourseOnlineType.RECORD);
		example.setStartTime(startTime);
		example.setEndTime(endTime);
		PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,pageNum,pageSize);
		
		model.addAttribute("keyword", keyword);
		model.addAttribute("minPrice", minPrice);
		model.addAttribute("maxPrice", maxPrice);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endTime", endTime);
		model.addAttribute("courses", courses);
		//TODO
		return "";
	}
	
	/**
	 * 免费课程
	 * @return
	 */
	@RequestMapping("/freeCourse")
	public String freeCourse(String keyword,String startTime,String endTime,@RequestParam(defaultValue="1")int pageNum,@RequestParam(defaultValue="10")int pageSize,Model model){
		CourseQueryExample example = new CourseQueryExample();
		try {
			if(keyword != null && keyword  != ""){
				keyword = URLDecoder.decode(keyword,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		example.setKeyword(keyword);
		example.setMinPrice(0d);
		example.setMaxPrice(0d);
		example.setStartTime(startTime);
		example.setEndTime(endTime);
		PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,pageNum,pageSize);
		
		model.addAttribute("keyword", keyword);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endTime", endTime);
		model.addAttribute("courses", courses);
		//TODO
		return "";
	}
	
	@RequestMapping("/loginPage")
	public String login(){
		return "/index/login_bm";
	}
	
	/**
	 * 老师查询
	 * @return
	 */
	@RequestMapping(value="/searchTeacher",produces="application/json;charset=utf-8")
	@ResponseBody
	public String getTeachersByCondition(@RequestParam(required=false)String keyword,@RequestParam(defaultValue="1")int page,@RequestParam(defaultValue="10")int rows){
		JSONObject jsonObject = new JSONObject();
		try {
			keyword = keyword == null ? null : URLDecoder.decode(keyword, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			keyword = null;
		}
		PageInfo<TeacherDto> teachers = userService.listTeachersPageByTeacherName(keyword,page,rows);
		jsonObject.put("result", JSONUtil.objectToJson(teachers, DateUtil.YYYY_MM_DD_HH_MM));
		jsonObject.put("status", 0);
		return jsonObject.toString();
	}
}
