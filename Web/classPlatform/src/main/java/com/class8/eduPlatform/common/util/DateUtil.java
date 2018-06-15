package com.class8.eduPlatform.common.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


public class DateUtil {
	
	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public static final String YYYY_MM_DD_CN = "yyyy年MM月dd日";
	public static final String YYYY_MM_DD_HH_MM_CN = "yyyy年MM月dd日 HH:mm";
	public static final String YYYY_MM_DD_HH_MM_SS_CN = "yyyy年MM月dd日 HH:mm:ss";
	
	/**
	 * 将时间戳转化为时间字符串
	 * @param seconds
	 * @return
	 */
	public static String time2String(long millions) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(millions);
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH) + 1;
		int day = c.get(Calendar.DAY_OF_MONTH);
		String output = "date_" + year + "_" + month + "_" + day;
		return output;
	}
	
	/**
	 * 将秒转为时间格式
	 * @param seconds
	 * @return
	 */
	public static String seconds2String(int seconds) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String outputString = format.format(new Date(1000L * seconds));
		return outputString;		
	}
	
	/**
	 * 将秒转为时间格式,通过指定的格式
	 * @param seconds
	 * @return
	 */
	public static String seconds2String(int seconds,String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String outputString = format.format(new Date(1000L * seconds));
		return outputString;		
	}
	
	/**
	 * 将毫秒转为时间格式
	 * @param seconds
	 * @return
	 */
	public static String millisecond2String(long millisecond) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String outputString = format.format(new Date(millisecond));
		return outputString;		
	}
	
	/**
	 * 将毫秒转为时间格式,通过指定的格式
	 * @param seconds
	 * @return
	 */
	public static String millisecond2String(long millisecond,String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String outputString = format.format(new Date(millisecond));
		return outputString;		
	}
	
	/**
	 * 获得当前时间的秒数
	 * @return
	 */
	public static int secondsOfNow(){
		return (int) (System.currentTimeMillis() / 1000L);
	}
	
	/**
	 * 获得当前时间的毫秒
	 * @return
	 */
	public static long millisecondOfNow(){
		return System.currentTimeMillis();
	}
	
	/**
	 * 获得当前时间的Timestamp形式
	 * @return
	 */
	public static Timestamp timestampOfNow(){
		return new Timestamp(System.currentTimeMillis());
	}
	
	/**
	 * 获得当前时间的Date形式
	 */
	public static Date dateOfNow(){
		return new Date();
	}
	
	/**
	 * 将timestamp转化为时间格式，通过默认的格式
	 * @param seconds
	 * @return
	 */
	public static String timestamp2String(Timestamp timestamp) {
		SimpleDateFormat format = new SimpleDateFormat(DateUtil.YYYY_MM_DD_HH_MM);
		String outputString = format.format(new Date(timestamp.getTime()));
		return outputString;		
	}
	
	/**
	 * 将timestamp转化为时间格式，指定日期格式
	 * @param timestamp
	 * @param pattern
	 * @return
	 */
	public static String timestamp2String(Timestamp timestamp,String pattern){
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		String outputString = format.format(new Date(timestamp.getTime()));
		return outputString;		
	}
	
	/**
	 * 将时间戳转化为时间字符串
	 * @param seconds
	 * @return
	 */
	public static String timeToString(int millions) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(millions);
		String year = String .valueOf(c.getTime().toLocaleString().split("-")[0]);
		String month = String.valueOf(c.getTime().getMonth() + 1);
		String date = String.valueOf(c.getTime().getDate());
		String output =year + "年" + month + "月" + date+"日";
		return output;
	}

	public String containStime2String(int seconds) {
		Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue() * 1000;
		c.setTimeInMillis(millions);
		String hours = String.valueOf(c.getTime().getHours());
		if (hours.length() == 1) {
			hours = "0" + hours;
		}
		String minutes = String.valueOf(c.getTime().getMinutes());
		if (minutes.length() == 1) {
			minutes = "0" + minutes;
		}
		String output = hours + ":" + minutes;
		return output;
	}
	
	/**
	 * 获取给定时间是星期几
	 * @param seconds
	 * @return
	 */
	public static String containStime2Week(long millions) {
		String[] weekDays = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(millions);
		int w = c.get(Calendar.DAY_OF_WEEK) - 1;
		if (w < 0)
			w = 0;
		return weekDays[w];

	}

	private static Date str2Date(String str) {
		String dateFormat = "yyyy-MM-dd";
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		if (str == null)
			return null;

		try {
			return format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private static String Date2DayStr(Date date){
		String dateFormat = "yyyy-MM-dd";
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		return format.format(date);
	}
	
	
	@SuppressWarnings("deprecation")
	public String int2String(int seconds)
	{
		Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue() * 1000;
		c.setTimeInMillis(millions);
		String output = c.getTime().toLocaleString();
		String month=String.valueOf(c.getTime().getMonth()+1);
		if(month.length()==1)
		{
			month="0"+month;
		}
		String day=String.valueOf(c.get(Calendar.DATE));
		if(day.length()==1)
		{
			day="0"+day;
		}
		String hour=String.valueOf(c.get(Calendar.HOUR));
		if(hour.length()==1)
		{
			hour="0"+hour;
		}
		String minute=String.valueOf(c.get(Calendar.MINUTE));
		if(minute.length()==1)
		{
			minute="0"+minute;
		}
		String year = String
				.valueOf(c.getTime().toLocaleString().split("-")[0]);
		output=year+"-"+month +"-"+day+" "+hour+":"+minute+":00";
		System.out.println(c.getTime().toLocaleString());
		return output;
		
	}
	
	/**
	 * 获得当前的开始时间的秒的形式
	 * @return
	 * @throws ParseException
	 */
	public static int secondsOfTheDayStart() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String startTime = sdf.format(new Date())+" 00:00:00";
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date startDate = sdf2.parse(startTime);
		int seconds = (int) (startDate.getTime() / 1000L);
		return seconds;
	}
	
	/**
	 * 获得当前天的结束时间的秒的形式
	 * @return
	 * @throws ParseException
	 */
	public static int secondsOfTheDayEnd() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String startTime = sdf.format(new Date())+" 23:59:59";
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date startDate = sdf2.parse(startTime);
		int seconds = (int) (startDate.getTime() / 1000L);
		return seconds;
	}
	
	/**
	 * 获取给定日期的开始时间
	 * @param day
	 * @return
	 * @throws ParseException
	 */
	public static long startByTime(String day) throws ParseException {
		day +="  00:00:00";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date startDate = sdf.parse(day);
		long startTime = startDate.getTime();
		return startTime;
	}
	
	/**
	 * 获取给定日期的结束时间
	 * @param day
	 * @return
	 * @throws ParseException
	 */
	public static long endByTime(String day) throws ParseException {
		day += "  23:59:59";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date endDate = sdf.parse(day);
		long endTime = endDate.getTime();
		return endTime;
	}
	
	/**
	 * 
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static Timestamp parseToTimestamp(String datetime,String pattern){
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		try {
			Date date = sdf.parse(datetime);
			if(date != null){
				return new Timestamp(date.getTime());
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String nextDayString(String day) throws ParseException{
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
		Date theDate = sdf2.parse(day);
		
		//endDate.setDate(endDate.getDate() + 1);
		long nu = theDate.getTime();
		nu = nu +  86400000; //24*60*60*1000
		theDate.setTime(nu);
		return Date2DayStr(theDate);
	}
	
}
