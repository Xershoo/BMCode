package com.class8.eduPlatform.core.constant;

import java.util.Properties;

import com.class8.eduPlatform.common.util.ConfigLoader;

public class SystemConfigs {
	
	public static String allowImageExt = "jpg,png,gif,jpeg";
	
	public static long imageSizeLimit = 1 * 1024 *1024;
	
	public static String allowFileExt = "doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,pptx,hmp,png,gif,pdf,mp3,mp4,flv,avi,wmv";
	
	public static long fileSizeLimit = 50 * 1024 *1024;
	
	public static String	UPLOAD_AUTH_IMAGE="";
	
	public static String FILE_UP_BASE_PATH = "";
	
	public static String FILE_UP_TEMP_PATH = null;
	
	public static String IMG_UP_TEMP_PATH = null;
	
	public static String UPLOAD_COURSE_COVER_IMG_URL = "";
	
	public static String PIC_URL_PERFIX = "";
	
	public static String USER_AVATAR="";
	
	public static String USER_PHOTO = "";
	
	public static String CURSEWAVE = "";
	
	public static String EDUUPTOKEN = "";
	
	public static String USER_FILE = "";
	
	public static String UPDATE_FILENAME = "";
	
	public static String UPLOAD_LOGO_IMAGE = "";
	
	public static String UPLOAD_BANNER_IMAGE = "";
	
	static{
		Properties props = ConfigLoader.loadProperties("config.properties");
		FILE_UP_BASE_PATH = props.getProperty("file_up_base_path").trim();
		FILE_UP_TEMP_PATH = props.getProperty("file_up_temp_path").trim();
		IMG_UP_TEMP_PATH = props.getProperty("img_up_temp_path").trim();
		UPLOAD_AUTH_IMAGE = props.getProperty("upload_auth_image_url").trim();
		UPLOAD_COURSE_COVER_IMG_URL = props.getProperty("upload_course_cover_img_url").trim();
		PIC_URL_PERFIX = props.getProperty("pic_url_perfix").trim();
		USER_AVATAR = props.getProperty("user_avatar").trim();
		USER_PHOTO = props.getProperty("user_photo").trim();
		CURSEWAVE = props.getProperty("Cursewave").trim();
		EDUUPTOKEN = props.getProperty("eduuptoken").trim();
		USER_FILE = props.getProperty("user_file").trim();
		UPDATE_FILENAME = props.getProperty("update_filename").trim();
		UPLOAD_LOGO_IMAGE = props.getProperty("upload_logo_image").trim();
		UPLOAD_BANNER_IMAGE = props.getProperty("upload_banner_image").trim();
	}

}
