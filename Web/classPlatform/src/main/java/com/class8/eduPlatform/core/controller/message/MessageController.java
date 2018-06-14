package com.class8.eduPlatform.core.controller.message;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.log4j.BasicConfigurator;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.bean.Message;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.MessageEx;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.constants.MessageTypeConstants;
import com.class8.user.constants.ReadFlagConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.wanmei.sns.util.DateUtils;

import sun.misc.BASE64Decoder;


/*
 * 个人信息接口，包括获取个人的资料，账户信息等，
 */

@Controller
@RequestMapping("/message")
public class MessageController  extends BaseController {

	
	@Autowired
	IEduUserService iEduUserService;
	
	@Autowired
	IEduCourseService iEduCourseService;
	
	@RequestMapping(value="/message")
	public  ModelAndView message(int type,@RequestParam(defaultValue="1")  int uid,@RequestParam(defaultValue="")  String realname,@RequestParam(defaultValue="")  String nickname){
		ModelAndView mav = new ModelAndView("/message/message");
		JSONObject jsonObject  = new JSONObject(); 
		Subject subject = SecurityUtils.getSubject();  
        if (!subject.isAuthenticated()) { 
        	mav= new ModelAndView("/index");
        	return mav;
        }
        String realname1;
		try {
			realname1 = URLDecoder.decode(realname,"utf-8"); 
			String nickname1=URLDecoder.decode(nickname,"utf-8");
			 mav.addObject("type",type);
		        mav.addObject("uid",uid);
		        mav.addObject("realname",realname1);
		        mav.addObject("nickname",nickname1);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
       
		return mav;
	}
	//notread 0 未读  1 已读  2 全部
	@ResponseBody
	@RequestMapping(value = "/messageTypeCount")
	public String messageTypeCount(@RequestParam int notread, @RequestParam int type, HttpSession session, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {

			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			int nCount = 0;
			nCount = iEduUserService.countMessgeByReceiverUid(uid, type, notread);
			json.put("count", nCount);
			
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", -1);

		}
		return json.toString();
		
	}	
	//notread 0 未读  1 已读  2 全部
	@ResponseBody
	@RequestMapping(value = "/messageAll")
	public String messageAll(@RequestParam int notread,@RequestParam int page,@RequestParam int count, @RequestParam int type, HttpSession session, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			int nstart = 0;
			if(page != 1){
				nstart = (page-1)*count;
			}
			List<MessageEx> mes = null;
			
			mes = iEduUserService.listMessgeByReceiverUid(uid,nstart, count, type, notread);
			
			List<Message> list = new ArrayList<Message>();
			for (MessageEx messageEx : mes) {
				
				Message Mess = new Message();
				//查看消息详情，重新调用一新接口。因此消息列表时不再传回消息内容
				//Mess.setContent(messageEx.getContent());
				Mess.setCreateTime(DateUtil.seconds2String(messageEx.getCreateTime()));
				
				Mess.setTitle(messageEx.getTitle());
				long teacheruid = messageEx.getPublishUid();
				UserBasicInfo teacherBasicInfo = iEduUserService
						.getUserBasicInfo(teacheruid);
				if(teacherBasicInfo != null)
				{
					Mess.setUserImg(SystemConfigs.PIC_URL_PERFIX + teacherBasicInfo.getAvatarUrl());
					Mess.setSex(teacherBasicInfo.getSex());
					Mess.setUserType(teacherBasicInfo.getUserType());
				}
				Mess.setReadFlag(messageEx.getReadFlag());
				Mess.setReadTimeString(DateUtil.seconds2String(messageEx.getReadTime()));
				Mess.setStrPublicName(messageEx.getStrPublicName()+"老师");
				int msgType = messageEx.getMessageType();
				if(msgType == MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE || msgType == MessageTypeConstants.PUBLIC_SYSTEM_MESSAGE)
				{
					//Mess.setMsgName(MessageTypeConstants.SYSTEM_MEEAGE_STR);
					if(msgType==60)
					{
					Mess.setStrPublicName(messageEx.getStrSchool());
					Mess.setMsgName("学校公告");
					}
					else{
						Mess.setMsgName("系统消息");
						Mess.setStrPublicName("class8");
					}
				}
				else if(msgType == MessageTypeConstants.PRIVATE_MESSAGE){
					Mess.setMsgName("《"+MessageTypeConstants.PRIVATE_MSG_STR+"》");
					//Mess.setStrPublicName("1");
				}
				else {
					Mess.setMsgName("《"+messageEx.getStrSchool()+"》");
					//Mess.setStrPublicName("2");
				}
				Mess.setMsgId(messageEx.getMessageid());
				Mess.setMsgType(msgType);
				Mess.setSenderid(messageEx.getPublishUid());

				list.add(Mess);
			}
			byte[] cc = JSON.toJSONBytes(list, feature);
			json.put("list", new String(cc, "utf-8"));
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", -1);

		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/messageByid")
	public String messageByid(@RequestParam long msgid, HttpSession session, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
		try {

			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			
			MessageEx messageEx = iEduUserService.getMessage(uid, msgid);

			if(messageEx.getReadFlag() == ReadFlagConstants.NOT_READ)
				iEduUserService.markMessageAlreadyRead(msgid, uid);
				
				Message Mess = new Message();
				Mess.setContent(messageEx.getContent());
				Mess.setCreateTime(DateUtil.seconds2String(messageEx.getCreateTime()));
				
				Mess.setTitle(messageEx.getTitle());
				long teacheruid = messageEx.getPublishUid();
				UserBasicInfo teacherBasicInfo = iEduUserService
						.getUserBasicInfo(teacheruid);
				if(teacherBasicInfo != null)
				{
					Mess.setUserImg(SystemConfigs.PIC_URL_PERFIX + teacherBasicInfo.getAvatarUrl());
					Mess.setSex(teacherBasicInfo.getSex());
					Mess.setUserType(teacherBasicInfo.getUserType());
				}
				Mess.setReadFlag(messageEx.getReadFlag());
				Mess.setReadTimeString(DateUtil.seconds2String(messageEx.getReadTime()));
				Mess.setStrPublicName(messageEx.getStrPublicName()+"老师");
				int msgType = messageEx.getMessageType();
				if(msgType == MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE || msgType == MessageTypeConstants.PUBLIC_SYSTEM_MESSAGE)
				{
					//Mess.setMsgName(MessageTypeConstants.SYSTEM_MEEAGE_STR);
					if(msgType==60)
					{
					Mess.setStrPublicName(messageEx.getStrSchool());
					Mess.setMsgName("学校公告");
					}
					else{
						Mess.setMsgName("系统消息");
						Mess.setStrPublicName("class8");
					}
				}
				else if(msgType == MessageTypeConstants.PRIVATE_MESSAGE){
					Mess.setMsgName("《"+MessageTypeConstants.PRIVATE_MSG_STR+"》");
					//Mess.setStrPublicName("1");
				}
				else {
					Mess.setMsgName("《"+messageEx.getStrSchool()+"》");
					//Mess.setStrPublicName("2");
				}
				Mess.setMsgId(messageEx.getMessageid());
				Mess.setMsgType(msgType);
				Mess.setSenderid(messageEx.getPublishUid());

			byte[] cc = JSON.toJSONBytes(Mess, feature);
			
			json.put("message",new String(cc, "utf-8"));
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", -1);

		}
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/messageAllCount")
	public String messageAllCount(@RequestParam int notread, HttpSession session, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		
		try {

			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			int nCount = 0;
			int nTotalCount = 0;
			nCount = iEduUserService.countMessgeByReceiverUid(uid, MessageTypeConstants.PUBLIC_COURSE_MESSAGE, notread);
			json.put("coursemsg", nCount);
			nTotalCount += nCount;
			nCount = iEduUserService.countMessgeByReceiverUid(uid, MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE, notread);
			json.put("schoolmsg", nCount);
			nTotalCount += nCount;
			nCount = iEduUserService.countMessgeByReceiverUid(uid, MessageTypeConstants.PRIVATE_MESSAGE, notread);
			json.put("privatemsg", nCount);
			nTotalCount += nCount;
			nCount = iEduUserService.countMessgeByReceiverUid(uid, MessageTypeConstants.PUBLIC_SYSTEM_MESSAGE, notread);
			json.put("sysmsg", nCount);
			
			json.put("total", nTotalCount);
			json.put("status", 0);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			json.put("status", -1);

		}
		return json.toString();
		
	}

	//发送消息，messageType 0 私人消息，50 课程消息， 60 学校消息， 100 平台消息
	@ResponseBody
	@RequestMapping(value = "/sendnewmassage/{messageType}", produces = "application/json;charset=UTF-8")
	public String sendNewMassage(
			@PathVariable(value = "messageType") int messageType,
			@RequestParam long receiverUid, @RequestParam long courseid,
			@RequestParam String courseName, @RequestParam String title,
			@RequestParam String content, HttpSession session,
			HttpServletResponse response) {
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
		}
		ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
		uid = shiroUser.getUid();
		if (messageType == MessageTypeConstants.PRIVATE_MESSAGE)// 私信
		{
			if(receiverUid == uid){
				json.put("status", -2); //不能给自己发送消息
				return json.toString();
			}
			// long receiverUid=10000;
			long cc = iEduUserService.sendPrivateMessage(uid, receiverUid,
					title, content);
			if (cc > 0) {
				json.put("status", 0);
			} else {
				json.put("status", cc);
			}

		}else if (messageType == MessageTypeConstants.PUBLIC_UNIVERSIY_MESSAGE)// 学校广播消息，由学校管理员发送
		{
			AuthSchoolInfo authSchoolInfo = iEduUserService.getSchoolInfoById(courseid);
			if(authSchoolInfo == null || authSchoolInfo.getCreaterUid() != uid){
				json.put("status", -3);// 学校ID不对，不存在或者学校不是本人
				return json.toString();
			}
			//学校广播消息，courseid 表示学校ID
			long cc = iEduUserService.sendPublicMessageToAll(uid, courseid,title, content);
			if (cc > 0) {
				json.put("status", 0);
			} else {
				json.put("status", cc);
			}

		}else if (messageType == MessageTypeConstants.PUBLIC_SYSTEM_MESSAGE)// 系统广播消息，由平台发送
		{
			//学校广播消息，courseid 表示学校ID
			long cc = iEduUserService.sendPublicMessageToAll(uid, 0,title, content);
			if (cc > 0) {
				json.put("status", 0);
			} else {
				json.put("status", cc);
			}

		}else if (messageType == MessageTypeConstants.PUBLIC_COURSE_MESSAGE)// 课程公开信，发送给本课程的学生们
		{
			if (courseid != 0) {
				CourseBasicInfo courseBasicInfo = iEduCourseService.getCourseBasicInfo(courseid);
				if(courseBasicInfo == null || courseBasicInfo.getTeacherUid() != uid){
					json.put("status", -3); //发送者不是这堂课的老师，不能群发消息
					return json.toString();
				}
				int ncount = iEduCourseService.countCourseStudent(courseid);
				List<Long> stulist = iEduCourseService.listCourseStudent(
						courseid, 0, ncount);
				if(stulist == null || stulist.size() == 0){
					json.put("status", -2); //该课没有学生列表，发送无效
					return json.toString();
				}
					
				long cc = iEduUserService.sendPublicMessasge(uid,
						courseName, stulist, MessageTypeConstants.PUBLIC_COURSE_MESSAGE, title, content);
				if (cc > 0) {
					json.put("status", 0);
				} else {
					json.put("status", -1);
				}
			} else {
				json.put("status", -1);
			}

		} else {
			json.put("status", -1);
		}

		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/showMessagePage")
	public String showMessagePage(@RequestParam int mid,HttpSession session) {
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
		}
		ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
		uid = shiroUser.getUid();
		iEduUserService.markMessageAlreadyRead(mid, uid);
		json.put("status", 0);
		return json.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleMessById ")
	public String deleMessById(HttpSession session,@RequestParam long messageid) {
		JSONObject json = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", 1);
			}
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			int cc = iEduUserService.deleteMessageFromInbox(messageid, uid);
			if(cc==1)
			{
				json.put("status", 0);		
			}
			else{
				json.put("status", cc);	
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			json.put("status", 0);	
		}
		return json.toString();
	}
	
}
