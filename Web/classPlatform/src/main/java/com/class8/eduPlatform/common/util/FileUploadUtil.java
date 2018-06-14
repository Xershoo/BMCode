package com.class8.eduPlatform.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Map;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
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
import org.springframework.web.multipart.MultipartFile;

import com.class8.eduPlatform.core.constant.SystemConfigs;

public class FileUploadUtil {
	
	public static String checkUploadFile(MultipartFile file){
		String message = null;
		if(file.isEmpty()){
			message = "请选择上传文件!";
			return message;
		}
		String fileName = file.getOriginalFilename();
		String imageExt = StringUtils.substringAfterLast(fileName, ".").toLowerCase();
		String[] allowImageExtArr = SystemConfigs.allowImageExt.split(",");
		if(!ArrayUtils.contains(allowImageExtArr, imageExt)){
			message = "只允许上传图片文件类型: " + SystemConfigs.allowImageExt + "!";
			return message;
		}
		if(file.getSize()>SystemConfigs.imageSizeLimit){
			message = "文件大小超出限制!";
			return message;
		}
		return message;
	}
	
	public static String upfile(String postUrl, Map<String, String> params, Map<String, File> files) throws ClientProtocolException, IOException {
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
                    FileBody body = new FileBody(files.get(key));
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
 
    public static String getFileMD5(File file) {
	    if (!file.isFile()){
	      return null;
	    }
	    MessageDigest digest = null;
	    FileInputStream in=null;
	    byte buffer[] = new byte[1024];
	    int len;
	    try {
	      digest = MessageDigest.getInstance("MD5");
	      in = new FileInputStream(file);
	      while ((len = in.read(buffer, 0, 1024)) != -1) {
	        digest.update(buffer, 0, len);
	      }
	      in.close();
	    } catch (Exception e) {
	      return null;
	    }
	    BigInteger bigInt = new BigInteger(1, digest.digest());
	    String strReturnString = bigInt.toString(16);
	    strReturnString = strReturnString.toUpperCase();
	    return strReturnString;
    }
    
    public static String rename(String postUrl,Map<String,String> params) {
    	CloseableHttpResponse response = null;
        InputStream is = null;
        String results = null;
        HttpClient httpclient = new HttpClient();
        PostMethod postMethod = new PostMethod(postUrl);
        if(params != null && params.size()>0){
        	for (String key : params.keySet()) {
        		  NameValuePair nameValuePair = new NameValuePair(key, params.get(key));
        		  postMethod.addParameter(nameValuePair);
			}
          }
        try {
        	httpclient.executeMethod(postMethod);
			if  (postMethod.getStatusCode() == HttpStatus.SC_OK) {   
				  is = postMethod.getResponseBodyAsStream();
				  StringWriter writer = new StringWriter();
			      IOUtils.copy(is, writer, "UTF-8");
			      results = writer.toString();
			  }
			} catch (HttpException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}   finally {
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
		}
        return results;
    }
 
}
