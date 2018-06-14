package com.class8.eduPlatform.core.bean;

import java.io.Serializable;

public class CourseList  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -864110138309739691L;
	public long getClassid() {
		return classid;
	}
	public void setClassid(long classid) {
		this.classid = classid;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public int getColorId() {
		return colorId;
	}

	public void setColorId(int colorId) {
		this.colorId = colorId;
	}
	private int colorId;
	private long classid;
	private String courseName;

}
