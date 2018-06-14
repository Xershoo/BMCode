package com.class8.eduPlatform.core.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseClass;
import com.class8.course.bean.CourseQueryExample;
import com.class8.course.constants.CourseOnlineTypeConstants;
import com.class8.course.constants.CourseStateConstants;
import com.class8.course.constants.CourseStudentSignupType;
import com.class8.course.constants.DisplayTypeConstants;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.dto.CourseDetailDto;
import com.class8.eduPlatform.core.dto.CourseDto;
import com.class8.eduPlatform.core.service.ICourseService;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Service
public class CourseServiceImpl implements ICourseService {
	
	private static Logger logger = Logger.getLogger(CourseServiceImpl.class);
	
	@Autowired
	private IEduCourseService eduCourseService;
	
	@Autowired
	private IEduUserService eduUserService;
	@Autowired
	private IUserService userService;
	
	public CourseDetailDto getCourseDetail(long courseid){
		CourseDetailDto courseDetail = new CourseDetailDto();
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		try {
			ConvertUtils.deregister(Timestamp.class);
			BeanUtils.copyProperties(courseDetail, courseBasicInfo);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		long teacherUid = courseBasicInfo.getTeacherUid();
		UserBasicInfo teacherBasicInfo = eduUserService.getUserBasicInfo(teacherUid);
		if(teacherBasicInfo != null){
			courseDetail.setTeacherSex(teacherBasicInfo.getSex());
			courseDetail.setTeacherName(teacherBasicInfo.getRealName());
			courseDetail.setTeacherAvatarUrl(SystemConfigs.PIC_URL_PERFIX + teacherBasicInfo.getAvatarUrl());
			courseDetail.setTeachyears(teacherBasicInfo.getTeachYears());
		}
		long createUid = courseBasicInfo.getCreateUid();
		UserBasicInfo creatorBasicInfo = eduUserService.getUserBasicInfo(createUid);
		if(creatorBasicInfo != null){
			courseDetail.setCreateName(creatorBasicInfo.getRealName());
		}
		courseDetail.setStudentTotal(eduCourseService.countCourseStudent(courseid));
		float sumCourseScore = eduCourseService.sumCourseScore(courseid);
		int countCourseComment = eduCourseService.countCourseComment(courseid);
		float avgScore = countCourseComment == 0 ?0f:Math.round(sumCourseScore/countCourseComment*10)/10f;
		courseDetail.setCountComment(countCourseComment);
		courseDetail.setAvgScore(avgScore);
		//校内课最大人数为导入的学生数+计划报名最大人数
		if(courseBasicInfo.getOnlineType() == CourseOnlineTypeConstants.INSIDE_SCHOOL_COURSE)
			courseDetail.setnMaxStudents(courseBasicInfo.getnMaxStudents() + eduCourseService.countCourseStudentBySignupType(courseid, CourseStudentSignupType.SCHOOL));
		if(courseBasicInfo.getSchoolId() > 0){
			AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
			courseDetail.setSchoolName(authSchoolInfo.getName());
		}
		
		courseDetail.setCanEnterClassid(0);
		List<CourseClass> classlist = eduCourseService.listCourseClass(courseid);
		if(classlist != null){
			Timestamp startTimestamp = null;
			Timestamp endTimestamp = null;
			for (CourseClass courseClass : classlist) {
				if(courseClass.getClassState() == CourseStateConstants.COURSE_IS_PROCESSING){
					courseDetail.setCanEnterClassid(courseClass.getClassid());
				} else if(courseClass.getClassState() == CourseStateConstants.COURSE_NOT_BEGIN){
					if(courseClass.getStartTimePlan().getTime() - new Date().getTime() < 10 * 60 * 1000){
						courseDetail.setCanEnterClassid(courseClass.getClassid());
					}
				}
				if(startTimestamp == null){
					startTimestamp = courseClass.getStartTimePlan();
					endTimestamp = courseClass.getEndTimePlan();
					continue;
				}
				if(startTimestamp.after(courseClass.getStartTimePlan()))
					startTimestamp = courseClass.getStartTimePlan();
				if(endTimestamp.before(courseClass.getEndTimePlan()))
					endTimestamp = courseClass.getEndTimePlan();
				
			}
			courseDetail.setCourseStartTime(startTimestamp);
			courseDetail.setCourseEndTime(endTimestamp);
		}
		return courseDetail;
	}
	
	@Override
	public Map<String, List<Map<String,Object>>> listCourseClassDetail(long studentUid, String startDateTime, String endDateTime) {
		Map<String,List<Map<String,Object>>> result = new HashMap<String,List<Map<String,Object>>>();
		List<Long> courseids = eduCourseService.findStudentCourseIdsByStatus(studentUid, OrderStatusConstant.hadpay);
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
	public List<Map<String, Object>> listCourseNameByTeacherUid(long teacherUid) {
		List<Map<String,Object>> courses = new ArrayList<Map<String,Object>>();
		List<Long> courseids = eduCourseService.listCourseidByTeacherUid(teacherUid);
		if(courseids != null && courseids.size()>0){
			for (Long courseid : courseids) {
				CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
				//只显示已发布的课程
				if(courseBasicInfo.getDisplayType() == DisplayTypeConstants.DISPLAY){
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("courseid", courseBasicInfo.getCourseid());
					map.put("courseName", courseBasicInfo.getCourseName());
					courses.add(map);
				}
			}
		}
		return courses;
	}
	
	@Override
	public PageInfo<CourseBasicInfo> listTeacherOtherCoursePage(long courseid,int pageNum,int pageSize) {
		CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo(courseid);
		PageInfo<CourseBasicInfo> pageInfo = eduCourseService.listTeacherOtherCoursePage(courseBasicInfo.getTeacherUid(),courseid,pageNum,pageSize);
		return pageInfo;
	}
	
	@Override
	public int countOfTeacherCourse(long teacherUid) {
		return eduCourseService.countOfTeacherCourse(teacherUid);
	}
	
	@Override
	public PageInfo<Map<String, Object>> listStudentCourseDetailPage(CourseQueryExample example, int page, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listStudentCourseDetailPage(example, page, pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				if(userBasicInfo != null){
					int userType = userBasicInfo.getUserType();
					//创建人的类型不为老师即为校长
					if(userType != UserTypeConstants.TEACHER){
						AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
						if(authSchoolInfo != null)
							map.put("createName", authSchoolInfo.getName());
					}
				}
				//获得课程报名的人数
				Long courseid = (Long) map.get("courseid");
				int countStudent = eduCourseService.countCourseStudent(courseid);
				map.put("countStudent", countStudent);
				
				map.put("canEnterClassid", 0);
				List<CourseClass> classlist = eduCourseService.listCourseClass(courseid);
				if(classlist != null){
					Timestamp startTimestamp = null;
					Timestamp endTimestamp = null;
					for (CourseClass courseClass : classlist) {
						if(courseClass.getClassState() == CourseStateConstants.COURSE_IS_PROCESSING) {
							map.put("canEnterClassid", courseClass.getClassid());
						} else if(courseClass.getClassState() == CourseStateConstants.COURSE_NOT_BEGIN){
							if(courseClass.getStartTimePlan().getTime() - new Date().getTime() < 10 * 60 * 1000){
								map.put("canEnterClassid", courseClass.getClassid());
							}
						}
						if(startTimestamp == null){
							startTimestamp = courseClass.getStartTimePlan();
							endTimestamp = courseClass.getEndTimePlan();
							continue;
						}
						if(startTimestamp.after(courseClass.getStartTimePlan()))
							startTimestamp = courseClass.getStartTimePlan();
						if(endTimestamp.before(courseClass.getEndTimePlan()))
							endTimestamp = courseClass.getEndTimePlan();
						
					}
					map.put("startTimePlan", startTimestamp);
					map.put("endTimePlan", endTimestamp);
				}
			}
		}
		return pageInfo;
	}
	
	
	@Override
	public PageInfo<Map<String, Object>> listStudentCourseDetailPageNew(CourseQueryExample example, int page, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listStudentCourseDetailPageNew(example, page, pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				if(userBasicInfo != null){
					int userType = userBasicInfo.getUserType();
					//创建人的类型不为老师即为校长
					if(userType != UserTypeConstants.TEACHER){
						AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
						if(authSchoolInfo != null)
							map.put("createName", authSchoolInfo.getName());
					}
				}
			}
		}
		return pageInfo;
	}
	
	
	@Override
	public PageInfo<Map<String, Object>> listTeacherCourseDetailPage(CourseQueryExample example, int pageNum, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listTeacherCourseDetailPage(example,pageNum,pageSize);
		//查询没门课程的报名人数
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				if(map.get("courseid") != null){
					//总人数
					int totalStudent = eduCourseService.countCourseStudent((Long)map.get("courseid"));
					map.put("totalStudent", totalStudent);
					//校内人数
					int totalSchoolStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.SCHOOL);
					map.put("totalSchoolStudent", totalSchoolStudent);
					//报名人数
					int totalSignupStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.PERSONAL);
					map.put("totalSignupStudent", totalSignupStudent);
					
				}
				
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				int userType = userBasicInfo.getUserType();
				//创建人的类型不为老师即为校长
				if(userType == UserTypeConstants.SCHOOL_ADMIN){
					AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
					map.put("createName", authSchoolInfo.getName());
				}
				
				map.put("canEnterClassid", 0);
				//课程计划上课时间和计划结束时间
				List<CourseClass> classlist = eduCourseService.listCourseClass((Long)map.get("courseid"));
				if(classlist != null){
					Timestamp startTimestamp = null;
					Timestamp endTimestamp = null;
					for (CourseClass courseClass : classlist) {
						if(courseClass.getClassState() == CourseStateConstants.COURSE_IS_PROCESSING) {
							map.put("canEnterClassid", courseClass.getClassid());
						} else if(courseClass.getClassState() == CourseStateConstants.COURSE_NOT_BEGIN){
							if(courseClass.getStartTimePlan().getTime() - new Date().getTime() < 10 * 60 * 1000){
								map.put("canEnterClassid", courseClass.getClassid());
							}
						}
						if(startTimestamp == null){
							startTimestamp = courseClass.getStartTimePlan();
							endTimestamp = courseClass.getEndTimePlan();
							continue;
						}
						if(startTimestamp.after(courseClass.getStartTimePlan()))
							startTimestamp = courseClass.getStartTimePlan();
						if(endTimestamp.before(courseClass.getEndTimePlan()))
							endTimestamp = courseClass.getEndTimePlan();
					}
					map.put("startTimePlan", startTimestamp);
					map.put("endTimePlan", endTimestamp);
				}
			}
		}
		return pageInfo;
	}
	
	@Override
	public PageInfo<Map<String, Object>> listTeacherCourseDetailPageNew(CourseQueryExample example, int pageNum, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listTeacherCourseDetailPageNew(example,pageNum,pageSize);
		//查询没门课程的报名人数
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				if(map.get("courseid") != null){
					//总人数
					int totalStudent = eduCourseService.countCourseStudent((Long)map.get("courseid"));
					map.put("totalStudent", totalStudent);
					//校内人数
					int totalSchoolStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.SCHOOL);
					map.put("totalSchoolStudent", totalSchoolStudent);
					//报名人数
					int totalSignupStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.PERSONAL);
					map.put("totalSignupStudent", totalSignupStudent);
				}
				
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				int userType = userBasicInfo.getUserType();
				//创建人的类型不为老师即为校长
				if(userType == UserTypeConstants.SCHOOL_ADMIN){
					AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
					map.put("createName", authSchoolInfo.getName());
				}
			}
		}
		return pageInfo;
	}
	
	
	@Override
	public PageInfo<Map<String, Object>> listSchoolCourseDetailPage(CourseQueryExample example, int pageNum, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listSchoolCourseDetailPage(example,pageNum,pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				if(map.get("courseid") != null){
					//总人数
					int totalStudent = eduCourseService.countCourseStudent((Long)map.get("courseid"));
					map.put("totalStudent", totalStudent);
					//校内人数
					int totalSchoolStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.SCHOOL);
					map.put("totalSchoolStudent", totalSchoolStudent);
					//报名人数
					int totalSignupStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.PERSONAL);
					map.put("totalSignupStudent", totalSignupStudent);
				}
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				int userType = userBasicInfo.getUserType();
				//创建人的类型不为老师即为校长
				if(userType != UserTypeConstants.TEACHER){
					AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
					map.put("createName", authSchoolInfo.getName());
				}
			}
		}
		return pageInfo;
	}
	
	@Override
	public PageInfo<CourseDto> listTeacherHotCourses(long teacherUid, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listTeacherHotCourseIdPage(teacherUid,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@Override
	public PageInfo<CourseDto> listTeacherCoursesPage(long teacherUid, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listTeacherCourseIdPage(teacherUid,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@Override
	public PageInfo<CourseDto> listStudentLearningCourses(long studentUid,int pageNum, int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listStudentLearningCourseIdPage(studentUid,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@Override
	public PageInfo<CourseDto> listStudentLearnedCourses(long studentUid,int pageNum, int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listStudentLearnedCourseIdPage(studentUid,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@Override
	public int countOfSchoolCourse(long schoolId) {
		return eduCourseService.countOfSchoolCourse(schoolId);
	}
	
	@Override
	public PageInfo<CourseDto> listSchoolHotCoursesPage(Long schoolId, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listSchoolHotCourseIdPage(schoolId,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@Override
	public PageInfo<CourseDto> listSchoolCoursesPage(Long schoolId, int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listSchoolCourseIdPage(schoolId,pageNum,pageSize);
		return this.queryCourseDtos(pageInfo);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private PageInfo<CourseDto> queryCourseDtos(PageInfo pageInfo){
		List<CourseDto> courses = new ArrayList<CourseDto>();
		if(pageInfo.getList() != null){
			for (Object courseid : pageInfo.getList()) {
				CourseDto course = new CourseDto();
				CourseBasicInfo courseBasicInfo = eduCourseService.getCourseBasicInfo((Long)courseid);
				if(courseBasicInfo != null){
					course.setCourseid(courseBasicInfo.getCourseid());
					course.setCourseName(courseBasicInfo.getCourseName());
					course.setCourseType(courseBasicInfo.getOnlineType());
					course.setCategoryId(courseBasicInfo.getItemsType());
					course.setTeacherUid(courseBasicInfo.getTeacherUid());
					course.setSchoolId(courseBasicInfo.getSchoolId());
					course.setCoverUrl(courseBasicInfo.getCoverUrl());
					course.setPriceTotal(courseBasicInfo.getPriceTotal());
					course.setTotalclass(courseBasicInfo.getClassTotal());
					course.setFinishedclass(courseBasicInfo.getClassHadFinished());
					course.setCourseStatus(courseBasicInfo.getCourseStatus());
					//老师名称
					UserBasicInfo teacherBasicInfo = eduUserService.getUserBasicInfo(courseBasicInfo.getTeacherUid());
					if(teacherBasicInfo != null){
						course.setTeacherName(teacherBasicInfo.getRealName());
					} else {
						course.setTeacherName("");
					}
					
					//是否正在上课
					List<CourseClass> courseClasss = eduCourseService.listCourseClass(courseBasicInfo.getCourseid());
					if(courseClasss != null){
						Timestamp now = new Timestamp(new Date().getTime());
						Timestamp latelyStartTimePlan = null;
						for (CourseClass courseClass : courseClasss) {
							if(courseClass.getClassState() == CourseStateConstants.COURSE_IS_PROCESSING){
								course.setLive(true);
								break;
							}
							Timestamp startTimePlan = courseClass.getStartTimePlan();
							if((startTimePlan.after(now) && latelyStartTimePlan != null && startTimePlan.before(latelyStartTimePlan)) || latelyStartTimePlan == null){
								latelyStartTimePlan = startTimePlan;
							}
						}
						course.setLatelyStartTimePlan(latelyStartTimePlan);
					}
					
					//学校名称
					if(courseBasicInfo.getSchoolId() != 0){
						AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoById(courseBasicInfo.getSchoolId());
						course.setSchoolName(authSchoolInfo.getName());
					}
					
					//分类路径
					course.setCategotyPath(eduCourseService.listCourseCategoryPath(courseBasicInfo.getItemsType()));
					
					//学生总数
					course.setTotalStudent(eduCourseService.countCourseStudent(courseBasicInfo.getCourseid()));
					courses.add(course);
				}
			}
		}
		pageInfo.setList(courses);
		return pageInfo;
	}

	@Override
	public PageInfo<Map<String, Object>> searchCourse(CourseQueryExample example, int pageNum, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listCourse(example,pageNum,pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				if(map.get("courseid") != null){
					//总人数
					int totalStudent = eduCourseService.countCourseStudent((Long)map.get("courseid"));
					map.put("totalStudent", totalStudent);
					//校内人数
					int totalSchoolStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.SCHOOL);
					map.put("totalSchoolStudent", totalSchoolStudent);
					//报名人数
					int totalSignupStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.PERSONAL);
					map.put("totalSignupStudent", totalSignupStudent);
				}
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				int userType = userBasicInfo.getUserType();
				//创建人的类型不为老师即为校长
				/*
				 * if(userType != UserTypeConstants.TEACHER){
					AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
					map.put("createName", authSchoolInfo.getName());
				}
				*/
				
				//课程的所有课节
				List<CourseClass> courseClasss = eduCourseService.listCourseClass((Long)map.get("courseid"));
				if(courseClasss != null && courseClasss.size()>0){
					int length = courseClasss.size();
					if(courseClasss.get(length-1).getStartTimePlan().before(new Date())){
						map.put("startTimePlan", courseClasss.get(length-1).getStartTimePlan());
					} else if(courseClasss.get(0).getStartTimePlan().after(new Date())){
						map.put("startTimePlan", courseClasss.get(0).getStartTimePlan());
					} else {
						for (CourseClass courseClass : courseClasss) {
							if(courseClass.getStartTimePlan().after(new Date())){
								map.put("startTimePlan", courseClass.getStartTimePlan());
								break;
							}
						}
					}
				}
			}
		}
		return pageInfo;
	}

	@Override
	public PageInfo<CourseDto> getWillBeginCourses(int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listWillBeginCourseid(pageNum,pageSize);
		return queryCourseDtos(pageInfo);
	}
	
	@Override
	public PageInfo<CourseDto> getRecommendCourses(int pageNum,int pageSize) {
		PageInfo<Long> pageInfo = eduCourseService.listRecommendCourseId(pageNum, pageSize);
		return queryCourseDtos(pageInfo);
	}

	@Override
	public PageInfo<Map<String,Object>> listLiveCourse(CourseQueryExample example,int pageNum, int pageSize) {
		PageInfo<Map<String,Object>> pageInfo = eduCourseService.listLiveCourse(example,pageNum,pageSize);
		if(pageInfo.getList() != null && pageInfo.getList().size()>0){
			for (Map<String,Object> map : pageInfo.getList()) {
				if(map.get("courseid") != null){
					//总人数
					int totalStudent = eduCourseService.countCourseStudent((Long)map.get("courseid"));
					map.put("totalStudent", totalStudent);
					//校内人数
					int totalSchoolStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.SCHOOL);
					map.put("totalSchoolStudent", totalSchoolStudent);
					//报名人数
					int totalSignupStudent = eduCourseService.countCourseStudentBySignupType((Long)map.get("courseid"),CourseStudentSignupType.PERSONAL);
					map.put("totalSignupStudent", totalSignupStudent);
				}
				//如果为校长创建，则创建人显示为学校的名称
				Long createUid = (Long) map.get("createUid");
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(createUid);
				int userType = userBasicInfo.getUserType();
				//创建人的类型不为老师即为校长
				/*if(userType != UserTypeConstants.TEACHER){
					AuthSchoolInfo authSchoolInfo =userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
					map.put("createName", authSchoolInfo.getName());
				}*/
			}
		}
		return pageInfo;
	}
	
	@Override
	public CourseClass getCourseClassByCourseid(long courseid) {
		return eduCourseService.getCourseClassByCourseid(courseid);
	}
	
}
