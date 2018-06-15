package com.class8.eduPlatform.core.bean;

//前端一些页面只要显示名字的，都可以用这个BEAN来显示
public class NameAndIdShow {

	private long 		id;
	private String		name;
	public NameAndIdShow() {
		// TODO Auto-generated constructor stub
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
