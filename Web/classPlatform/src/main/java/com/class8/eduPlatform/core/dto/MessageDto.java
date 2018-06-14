package com.class8.eduPlatform.core.dto;

import java.io.Serializable;

public class MessageDto implements Serializable {
	
	private static final long serialVersionUID = 7589665603018450695L;

	private long messageid;
	
	private String title;
	
	private String content;
	
	private int messageType;
	
	private int publishFlag;
	
	private long publishUid;
	
	private String publishRealName;
	
	private String createTime;
	
	private String publishTime;
	
	private String strSchool;
	
	private Long schoolId;
	
	private String linkUrl;

	public long getMessageid() {
		return messageid;
	}

	public void setMessageid(long messageid) {
		this.messageid = messageid;
	}

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

	public int getMessageType() {
		return messageType;
	}

	public void setMessageType(int messageType) {
		this.messageType = messageType;
	}

	public int getPublishFlag() {
		return publishFlag;
	}

	public void setPublishFlag(int publishFlag) {
		this.publishFlag = publishFlag;
	}

	public long getPublishUid() {
		return publishUid;
	}

	public void setPublishUid(long publishUid) {
		this.publishUid = publishUid;
	}
	
	public String getPublishRealName() {
		return publishRealName;
	}

	public void setPublishRealName(String publishRealName) {
		this.publishRealName = publishRealName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}

	public String getStrSchool() {
		return strSchool;
	}

	public void setStrSchool(String strSchool) {
		this.strSchool = strSchool;
	}

	public Long getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(Long schoolId) {
		this.schoolId = schoolId;
	}

	public String getLinkUrl() {
		return linkUrl;
	}

	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	
}
