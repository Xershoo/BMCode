
package com.class8.eduPlatform.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConfigLoader {
	
	private static final String ENV_CONFIG_HOME_KEY = "PWRD_CONFIG_HOME";
	private static final String VARIABLE_PATTERN = "\\$[a-zA-Z_0-9]+"; 
	private static final Pattern pattern = Pattern.compile(VARIABLE_PATTERN, Pattern.CASE_INSENSITIVE);
	
	/**
	 * 获取当前app的配置文件所在目录，如果目录不存在或未设置环境变量，返回null
	 * 请确保ConfigConstants.configDirName已设置了正确的值
	 */
	public static File getAppConfigDir(){
		String configDirName = ConfigConstants.configDirName;
		try{
			//String appName = getAppName();
			File rootDir = getSNSConfigHome();
			if (rootDir == null || configDirName == null)
				return null;
			String configDirPath = rootDir.getAbsolutePath() + File.separatorChar + configDirName;
			File configDir = new File(configDirPath);
			if (!configDir.exists() || !configDir.isDirectory()){
				System.out.println("***** App config dir not exist: " + configDirPath);
				return null;
			}
			return configDir;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 读取配置文件，如果文件不存在或未设置环境变量，返回null
	 * 请确保ConfigConstants.configDirName已设置了正确的值
	 * 例如：loadProperties("systemurl.properties")
	 * @param fileName 配置文件的文件名
	 */
	public static Properties loadProperties(String fileName){
		File dir = getAppConfigDir();
		if (dir == null)
			return null;
		String filePath = dir.getAbsolutePath() + File.separatorChar + fileName;
		File file = new File(filePath);
		if (!file.exists() || file.isDirectory()){
			System.out.println("***** App config file not exist: " + filePath);
			return null;
		}
		Properties prop = loadCommonProperties();
		Properties result = new Properties();
		try {
			prop.load(new FileInputStream(file));
			result.load(new FileInputStream(file));
		} catch (Exception e) {
			e.printStackTrace();
		}
		replaceVariable(prop);
		for (Object key: result.keySet())
			result.setProperty((String) key, prop.getProperty((String) key));
		return result;
	}
	
	/**
	 * 获取当前App的名称
	 */
	public static String getAppName(){
		try {
			String cpath = ConfigLoader.class.getResource("/").getPath();
			cpath = URLDecoder.decode(cpath, "UTF-8");
			int end = cpath.indexOf("/WEB-INF");
			if (end > 0){
				cpath = cpath.substring(0, end);
				int start = cpath.lastIndexOf("/");
				if (start > 0)
					cpath = cpath.substring(start + 1);
				return cpath;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		System.out.println("***** Connot parse AppName, report to the developer!");
		return null;
	}
	
	/**
	 * 根据环境变量获取配置文件根目录
	 */
	public static File getSNSConfigHome(){
		String configHomePath = System.getenv(ENV_CONFIG_HOME_KEY);
		if (configHomePath == null){
			System.out.println("***** System env not set: configEnvKey=" + ENV_CONFIG_HOME_KEY + ", configEnvVal=" + configHomePath);
			return null;
		}
		File configHomeDir = new File(configHomePath);
		if (!configHomeDir.exists() || !configHomeDir.isDirectory()){
			System.out.println("***** Config Home Dir not found: configEnvKey=" + ENV_CONFIG_HOME_KEY + ", configEnvVal=" + configHomePath);
			return null;
		}
		return configHomeDir;
	}
	
	/**
	 * 加载配置根目录下的公共属性和变量
	 * 支持使用$符号定义变量 
	 */
	public static Properties loadCommonProperties(){
		File dir = getSNSConfigHome();
		Properties prop = new Properties();
		if (dir == null)
			return null;
		for (File file : dir.listFiles()){
			if (file.isDirectory() || !file.getName().startsWith("common"))
				continue;
			try{
				prop.load(new FileInputStream(file));
			}catch(Exception e){
				e.printStackTrace();
				System.out.println("***** Cannot load properties from: " + file.getAbsolutePath());
			}
		}
		replaceVariable(prop);
		return prop;
	}
	
	/**
	 * 替换所有带有$符号的变量
	 */
	public static void replaceVariable(Properties prop){
		boolean isContinue;
		do {
			isContinue = false;
			for (Entry<Object,Object> entry : prop.entrySet()){
				String key = String.valueOf(entry.getKey());
				String value = String.valueOf(entry.getValue());
				key = key.trim();
				value = value.trim();
				Matcher match = pattern.matcher(String.valueOf(value));
				boolean find = false;
				StringBuffer sb = new StringBuffer();
				while(match.find()){
					find = true;
					String variable = match.group().substring(1);
					String replace = String.valueOf(prop.get(variable));
					if (replace == null){
						System.out.println("***** Cannot find variable defination: $" + variable);
						return;
					}else{
						match.appendReplacement(sb, replace);
					}
				}
				if (find){
					match.appendTail(sb);
					prop.setProperty(key, sb.toString());
					isContinue = true;
				}
			}
		}while(isContinue);
	}
	
	public static void main(String[] args){
		
		
		
//		System.out.println(ConfigLoader.getSNSConfigHome());
//		System.out.println(ConfigLoader.getAppName());
//		System.out.println(ConfigLoader.getAppConfigDir());
//		System.out.println(ConfigLoader.loadCommonProperties());
//		
//		Properties prop = ConfigLoader.loadProperties("systemurl.properties");
//		
//		System.out.println(prop);
	}
}
