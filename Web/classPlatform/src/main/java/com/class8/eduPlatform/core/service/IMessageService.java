package com.class8.eduPlatform.core.service;


import com.class8.eduPlatform.core.dto.MessageDto;
import com.class8.user.bean.Message;
import com.github.pagehelper.PageInfo;

public interface IMessageService {
	
	public PageInfo<MessageDto> listSchoolMessageByPublishFlagPage(long schoolId,int type,int publishFlag,int pageNum,int pageSize);
	
	public PageInfo<MessageDto> listSchoolMessagePage(long schoolId,int type,int pageNum,int pageSize);
	
	public void createSchoolMessage(Message message);

	public void setTopMessage(long messageid);

	public void updateMessagePublishFlag(long messageid,int publishFlag);

	public void deleteMessage(long messageid);

	public Message getMessage(Long messageid);
	
}
