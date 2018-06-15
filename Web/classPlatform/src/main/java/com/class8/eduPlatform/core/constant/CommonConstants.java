package com.class8.eduPlatform.core.constant;

public class CommonConstants {
	
	public static final String USERNAME_PARAM = "loginName";
	public static final String PASSWORD_PARAM = "password";
	public static final String REMEMBER_ME_PARAM = "rememberMe";
	public static final String RETURN_URL_PARAM = "returnUrl";
	public static final int COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 

	//男生图像图片
    public static final String MALE_PICTURE_URL = "avatar/t_male.png"; 
    public static final String STUDENT_MALE_PICTURE_URL = "avatar/s_male.png"; 
    //女生图像图片
    public static final String FEMALE_PICTURE_URL = "avatar/t_female.png";
    public static final String STUDENT_FEMALE_PICTURE_URL = "avatar/s_female.png";
    
    
    //默认密码
    public static final String DEFAULT_PWD = "class8";
    
    //学生角色
    public static final String STUDENT = "student";
    
    //教师角色
    public static final String TEACHER = "teacher";
    
    //学校角色
    public static final String SCHOOL = "school";
    
    //当前用户
    public static final String USER = "user";
    
}
