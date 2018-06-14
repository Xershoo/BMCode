package com.class8.eduPlatform.core.controller.school;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
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
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.class8.eduPlatform.core.bean.SchoolTeacherShowInfo;
import com.class8.eduPlatform.core.bean.UserPayAccountInfo;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.AuthSchoolApplyInfo;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.AuthTeacherInfo;
import com.class8.user.bean.SchoolClassify;
import com.class8.user.bean.SchoolCollegeMajorShowInfo;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserEduInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.AuthSchoolTypeConstant;
import com.class8.user.constants.AuthTeacherStatusConstant;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.SexConstants;
import com.class8.user.constants.UserTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.dto.CreateSchoolDto;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.common.excel.ReadExcel;
import com.class8.eduPlatform.common.util.MD5Util;
import com.sun.org.apache.bcel.internal.generic.LAND;
import com.wanmei.sns.util.DateUtils;

/*
 * 认证学校和老师的接口
 */

@Controller
@RequestMapping("/auth")
public class AuthSchoolController  extends BaseController {
	
	public static final String CREATE_SCHOOL_APPLY = "/school/creatSchoolApply";
	public static final String CREATE_SCHOOL = "/school/creatSchool";
	public static final String CREATE_SCHOOL_SUCCESS = "/school/creatSchoolSubSuccess";
	
	@Autowired
	private IEduUserService eduUserService;
	@Autowired
	private IUserService userService;
	
	@RequestMapping(value = "/creatSchoolApply")
	public String creatSchoolApply() {
		
		return CREATE_SCHOOL_APPLY;
	}
	
	@RequestMapping(value = "/toCreatSchool")
	public String toCreatSchool() {
		
		return CREATE_SCHOOL;
	}
	
