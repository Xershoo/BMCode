package com.class8.eduPlatform.common.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.JSONUtils;

public class JSONUtil {
	/**
     * 从一个JSON 对象字符格式中得到一个java对象
     *
     * @param jsonString
     * @param pojoCalss
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T jsonToObject(String jsonString, Class<T> pojoCalss) {
        Object pojo;
        JSONObject jsonObject = JSONObject.fromObject(jsonString);
        pojo = JSONObject.toBean(jsonObject, pojoCalss);
        return (T) pojo;
    }
 
    /**
     * json字符串转换成集合
     *
     * @param jsonString
     * @param pojoClass
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> List<T> jsonToList(String jsonString, Class<T> pojoClass) {
        JSONArray jsonArray = JSONArray.fromObject(jsonString);
        JSONObject jsonObject;
        Object pojoValue;
        List<T> list = new ArrayList<T>();
        for (int i = 0; i < jsonArray.size(); i++) {
            jsonObject = jsonArray.getJSONObject(i);
            pojoValue = JSONObject.toBean(jsonObject, pojoClass);
            list.add((T) pojoValue);
        }
        return list;
    }
 
    /**
     * json字符串转换成集合
     *
     * @param jsonString
     * @param pojoClass
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> List<T> jsonToList(String jsonString, Class<T> pojoClass, String datePattern) {
        JsonConfig jsonConfig = configJson(datePattern);
        JSONArray jsonArray = JSONArray.fromObject(jsonString, jsonConfig);
        JSONObject jsonObject;
        Object pojoValue;
        List<T> list = new ArrayList<T>();
        for (int i = 0; i < jsonArray.size(); i++) {
            jsonObject = jsonArray.getJSONObject(i);
            pojoValue = JSONObject.toBean(jsonObject, pojoClass);
            list.add((T) pojoValue);
        }
        return list;
    }
 
    /**
     * 将java对象转换成json字符串
     *
     * @param javaObj
     * @return
     */
    public static String objectToJson(Object javaObj) {
        JSONObject json;
        json = JSONObject.fromObject(javaObj);
        return json.toString();
    }
 
    /**
     * 将java对象转换成json字符串,并设定日期格式
     *
     * @param javaObj
     *            要转换的java对象
     * @param dataFormat
     *            制定的日期格式
     * @return
     */
    public static String objectToJson(Object javaObj, String datePattern) {
        JSONObject json;
        JsonConfig jsonConfig = configJson(datePattern);
        json = JSONObject.fromObject(javaObj, jsonConfig);
        return json.toString();
 
    }
 
    /**
     * list变成json
     *
     * @param list
     * @return
     */
    public static <T> String listToJson(List<T> list) {
        JSONArray json;
        json = JSONArray.fromObject(list);
        return json.toString();
    }
 
    /**
     * list变成json
     *
     * @param list
     * @return
     */
    public static <T> String listToJson(List<T> list, String datePattern) {
        JSONArray json;
        JsonConfig jsonConfig = configJson(datePattern);
        json = JSONArray.fromObject(list, jsonConfig);
        return json.toString();
    }
 
    /**
     * JSON 时间解析器
     *
     * @param datePattern
     * @return
     */
    public static JsonConfig configJson(final String datePattern) {
 
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] { datePattern }));
 
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.setIgnoreDefaultExcludes(false);
        jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonValueProcessor() {
 
            @Override
            public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
                if (value instanceof Date) {
                    String str = new SimpleDateFormat(datePattern).format(new Date(((Timestamp) value).getTime()));
                    return str;
                }
                return value == null ? null : value.toString();
            }
 
            @Override
            public Object processArrayValue(Object value, JsonConfig jsonConfig) {
                String[] obj = {};
                if (value instanceof Timestamp[]) {
                    SimpleDateFormat sf = new SimpleDateFormat(datePattern);
                    Timestamp[] dates = (Timestamp[]) value;
                    obj = new String[dates.length];
                    for (int i = 0; i < dates.length; i++) {
                        obj[i] = sf.format(new Date(dates[i].getTime()));
                    }
                }
                return obj;
            }
        });
        return jsonConfig;
    }
    
}
