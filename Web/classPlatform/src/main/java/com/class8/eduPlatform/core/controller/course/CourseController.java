package com.class8.eduPlatform.core.controller.course;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import sun.misc.BASE64Decoder;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseCategory;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseComment;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.ShowCourseClass;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.exception.ResourceNotFoundException;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.FileUploadUtil;
import com.class8.eduPlatform.common.util.JSONUtil;
import com.class8.eduPlatform.common.util.RecordUtil;
import com.class8.eduPlatform.core.bean.CourseList;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.dto.CourseClassDto;
import com.class8.eduPlatform.core.dto.CourseCommentDto;
import com.class8.eduPlatform.core.dto.CourseDetailDto;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.dto.UserAuthStatusDto;
import com.class8.eduPlatform.core.service.ICourseCategoryService;
import com.class8.eduPlatform.core.service.ICourseClassService;
import com.class8.eduPlatform.core.service.ICourseCommentService;
import com.class8.eduPlatform.core.service.ICourseFileService;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.ICourseStudentService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/course")
public class CourseController extends BaseController {
	
	private static Logger logger = Logger.getLogger(CourseController.class);
	
	public static final String COURSE_LIST = "/manageCourse";
	public static final String COURSE_CREATE = "/creatCourse";
	public static final String COURSE_DETAIL = "/course/viewPianoCourses_bm";
	public static final String CLIENT_DETAIL = "/course/viewClientCourses";
	public static final String COURSE_OF_MINE = "/course/coursesOfMine";
	public static final String VIEW_COURSE_DTL = "/course/viewCourses";
	public static final String SIGN_UP_COR = "/course/signUpImmediately";
	public static final String PAY_COURSES = "/course/payCourses";
	public static final String SEARCH_COURSES = "/course/searchCourses";
	public static final String ALL_COURSES = "/course/allCourses_bm";
	public static final String VIEW_COURSE = "/course/videoOnline";
	public static final String RECORD_COURSE = "/course/recordCourse_bm";
	
	private DecimalFormat decimalFormat = new DecimalFormat("##0.00");  
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private ICourseService courseService;
	
	@Autowired
	private ICourseFileService courseFileService;
	
	@Autowired
	private ICourseCommentService courseCommentService;
	
	@Autowired
	private ICourseStudentService courseStudentService;
	
	@Autowired
	private ICourseClassService courseClassService;
	
	@Autowired
	private ICourseCategoryService courseCategoryService;;
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(value="/create",method=RequestMethod.GET)
	public String createPage(){
		return COURSE_CREATE;
	}
	@RequestMapping(value = "/coursesOfMine",method=RequestMethod.GET)
	public String coursesOfMine() {
		
		return COURSE_OF_MINE;
	}
	
	@RequestMapping(value = "/toViewCoursesDetail",method=RequestMethod.GET)
	public String viewCoursesDetail() {
		
		return VIEW_COURSE_DTL;
	}
	
	@RequestMapping(value = "/toSignUp",method=RequestMethod.GET)
	public String toSignUp() {
		
		return SIGN_UP_COR;
	}
	
	@RequestMapping(value = "/playback",method=RequestMethod.GET)
	public String toPlayback(HttpServletRequest request) {
		request.setAttribute("page", "recordCourse");
		return RECORD_COURSE;
	}

