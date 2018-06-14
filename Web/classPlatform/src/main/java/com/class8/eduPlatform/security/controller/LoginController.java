package com.class8.eduPlatform.security.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weibo4j.Account;
import weibo4j.model.WeiboException;
import weibo4j.org.json.JSONException;

import com.alibaba.fastjson.JSONObject;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.CookieUtil;
import com.class8.eduPlatform.common.util.CyptoUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.common.util.URLUtil;
import com.class8.eduPlatform.core.constant.CommonConstants;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.core.service.IUserService;
import com.class8.eduPlatform.security.bean.SessionUser;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.user.bean.AuthSchoolInfo;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.ThirdUserLogin;
import com.class8.user.bean.UserBasicInfo;
import com.class8.user.bean.UserLoginStatisticsInfo;
import com.class8.user.constants.AuthSchoolStatusConstant;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.constants.ThirdUserLoginTypeConstants;
import com.class8.user.constants.UserLoginWayConstants;
import com.class8.user.constants.UserTypeConstants;
//import com.class8.user.constants.ThirdUserLoginTypeConstants;
import com.class8.user.webservice.intf.IEduUserService;
import com.qq.connect.QQConnectException;
import com.qq.connect.api.OpenID;
import com.wanmei.sns.util.ProtocalUtils;

@Controller
public class LoginController extends BaseController {
	
	private static Logger logger = Logger.getLogger(LoginController.class);
	
	private static final String LOGIN_URL = "/index/loginIndex";
	private static final String INDEX_URL = "/";
	private static final String SCHOOL_HOME_PAGE = "/infocenter/school/";
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IUserService userService;
	
	/**
	 * 用户登录页面
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public String loginPage(HttpServletRequest request){
		String loginName = CookieUtil.getCookieValue(request, CommonConstants.USERNAME_PARAM);
		String password = CookieUtil.getCookieValue(request, CommonConstants.PASSWORD_PARAM);
		String rememberMe = CookieUtil.getCookieValue(request, CommonConstants.REMEMBER_ME_PARAM);
		request.setAttribute(CommonConstants.USERNAME_PARAM, loginName);
		request.setAttribute(CommonConstants.PASSWORD_PARAM, CyptoUtil.decode(password));
		request.setAttribute(CommonConstants.REMEMBER_ME_PARAM, Boolean.valueOf(rememberMe));
		return LOGIN_URL;
	}
	
	/**
	 * 用户登录
	 * @param loginName 用户名
	 * @param password 密码
	 * @param rememberMe 记住我
	 * @return
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public @ResponseBody String login(HttpServletRequest request,HttpServletResponse response,@RequestParam String loginName,@RequestParam String password,@RequestParam Boolean rememberMe){
		Subject subject = SecurityUtils.getSubject();  
        if(subject.isAuthenticated()){
        	ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();  
            if(!shiroUser.getLoginName().equalsIgnoreCase(loginName)){
                subject.logout();  
            }
        }
        return doLogin(request,response,loginName,MD5Util.encode(password),rememberMe);  
	}
	
	/**
	 * 根据用户获取所认证的学校的id
	 * @param uid
	 * @return
	 */
	private long getmySchoolid(long uid){
		long schoolid = 0;
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(uid);
		if(authSchoolInfo != null && authSchoolInfo.getStatus() == AuthSchoolStatusConstant.pass)
			schoolid = authSchoolInfo.getId();
		else {
			List<SchoolsTeacher> list =  eduUserService.listmyAllSchools(uid);
			if(list != null){
				for (SchoolsTeacher schoolsTeacher : list) {
					if(schoolsTeacher.getStatus() == SchoolMembersStatueConstant.pass){
						schoolid = schoolsTeacher.getSchoolId();
						break;
					}
				}
			}
		}
		return schoolid;
	}
	
