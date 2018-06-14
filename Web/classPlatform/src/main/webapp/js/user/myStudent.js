/**
 * student of teacher javascript source file
 */

var studentInCount = 0;
var studentOutCount = 0;

$(function(){
	ajaxGetCollegeList();
	ajaxGetMenu1DataCount();
	
	$("#in_student").on("click", function(){
		$("#search_student_name2").val("");
		$("#search_student_status2").val("-1");
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","0px");
		$("#out_student").removeClass("four_word");
		
		$("#menu2_data_list .data_info").remove();
		ajaxGetMenu1DataCount();
		
		$("#menu1_data_list").show();
		$("#menu2_data_list").hide();
	});
	
	$("#out_student").on("click", function(){
		$("#studentName").val("");
		$("#studentId").val("");
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","1px solid #e5e5e5");
		$("#in_student").removeClass("four_word");
		
		$("#menu1_data_list .data_info").remove();
		ajaxGetMenu2DataCount();
		
		$("#menu1_data_list").hide();
		$("#menu2_data_list").show();
	});
	
	$("#inStuSearch").on("click", function(){
		ajaxGetMenu1DataCount();
	});
	$("#outStuSearch").on("click", function(){
		ajaxGetMenu2DataCount();
	});
	
	$("#college").on("change", function(){
		ajaxGetMajorList();
	});
	$("#majar").on("change", function(){
		ajaxGetClassList();
	});
});

/**
 * 获取校内学生数据
 */
function ajaxGetMenu1DataCount(){
	var studentName = $.trim($("#studentName").val());
	var studentId = $.trim($("#studentId").val());
	var collegeId = $("#college").val();
	var majarId = $("#majar").val();
	var className = $("#className").val();
	var param;
	if(collegeId == "-1"){
		param = {"type":1, "studentName":studentName, "studentId":studentId};
	}else{
		if(majarId == "-1"){
			param = {"type":1, "studentName":studentName, "studentId":studentId, "collegeId":collegeId};
		}else{
			if(className == "-1"){
				param = {"type":1, "studentName":studentName, "studentId":studentId, "collegeId":collegeId, "majarId":majarId};
			}else{
				param = {"type":1, "studentName":studentName, "studentId":studentId, "collegeId":collegeId, "majarId":majarId, "className":className};
			}
		}
	} 
	
	$.ajax({
		url:getRootPath() + '/teacher/listStudents',
		type:'post',
		dataType:'json',
		data:param,
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "查询我的学生出错!");
			}else if(result == 0){
				studentInCount = data.result.total;
				ajaxShowMenu1Data(studentName, studentId, collegeId, majarId, className);
			}
		}
	});
}

/**
 * 获取校内学生数据，分页查询
 */
