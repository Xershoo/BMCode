package com.class8.eduPlatform.core.bean;

public class Message {
	
	private String title;   //标题
	private String content; //内容
	private String strPublicName; //发布者，某某老师
	private String createTime; //发布时间
	private String userImg;   //发送者URL
	private int userType;
	private int sex;     
	private int readFlag;   //0 未读， 1 已读
	private String readTimeString; //读取时间
	private String msgName;    //系统消息 或者 课程名
	private long msgId;
	private long senderid;
	private int msgType;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStrPublicName() {
		return strPublicName;
	}
	public void setStrPublicName(String strPublicName) {
		this.strPublicName = strPublicName;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	public String getUserImg() {
		return userImg;
	}
	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}
	public int getUserType() {
		return userType;
	}
	public void setUserType(int userType) {
		this.userType = userType;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getReadFlag() {
		return readFlag;
	}
	public void setReadFlag(int readFlag) {
		this.readFlag = readFlag;
	}
	public String getReadTimeString() {
		return readTimeString;
	}
	public void setReadTimeString(String readTimeString) {
		this.readTimeString = readTimeString;
	}
	public String getMsgName() {
		return msgName;
	}
	public void setMsgName(String msgName) {
		this.msgName = msgName;
	}
	public long getMsgId() {
		return msgId;
	}
	public void setMsgId(long msgId) {
		this.msgId = msgId;
	}
	public long getSenderid() {
		return senderid;
	}
	public void setSenderid(long senderid) {
		this.senderid = senderid;
	}
	public int getMsgType() {
		return msgType;
	}
	public void setMsgType(int msgType) {
		this.msgType = msgType;
	}
	

}