	/**
	 * 用户登录方法
	 */
	private String doLogin(HttpServletRequest request,HttpServletResponse response,String loginName,String password,Boolean rememberMe){
		JSONObject jsonObject = new JSONObject();
		UsernamePasswordToken token = new UsernamePasswordToken(loginName, password);
		token.setRememberMe(true);
		String message = "登录成功";
		try {
			Subject subject = SecurityUtils.getSubject();
			subject.login(token);
			jsonObject.put("success",true);
			jsonObject.put("message", message);
			//登录完成后业务处理
			return doAfterLogin(request,response,jsonObject);
		} catch ( UnknownAccountException uae ) { 
			message = "输入的账号或密码有误";
		} catch ( IncorrectCredentialsException ice ) {
			message = "输入的账号或密码有误";
		} catch ( LockedAccountException lae ) {
			message = "账号被锁定，请联系管理员";
		} catch (ExcessiveAttemptsException ee) {
			message = "密码错误达五次，请明天再试";
		}catch ( AuthenticationException ae ) {
			message = "未知错误，请稍后重试";
		}
		jsonObject.put("message", message);
		return jsonObject.toString();
	}
	
	/**
	 * 用户登录成功后业务处理
	 * @return
	 */
	private String doAfterLogin(HttpServletRequest request,HttpServletResponse response,JSONObject jsonObject){
		this.addSessionUser();
		if(StringUtils.isNotEmpty(request.getParameter(CommonConstants.RETURN_URL_PARAM))){
			jsonObject.put("successUrl", URLUtil.decode(request.getParameter(CommonConstants.RETURN_URL_PARAM)));
		} else {
			UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(getShiroUser().getUid());
			long schoolid = getmySchoolid(getShiroUser().getUid());
			if(schoolid == 0){
				if(userBasicInfo.getRecommendUid() > 0)
					schoolid = getmySchoolid(userBasicInfo.getRecommendUid());
			}
			if(schoolid > 0)
				jsonObject.put("successUrl", SCHOOL_HOME_PAGE + schoolid);
			else
				jsonObject.put("successUrl", INDEX_URL);
		}
		
		//记住用户名和密码
		String rememberMe = request.getParameter(CommonConstants.REMEMBER_ME_PARAM);
		if(rememberMe != null){
			if(Boolean.valueOf(rememberMe)){
				CookieUtil.add(response, CommonConstants.USERNAME_PARAM, request.getParameter(CommonConstants.USERNAME_PARAM), CommonConstants.COOKIE_MAX_AGE);
				CookieUtil.add(response, CommonConstants.PASSWORD_PARAM, CyptoUtil.encode(request.getParameter(CommonConstants.PASSWORD_PARAM)), CommonConstants.COOKIE_MAX_AGE);
				CookieUtil.add(response, CommonConstants.REMEMBER_ME_PARAM, request.getParameter(CommonConstants.REMEMBER_ME_PARAM), CommonConstants.COOKIE_MAX_AGE);
			} else {
				CookieUtil.remove(response, CommonConstants.PASSWORD_PARAM);
				CookieUtil.remove(response, CommonConstants.REMEMBER_ME_PARAM);
			}
		}
		UserLoginStatisticsInfo userLoginStatisticsInfo = eduUserService.getUserLoginStatisticsInfo(getShiroUser().getUid());
		if(userLoginStatisticsInfo == null){
			userLoginStatisticsInfo = new UserLoginStatisticsInfo();
			userLoginStatisticsInfo.setUid(getShiroUser().getUid());
		}
		userLoginStatisticsInfo.setLastLoginTime(new Timestamp(System.currentTimeMillis()));
		userLoginStatisticsInfo.setLastLoginIp(CommonUtil.getIpAddr(request));
		userLoginStatisticsInfo.setLastLoginType(UserLoginWayConstants.pc_web);
		userLoginStatisticsInfo.setLoginTotalTimes(userLoginStatisticsInfo.getLoginTotalTimes() + 1);
		eduUserService.updateUserLoginStatisticsinfo(userLoginStatisticsInfo);
		return jsonObject.toString();
	}
	