function ajaxShowMenu1Data(studentName, studentId, collegeId, majarId, className){
	if(studentInCount == 0){
		$(".page").remove();
		$("#menu1_data_list .data_info").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有学生</div>");
		return;
	}
	var param;
	if(collegeId == "-1"){
		param = {"type":1, "page":1, "pageSize":5, "studentName":studentName, "studentId":studentId};
	}else{
		if(majarId == "-1"){
			param = {"type":1, "page":1, "pageSize":5, "studentName":studentName, "studentId":studentId, "collegeId":collegeId};
		}else{
			if(className == "-1"){
				param = {"type":1, "page":1, "pageSize":5, "studentName":studentName, "studentId":studentId, "collegeId":collegeId, "majarId":majarId};
			}else{
				param = {"type":1, "page":1, "pageSize":5, "studentName":studentName, "studentId":studentId, "collegeId":collegeId, "majarId":majarId, "className":className};
			}
		}
	} 
	var pageNum = Math.ceil(studentInCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/teacher/listStudents',
			type:'post',
			dataType:'json',
			data: param,
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu1_data_list .data_info").remove();
				if(status == -1){
					$(".page").remove();
					$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >查找学生失败</div>");
				}else if(status == 0){
						if(data.result.total == 0){
							$(".page").remove();
							$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有学生</div>");
						}else{
							var jsonObj = data.result.list;
							$.each(jsonObj, function (i, item) {  
								 var html = '<div class="data_info">'
				            	  		html += '<div class="info_name in_stu_width">';
								 		if(item.avatarUrl == null || item.avatarUrl == ''){
								 			if(item.sex == 1){
								 				html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/boy_student.png"></div>';
								 			}else{
								 				html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/girl_student.png"></div>';
								 			}
								 		}else{
								 			html += '<div class="teacher_logo"><img class="headImg" src="'+item.avatarUrl+'"></div>';	
								 		}
				            	  		
				            	  		html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>';
								 if(item.description.length > 19){
									 html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;" title="'+item.description+'">'+item.description.substring(0, 19)+'...</div>';
								 }else{
									 html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;">'+item.description+'</div>';
								 }
				            	  		html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;">'
				            	  		+ '<div class="letter_opt">'
				            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
				            	  		+ '<div class="desc_word" onClick="privateChat('+item.userid+',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
				            	  		+ '</div>'
				            	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
				            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
				            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
				            	  		+ '</div>'
				            	  		+ '</div>'
				            	  		+ '</div>';
				            	 if(item.college != null && item.college != "" && item.college.length > 10){
				            		 html += '<div class="menu2_data_common in_college_width" title="'+item.college+'">'+item.college.substring(0,9)+'...</div>';
				            	 }else{
				            		 html += '<div class="menu2_data_common in_college_width">'+item.college+'</div>';
				            	 }
				            	 if(item.major != null && item.major != "" && item.major.length > 10){
				            		 html += '<div class="menu2_data_common in_major_width" title="'+item.major+'">'+item.major.substring(0,9)+'...</div>';
				            	 }else{
				            		 html += '<div class="menu2_data_common in_major_width">'+item.major+'</div>';
				            	 }
				            	 if(item.classname != null && item.classname != "" && item.classname.length > 10){
				            		 html += '<div class="menu2_data_common in_classname_width" title="'+item.classname+'">'+item.classname.substring(0,9)+'...</div>';
				            	 }else{
				            		 html += '<div class="menu2_data_common in_classname_width">'+item.classname+'</div>';
				            	 }
				            	  	
				            	  		html += '<div class="menu2_data_common in_classid_width">'+item.studentid+'</div>';	
								 if(item.sex == 1){
					           	   		html += '<div class="menu2_data_common in_sex_width">男</div>';
					              }else{
					            	  	html += '<div class="menu2_data_common in_sex_width">女</div>';
					              }
				            	  		html += '</div>';
					            	  		
					              $("#menu1_data_list").append(html);
					        });
						}
				}
			}
		});
	}else{
		
		$("#menu1_data_list").after('<div id="menu1Page" class="page"></div>');
		
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
		var param;
		if(collegeId == "-1"){
			param = {on:true, page:1, start:1,pageSize:5,type:1, studentName:studentName, studentId:studentId};
		}else{
			if(majarId == "-1"){
				param = {on:true, page:1, start:1,pageSize:5,type:1, studentName:studentName, studentId:studentId, collegeId:collegeId};
			}else{
				if(className == "-1"){
					param = {on:true, page:1, start:1,pageSize:5,type:1, studentName:studentName, studentId:studentId, collegeId:collegeId, majarId:majarId};
				}else{
					param = {on:true, page:1, start:1,pageSize:5,type:1, studentName:studentName, studentId:studentId, collegeId:collegeId, majarId:majarId, className:className};
				}
			}
		} 
		
	    $("#menu1Page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackMenu1Data',
	    		url:getRootPath()+'/teacher/listStudents',
	    		dataType: "json",
	    		cache:false,
	    		param:param
	    	}
	    });
	}
}

/**
 * 校内学生分页回调函数
 * @param data
 */
