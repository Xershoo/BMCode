package com.class8.eduPlatform.core.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.dto.MessageDto;
import com.class8.eduPlatform.core.service.IMessageService;
import com.class8.user.bean.Message;
import com.class8.user.webservice.intf.IEduUserService;
import com.github.pagehelper.PageInfo;

@Service
public class MessageService implements IMessageService {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public PageInfo<MessageDto> listSchoolMessageByPublishFlagPage(long schoolId, int type, int publishFlag, int pageNum, int pageSize) {
		PageInfo pageInfo = eduUserService.listSchoolMessageByPuhlishFlagPage(schoolId, type, publishFlag, pageNum, pageSize);
		if(pageInfo != null && pageInfo.getList().size()>0){
			List<MessageDto> messageDtos = new ArrayList<MessageDto>();
			for (Object obj : pageInfo.getList()) {
				Message message = (Message) obj;
				MessageDto messageDto = new MessageDto();
				messageDto.setMessageid(message.getMessageid());
				messageDto.setTitle(message.getTitle());
				messageDto.setContent(message.getContent());
				messageDto.setMessageType(message.getMessageType());
				messageDto.setPublishFlag(message.getPublishFlag());
				messageDto.setPublishUid(message.getPublishUid());
				messageDto.setPublishRealName(eduUserService.getUserBasicInfo(message.getPublishUid()).getRealName());
				messageDto.setCreateTime(DateUtil.seconds2String(message.getCreateTime(), DateUtil.YYYY_MM_DD_HH_MM));
				messageDto.setPublishTime(DateUtil.seconds2String(message.getPublishTime(), DateUtil.YYYY_MM_DD_HH_MM));
				messageDto.setStrSchool(message.getStrSchool());
				messageDto.setSchoolId(message.getSchoolId());
				messageDto.setLinkUrl(message.getLinkUrl());
				messageDtos.add(messageDto);
			}
			pageInfo.setList(messageDtos);
		}
		return pageInfo;
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public PageInfo<MessageDto> listSchoolMessagePage(long schoolId,int type,int pageNum,int pageSize) {
		PageInfo pageInfo = eduUserService.listSchoolMessagePage(schoolId,type,pageNum,pageSize);
		if(pageInfo != null && pageInfo.getList().size()>0){
			List<MessageDto> messageDtos = new ArrayList<MessageDto>();
			for (Object obj : pageInfo.getList()) {
				Message message = (Message) obj;
				MessageDto messageDto = new MessageDto();
				messageDto.setMessageid(message.getMessageid());
				messageDto.setTitle(message.getTitle());
				messageDto.setContent(message.getContent());
				messageDto.setMessageType(message.getMessageType());
				messageDto.setPublishFlag(message.getPublishFlag());
				messageDto.setPublishUid(message.getPublishUid());
				messageDto.setPublishRealName(eduUserService.getUserBasicInfo(message.getPublishUid()).getRealName());
				messageDto.setCreateTime(DateUtil.seconds2String(message.getCreateTime(), DateUtil.YYYY_MM_DD_HH_MM));
				messageDto.setPublishTime(DateUtil.seconds2String(message.getPublishTime(), DateUtil.YYYY_MM_DD_HH_MM));
				messageDto.setStrSchool(message.getStrSchool());
				messageDto.setSchoolId(message.getSchoolId());
				messageDto.setLinkUrl(message.getLinkUrl());
				messageDtos.add(messageDto);
			}
			pageInfo.setList(messageDtos);
		}
		return pageInfo;
	}
	
	@Override
	public void createSchoolMessage(Message message) {
		eduUserService.createSchoolMessage(message);
	}
	
	@Override
	public void setTopMessage(long messageid) {
		eduUserService.updateMessagePublishTime(messageid,DateUtil.secondsOfNow());
	}
	
	@Override
	public void updateMessagePublishFlag(long messageid,int publishFlag) {
		eduUserService.updateMessagePublishFlag(messageid, publishFlag);
		
	}

	@Override
	public void deleteMessage(long messageid) {
		eduUserService.deleteMessageById(messageid);
		
	}
	
	@Override
	public Message getMessage(Long messageid) {
		return eduUserService.getMessage(messageid);
	}
}