	/**
	 * 添加会话用户
	 * @return
	 */
	private void addSessionUser(){
		Subject subject = SecurityUtils.getSubject();
		ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(shiroUser.getUid());
		//构建会话用户信息
		SessionUser sessionUser = new SessionUser();
		sessionUser.setUid(userBasicInfo.getUid());
		sessionUser.setLoginName(userBasicInfo.getUname());
		sessionUser.setNickName(userBasicInfo.getNickName());
		sessionUser.setSex(userBasicInfo.getSex());
		sessionUser.setAvatarUrl(SystemConfigs.PIC_URL_PERFIX + userBasicInfo.getAvatarUrl());
		if(userBasicInfo.getUserType() == UserTypeConstants.STUDENT){
			sessionUser.setRoleName(CommonConstants.STUDENT);
		} else if(userBasicInfo.getUserType() == UserTypeConstants.TEACHER) {
			sessionUser.setRoleName(CommonConstants.TEACHER);
		} else {
			sessionUser.setRoleName(CommonConstants.SCHOOL);
		}
		//认证学校信息
		AuthSchoolInfo authSchoolInfo = userService.getAuthSchoolInfoByUid(userBasicInfo.getUid());
		if(authSchoolInfo != null){
			sessionUser.setSchoolId(authSchoolInfo.getId());
			sessionUser.setSchoolName(authSchoolInfo.getName());
			sessionUser.setSchoolLogoUrl(SystemConfigs.PIC_URL_PERFIX + authSchoolInfo.getLogoUrl());
		}
		subject.getSession().setAttribute(CommonConstants.USER, sessionUser);
	}
	
