/**
 * student manager javascript source file
 */
var studentInCount = 0;
var studentOutCount = 0;

$(function(){
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
		$("#import_student_btn").show();
	});
	
	$("#out_student").on("click", function(){
		$("#search_student_name1").val("");
		$("#search_student_status1").val("-1");
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","1px solid #e5e5e5");
		$("#in_student").removeClass("four_word");
		
		$("#menu1_data_list .data_info").remove();
		ajaxGetMenu2DataCount();
		
		$("#menu1_data_list").hide();
		$("#menu2_data_list").show();
		$("#import_student_btn").hide();
	});
	
	$("#import_student_btn").on("click", function(){
		$("#importDialog").dialog({
			modal : true,
			resizable : false,
			draggable : false,
			autoOpen : false,
			position : "center",// 弹出位置
			width : 450, // 窗口宽度
			height : 300,
			buttons: {
			       "开始导入": function() {
			    	   ajaxImportStudentExcel();
			       		  },
			       "取消": function() {
			    	   		$( this ).dialog( "close" );
			       		  }
			         }
		});
		$("#importDialog").dialog("open");
	});
	
	$("#menu1Search").on("click", function(){
		ajaxGetMenu1DataCount();
	});
	$("#menu2Search").on("click", function(){
		ajaxGetMenu2DataCount();
	});
});

function ajaxImportStudentExcel(){
	var file = $("#myFiles").val();
	
	if(file == ""){
		getDialog("fail", "请选择需要上传的excel文件");
		return;
	}
	
	$.ajaxFileUpload({
         url: getRootPath()+'/school/importStudent', //用于文件上传的服务器端请求地址
         secureuri: false, //是否需要安全协议，一般设置为false
         fileElementId: 'myFiles', //文件上传域的ID
         dataType: 'json', //返回值类型 一般设置为json
         success: function (data, status)  //服务器成功响应处理函数
            {
//        	 	alert(data.msg);
        	 	if(data.success == true){
        	 		getDialogCue("success", "上传成功");
        	 	}else{
        	 		getDialog("fail", data.msg);
        	 	}
	     	 	ajaxGetMenu1DataCount();
	     		$("#importDialog").dialog("close");
            }
    });
}

/**
 * 获取校内学生总数
 */
function ajaxGetMenu1DataCount(){
	var searchKey = $.trim($("#search_student_name1").val());
	var status = $("#search_student_status1").val();
	$.ajax({
		url:getRootPath() + '/school/getschoolselfstudentcount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "nStatus":status},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
				return;
			}else if(result == -100){
				studentInCount = 0;
			}else if(result == 0){
				studentInCount = data.count;
				ajaxShowMenu1Data(searchKey,status);
			}
		}
	});
}

/**
 * 获取校内学生数据，分页查询
 */
