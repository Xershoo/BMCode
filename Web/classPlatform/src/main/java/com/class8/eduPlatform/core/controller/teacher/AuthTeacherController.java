package com.class8.eduPlatform.core.controller.teacher;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.codec.language.bm.Lang;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.FileCleanerCleanup;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileCleaningTracker;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.core.bean.UserPayAccountInfo;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthCertificateInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.CerificateTypeConstant;
import com.class8.user.webservice.intf.IEduUserService;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.sun.org.apache.bcel.internal.generic.LAND;
import com.wanmei.sns.util.DateUtils;

/*
 * 认证学校和老师的接口
 */

@Controller
@RequestMapping("/teacher")
public class AuthTeacherController  extends BaseController {
	
	public static final String TECH_CERTIFICATION = "/certificate/myCertificate";	
	
	@Autowired
	private IEduUserService eduUserService;
	
	public ServletFileUpload getFileUpload(ServletContext ctx){
		FileCleaningTracker tracker = FileCleanerCleanup.getFileCleaningTracker(ctx);
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setFileCleaningTracker(tracker);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		return upload;
	}
	@RequestMapping(value = "/techCertification",method=RequestMethod.GET)
	public String techCertification() {
		
		return TECH_CERTIFICATION;
	}
	@ResponseBody
	@RequestMapping(value = "/authtoteacher")
	public String authtoteacher(@RequestParam String realName,@RequestParam String idCardNum,
			@RequestParam MultipartFile[] myFiles, HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {
		PrintWriter out = response.getWriter();
		response.setCharacterEncoding("utf-8");        
	    response.setContentType("text/html; charset=utf-8");
	    String url = req.getRequestURL().toString();
	    String url_new = url.substring(0,url.lastIndexOf("/"));
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			out.print("<script language=\"javascript\">alert(\"请重新登录后再试!\");location.href=\""+url_new+"/index\";</script>");
			out.flush();
			out.close();
			return null;
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		
		if(myFiles.length < 3){
			out.print("<script language=\"javascript\">alert(\"上传失败!\");location.href=\""+url_new+"/techCertification\";</script>");
			out.flush();
			out.close();
			return null;
		}
			
		
		// 定义一个数组，用于保存可上传的文件类型
		List fileTypes = new ArrayList();
		fileTypes.add("jpg");
		fileTypes.add("jpeg");
		fileTypes.add("bmp");
		fileTypes.add("gif");
		fileTypes.add("png");
		String imageSavePath = SystemConfigs.FILE_UP_TEMP_PATH + Long.toString(uid) +  Long.toString(System.currentTimeMillis());
		
		String saveFullPathString = imageSavePath;
		List<String> fileNames = new ArrayList<String>();
//		String picUrl = req.getScheme()+":////"+req.getServerName()+":"+req.getServerPort()+req.getContextPath()+"/upload/";
		for (int i = 0; i < 3; i++) {
			String oriNameString = myFiles[i].getOriginalFilename();
			if(StringUtils.isEmpty(oriNameString)){
				out.print("<script language=\"javascript\">alert(\"上传失败!\");location.href=\""+url_new+"/techCertification\";</script>");
				out.flush();
				out.close();
				return null;
			}
			String ext = oriNameString.substring(oriNameString.lastIndexOf(".") + 1,oriNameString.length());
			if (fileTypes.contains(ext)){
				saveFullPathString = imageSavePath + i + "." + ext;
				System.out.println("to save upload file: " + saveFullPathString);
//				getFile(myFiles[i], saveFullPathString);
				CommonUtil.getFile(myFiles[i], saveFullPathString);
				fileNames.add(saveFullPathString);
			}
			else {
				out.print("<script language=\"javascript\">alert(\"上传失败!\");location.href=\""+url_new+"/techCertification\";</script>");
				out.flush();
				out.close();
				return null;
			}
		}
		List<String> fileUrls = new ArrayList<String>();
		Map<String, String> params=new HashMap<String, String>();				
		for (int i = 0; i < fileNames.size(); i++) {
			params.clear();	
			params.put("POS", "1");  //1表示WEB端上传，2 客户端上传， 3手机客户端上传
			
			Map<String, String> files = new HashMap<String, String>();
			files.put("myfile", saveFullPathString);
			String resultUp = this.upfile(SystemConfigs.UPLOAD_AUTH_IMAGE, params, files);
			if(!resultUp.equals("failed"))
				fileUrls.add(resultUp);
			System.out.println(resultUp+"-----");
		}
		if(fileUrls.size() != 3){
			out.print("<script language=\"javascript\">alert(\"上传失败!\");location.href=\""+url_new+"/techCertification\";</script>");
			out.flush();
			out.close();
			return null;
		}else {
			
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo == null){
				authTeacherInfo = new AuthTeacherInfo();
				authTeacherInfo.setApplyforDate(new Timestamp(System.currentTimeMillis()));
				authTeacherInfo.setStatus(AuthTeacherStatusConstant.apply);
			}
			else {
				authTeacherInfo.setStatus(AuthTeacherStatusConstant.reapply);
			}
			authTeacherInfo.setUid(uid);
			authTeacherInfo.setRealName(realName);
			authTeacherInfo.setIdCard(idCardNum);
			authTeacherInfo.setApplyTimes(authTeacherInfo.getApplyTimes()+1);
			authTeacherInfo.setCardHandUrl(fileUrls.get(0));
			authTeacherInfo.setCardDirectUrl(fileUrls.get(1));
			authTeacherInfo.setCardObverseUrl(fileUrls.get(2));
			authTeacherInfo.setApplyLastDate(new Timestamp(System.currentTimeMillis()));
			authTeacherInfo.setIp(req.getRemoteAddr());
			///TODO:没有后台，申请直接通过先
			authTeacherInfo.setStatus(AuthTeacherStatusConstant.pass);
			eduUserService.UpdateAuthTeacherInfo(authTeacherInfo);		

		}
		out.print("<script language=\"javascript\">alert(\"上传身份信息成功!\");location.href=\""+url_new+"/techCertification\";</script>");
		out.flush();
		out.close();
		return null;

	}
	
