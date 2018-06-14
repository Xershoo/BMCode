package com.class8.eduPlatform.core.dto;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.class8.course.bean.CourseCategory;

public class CourseDto implements Serializable {
	
	private static final long serialVersionUID = -5412333819881039203L;
	
	//课程id
	private Long courseid;
	
	//课程名称
	private String courseName;
	
	//课程类型
	private Integer courseType;
	
	//课程分类id
	private Integer categoryId;
	
	//课程分类路径
	private List<CourseCategory> categotyPath = new ArrayList<CourseCategory>();
	
	//老师id
	private Long teacherUid;
	
	//老师名称
	private String teacherName;
	
	//学校id
	private Long schoolId; 
	
	//学校名称
	private String schoolName;
	
	//课程封面图片
	private String coverUrl;
	
	//课程价格
	private float priceTotal;
	
	//学生总数
	private int totalStudent;
	
	private int totalclass;   //本课堂总共课节数
	
	private int finishedclass;//本课堂上完课节数
	
	private long classingid; //正在进行中的课节ID
	
	//课程状态
	private int courseStatus;
	
	//计划上课时间
	private Timestamp startTimePlan;
	
	//计划结束时间
	private Timestamp endTimePlan;
	
	//课程录像url，如果为空，表示未直播课程
	private String recordUrl;
	
	//是否正在直播
	private boolean isLive;
	
	//最近计划上课时间
	private Timestamp latelyStartTimePlan;

	public Long getCourseid() {
		return courseid;
	}

	public void setCourseid(Long courseid) {
		this.courseid = courseid;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Integer getCourseType() {
		return courseType;
	}

	public void setCourseType(Integer courseType) {
		this.courseType = courseType;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public List<CourseCategory> getCategotyPath() {
		return categotyPath;
	}

	public void setCategotyPath(List<CourseCategory> categotyPath) {
		this.categotyPath = categotyPath;
	}

	public Long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(Long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public Long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Long schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public float getPriceTotal() {
		return priceTotal;
	}

	public void setPriceTotal(float priceTotal) {
		this.priceTotal = priceTotal;
	}

	public int getTotalStudent() {
		return totalStudent;
	}

	public void setTotalStudent(int totalStudent) {
		this.totalStudent = totalStudent;
	}

	public int getTotalclass() {
		return totalclass;
	}

	public void setTotalclass(int totalclass) {
		this.totalclass = totalclass;
	}

	public int getFinishedclass() {
		return finishedclass;
	}

	public void setFinishedclass(int finishedclass) {
		this.finishedclass = finishedclass;
	}

	public long getClassingid() {
		return classingid;
	}

	public void setClassingid(long classingid) {
		this.classingid = classingid;
	}

	public int getCourseStatus() {
		return courseStatus;
	}

	public void setCourseStatus(int courseStatus) {
		this.courseStatus = courseStatus;
	}

	public Timestamp getStartTimePlan() {
		return startTimePlan;
	}

	public void setStartTimePlan(Timestamp startTimePlan) {
		this.startTimePlan = startTimePlan;
	}

	public Timestamp getEndTimePlan() {
		return endTimePlan;
	}

	public void setEndTimePlan(Timestamp endTimePlan) {
		this.endTimePlan = endTimePlan;
	}

	public String getRecordUrl() {
		return recordUrl;
	}

	public void setRecordUrl(String recordUrl) {
		this.recordUrl = recordUrl;
	}

	public boolean isLive() {
		return isLive;
	}

	public void setLive(boolean isLive) {
		this.isLive = isLive;
	}

	public Timestamp getLatelyStartTimePlan() {
		return latelyStartTimePlan;
	}

	public void setLatelyStartTimePlan(Timestamp latelyStartTimePlan) {
		this.latelyStartTimePlan = latelyStartTimePlan;
	}
	
}