function ajaxShowMenu1Data(searchKey,status){
	if(studentInCount == 0){
		$(".page").remove();
		$("#menu1_data_list .data_info").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校内学生</div>");
		return;
	}
	var pageNum = Math.ceil(studentInCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/school/getschoolselfstudents',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1,"searchKey":searchKey, "nStatus":status},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu1_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校内学生</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >搜索失败</div>");
				}else{
					var jsonObj = data.students;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div id="'+item.userid+'" class="data_info">'
			            	  		html += '<div class="info_name">';
			              			if(item.headimageUrl == null || item.headimageUrl == ''){
			              				if(item.sex == 1){
			              					html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/boy_student.png"></div>';
			              				}else{
			              					html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/girl_student.png"></div>';
			              				}
			              			}else{
			              				html += '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>';
			              			}
			            	  		html += '<div class="teacher_name_word">'+item.realName+'（'+item.nickName+'）</div>'
			            	  		+ '<div class="teacher_name_word">'
			            	  		+ '<div class="letter_opt">'
			            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
			            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
			            	  		+ '</div>'
			            	  		+ '<div class="home_opt">'
			            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
			            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
			            	  		+ '</div>'
			            	  		+ '</div>'
			            	  		+ '</div>';
			              if(item.school.length > 7){
			            	  html += '<div class="menu2_data_common in_student_school" title="'+item.school+'">'+item.school.substring(0,7)+'...</div>';
			              }else{
			            	  html += '<div class="menu2_data_common in_student_school">'+item.school+'</div>';
			              }
			              if(item.college.length > 7){
			            	  html += '<div class="menu2_data_common in_student_faculty" title="'+item.college+'">'+item.college.substring(0,6)+'...</div>';
			              }else{
			            	  html += '<div class="menu2_data_common in_student_subject">'+item.college+'</div>';
			              }
			            	  		
			              if(item.major.length > 7){
			            	  html += '<div class="menu2_data_common in_student_subject" title="'+item.major+'">'+item.major.substring(0,6)+'...</div>';
			              }else{
			            	  html += '<div class="menu2_data_common in_student_subject">'+item.major+'</div>';
			              }
			            	  		
			              if(item.strClass.length > 5){
			            	  html += '<div class="menu2_data_common in_student_class" title="'+item.strClass+'">'+item.strClass.substring(0,4)+'...</div>';
			              }else{
			            	  html += '<div class="menu2_data_common in_student_class">'+item.strClass+'</div>';
			              }
			            	  	
			            	  	html += '<div class="menu2_data_common in_student_num">'+item.studentId+'</div>';
			              if(item.sex == 1){
			           	   		html += '<div class="menu2_data_common in_student_sex">男</div>';
			              }else{
			            	  	html += '<div class="menu2_data_common in_student_sex">女</div>';
			              }
			              if(item.status == 0){
			            	  html += '<div class="menu2_data_common in_student_status">正常</div>'
			            	  		+ '<div class="menu2_data_common in_student_opt1">'
					      	  		+ '<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
					      	  		+ '<p style="color:red;" onclick="freezeOrStartUser(\''+item.userid+'\', 1)">停用</p>'
					      	  		+ '</div>'
					      	  		+ '</div>';
			              }else{
			            	  html += '<div class="menu2_data_common in_student_status"><font color=\"red\">停用</font></div>'
				            	  	+ '<div class="menu2_data_common in_student_opt1">'
					      	  		+ '<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
					      	  		+ '<p onclick="freezeOrStartUser(\''+item.userid+'\', 0)">启用</p>'
					      	  		+ '</div>'
					      	  		+ '</div>';
			              }
			            	  		
			              $("#menu1_data_list").append(html);
			        });
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
		
	    $("#menu1Page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackMenu1Data',
	    		url:getRootPath()+'/school/getschoolselfstudents',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, nStatus:status}
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
	if(status == -1){
		getDialog("fail", "登录已超时，请重新登录!");
		location.href = getRootPath() + "/loginPage";
	}else if(status == -2){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校内学生</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >搜索失败</div>");
	}else{
		var jsonObj = result.students;
		$.each(jsonObj, function (i, item) {  
              var html = '<div id="'+item.userid+'" class="data_info">'
			            html += '<div class="info_name">';
			    			if(item.headimageUrl == null || item.headimageUrl == ''){
			    				if(item.sex == 1){
			    					html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/boy_student.png"></div>';
			    				}else{
			    					html += '<div class="teacher_logo"><img class="headImg" src="../../images/course/girl_student.png"></div>';
			    				}
			    			}else{
			    				html += '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>';
			    			}
			  	  		html += '<div class="teacher_name_word">'+item.realName+'（'+item.nickName+'）</div>'
            	  		+ '<div class="teacher_name_word">'
            	  		+ '<div class="letter_opt">'
            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
            	  		+ '</div>'
            	  		+ '<div class="home_opt">'
            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
            	  		+ '</div>'
            	  		+ '</div>'
            	  		+ '</div>';
              if(item.school.length > 7){
            	  html += '<div class="menu2_data_common in_student_school" title="'+item.school+'">'+item.school.substring(0,7)+'...</div>';
              }else{
            	  html += '<div class="menu2_data_common in_student_school">'+item.school+'</div>';
              }
              if(item.college.length > 7){
            	  html += '<div class="menu2_data_common in_student_faculty" title="'+item.college+'">'+item.college.substring(0,6)+'...</div>';
              }else{
            	  html += '<div class="menu2_data_common in_student_subject">'+item.college+'</div>';
              }
            	  		
              if(item.major.length > 7){
            	  html += '<div class="menu2_data_common in_student_subject" title="'+item.major+'">'+item.major.substring(0,6)+'...</div>';
              }else{
            	  html += '<div class="menu2_data_common in_student_subject">'+item.major+'</div>';
              }
            	  		
              if(item.strClass.length > 5){
            	  html += '<div class="menu2_data_common in_student_class" title="'+item.strClass+'">'+item.strClass.substring(0,4)+'...</div>';
              }else{
            	  html += '<div class="menu2_data_common in_student_class">'+item.strClass+'</div>';
              }
            	  	html += '<div class="menu2_data_common in_student_num">'+item.studentId+'</div>';
              if(item.sex == 1){
           	   		html += '<div class="menu2_data_common in_student_sex">男</div>';
              }else{
            	  	html += '<div class="menu2_data_common in_student_sex">女</div>';
              }
              if(item.status == 0){
            	  html += '<div class="menu2_data_common in_student_status">正常</div>'
            	  		+ '<div class="menu2_data_common in_student_opt1">'
		      	  		+ '<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
		      	  		+ '<p style="color:red;" onclick="freezeOrStartUser(\''+item.userid+'\', 1)">停用</p>'
		      	  		+ '</div>'
		      	  		+ '</div>';
              }else{
            	  html += '<div class="menu2_data_common in_student_status"><font color=\"red\">停用</font></div>'
	            	  	+ '<div class="menu2_data_common in_student_opt1">'
		      	  		+ '<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
		      	  		+ '<p onclick="freezeOrStartUser(\''+item.userid+'\', 0)">启用</p>'
		      	  		+ '</div>'
		      	  		+ '</div>';
              }
            	  		
              $("#menu1_data_list").append(html);
        });
	}
}

