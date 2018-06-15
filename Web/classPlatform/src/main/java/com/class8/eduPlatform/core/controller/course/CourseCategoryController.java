package com.class8.eduPlatform.core.controller.course;

import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.eduPlatform.core.service.ICourseCategoryService;

@Controller
@RequestMapping("/category")
public class CourseCategoryController {
	
	@Autowired
	private ICourseCategoryService courseCategoryService;
	
	@RequestMapping(value="/list")
	@ResponseBody
	public String listCourseCategory(){
		List<Map<String,Object>> data = courseCategoryService.listCourseCategoryTree();
		return JSONArray.fromObject(data).toString();
	}
	
}
