package com.class8.eduPlatform.core.controller.client;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.class8.course.bean.CourseQueryExample;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IDetailPageService;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.user.bean.AuthCertificateInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.constants.CerificateTypeConstant;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
public class CourseClientController extends BaseController{
	
	@Autowired
	IDetailPageService iDetailPageService;
	@Autowired
	private ICourseService courseService;
	@Autowired
	private IEduUserService eduUserService;
	
	@RequestMapping(value = "/clientCourseByDayP")
	public ModelAndView  clientCourseByDayP(@RequestParam long studentUid,@RequestParam int nUserType,HttpSession session,HttpServletRequest request,  ModelMap model) 
	{
		model.put("studentUid", studentUid);
		model.put("usertype", nUserType);
		String strVersion = request.getParameter("version");
		if(strVersion != null)
		{
			session.setAttribute("version", strVersion);
		}
		return new ModelAndView("index/CalendarClientOld", "clientCourseByDay", model);
	}
	
	@RequestMapping(value = "/clientCourseIndex")
	public ModelAndView clientCourseIndex(@RequestParam String language){
		if(language == null || language.trim() == ""){
			return new ModelAndView("index/CalendarClient");
		}else{
			if(language.equalsIgnoreCase("CHN")){
				return new ModelAndView("index/CalendarClient");
			}else{
				return new ModelAndView("clientEng/clientMainEng");
			}
		}
	}
	
	@RequestMapping(value = "/clientMyCourses")
	public ModelAndView clientMyCourses(@RequestParam String language, @RequestParam long userId, HttpSession session, HttpServletRequest request,  ModelMap model){
		model.put("userId", userId);
		if(language == null || language.trim() == ""){
			return  new ModelAndView("index/clientMyCourses", "myCourses", model);
		}else{
			if(language.equalsIgnoreCase("CHN")){
				return  new ModelAndView("index/clientMyCourses", "myCourses", model);
			}else{
				return  new ModelAndView("clientEng/clientMyCoursesEng", "myCourses", model);
			}
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/listCourseByDay")
	public String listCourseByDay(@RequestParam String day,@RequestParam long uid, @RequestParam int nUserType, HttpServletResponse response)
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dr = df.format(new Date());
		String days="0"+day.split("-")[1];
		String tim=day.split("-")[2];
		if(day.split("-")[2].length()<2)
		{
			tim="0"+day.split("-")[2];
		}
		String time=day.split("-")[0]+"-"+days+"-"+tim;
		JSONObject json=new JSONObject();
	
		try {
			json = iDetailPageService.listCourseByDayToClient(time,uid, nUserType);
			if (dr.equals(time)) {
				json.put("isclick", 0);
			}
			else{
				json.put("isclick", 1);
			}
			  json.put("status", 0);
		} catch (Exception e) {
			json.put("status", 1);
		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/ishavecourseByday")
	public String isHaveCourseByDay(@RequestParam String day,@RequestParam int nDayCount, @RequestParam long uid, @RequestParam int nUserType, HttpServletResponse response)
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dr = df.format(new Date());
		String days="0"+day.split("-")[1];
		String tim=day.split("-")[2];
		if(day.split("-")[2].length()<2)
		{
			tim="0"+day.split("-")[2];
		}
		String time=day.split("-")[0]+"-"+days+"-"+tim;
		JSONObject json=new JSONObject();
		List<Integer> listHaveCourse = new ArrayList<Integer>();
		try {
			
			for (int i = 0; i < nDayCount; i++) {
				List<Long> clist = iDetailPageService.getClassListToClinet(time, uid, nUserType);
				int nHad = 0;
				if(clist != null && clist.size() > 0)
					nHad = 1;
				listHaveCourse.add(nHad);
				
				time = DateUtil.nextDayString(time);
			}
			
			json.put("status", 0);
			json.put("days", listHaveCourse);
		} catch (Exception e) {
			e.printStackTrace();
			json.put("status", -1);
		}
		
		return json.toString();
	}

	@RequestMapping(value = "/client/myCourse")
	@ResponseBody
	public String listMyCourse(@RequestParam long userId, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="8") int pageSize){
		JSONObject json = new JSONObject();
		CourseQueryExample example = new CourseQueryExample();
		example.setStudentUid(userId);
		PageInfo<Map<String,Object>> pageInfo = courseService.listStudentCourseDetailPage(example,page,pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/client/myCreate")
	@ResponseBody
	public String listMyCreate(@RequestParam long userId, @RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="8")int pageSize){
		JSONObject json = new JSONObject();
		
		CourseQueryExample example = new CourseQueryExample();
		example.setTeacherUid(userId);		
		PageInfo<Map<String,Object>> pageInfo = courseService.listTeacherCourseDetailPage(example, page, pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/client/getauthteacherinfo")
	public String getAuthteacherInfo(@RequestParam long userId, HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {
		JSONObject json = new JSONObject();

		AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(userId);
		if(authTeacherInfo != null){
			json.put("status", 0);
		}else {
			json.put("status", 1);  
		}
		return json.toString();
	}
	
}