function callBackMenu1Data(data){
	var result = eval("("+data+")");
	var status = parseInt(result.status);
	$("#menu1_data_list .data_info").remove();
	/*if(status == -1){
		alert("登录已超时，请重新登录");
		location.href = getRootPath() + "/index";
	}else if(status == -2){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no student in school</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}*/
	if(studentInCount == 0){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有学生</div>");
	}else{
		var jsonObj = result.result.list;
		$.each(jsonObj, function (i, item) {  
			var html = '<div class="data_info">'
				html += '<div class="info_name in_stu_width">';
	 				if(item.avatarUrl == null || item.avatarUrl == ''){
	 					if(item.sex == 1){
	 						html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/boy_student.png"></div>';
	 					}else{
	 						html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/girl_student.png"></div>';
	 					}
	 				}else{
	 					html += '<div class="teacher_logo"><img class="headImg" src="'+item.avatarUrl+'"></div>';	
	 				}
	 				html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>';
		 if(item.description.length > 19){
			 html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;" title="'+item.description+'">'+item.description.substring(0, 19)+'...</div>';
		 }else{
			 html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;">'+item.description+'</div>';
		 }
    	  		html += '<div class="teacher_name_word in_stu_desc_width" style="margin-top:2px;">'
    	  		+ '<div class="letter_opt">'
    	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
    	  		+ '<div class="desc_word" onClick="privateChat('+item.userid+',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
    	  		+ '</div>'
    	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
    	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
    	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
    	  		+ '</div>'
    	  		+ '</div>'
    	  		+ '</div>'
    	  		if(item.college != null && item.college != "" && item.college.length > 10){
	           		 html += '<div class="menu2_data_common in_college_width" title="'+item.college+'">'+item.college.substring(0,9)+'...</div>';
	           	 }else{
	           		 html += '<div class="menu2_data_common in_college_width">'+item.college+'</div>';
	           	 }
	           	 if(item.major != null && item.major != "" && item.major.length > 10){
	           		 html += '<div class="menu2_data_common in_major_width" title="'+item.major+'">'+item.major.substring(0,9)+'...</div>';
	           	 }else{
	           		 html += '<div class="menu2_data_common in_major_width">'+item.major+'</div>';
	           	 }
	           	 if(item.classname != null && item.classname != "" && item.classname.length > 10){
	           		 html += '<div class="menu2_data_common in_classname_width" title="'+item.classname+'">'+item.classname.substring(0,9)+'...</div>';
	           	 }else{
	           		 html += '<div class="menu2_data_common in_classname_width">'+item.classname+'</div>';
	           	 }
           	  	
           	  		html += '<div class="menu2_data_common in_classid_width">'+item.studentid+'</div>';	
		 if(item.sex == 1){
       	   		html += '<div class="menu2_data_common in_sex_width">男</div>';
          }else{
        	  	html += '<div class="menu2_data_common in_sex_width">女</div>';
          }
    	  		html += '</div>';
            	  		
              $("#menu1_data_list").append(html);
        });
	}
}

/**
 * 获取校外学生总数
 */
function ajaxGetMenu2DataCount(){
	var searchKey = $.trim($("#search_student_name2").val());
	var status = $("#search_student_status2").val();
	$.ajax({
		url:getRootPath() + '/teacher/listStudents',
		type:'post',
		dataType:'json',
		data:{"type":2, "searchKey":searchKey, "status":status},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "查询校外学生出错!");
			}else if(result == 0){
				studentOutCount = data.result.total;
				ajaxShowMenu2Data(searchKey, status);	
			}
		}
	});
}

/**
 * 获取校外学生数据，分页查询
 */
function ajaxShowMenu2Data(searchKey, status){
	var pageNum = Math.ceil(studentOutCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/teacher/listStudents',
			type:'post',
			dataType:'json',
			data: {"type":2, "page":1, "pageSize":5, "searchKey":searchKey, "status":status},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu2_data_list .data_info").remove();
				/*if(status == -1){
					alert("登录已超时，请重新登录");
					location.href = getRootPath() + "/index";
				}else if(status == -2){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no student</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
				}*/
				if(studentOutCount == 0){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no student</div>");
				}else{
					var jsonObj = data.result.list;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div class="data_info">'
			            	  		+ '<div class="info_name stu_width_new">'
			            	  		+ '<div class="teacher_logo"><img class="headImg" src="'+item.avatarUrl+'"></div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'+item.description+'</div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'
			            	  		+ '<div class="letter_opt">'
			            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
			            	  		+ '<div class="desc_word" onClick="privateChat('+item.userid+',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
			            	  		+ '</div>'
			            	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
			            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
			            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
			            	  		+ '</div>'
			            	  		+ '</div>'
			            	  		+ '</div>'
			            	  		+ '<div class="menu2_data_common out_buyCourses_width">'+item.buyCourses+'</div>'
			            	  		+ '<div class="menu2_data_common out_buyPrices_width">￥'+item.buyPrices+'</div>'
			            	  		+ '<div class="menu2_data_common out_lastBuyDate_width">'+item.lastBuyDate+'</div>';
			              if(item.lastInclassDate == null || item.lastInclassDate == ""){
			            	  html += '<div id="out_last_class_time" class="menu2_data_common"></div>';
			              }else{
			            	  html += '<div id="out_last_class_time" class="menu2_data_common">'+item.lastInclassDate+'</div>';
			              }
			            	  		
			              	   html += '<div id="out_student_opt2" class="menu2_data_common"></div>'
			            	  		+ '</div>';
			            	  		
			              $("#menu2_data_list").append(html);
			        });
				}
			}
		});
	}else{
		
		$("#menu2_data_list").after('<div id="menu2Page" class="page"></div>');
		
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#menu2Page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackMenu2Data',
	    		url:getRootPath()+'/teacher/listStudents',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,pageSize:5,type:1, searchKey:searchKey, status:status}
	    	}
	    });
	}
}