/**
 * 重置用户密码
 * @param userId
 */
function resetUserPwd(userId){
	var url = getRootPath() + '/school/resetpwd';
	$.ajax({
		url:url,
		type:'post',
		data:{'userid':userId},
		dataType:'json',
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -2){
				getDialog("fail", "该用户不存在，请重新选择!");
				ajaxGetMenu1DataCount();
				ajaxShowMenu1Data();
			}else if(status == -100){
				getDialogCue("success", "重置密码失败!");
			}else{
				getDialogCue("success", "重置成功,新密码为class8!");
			}
		}
	});
}

/**
 * 冻结或者启动用户
 * @param userId
 * @param type
 */
function freezeOrStartUser(userId, type){
	var url = getRootPath() + '/school/forbiduser';
	$.ajax({
		url:url,
		type:'post',
		data:{'userid':userId,'nforbid':type},
		dataType:'json',
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -2){
				getDialog("fail", "该用户不存在，请重新选择!");
				ajaxGetMenu1DataCount();
				ajaxShowMenu1Data();
			}else if(status == -100){
				getDialogCue("success", "操作失败!");
			}else{
				if(type == 1){
					getDialogCue("success", "该用户停用成功!");
					$("#"+userId+" .in_student_status").html("<font color=\"red\">停用</font>");
					$("#"+userId+" .in_student_opt1").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p onclick=\"freezeOrStartUser('"+userId+"', 0)\">启用</p>");
				}else if(type == 0){
					getDialogCue("success", "该用户启用成功!");
					$("#"+userId+" .in_student_status").html("正常");
					$("#"+userId+" .in_student_opt1").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p style=\"color:red;\" onclick=\"freezeOrStartUser('"+userId+"', 1)\">停用</p>");
				}
				
			}
		}
	});
}

