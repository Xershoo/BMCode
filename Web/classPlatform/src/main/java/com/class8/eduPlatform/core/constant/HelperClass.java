package com.class8.eduPlatform.core.constant;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class HelperClass {

	//y-m-d h:m:s
	public static String time22String(int seconds) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String outputString = format.format(new Date(1000L * seconds));
		return outputString;
		/*Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue() * 1000;
		c.setTimeInMillis(millions);
		 String year=String.valueOf(c.get(Calendar.YEAR));
		   String month=String.valueOf(c.get(Calendar.MONTH)+1);
		   String day=String.valueOf(c.get(Calendar.DAY_OF_MONTH));
		   String hour=String.valueOf(c.get(Calendar.HOUR_OF_DAY));
		   String min=String.valueOf(c.get(Calendar.MINUTE));
		   String second = String.valueOf(c.get(Calendar.SECOND));
		String output =year+ "-" + month + "-" + day+" "+hour+":"+min+":" + second;
		return output;*/
	}
	
	//年月日 点分
	public static String time22String_only_min(int seconds) {
		Calendar c = Calendar.getInstance();
		long millions = new Long(seconds).longValue() * 1000;
		c.setTimeInMillis(millions);
		 String year=String.valueOf(c.get(Calendar.YEAR));
		   String month=String.valueOf(c.get(Calendar.MONTH)+1);
		   String day=String.valueOf(c.get(Calendar.DAY_OF_MONTH));
		   String hour=String.valueOf(c.get(Calendar.HOUR_OF_DAY));
		   String min=String.valueOf(c.get(Calendar.MINUTE));
		String output =year+ "年" + month + "月" + day+"日"+hour+"点"+min+"分";
		return output;
	}
	
	//比如两个时间是否为同一天，返回值  0 表示同一天， -1 time1是前一天或者前几天, 1 time2是前一天或者前几天
	public static int notTheSameDay(int time1, int time2)
	{
		if(time1 == time2)
			return 0;
		Calendar c1 = Calendar.getInstance();
		long millions = new Long(time1).longValue() * 1000;
		c1.setTimeInMillis(millions);
		
		Calendar c2 = Calendar.getInstance();
		millions = new Long(time2).longValue() * 1000;
		c2.setTimeInMillis(millions);
		
		if(c1.get(Calendar.DAY_OF_MONTH) != c2.get(Calendar.DAY_OF_MONTH) 
			|| c1.get(Calendar.MONTH) != c2.get(Calendar.MONTH)
			|| c1.get(Calendar.YEAR) != c2.get(Calendar.YEAR) )
		{
			if(time1 < time2)
				return -1;
			else {
				return 1;
			}
		}
		
		return 0;
	}
}
