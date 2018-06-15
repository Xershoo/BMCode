package com.class8.eduPlatform.core.bean;

import java.util.List;

import com.class8.course.constants.CourseStateConstants;

public class ClientCourselist {
	private long  courseid;
	private String courseName;
	private String realName;
	private String teacherImage;
	List<CourseCard>  theClassList;
	private int courseState;
	private int compulsoryType;		//必须课
	private int studentCount;
	private int	onlineCount; //目前在线人数
	private String coverUrl;		
	
	public ClientCourselist() {
		super();
		courseState = CourseStateConstants.COURSE_NOT_BEGIN;
	}
	
	public long getCourseid() {
		return courseid;
	}
	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}
	public List<CourseCard> getTheClassList() {
		return theClassList;
	}
	public void setTheClassList(List<CourseCard> theClassList) {
		this.theClassList = theClassList;
	}
	public String getTeacherImage() {
		return teacherImage;
	}
	public void setTeacherImage(String teacherImage) {
		this.teacherImage = teacherImage;
	}
	public int getCourseState() {
		return courseState;
	}
	public void setCourseState(int courseState) {
		this.courseState = courseState;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public int getCompulsoryType() {
		return compulsoryType;
	}
	public void setCompulsoryType(int compulsoryType) {
		this.compulsoryType = compulsoryType;
	}
	
	public String getCoverUrl() {
		return coverUrl;
	}
	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public int getStudentCount() {
		return studentCount;
	}

	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}

	public int getOnlineCount() {
		return onlineCount;
	}

	public void setOnlineCount(int onlineCount) {
		this.onlineCount = onlineCount;
	}
	
	
}