/**
 * 校外学生分页回调函数
 * @param data
 */
function callBackMenu2Data(data){
	var result = eval("("+data+")");
	//var status = parseInt(result.status);
	$("#menu2_data_list .data_info").remove();
	/*if(status == -1){
		alert("登录已超时，请重新登录");
		location.href = getRootPath() + "/index";
	}else if(status == -2){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no student</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}*/
	if(studentOutCount == 0){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no student</div>");
	}else{
		var jsonObj = result.result.list;
		$.each(jsonObj, function (i, item) {  
              var html = '<div class="data_info">'
            	  		+ '<div class="info_name stu_width_new">'
            	  		+ '<div class="teacher_logo"><img class="headImg" src="'+item.avatarUrl+'"></div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'+item.description+'</div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'
            	  		+ '<div class="letter_opt">'
            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
            	  		+ '<div class="desc_word" onClick="privateChat('+item.userid+',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
            	  		+ '</div>'
            	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
            	  		+ '</div>'
            	  		+ '</div>'
            	  		+ '</div>'
            	  		+ '<div class="menu2_data_common out_buyCourses_width">'+item.buyCourses+'</div>'
            	  		+ '<div class="menu2_data_common out_buyPrices_width">￥'+item.buyPrices+'</div>'
            	  		+ '<div class="menu2_data_common out_lastBuyDate_width">'+item.lastBuyDate+'</div>';
              if(item.lastInclassDate == null || item.lastInclassDate == ""){
            	  html += '<div id="out_last_class_time" class="menu2_data_common"></div>';
              }else{
            	  html += '<div id="out_last_class_time" class="menu2_data_common">'+item.lastInclassDate+'</div>';
              }
            	  		
              	   html += '<div id="out_student_opt2" class="menu2_data_common"></div>'
            	  		+ '</div>';
            	  		
              $("#menu2_data_list").append(html);
        });
	}
}

function goTechHomePage(userId){
	 location.href=getRootPath() + "/infocenter/student/"+userId;
}

function privateChat(uid,realname,nickname){
	 location.href=getRootPath() + "/message/message?type=5&uid="+uid+"&realname="+encodeURI(encodeURI(realname))+"&nickname="+encodeURI(encodeURI(nickname));
}

/**
 * 获取当前老师所在学校的所有学院列表
 */
function ajaxGetCollegeList(){
	var url = getRootPath() + "/getcollegelist";
	$.ajax({
		url:url,
		dataType:'json',
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var list = data.college;
				var html = '<option value="-1">请选择院系</option>';
				$.each(list, function(i, item){
					html += '<option value="'+item.collegeId+'">'+item.collegeName+'</option>'
				});
				$("#college").html(html);
			}
		}
	});
}

/**
 * 获取当前老师所选学员的所有专业列表
 */
function ajaxGetMajorList(){
	var collegeId = $("#college").val();
	if(collegeId == -1){
		$("#majar").html('<option value="-1">请选择专业</option>');
		$("#className").html('<option value="-1">请选择班级</option>');
		return;
	}
	var url = getRootPath() + "/getmajorlist";
	$.ajax({
		url:url,
		dataType:'json',
		data:{"collegeid":collegeId},
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var list = data.major;
				var html = '<option value="-1">请选择专业</option>';
				$.each(list, function(i, item){
					html += '<option value="'+item.majorId+'">'+item.majorName+'</option>'
				});
				$("#majar").html(html);
			}
		}
	});
}

/**
 * 获取当前老师所选专业的所有班级列表
 */
function ajaxGetClassList(){
	var majarId = $("#majar").val();
	if(majarId == -1){
		$("#className").html('<option value="-1">请选择班级</option>');
		return;
	}
	var url = getRootPath() + "/getclasslist";
	$.ajax({
		url:url,
		dataType:'json',
		data:{"majorid":majarId},
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var list = data.classs;
				var html = '<option value="-1">请选择班级</option>';
				$.each(list, function(i, item){
					html += '<option value="'+item+'">'+item+'</option>'
				});
				$("#className").html(html);
			}
		}
	});
}

