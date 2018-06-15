package com.class8.eduPlatform.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

/**
 * 录播工具类
 * @author Administrator
 *
 */
public class RecordUtil {
	
	private static final String ACTION_TYPE = "12";
	private static final String PREFIX_REGEX = "http://\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}";
	
	/**
	 * 获取录像数据的url地址
	 * @param recordUrl 录像xml地址
	 * @return
	 * @throws IOException 
	 * @throws DocumentException 
	 */
	public static List<String> getRecordDataUrls(String recordUrl) throws IOException, DocumentException{
		if(recordUrl == null){
			return null;
		}
		StringBuffer xmlString = new StringBuffer();
		BufferedReader reader = null;
		try {
			URL url = new URL(recordUrl);
			URLConnection urlConnection = url.openConnection();
			reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
			String line = null;
			while((line = reader.readLine()) != null){
				xmlString.append(line);
			}
		} finally {
			if(reader != null){
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		if(xmlString.length() < 1){
			return null;
		}
		List<String> recordDataUrls = null;
		Document document = DocumentHelper.parseText(xmlString.toString());
		Element rootElement = document.getRootElement();
		List<Element> eventElements = rootElement.elements("Event");
		if(eventElements != null){
			recordDataUrls = new ArrayList<String>(); 
			String prefix = "";
			Pattern pattern = Pattern.compile(PREFIX_REGEX);
			Matcher matcher = pattern.matcher(recordUrl);
			if(matcher.find()){
				prefix = matcher.group();
			}
			for (Element eventElement : eventElements) {
				String actionType = eventElement.attributeValue("action_type");
				String eventDatauri = eventElement.attributeValue("event_datauri");
				if(ACTION_TYPE.equals(actionType)){
					recordDataUrls.add(prefix + eventDatauri);
				}
			}
		}
		return recordDataUrls;
	}
	
	public static void main(String[] args) {
		try {
			List<String> dataUrls = getRecordDataUrls("http://221.228.195.60/export/Storage/46051/46086/2016_6_3_10/Index_46051_2016_6_3_10.xml");
			System.out.println(dataUrls);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
//        Pattern p=Pattern.compile("http://\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");
//        String str="http://10.150.1.5/names.nsf/http://10.150.1.20/ab.jsp";
//        Matcher m=p.matcher(str);
//        while(m.find()){
//        	System.out.println("你要的结果："+m.group());
//        }
	}
}
