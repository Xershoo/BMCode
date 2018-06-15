package com.class8.eduPlatform.core.bean;

public class StudentOrder {
private String orderId;
private String price;
private String courseName;
private String teacherName;
private String schoolname;
public String getSchoolname() {
	return schoolname;
}
public void setSchoolname(String schoolname) {
	this.schoolname = schoolname;
}
public String getOrderId() {
	return orderId;
}
public void setOrderId(String orderId) {
	this.orderId = orderId;
}
public String getPrice() {
	return price;
}
public void setPrice(String price) {
	this.price = price;
}
public String getCourseName() {
	return courseName;
}
public void setCourseName(String courseName) {
	this.courseName = courseName;
}
public String getTeacherName() {
	return teacherName;
}
public void setTeacherName(String teacherName) {
	this.teacherName = teacherName;
}
}