	@RequestMapping(value = "/toPayCourse",method=RequestMethod.GET)
	public String toPayCourse(HttpServletRequest request, @RequestParam String courseId) {
		request.setAttribute("courseId", courseId);
		return PAY_COURSES;
	}
	@RequestMapping(value = "/toSearchMyCor",method=RequestMethod.GET)
	public String toSearchMyCor(@RequestParam String keyword,Model model) {
		try {
			keyword = URLDecoder.decode(keyword,"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} 
		model.addAttribute("keywords", keyword);
		return SEARCH_COURSES;
	}
	
	@RequestMapping(value="/uploadCoverImg",method=RequestMethod.POST)
	@ResponseBody
	public String uploadCoverImg(HttpServletRequest request,@RequestParam String filepath){
		JSONObject json = new JSONObject();
		File tempFile = null;
		try {
			String realPath = request.getSession().getServletContext().getRealPath("/upload");
			filepath = filepath.replace("data:image/png;base64,", "");
	        tempFile = File.createTempFile(UUID.randomUUID().toString(), ".jpg", new File(realPath));
        
	        BASE64Decoder decoder = new BASE64Decoder();
			byte[] b = decoder.decodeBuffer(filepath);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {
					b[i] += 256;
				}
			}
			OutputStream out = new FileOutputStream(tempFile);
			out.write(b);
			out.flush();
			out.close();
			
			Map<String,File> files = new HashMap<String,File>();
			files.put("file", tempFile);
			String uploadResult = FileUploadUtil.upfile(SystemConfigs.UPLOAD_COURSE_COVER_IMG_URL, null, files);
			JSONObject jsonUploadResult = JSONObject.fromObject(uploadResult);
			
			if(Integer.valueOf(jsonUploadResult.get("code").toString()) == 200){
				json.put("url", SystemConfigs.PIC_URL_PERFIX + jsonUploadResult.get("url"));
				json.put("success", true);
			} 
			return json.toString();
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		} finally {
			if(tempFile != null){
				tempFile.delete();
			}
		}
		
		json.put("message", "文件上传失败,请稍后重试！");
		return json.toString();
	}
	
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public String listPage(){
		return COURSE_LIST;
	}
	
	@RequestMapping(value="/listCourses",method=RequestMethod.GET)
	@ResponseBody
	public String listCourse(@RequestParam(required=false) Integer courseType,@RequestParam(required=false) String courseName,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="10") int pageSize){
		JSONObject json = new JSONObject();
		//int pageSize = 30;
		PageInfo<CourseBasicInfo> pageInfo = eduCourseService.listCourseBasicInfoPage(courseType, courseName, page, pageSize);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM_SS));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/detail/{courseid}")
	public String detailPage(@PathVariable("courseid") long courseid,Model model){
		CourseDetailDto courseDetail = courseService.getCourseDetail(courseid);
		if(courseDetail == null){
			throw new ResourceNotFoundException();
		}
		List<CourseCategory> categoryPath = courseCategoryService.listCourseCategoryPath(courseDetail.getItemsType());
		model.addAttribute("courseDetail", courseDetail);
		model.addAttribute("categoryPath", categoryPath);
		Subject subject = SecurityUtils.getSubject();
		
		int status = 0;
		if (subject.isAuthenticated()) {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			long uid = shiroUser.getUid();
			CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(uid, courseid, 0);
			if(courseStudent != null){
				status = courseStudent.getSignupStatus();
			}
		}
		model.addAttribute("order", status);
		return COURSE_DETAIL;  
	}
	
	@RequestMapping(value="/detailClient/{courseid}")
	public String detailClientPage(@PathVariable("courseid") long courseid,Model model){
		CourseDetailDto courseDetail = courseService.getCourseDetail(courseid);
		if(courseDetail == null){
			throw new ResourceNotFoundException();
		}
		List<CourseCategory> categoryPath = courseCategoryService.listCourseCategoryPath(courseDetail.getItemsType());
		model.addAttribute("courseDetail", courseDetail);
		model.addAttribute("categoryPath", categoryPath);
		Subject subject = SecurityUtils.getSubject();
		
		int status = 0;
		if (subject.isAuthenticated()) {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			long uid = shiroUser.getUid();
			CourseStudent courseStudent = eduCourseService.getCourseStudentByIds(uid, courseid, 0);
			if(courseStudent != null){
				status = courseStudent.getSignupStatus();
			}
		}
		model.addAttribute("order", status);
		return CLIENT_DETAIL;  
	}
	
	@RequestMapping(value="/getCourseDetail",method=RequestMethod.POST)
	@ResponseBody
	public String getCourseDetail(@RequestParam long courseid){
		JSONObject json = new JSONObject();
		CourseDetailDto courseDetail = courseService.getCourseDetail(courseid);
		json.put("result", JSONUtil.objectToJson(courseDetail, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/getCourseTeacherAuthStatus",method=RequestMethod.POST)
	@ResponseBody
	public String getCourseTeacherAuthStatus(@RequestParam long courseid){
		JSONObject json = new JSONObject();
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		UserAuthStatusDto teacherAuthStatus = userService.getTeacherAuthStatus(courseBasicInfo.getTeacherUid());
		json.put("success", true);
		json.put("result", teacherAuthStatus);
		return json.toString();
	}
	
	@RequestMapping(value="/getCourseClass",method=RequestMethod.POST)
	@ResponseBody
	public String getCourseClass(@RequestParam long courseid){
		JSONObject json = new JSONObject();
		List<CourseClass> courseClasss = courseClassService.listCourseClassByCourseid(courseid);
		json.put("result", JSONUtil.listToJson(courseClasss, DateUtil.YYYY_MM_DD_HH_MM));
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/getTeacherOtherCourse")
	@ResponseBody
	public String getTeacherOtherCourse(@RequestParam long courseid,@RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="5")int pageSize){
		JSONObject json = new JSONObject();
		PageInfo<CourseBasicInfo> pageInfo = courseService.listTeacherOtherCoursePage(courseid,page,pageSize);
		json.put("success", true);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		return json.toString();
	}
	
	@RequestMapping(value="/getSignedStudent",method=RequestMethod.GET)
	@ResponseBody
	public String getSignedStudent(@RequestParam long courseid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="12") int pageSize){
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("result", courseStudentService.getSignedStudentByCourseidPage(courseid, page, pageSize));
		return json.toString();
	}

	@RequestMapping(value="/getCourseFile",method=RequestMethod.POST)
	@ResponseBody
	public String getCourseMaterial(@RequestParam long courseid) {
		JSONObject json = new JSONObject();
		List<Map<String,Object>> files = courseFileService.listDisplayCourseFileByCourseid(courseid);
		json.put("result", files);
		json.put("success", true);
		return json.toString();
	}
	
	@RequestMapping(value="/getCourseComment",method=RequestMethod.GET)
	@ResponseBody
	public String getCourseComment(@RequestParam long courseid,@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="15") int pageSize) {
		JSONObject json = new JSONObject();
		PageInfo<CourseCommentDto> pageInfo = courseCommentService.listCourseCommentPage(courseid,page,pageSize);
		json.put("status", 0);
		json.put("result", JSONUtil.objectToJson(pageInfo, DateUtil.YYYY_MM_DD_HH_MM));
		return json.toString();
	}
	
	private void close(File tempFile,StringWriter writer,HttpPost httpPost,CloseableHttpClient httpClient){
		if(tempFile != null){
			tempFile.delete();
		}
		if(httpPost != null){
			httpPost.abort();
		}
		if(writer != null){
			try {
				writer.close();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(httpClient != null){
					try {
						httpClient.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
	
	//获取课程列表
	@ResponseBody
	@RequestMapping(value = "/dataList ",produces="application/json;charset=UTF-8")
	public String dataList(HttpSession session)
	{
		JSONObject json = new JSONObject();
		try {

			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return json.toString();
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			SessionUser user = (SessionUser)session.getAttribute(CommonConstants.USER);
			List<Long> cc = null;
			if(user != null && user.getRoleName() == CommonConstants.SCHOOL){
				AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
				cc = eduCourseService.findSchoolCourseIds(authSchoolInfo.getId());
			}else
				cc = eduCourseService.listCourseidByTeacherUid(uid);
			List<CourseList> list = new ArrayList<CourseList>();
			for (Long cid : cc) {
				CourseBasicInfo courseinfo = eduCourseService
						.getCourseBasicInfo(cid);
				// 课堂未发布，不显示
				if (courseinfo.getDisplayType() != DisplayTypeConstants.DISPLAY)
					continue;
				CourseList courseList = new CourseList();
				courseList.setClassid(cid);
				courseList.setCourseName(courseinfo.getCourseName());
				list.add(courseList);
			}
			json.put("status", 0);
			json.put("courseidlist", list);
		} catch (Exception e) {
			json.put("status", 1);
		}
		return json.toString();
	}
	
	//提交课程评价
	@ResponseBody
	@RequestMapping(value = "/addCourseComment")
	public String submitCourseComment(@RequestParam long courseid, @RequestParam int score, @RequestParam String content, HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			json.put("message", "请先登录");
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		try {
			long classid = 0;
			List<CourseComment> list = eduCourseService.listCourseCommentByCourseUid(uid, courseid, classid);
			if(list != null && list.size() > 0){
				json.put("status", -2);
				json.put("message", "你已经评价过该课程，不能重复评价");
				return json.toString();
			}
			CourseComment courseComment = new CourseComment();
			courseComment.setCourseid(courseid);
			courseComment.setClassid(classid);
			courseComment.setUid(uid);
			courseComment.setScore(score);
			courseComment.setContent(content);
			eduCourseService.insertCourseComment(courseComment);
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return json.toString();
	}
	
	/**
	 * 课程检索
	 * @param keyword
	 * @param minPrice
	 * @param maxPrice
	 * @param onlineType
	 * @param startTime
	 * @param endTime
	 * @param pageNum
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/search")
	public String searchCourse(HttpServletRequest request,String keyword,Double minPrice,Double maxPrice,Integer onlineType,String startTime,String endTime,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="10") int pageSize,Model model){
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
		PageInfo<Map<String,Object>> pageInfo = courseService.searchCourse(example,pageNum,pageSize);
		//格式化价格格式，保留两位小数
		for(Map<String,Object> course : pageInfo.getList()){
			course.put("price_total", decimalFormat.format(course.get("price_total")));
		}
		model.addAttribute("keyword", keyword);
		model.addAttribute("minPrice", minPrice);
		model.addAttribute("maxPrice", maxPrice);
		model.addAttribute("onlineType", onlineType);
		model.addAttribute("startTime", startTime);
		model.addAttribute("endTime", endTime);
		model.addAttribute("courses", pageInfo);
		return SEARCH_COURSES;
	}
	/**
	 * 课程检索by全部课程页面
	 * @param keyword
	 * @param minPrice
	 * @param maxPrice
	 * @param onlineType
	 * @param startTime
	 * @param endTime
	 * @param pageNum
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/searchAll")
	public String searchCourseByAll(HttpServletRequest request,String keyword,Double minPrice,Double maxPrice,Integer onlineType,String startTime,String endTime,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="30") int pageSize,Model model){
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
		model.addAttribute("page", "allCourses");
		return ALL_COURSES;
	}
	
	/**
	 * 获即将开始课程
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	@RequestMapping("/getWillBeginCourses")
	@ResponseBody
	public String getWillBeginCourses(@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="8") int pageSize){
		JSONObject jsonObejct = new JSONObject();
		PageInfo<CourseDto> courses = courseService.getWillBeginCourses(pageNum,pageSize);
		jsonObejct.put("status", 0);
		jsonObejct.put("result", JSONUtil.objectToJson(courses, DateUtil.YYYY_MM_DD_HH_MM));
		return jsonObejct.toString();
	}
	
	/**
	 * 获取推荐的课程
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	@RequestMapping("/getRecommendCourses")
	@ResponseBody
	public String getRecommendCourses(@RequestParam(defaultValue="1") int page,@RequestParam(defaultValue="8") int pageSize){
		JSONObject jsonObject = new JSONObject();
		PageInfo<CourseDto> courses = courseService.getRecommendCourses(page,pageSize);
		jsonObject.put("status", 0);
		jsonObject.put("result", JSONUtil.objectToJson(courses, DateUtil.YYYY_MM_DD_HH_MM));
		return jsonObject.toString();
	}
	
	/**
	 * 获取最新的课程
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	@RequestMapping("/getRecentCourses")
	@ResponseBody
	public String getRecentCourses(@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="8") int pageSize){
		CourseQueryExample example = new CourseQueryExample();
		example.setKeyword(null);
		example.setMinPrice(null);
		example.setMaxPrice(null);
		example.setOnlineType(null);
		example.setStartTime(null);
		example.setEndTime(null);
		
		JSONObject jsonObject = new JSONObject();
		PageInfo<Map<String,Object>> courses = courseService.searchCourse(example,pageNum,pageSize);

		jsonObject.put("status", 0);
		jsonObject.put("result", JSONUtil.objectToJson(courses, DateUtil.YYYY_MM_DD_HH_MM));
		return jsonObject.toString();
	}
	
	/**
	 * 观看录播视频
	 * @param courseid
	 * @return
	 */
	@RequestMapping("/view/{classid}")
	public String viewCourse(@PathVariable long classid,Model model){
		ShowCourseClass showCourseClass = eduCourseService.getShowCourseClass(classid);
		if(showCourseClass == null){
			throw new ResourceNotFoundException();
		}
		CourseClass courseClass = showCourseClass.getCourseClass();
		
		CourseClassDto courseClassDto = new CourseClassDto();
		courseClassDto.setClassid(courseClass.getClassid());
		courseClassDto.setCourseid(courseClass.getCourseid());
		courseClassDto.setClassName(courseClass.getClassName());
		courseClassDto.setClassState(courseClass.getClassState());
		courseClassDto.setStartTimePlan(DateUtil.timestamp2String(courseClass.getStartTimePlan()));
		courseClassDto.setEndTimePlan(DateUtil.timestamp2String(courseClass.getStartTimePlan()));
		try {
			courseClassDto.setRecordDataUrls(RecordUtil.getRecordDataUrls(courseClass.getRecordUrl()));
		} catch (IOException e) {
			logger.error("获取录播视频地址["+ courseClass.getRecordUrl() +"]文件失败:", e);		
		} catch (DocumentException e) {
			logger.error("解析录播视频地址["+ courseClass.getRecordUrl() +"]文件失败:", e);
		}
		courseClassDto.setPrice(courseClass.getPrice());
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseClass.getCourseid());
		if(courseBasicInfo == null){
			throw new ResourceNotFoundException();
		}
		courseClassDto.setCoverUrl(courseBasicInfo.getCoverUrl());
		courseClassDto.setDescription(courseBasicInfo.getDescription());
		courseClassDto.setTeacherUid(courseBasicInfo.getTeacherUid());
		UserBasicInfo teacher = eduUserService.getUserBasicInfo(courseBasicInfo.getTeacherUid());
		courseClassDto.setTeacherName(StringUtils.isBlank(teacher.getRealName())?teacher.getNickName():teacher.getRealName());
		model.addAttribute("course", courseClassDto);
		return VIEW_COURSE;
	}
}
