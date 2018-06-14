package com.class8.eduPlatform.common.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class CommonUtil {
	
	private static final String ALLCHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	/**
	 * 获取指定长度的随机字符串
	 * @param length
	 * @return
	 */
	public static String randomStr(int length){
		String str = "";
		for (int i = 0; i < length; i++) {
			Random rd = new Random();
			str += ALLCHAR.charAt(rd.nextInt(ALLCHAR.length() - 1));
		}
		return str;
	}
	
	/**
	 * 通过反射设置对象属性的可见性
	 * @param o
	 * @throws Exception
	 */
	public static void reflect(Object o) throws Exception {
        Class<?> cls = o.getClass();
        Field[] fields = cls.getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            Field f = fields[i];
            f.setAccessible(true);
        }
    }
	
	/**
	 * 从输入流中读取数据到字节数据
	 * @param in
	 * @return
	 * @throws IOException
	 */
    public static byte[] readInput(InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        int len = 0;
        byte[] buffer = new byte[1024];
        while ((len = in.read(buffer)) > 0) {
            out.write(buffer, 0, len);
        }
        out.close();
        in.close();
        return out.toByteArray();
    }
    
    /**
     * 从输入流中读取数据转化为字符串
     * @param is
     * @return
     * @throws IOException
     */
    public static String inputStreamToStr(InputStream is) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int i;
        while ((i = is.read()) != -1) {
            baos.write(i);
        }
        return baos.toString();
    }
    
    /**
     * 将对象转化为map
     * @param o
     * @return
     */
    public static Map<String,Object> getMapFromObject(Object o){
    	 Map<String,Object> map = new HashMap<String, Object>();
         Field[] fields = o.getClass().getDeclaredFields();
         for (Field field : fields) {
             Object obj;
             try {
                 obj = field.get(o);
                 if(obj!=null){
                     map.put(field.getName(), obj);
                 }
             } catch (IllegalArgumentException e) {
                 e.printStackTrace();
             } catch (IllegalAccessException e) {
                 e.printStackTrace();
             }
         }
         return map;
    }
    
    /**
     * 将xml转化为Map
     * @param xml
     * @return
     * @throws ParserConfigurationException
     * @throws SAXException
     * @throws IOException
     */
    public static Map<String,Object> getMapFromXML(String xml) throws ParserConfigurationException, SAXException, IOException {
    	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        InputStream is =  getStringStream(xml);
        Document document = builder.parse(is);
        NodeList allNodes = document.getFirstChild().getChildNodes();
        Node node;
        Map<String, Object> map = new HashMap<String, Object>();
        int i=0;
        while (i < allNodes.getLength()) {
            node = allNodes.item(i);
            if(node instanceof Element){
                map.put(node.getNodeName(),node.getTextContent());
            }
            i++;
        }
        return map;
    }

    public static InputStream getStringStream(String sInputString) {
        ByteArrayInputStream tInputStringStream = null;
        if (sInputString != null && !sInputString.trim().equals("")) {
            tInputStringStream = new ByteArrayInputStream(sInputString.getBytes());
        }
        return tInputStringStream;
    }
    
    /**
     * 将map中的数据构建成xml字符串(去掉值为空的数据)
     * @param map
     * @return
     */
    public static String getXMLFromMap(Map<String,Object> map){
    	StringBuffer buffer = new StringBuffer("");
    	buffer.append("<xml>");
    	Iterator<Entry<String,Object>> iterator = map.entrySet().iterator();
    	while (iterator.hasNext()) {
			Entry<String,Object> entry = iterator.next();
			if(entry.getValue() != null && entry.getValue() != ""){
				buffer.append("<").append(entry.getKey()).append(">").append(entry.getValue()).append("</").append(entry.getKey()).append(">");
			}
		}
    	return buffer.toString();
    }
   
    /**
     * 从map中获取字符串类型的值,可以提供默认值
     * @param map
     * @param key
     * @param defaultValue
     * @return
     */
    public static String getStringFromMap(Map<String, Object> map, String key, String defaultValue) {
        if (key == "" || key == null) {
            return defaultValue;
        }
        String result = (String) map.get(key);
        if (result == null) {
            return defaultValue;
        } else {
            return result;
        }
    }
    
    /**
     * 从map中获取int值
     * @param map
     * @param key
     * @return
     */
    public static int getIntFromMap(Map<String, Object> map, String key) {
        if (key == "" || key == null) {
            return 0;
        }
        if (map.get(key) == null) {
            return 0;
        }
        return Integer.parseInt((String) map.get(key));
    }
	
    public static int getFile(MultipartFile imgFile, String imageSavePath){
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
	
    public static String getIpAddr(HttpServletRequest request) {  
        String ip = request.getHeader("x-forwarded-for");  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("Proxy-Client-IP");  
        }  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("WL-Proxy-Client-IP");  
        }  
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getRemoteAddr();  
        }  
        return ip;  
}  
}