	//增加证书
	@ResponseBody
	@RequestMapping(value = "/authtoteacheraddCert")
	public String authtoteacherAddCer(@RequestParam int nCerType,@RequestParam String cername,
			 MultipartFile eduFiles, HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			return json.toString();
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}		
		
		// 定义一个数组，用于保存可上传的文件类型
		List<String> fileTypes = new ArrayList<String>();
		fileTypes.add("jpg");
		fileTypes.add("jpeg");
		fileTypes.add("bmp");
		fileTypes.add("gif");
		fileTypes.add("png");
		String imageSavePath = SystemConfigs.IMG_UP_TEMP_PATH;
		imageSavePath = imageSavePath + Long.toString(uid) ;
		imageSavePath = imageSavePath + Long.toString(System.currentTimeMillis());
		
		String saveFullPathString = imageSavePath;
		List<String> fileNames = new ArrayList<String>();
//		String picUrl = req.getScheme()+":////"+req.getServerName()+":"+req.getServerPort()+req.getContextPath()+"/upload/";
		for (int i = 0; i < 1; i++) {
			String oriNameString = eduFiles.getOriginalFilename();
			if(StringUtils.isEmpty(oriNameString)){
				json.put("status", -3);
				return json.toString();
			}
			String ext = oriNameString.substring(oriNameString.lastIndexOf(".") + 1,oriNameString.length());
			System.out.println(oriNameString + " : " + ext);
			ext = ext.toLowerCase();
			if (fileTypes.contains(ext)){
				saveFullPathString = imageSavePath + i + "." + ext;
				System.out.println("to save upload file: " + saveFullPathString);
				CommonUtil.getFile(eduFiles, saveFullPathString);
				fileNames.add(saveFullPathString);
			}
			else {
				json.put("status", -4);
				return json.toString();
			}
		}
		List<String> fileUrls = new ArrayList<String>();
		Map<String, String> params=new HashMap<String, String>();				
		//for (int i = 0; i < fileNames.size(); i++) 
		{
			params.clear();	
			params.put("POS", "1");  //1表示WEB端上传，2 客户端上传， 3手机客户端上传
			
			Map<String, String> files = new HashMap<String, String>();
			files.put("myfile", fileNames.get(0));
			String resultUp = this.upfile(SystemConfigs.UPLOAD_AUTH_IMAGE, params, files);
			if(!resultUp.equals("failed"))
				fileUrls.add(resultUp);
			System.out.println(resultUp+"-----");
		}
		
