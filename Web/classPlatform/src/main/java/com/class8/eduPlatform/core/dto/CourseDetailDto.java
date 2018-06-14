package com.class8.eduPlatform.core.dto;

import java.io.Serializable;
import java.sql.Timestamp;

public class CourseDetailDto implements Serializable {

	private static final long serialVersionUID = -578931577048223680L;
	
	//课程id
	protected long courseid;
	
	//现在可以进入的课节ID
	protected long canEnterClassid;
	
	//课程分类id
	protected long itemsType;
	
	//课程名称
	protected String courseName;
	
	//课程状态
	private int courseStatus;
	
	//课程所属学校id
	protected long schoolId;
	
	//课程所属学校名称
	protected String schoolName;
	
	//课程老师id
	protected long teacherUid;
	
	//老师性别
	protected int teacherSex;
	
	//课程老师名称
	protected String teacherName;
	
	//课程老师图像url
	protected String teacherAvatarUrl;
	//课程老师教龄
	protected float  teachyears;
	
	//课程封面图片
	protected String coverUrl;
	
	//课程描述
	protected String description;
	
	//教学目标
	protected String target;
	
	//适合人群
	protected String people;
	
	//最少报名人数
	protected int nMinStudents;
	
	//最大报名人数
	protected int nMaxStudents;
	
	//起始报名时间
	protected Timestamp signupStartTime;
	
	//终止报名时间
	protected Timestamp signupEndTime;
	
	//课程开始时间
	protected Timestamp courseStartTime;
	//课程结束时间
	protected Timestamp courseEndTime;
	
	//创建人id
	protected long createUid;
	
	//课程创建人名称
	protected String createName;
	
	//课程创建时间
	protected Timestamp createTime;
		
	//课程价格
	protected float priceTotal;
	
	//课程总课节数
	protected int classTotal;
	
	//课程已完成课结束
	protected int classHadFinished;
	
	//课程学生总数
	protected int studentTotal;
	
	//课程评论总数
	protected int countComment;
	
	//课程评价分
	protected float avgScore;
	
	//报名状态（0:表示未报名 1:表示已报名）
	protected int singupStatus;

	public long getCourseid() {
		return courseid;
	}

	public void setCourseid(long courseid) {
		this.courseid = courseid;
	}
	
	public long getItemsType() {
		return itemsType;
	}

	public void setItemsType(long itemsType) {
		this.itemsType = itemsType;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	public int getCourseStatus() {
		return courseStatus;
	}

	public void setCourseStatus(int courseStatus) {
		this.courseStatus = courseStatus;
	}

	public long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(long schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public long getTeacherUid() {
		return teacherUid;
	}

	public void setTeacherUid(long teacherUid) {
		this.teacherUid = teacherUid;
	}

	public int getTeacherSex() {
		return teacherSex;
	}

	public void setTeacherSex(int teacherSex) {
		this.teacherSex = teacherSex;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getTeacherAvatarUrl() {
		return teacherAvatarUrl;
	}

	public void setTeacherAvatarUrl(String teacherAvatarUrl) {
		this.teacherAvatarUrl = teacherAvatarUrl;
	}

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getPeople() {
		return people;
	}

	public void setPeople(String people) {
		this.people = people;
	}

	

	public int getnMinStudents() {
		return nMinStudents;
	}

	public void setnMinStudents(int nMinStudents) {
		this.nMinStudents = nMinStudents;
	}

	public int getnMaxStudents() {
		return nMaxStudents;
	}

	public void setnMaxStudents(int nMaxStudents) {
		this.nMaxStudents = nMaxStudents;
	}

	public Timestamp getSignupStartTime() {
		return signupStartTime;
	}

	public void setSignupStartTime(Timestamp signupStartTime) {
		this.signupStartTime = signupStartTime;
	}

	public Timestamp getSignupEndTime() {
		return signupEndTime;
	}

	public void setSignupEndTime(Timestamp signupEndTime) {
		this.signupEndTime = signupEndTime;
	}

	public long getCreateUid() {
		return createUid;
	}

	public void setCreateUid(long createUid) {
		this.createUid = createUid;
	}

	public String getCreateName() {
		return createName;
	}

	public void setCreateName(String createName) {
		this.createName = createName;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public float getPriceTotal() {
		return priceTotal;
	}

	public void setPriceTotal(float priceTotal) {
		this.priceTotal = priceTotal;
	}

	public int getClassTotal() {
		return classTotal;
	}

	public void setClassTotal(int classTotal) {
		this.classTotal = classTotal;
	}

	public int getClassHadFinished() {
		return classHadFinished;
	}

	public void setClassHadFinished(int classHadFinished) {
		this.classHadFinished = classHadFinished;
	}

	public int getStudentTotal() {
		return studentTotal;
	}

	public void setStudentTotal(int studentTotal) {
		this.studentTotal = studentTotal;
	}

	public int getCountComment() {
		return countComment;
	}

	public void setCountComment(int countComment) {
		this.countComment = countComment;
	}

	public float getAvgScore() {
		return avgScore;
	}

	public void setAvgScore(float avgScore) {
		this.avgScore = avgScore;
	}

	public Timestamp getCourseStartTime() {
		return courseStartTime;
	}

	public void setCourseStartTime(Timestamp courseStartTime) {
		this.courseStartTime = courseStartTime;
	}

	public Timestamp getCourseEndTime() {
		return courseEndTime;
	}

	public void setCourseEndTime(Timestamp courseEndTime) {
		this.courseEndTime = courseEndTime;
	}

	public float getTeachyears() {
		return teachyears;
	}

	public void setTeachyears(float teachyears) {
		this.teachyears = teachyears;
	}

	public long getCanEnterClassid() {
		return canEnterClassid;
	}

	public void setCanEnterClassid(long canEnterClassid) {
		this.canEnterClassid = canEnterClassid;
	}

	public int getSingupStatus() {
		return singupStatus;
	}

	public void setSingupStatus(int singupStatus) {
		this.singupStatus = singupStatus;
	}	
	
}