/**
 * 获取校外学生总数
 */
function ajaxGetMenu2DataCount(){
	var searchKey = $.trim($("#search_student_name2").val());
	var status = $("#search_student_status2").val();
	$.ajax({
		url:getRootPath() + '/school/getschooloutdoorstudentcount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "nStatus":status},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				studentOutCount = 0;
			}else if(result == 0){
				studentOutCount = data.count;
				ajaxShowMenu2Data(searchKey,status);
				
			}
		}
	});
}

/**
 * 获取校外学生数据，分页查询
 */
function ajaxShowMenu2Data(searchKey,status){
	if(studentOutCount == 0){
		$(".page").remove();
		$("#menu2_data_list .data_info").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校外报名的学生</div>");
		return;
	}
	var pageNum = Math.ceil(studentOutCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/school/getschooloutdoorsstudents',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1,"searchKey":searchKey, "nStatus":status},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu2_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校外报名的学生</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >搜索失败</div>");
				}else{
					var jsonObj = data.students;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div class="data_info">'
			            	  		+ '<div class="info_name stu_width_new">'
			            	  		+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'+item.signString+'</div>'
			            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'
			            	  		+ '<div class="letter_opt">'
			            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
			            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
			            	  		+ '</div>'
			            	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
			            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
			            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
			            	  		+ '</div>'
			            	  		+ '</div>'
			            	  		+ '</div>'
			            	  		+ '<div id="out_buy_course_count" class="menu2_data_common">'+item.buyCourseCount+'</div>'
			            	  		+ '<div id="out_buy_money_count" class="menu2_data_common">￥'+item.buyCoursePrice+'</div>'
			            	  		+ '<div id="out_last_buy_time" class="menu2_data_common">'+item.lastBuyTimestamp+'</div>'
			            	  		+ '<div id="out_last_class_time" class="menu2_data_common">'+item.lastInClassTimestamp+'</div>'
			            	  		+ '<div id="out_student_opt2" class="menu2_data_common"></div>'
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
	    		url:getRootPath()+'/school/getschooloutdoorsstudents',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, nStatus:status}
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
	var status = parseInt(result.status);
	$("#menu2_data_list .data_info").remove();
	if(status == -1){
		getDialog("fail", "登录已超时，请重新登录!");
		location.href = getRootPath() + "/loginPage";
	}else if(status == -2){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >没有校外报名的学生</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >搜索失败</div>");
	}else{
		var jsonObj = result.students;
		$.each(jsonObj, function (i, item) {  
              var html = '<div class="data_info">'
            	  		+ '<div class="info_name stu_width_new">'
            	  		+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'+item.signString+'</div>'
            	  		+ '<div class="teacher_name_word stu_desc_width_new" style="margin-top:2px;">'
            	  		+ '<div class="letter_opt">'
            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
            	  		+ '</div>'
            	  		+ '<div class="home_opt" style="float:left;margin-left:10px;">'
            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
            	  		+ '<div class="desc_word" onClick="goTechHomePage(\''+item.userid+'\')">查看主页</div>'
            	  		+ '</div>'
            	  		+ '</div>'
            	  		+ '</div>'
            	  		+ '<div id="out_buy_course_count" class="menu2_data_common">'+item.buyCourseCount+'</div>'
            	  		+ '<div id="out_buy_money_count" class="menu2_data_common">￥'+item.buyCoursePrice+'</div>'
            	  		+ '<div id="out_last_buy_time" class="menu2_data_common">'+item.lastBuyTimestamp+'</div>'
            	  		+ '<div id="out_last_class_time" class="menu2_data_common">'+item.lastInClassTimestamp+'</div>'
            	  		+ '<div id="out_student_opt2" class="menu2_data_common"></div>'
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