	/**
	 * 跳转第三方QQ登录
	 */
	@RequestMapping(value = "/qqlogin")
	public void qqLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("qq login relogin");
		 response.setContentType("text/html;charset=utf-8");
	        try {
	            response.sendRedirect(new com.qq.connect.oauth.Oauth().getAuthorizeURL(request));
	        } catch (QQConnectException e) {
	            e.printStackTrace();
	        }
	}
	
	/**
	 * 第三方QQ登录处理
	 */
	@RequestMapping(value = "/afterlogin.do")	
	public String afterloginqq(@RequestParam String code,@RequestParam String state,HttpSession session, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException
	{		
		System.out.println("qq login success");
		System.out.println("code: " + code + " state:" + state);
		request.getSession().setAttribute("qq_connect_state", state);
		com.qq.connect.oauth.Oauth oauth=new com.qq.connect.oauth.Oauth();
		com.qq.connect.javabeans.AccessToken accessTokenObj;
		try {
			accessTokenObj = oauth.getAccessTokenByRequest(request);
			String accessToken = accessTokenObj.getAccessToken();
	        System.out.println("accesstoken : " + accessToken);
	        if(StringUtils.isEmpty(accessToken))
	        {
	        	System.out.print("没有获取到响应参数");
	        	
	        	return "redirect:/";
	        }
	        long tokenExpireIn = accessTokenObj.getExpireIn();
	        System.out.println("token: " + accessToken + "  expirein:" + tokenExpireIn);
	        OpenID openIDObj =  new OpenID(accessToken);
	        String openidString = openIDObj.getUserOpenID();
	        System.out.println("openid: " + openidString);
	        ThirdUserLogin thirdUserLogin = eduUserService.getThirdUserInfo(openidString, ThirdUserLoginTypeConstants.QQ);
            if(thirdUserLogin == null){
            	//用户未注册，填注册信息
            	session.setAttribute("thirdlogintype", ThirdUserLoginTypeConstants.QQ);
            	session.setAttribute("openuid", openidString);
            	return "redirect:/toRegisterByThird";
            	
            	//QQ目前不让绑定用户，先通过审核再说，http://ask.oauth2.cn/show-7.html
            	/*com.qq.connect.api.qzone.UserInfo qzoneUserInfo = new com.qq.connect.api.qzone.UserInfo(accessToken, openidString);
            	com.qq.connect.javabeans.qzone.UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
                
                if (userInfoBean.getRet() == 0) {
                	
                	String strUidString = registerByThirdLogin(openidString, "class8", session,response, request );
                	
                	if(strUidString.equals("success"))
                	{
                		UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfoByUname(openidString);
                		userBasicInfo.setNickName(userInfoBean.getNickname());
                		userBasicInfo.setRealName(userInfoBean.getNickname());
                		session.setAttribute("realName",userInfoBean.getNickname());
                		eduUserService.updateUserBasicInfo(userBasicInfo);
                		return "redirect:/homepage";
                	}else {
                		return "redirect:/";
					}
                }*/
            }
            else {
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(thirdUserLogin.getUid());			
				doLogin(request,response, userBasicInfo.getUname(), userBasicInfo.getPassword(),false);
				System.out.println("login success ,to go login1");
				return "redirect:" + INDEX_URL;
				/*if(strRetString.equals("success")){
					System.out.println("login success ,to go login1");
					return "redirect:/" + INDEX_URL;
				}*/
			}
	       
		} catch (QQConnectException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  	
		
		return "redirect:/";
	}
	
	
	/**
	 * 跳转第三方微信登录
	 */
	@RequestMapping(value = "/weixinlogin")
	public void weixinLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("weixin login relogin");
		 response.setContentType("text/html;charset=utf-8");
	        response.sendRedirect("https://open.weixin.qq.com/connect/qrconnect?appid=wx2b37b5652a4cfdf5&redirect_uri=http%3A%2F%2Fpiano.class8.com%2Fafterweixinlogin&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect");
	}
	
	
	/**
	 * 第三方微信登录处理
	 */
	@RequestMapping(value = "/afterweixinlogin")	
	public String afterloginweixin(@RequestParam String code,@RequestParam String state,HttpSession session, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException
	{		
		System.out.println("weixin login success");
		System.out.println("code: " + code + " state:" + state);
		request.getSession().setAttribute("weixin_connect_state", state);
		//通过code获取access_token
		String accesstokenjson=sendPostRequest("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2b37b5652a4cfdf5&secret=074b46747768fd098fadb0fdaec4f09c&code="+code+"&grant_type=authorization_code");
		System.out.println("accesstokenjson: " + accesstokenjson);
		JSONObject jsStr = JSONObject.parseObject(accesstokenjson);
		String accesstoken=jsStr.getString("access_token");
		String openid=jsStr.getString("openid");
		
		System.out.println("accesstoken: " + accesstoken);
		System.out.println("openid: " + openid);
		//通过access_token调用接口
		String userjson=sendPostRequest("https://api.weixin.qq.com/sns/userinfo?access_token="+accesstoken+"&openid="+openid);
		JSONObject userStr = JSONObject.parseObject(userjson);
		String nickname=jsStr.getString("nickname");
		System.out.println("nickname: " + nickname);
		ThirdUserLogin thirdUserLogin = eduUserService.getThirdUserInfo(openid, ThirdUserLoginTypeConstants.WeiXin);
        if(thirdUserLogin == null){
        	//用户未注册，填注册信息
        	session.setAttribute("thirdlogintype", ThirdUserLoginTypeConstants.WeiXin);
        	session.setAttribute("openuid", openid);
        	return "redirect:/toRegisterByThird";
        }
        else {
        	try {
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(thirdUserLogin.getUid());			
				doLogin(request,response, userBasicInfo.getUname(), userBasicInfo.getPassword(),false);
				System.out.println("weixin success 1111");
				return "redirect:" + INDEX_URL;		
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return "redirect:" + INDEX_URL;
			}
				
		}		
	}
	
	public String sendPostRequest(String url) {
		StringBuffer stringBuffer = new StringBuffer("");
		try {
		URL postUrl = new URL(url);
		HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setRequestMethod("GET");
		connection.setUseCaches(false);
		connection.setInstanceFollowRedirects(true);
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		String line;
		while ((line = reader.readLine()) != null) {
		stringBuffer.append(line);
		}
		reader.close();
		} catch (Exception e) {
		e.printStackTrace();
		}

		return stringBuffer.toString();
		}
	
	
	/**
	 * 跳转第三方微博登录
	 */
	@RequestMapping(value = "/weibologin")
	public String weiboLogin(HttpServletRequest request, HttpServletResponse response) throws WeiboException {
		System.out.println("weibologin relogin");
		weibo4j.Oauth weiboOauth = new weibo4j.Oauth();
		String weiboString = weiboOauth.authorize("code");
		System.out.println("weibourl: "+ weiboString);
		return "redirect:" + weiboString;
	}
	
	/**
	 * 第三方微博登录处理
	 */
	@RequestMapping(value = "/weiboafterlogin")	
	public String weiboAfterlogin(HttpSession session, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		System.out.println("weiboafterlogin" + request.toString());
		String strcode = request.getParameter("code");
		if(!StringUtils.isEmpty(strcode))
			System.out.println("weibo code: " + strcode);
		else {
			String errorCode = request.getParameter("error_code");
			if(!StringUtils.isEmpty(errorCode))
			{
				System.out.println("errorcode:" + errorCode);
			}
			return "redirect:/";
		}
		
		weibo4j.http.AccessToken accessTokenObj = null ;
		weibo4j.Oauth oauth2 = new weibo4j.Oauth();
        try {
            
           
			accessTokenObj = oauth2.getAccessTokenByCode(strcode) ;
			
            String accessToken = accessTokenObj.getAccessToken() ;            
            
            Account account = new Account(accessToken) ;
           
            weibo4j.org.json.JSONObject uidJson = account.getUid() ;
            
            String uid = null ;
            String screenName = null ;        
            String username = null ;
            
            uid = uidJson.getString("uid") ;
			     
            weibo4j.Users users = new weibo4j.Users(accessToken) ;
            weibo4j.model.User weiboUser = users.showUserById(uid) ;
            username = weiboUser.getName() ;
            screenName = weiboUser.getScreenName() ;
            System.out.println("uid: " + uid + "  username:" + username + "screenName: " +screenName);
            ThirdUserLogin thirdUserLogin = eduUserService.getThirdUserInfo(uid, ThirdUserLoginTypeConstants.Weibo);
            if(thirdUserLogin == null){
            	//用户未注册，填注册信息
            	session.setAttribute("thirdlogintype", ThirdUserLoginTypeConstants.Weibo);
            	session.setAttribute("openuid", uid);
            	return "redirect:/toRegisterByThird";
            }
            else {
				UserBasicInfo userBasicInfo = eduUserService.getUserBasicInfo(thirdUserLogin.getUid());
				doLogin(request,response,userBasicInfo.getUname(), userBasicInfo.getPassword(),false);
				System.out.println("weibo login success ,to go login");
				return "redirect:" + INDEX_URL;
				/*if(strRetString.equals("success")){
					System.out.println("weibo login success ,to go login");
					return "redirect:" + INDEX_URL;
				}*/
			}
            
        } catch (WeiboException | JSONException e) {
            e.printStackTrace();
        }
        
		
		return "redirect:/";
		//return "redirect:" + "https://api.weibo.com/oauth2/authorize?client_id=3168212368&response_type=code&redirect_uri=http://www.class8.com/weiboafterlogin" ;
	}
	
	/**
	 * 第三方用户登录
	 */
	@RequestMapping(value = "/registerByThirdLogin")
	@ResponseBody
	public String registerByThirdLogin(@RequestParam String uname, @RequestParam String password, @RequestParam String email, HttpSession session,
			HttpServletResponse response, HttpServletRequest request) throws UnsupportedEncodingException {

		JSONObject jsonObject = new JSONObject();
		UserBasicInfo sInfo = eduUserService.getUserBasicInfoByUname(uname);
		if(sInfo != null){
			jsonObject.put("success", -1); //用户名被占用
			return jsonObject.toJSONString();
		}
		String openidString = session.getAttribute("openuid").toString();
		String strTypeString = session.getAttribute("thirdlogintype").toString();
		int nType = 0;
		if(strTypeString != null)
			nType = Integer.parseInt(strTypeString);
		
		String passwordmd5 = MD5Util.encode(password);
		session.removeAttribute("openuid");
		session.removeAttribute("thirdlogintype");
		long uid = eduUserService.RegisterUserByThirdUser(openidString, nType, uname, passwordmd5);
		System.out.println("third user login :" + openidString + " nType:" + nType + " uname:"+ uname + " uid:" + uid);
		if(uid > 0){
			sInfo = eduUserService.getUserBasicInfoByUname(uname);
			sInfo.setEmail(email);
			eduUserService.updateUserBasicInfo(sInfo);
			doLogin(request,response,uname, sInfo.getPassword(),false);
			jsonObject.put("success", 1);
		}else
			jsonObject.put("success", -2);//注册失败
		return jsonObject.toJSONString();
	}
	
	@RequestMapping(value = "/getCurTime ",produces="application/json;charset=UTF-8")
	public String getCurTime(HttpServletResponse response)
	{
		
		response.addHeader("Access-Control-Allow-Origin","*");
		response.setHeader( "Pragma", "no-cache" );
		response.addHeader( "Cache-Control", "must-revalidate" );
		response.addHeader( "Cache-Control", "no-cache" );
		response.addHeader( "Cache-Control", "no-store" );
		  response.setHeader("Content-type", "text/html;charset=UTF-8"); 
		response.setDateHeader("Expires", 0);
		SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'Z (中国标准时间) ",new Locale("china"));
			try {
				response.getWriter().write(sdf.format(new Date()).toString());
				response.getWriter().flush();
			} catch (Exception e) {
				e.printStackTrace();
			}
		return null;
	}
	
	@RequestMapping(value = "/autologin")
	public String autlLogin(@RequestParam long uid,@RequestParam String  t,
			@RequestParam String toPage,HttpSession session,
			HttpServletResponse response,HttpServletRequest request)  throws UnsupportedEncodingException {
		//TODO:login suceess
		System.out.println("autologin uid " + uid + " token: " + t + " toPage: " + toPage);
		toPage = toPage.replaceAll("__", "?");
		toPage = toPage.replaceAll("\\[\\[", "&");
		System.out.println("toPage to tranfer: " + toPage);
		String deviceName="autologin"; //和客户端请求的名一样。直接定死，需要时再改
		String deviceid="0";
		
		long ncode = eduUserService.autologin(deviceName, uid, deviceid, t);
		if(ncode < 0)
		{
			System.out.println("auto login error ,token 过期了 ");
			return "redirect:/" ;
		}
		System.out.println("auto login sucess");
		Subject curUser = SecurityUtils.getSubject();
		UserBasicInfo info = eduUserService.getUserBasicInfo(uid);	
		if(info == null)
			return "redirect:/";
		Subject subject = SecurityUtils.getSubject();  
		boolean toLogin = true;
		if(subject.isAuthenticated()){
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();  
			if(shiroUser.getUid() != uid)
				subject.logout();
			else {
				toLogin = false;
			}
		}
		if(toLogin){
			UsernamePasswordToken token = new UsernamePasswordToken(info.getUname(), info.getPassword());
			token.setRememberMe(true);
			String message = "ok";
			
			subject.login(token);
			//将用户信息放置在session中(设置到shiro的session中的数据也可在http的session中获取)
			this.addSessionUser();
		}
		return "redirect:/" + toPage;
	}


}