		AuthCertificateInfo authCertificateInfo = new AuthCertificateInfo();
		authCertificateInfo.setCertificateName(cername);
		authCertificateInfo.setCertificateStatus(AuthTeacherStatusConstant.apply);
		authCertificateInfo.setCertificateType(nCerType);
		authCertificateInfo.setCertificateUrl(fileUrls.get(0));
		authCertificateInfo.setToAuthType(1); //申请老师
		authCertificateInfo.setUid(uid);
		authCertificateInfo.setUploadDate(new Timestamp(System.currentTimeMillis()));
		eduUserService.UpdateAuthCertificateInfo(authCertificateInfo);

//	private int getFile(MultipartFile imgFile, String imageSavePath){
//		File file = new File(imageSavePath);
//		try {
//			imgFile.transferTo(file); // 保存上传的文件
//		} catch (IllegalStateException e) {
//			e.printStackTrace();
//			return -1;
//		} catch (IOException e) {
//			e.printStackTrace();
//			return -2;
//		}
//		return 0;
//	}
	
		json.put("status", 0);
		req.setAttribute("status", 0);
		return json.toString();

	}

	public String upfile(String postUrl, Map<String, String> params,
            Map<String, String> files) throws ClientProtocolException,
            IOException {
        CloseableHttpResponse response = null;
        InputStream is = null;
        String results = null;
        CloseableHttpClient httpclient = HttpClients.createDefault();
       
        try {
            HttpPost httppost = new HttpPost(postUrl);
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            if (params != null) {
                for (String key : params.keySet()) {
                    StringBody value = new StringBody(params.get(key),
                            ContentType.APPLICATION_JSON);
                    builder.addPart(key, value);
                }
            }
            
            if (files != null && files.size() > 0) {
                for (String key : files.keySet()) {
                    String value = files.get(key);
                    FileBody body = new FileBody(new File(value));
                    builder.addPart(key, body);
                }
            }
            HttpEntity reqEntity = builder.build();
            httppost.setEntity(reqEntity);
            response = httpclient.execute(httppost);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                is = entity.getContent();
                StringWriter writer = new StringWriter();
                IOUtils.copy(is, writer, "UTF-8");
                results = writer.toString();
            }

        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (Throwable t) {
            }
            try {
                if (response != null) {
                    response.close();
                }
            } catch (Throwable t) {
            }
            httpclient.close();
        }
        return results;
    }
	
	@ResponseBody
	@RequestMapping(value = "/getauthteacherinfo")
	public String getAuthteacherInfo(HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {
		ModelAndView mav = new ModelAndView("techCertification");
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo != null){
				authTeacherInfo.setCardHandUrl(SystemConfigs.PIC_URL_PERFIX + authTeacherInfo.getCardHandUrl());
				authTeacherInfo.setCardDirectUrl(SystemConfigs.PIC_URL_PERFIX + authTeacherInfo.getCardDirectUrl());
				authTeacherInfo.setCardObverseUrl(SystemConfigs.PIC_URL_PERFIX + authTeacherInfo.getCardObverseUrl());
				json.put("status", 0);
				json.put("auth", authTeacherInfo);
				List<AuthCertificateInfo> list = eduUserService.listAuthCertificateInfoByUid(uid, CerificateTypeConstant.toAuthTeacher);
				for (AuthCertificateInfo authCertificateInfo : list) {
					authCertificateInfo.setCertificateUrl(SystemConfigs.PIC_URL_PERFIX + authCertificateInfo.getCertificateUrl());
				}
				json.put("other", list);
			}else {
				json.put("status", 1);  //还没有申请认证
				
			}
		}
		return json.toString();
	}
	
	//查看是否已经认证为老师
	@ResponseBody
	@RequestMapping(value = "/gethadauthteacher")
	public String getHadAuthteacherInfo(HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {		
		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			json.put("status", -1);
			
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			AuthTeacherInfo authTeacherInfo = eduUserService.getAuthTeacherInfo(uid);
			if(authTeacherInfo != null){
				json.put("status", authTeacherInfo.getStatus());
			}else {
				json.put("status", -2);  //还没有申请认证
				
			}
		}
		return json.toString();
	}
}