	//检查用户是否已经创建过学校，返回1表示已经创建过，返回 0 表示没创建，即可以创建学校。 -1其他错误
	@ResponseBody
	@RequestMapping(value = "/checkUserHadCreateSchool")
	public String checkUserHadCreateSchool(HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
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
		try {
			AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
			if(authSchoolInfo != null){
				json.put("status", 1); 
				
			}else {
				json.put("status", 0);
			}			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return json.toString();
	}
	
	//用户创建学校，检查所填学校是所被占用，返回1表示已经创建过，返回 0 表示没创建，即可以创建学校。 -1其他错误
		@ResponseBody
		@RequestMapping(value = "/checkc8SchoolNameHadCreated")
		public String checkc8SchoolNameHadCreated(@RequestParam String name, HttpSession session,
				HttpServletRequest req, HttpServletResponse response){
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
			try {
				AuthSchoolInfo authSchoolInfo = eduUserService.getSchoolInfoByName(name);
				if(authSchoolInfo != null){
					json.put("status", 1); 
					
				}else {
					json.put("status", 0);
				}			
				
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			
			
			return json.toString();
		}
		
		//用户创建学校，检查所申请学校是否被申请过了，如果实体学校被申请了，就不能再创建相应学校。返回1表示已经创建过，返回 0 表示没创建，即可以创建学校。 -1其他错误
		@ResponseBody
		@RequestMapping(value = "/checkrealSchoolNameHadCreated")
		public String checkrealSchoolNameHadCreated(@RequestParam String name,HttpSession session,
				HttpServletRequest req, HttpServletResponse response){
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
			try {
				AuthSchoolApplyInfo authSchoolApplyInfo = eduUserService.getSchoolApplyInfoByName(name);
				if(authSchoolApplyInfo != null){
					json.put("status", 1); 
					
				}else {
					json.put("status", 0);
				}			
				
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			
			
			return json.toString();
		}
	//获取平台学校的分类
	@ResponseBody
	@RequestMapping(value = "/getclass8schoolitems")
	public String getclass8schoolitems(HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
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
		try {
			List<SchoolClassify> items = eduUserService.getSchoolclassifyList(AuthSchoolTypeConstant.sclass8);
			System.out.println("get items:" + items.size());
			SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
			byte[]  mes=JSON.toJSONBytes(items,feature);
			json.put("classify", new String(mes,"utf-8"));
			json.put("status", 0);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return json.toString();
	}
	
	//获取实体学校的分类
	@ResponseBody
	@RequestMapping(value = "/getrealschoolitems")
	public String getrealschoolitems(HttpSession session,
			HttpServletRequest req, HttpServletResponse response){
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
		try {
			List<SchoolClassify> items = eduUserService.getSchoolclassifyList(AuthSchoolTypeConstant.sreal);
			
			SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
			//byte[]  mes=JSON.toJSONBytes(items,feature);
			//json.put("classify", new String(mes,"utf-8"));
			json.put("classify", items);
			json.put("status", 0);
	
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return json.toString();
	}
	
	public ServletFileUpload getFileUpload(ServletContext ctx){
		FileCleaningTracker tracker = FileCleanerCleanup.getFileCleaningTracker(ctx);
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setFileCleaningTracker(tracker);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		return upload;
	}
	
	@ResponseBody
	@RequestMapping(value = "/authtocreateschool")
	public String authtocreateschool(CreateSchoolDto createinfo, @RequestParam MultipartFile[] myFiles, HttpSession session,
			HttpServletRequest req, HttpServletResponse response)throws Exception {
		/*
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) req;  
	    List<MultipartFile> files34 = new ArrayList<MultipartFile>();
	    files34 = multipartRequest.getFiles("myFiles");
	    files34 = multipartRequest.getFiles("myFile1");
	    */
		final int nUploadFilesNum = 7;
//		JSONObject json = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		PrintWriter out = response.getWriter();
		response.setCharacterEncoding("utf-8");        
	    response.setContentType("text/html; charset=utf-8");
	    //String url_new = req.getContextPath();
	    //String url_new = url.substring(0,url.lastIndexOf("/"));
		long uid = 0;
		if (!subject.isAuthenticated()) {
//			json.put("status", -1);
//			return json.toString();
			out.print("<script language=\"javascript\">alert(\"登录超时，请重新登录!\");location.href=\"/index\";</script>");
			out.flush();
			out.close();
			return null;
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		if(authSchoolInfo != null){
			/*json.put("status", -2); //用户已经创建过学校
			return json.toString();*/
			out.print("<script language=\"javascript\">alert(\"该用户已经创建过学校!\");location.href=\"/auth/toCreatSchool\";</script>");
			out.flush();
			out.close();
			return null;
		}
		authSchoolInfo = eduUserService.getSchoolInfoByName(createinfo.getC8schoolName());
		if(authSchoolInfo != null){
			/*json.put("status", -3); //平台学校名称已被占用
			return json.toString();*/
			out.print("<script language=\"javascript\">alert(\"平台学校名称已使用，请重新输入!\");location.href=\"/auth/toCreatSchool\";</script>");
			out.flush();
			out.close();
			return null;
		}
		AuthSchoolApplyInfo authSchoolApplyInfo = eduUserService.getSchoolApplyInfoByName(createinfo.getRealschollName());
		if(authSchoolApplyInfo != null){
			/*json.put("status", -4); //学校已被创建，请联系相关人
			return json.toString();*/
			out.print("<script language=\"javascript\">alert(\"机构学校已被创建!\");location.href=\"/auth/toCreatSchool\";</script>");
			out.flush();
			out.close();
			return null;
		}
		
		if(myFiles.length < nUploadFilesNum){
			/*json.put("status", -3); 
			return json.toString();*/
			out.print("<script language=\"javascript\">alert(\"上传文件数目不对!\");location.href=\"/auth/toCreatSchool\";</script>");
			out.flush();
			out.close();
			return null;
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
		for (int i = 0; i < nUploadFilesNum; i++) {
			String oriNameString = myFiles[i].getOriginalFilename();
			if(StringUtils.isEmpty(oriNameString)){
				fileNames.add("");
				continue;
			}
			String ext = oriNameString.substring(oriNameString.lastIndexOf(".") + 1,oriNameString.length());
			System.out.println(oriNameString + " : " + ext);
			ext = ext.toLowerCase();
			if (fileTypes.contains(ext)){
				saveFullPathString = imageSavePath + i + "." + ext;
				System.out.println("to save upload file: " + saveFullPathString);
				getFile(myFiles[i], saveFullPathString);
				fileNames.add(saveFullPathString);
			}
			else {
				/*json.put("status", -4);
				return json.toString();*/
				out.print("<script language=\"javascript\">alert(\"上传的文件格式不对!\");location.href=\"/auth/toCreatSchool\";</script>");
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
			if(fileNames.get(i) == ""){
				fileUrls.add("");
				continue;
			}	
			Map<String, String> files = new HashMap<String, String>();
			files.put("myfile", fileNames.get(i));
			String resultUp = this.upfile(SystemConfigs.UPLOAD_AUTH_IMAGE, params, files);
			if(!resultUp.equals("failed"))
				fileUrls.add(resultUp);
			System.out.println(resultUp+"-----");
		}
		if(fileUrls.size() != nUploadFilesNum){
			out.print("<script language=\"javascript\">alert(\"上传文件数目不对!\");location.href=\"/auth/toCreatSchool\";</script>");
			out.flush();
			out.close();
			return null;
		}else {
			authSchoolInfo = new AuthSchoolInfo();
			authSchoolInfo.setName(createinfo.getC8schoolName());
			authSchoolInfo.setClassify(createinfo.getC8shoolItem());
			authSchoolInfo.setMark(createinfo.getC8schoolMark());
			authSchoolInfo.setLogoUrl(fileUrls.get(0));
			authSchoolInfo.setIntroduce(createinfo.getC8schoolIntorduce());
			authSchoolInfo.setCreaterUid(uid);
			authSchoolInfo.setCreateTime(new Timestamp(System.currentTimeMillis()));
			authSchoolInfo.setStatus(AuthSchoolStatusConstant.apply);
			///TODO:没有后台，申请直接通过先
			authSchoolInfo.setStatus(AuthSchoolStatusConstant.pass);
			long schoolid = eduUserService.createAuthSchoolInfo(authSchoolInfo);
			if(schoolid <= 0)
			{
				out.print("<script language=\"javascript\">alert(\"创建学校失败!\");location.href=\"/auth/toCreatSchool\";</script>");
				out.flush();
				out.close();
				return null;
			}
			authSchoolApplyInfo = new AuthSchoolApplyInfo();
			authSchoolApplyInfo.setSchoolId(schoolid);
			authSchoolApplyInfo.setSchoolName(createinfo.getRealschollName());
			authSchoolApplyInfo.setSchoolUrl(createinfo.getRealschoolUrl());
			authSchoolApplyInfo.setSchoolType(createinfo.getRealschoolItem());
			authSchoolApplyInfo.setOrganizationCode(createinfo.getRealschoolOrgCode());
			authSchoolApplyInfo.setOrganizationCodeUrl(fileUrls.get(1));
			authSchoolApplyInfo.setBusinessLicence(createinfo.getRealschoolBusinessLicence());
			authSchoolApplyInfo.setBusinessLicenceUrl(fileUrls.get(2));
			authSchoolApplyInfo.setApplyerRealname(createinfo.getApplyName());
			authSchoolApplyInfo.setApplyerMobile(createinfo.getApplyMobile());
			authSchoolApplyInfo.setApplyerEmail(createinfo.getApplyEmail());
			authSchoolApplyInfo.setApplyerIdcard(createinfo.getApplyIdCard());
			authSchoolApplyInfo.setProxyUrl(fileUrls.get(3));
			authSchoolApplyInfo.setCardHandUrl(fileUrls.get(4));
			authSchoolApplyInfo.setCardDirectUrl(fileUrls.get(5));
			authSchoolApplyInfo.setCardObverseUrl(fileUrls.get(6));
			authSchoolApplyInfo.setIp(req.getRemoteAddr());
			
			if(eduUserService.updateSchoolApplyInfo(authSchoolApplyInfo) < 0){
				/*json.put("status", -6);
				return json.toString();*/
				out.print("<script language=\"javascript\">alert(\"更新学校信息失败!\");location.href=\"/auth/toCreatSchool\";</script>");
				out.flush();
				out.close();
				return null;
			}
			//authSchoolInfo.setId(id);
			
		}
		/*json.put("status", 0);
		req.setAttribute("status", 0);*/
		out.print("<script language=\"javascript\">alert(\"学校创建成功!\");location.href=\"/auth/toCreatSchoolSuccess\";</script>");
		out.flush();
		out.close();
		return null;

	}

	/**
	 * 通过传入页面读取到的文件，处理后保存到本地磁盘，并返回一个已经创建好的File
	 * 
	 * @param imgFile 从页面中读取到的文件
	 * 	
	 * 
	 * @param imageSavePath 文件保存的全路径
	 * 
	 * @return
	 */
	
	private int getFile(MultipartFile imgFile, String imageSavePath){
		File file = new File(imageSavePath);
		try {
			imgFile.transferTo(file); // 保存上传的文件
		} catch (IllegalStateException e) {
			e.printStackTrace();
			return -1;
		} catch (IOException e) {
			e.printStackTrace();
			return -2;
		}
		return 0;
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
	
	@RequestMapping(value = "/toCreatSchoolSuccess")
	public String toCreatSchoolSuccess() {
		
		return CREATE_SCHOOL_SUCCESS;
	}
}
