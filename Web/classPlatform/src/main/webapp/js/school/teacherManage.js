/**
 * teacher manage javascript source file
 */
var teacherInCount = 0;
var teacherOutCount = 0;
var teacherApplyCount = 0;
var teacherInviteCount = 0;

$(function(){
	
	ajaxGetMenu1DataCount();
	
	$("#school_teacher").on("click", function(){
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","0px");
		$(".right_menu_word:not(#school_teacher)").removeClass("four_word");
		
		$("#menu2_data_list .data_info").remove();
		$("#menu3_data_list .data_info").remove();
		$("#menu4_data_list .data_info").remove();
		ajaxGetMenu1DataCount();
		
		$("#menu1_data_list").show();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").show();
	});
	$("#sign_teacher").on("click", function(){
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","1px solid #e5e5e5");
		$(".right_menu_word:not(#sign_teacher)").removeClass("four_word");
		
		$("#menu1_data_list .data_info").remove();
		$("#menu3_data_list .data_info").remove();
		$("#menu4_data_list .data_info").remove();
		
		ajaxGetMenu2DataCount();
		
		$("#menu1_data_list").hide();
		$("#menu2_data_list").show();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").hide();
	});
	$("#teacher_apply").on("click", function(){
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","1px solid #e5e5e5");
		$(".right_menu_word:not(#teacher_apply)").removeClass("four_word");
		
		$("#menu1_data_list .data_info").remove();
		$("#menu2_data_list .data_info").remove();
		$("#menu4_data_list .data_info").remove();
		
		ajaxGetMenu3DataCount();
		
		$("#menu1_data_list").hide();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").show();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").hide();
	});
	$("#invite_teacher").on("click", function(){
		$(this).siblings().css("border-left","0px");
		$(this).addClass("four_word");
		$(this).css("border-left","1px solid #e5e5e5");
		$(".right_menu_word:not(#invite_teacher)").removeClass("four_word");
		
		$("#menu1_data_list .data_info").remove();
		$("#menu2_data_list .data_info").remove();
		$("#menu3_data_list .data_info").remove();
		
		ajaxGetMenu4DataCount();
		
		$("#menu1_data_list").hide();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").show();
		$("#import_teacher_btn").hide();
	});
	
	$("#import_teacher_btn").on("click", function(){
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
			    	   ajaxImportTeacherExcel();
			       		  },
			       "取消": function() {
			    	   		$( this ).dialog( "close" );
			       		  }
			         }
		});
		$("#importDialog").dialog("open");
	});
	
	$("#inSearchBtn").on("click", function(){
		ajaxGetMenu1DataCount();
	});
	$("#outSearchBtn").on("click", function(){
		ajaxGetMenu2DataCount();
	});
	$("#applySearchBtn").on("click", function(){
		ajaxGetMenu3DataCount();
	});
	$("#inviteSearchBtn").on("click", function(){
		ajaxGetMenu4DataCount();
	});
});

/*获取校内老师总数*/
function ajaxGetMenu1DataCount(){
	var searchKey = $.trim($("#search_teacher").val());
	var status = $("#search_teacher_status").val();
	$.ajax({
		url:getRootPath() + '/school/getschoolselfteacherscount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "status":status},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				teacherInCount = 0;
			}else if(result == 0){
				teacherInCount = data.count;
				ajaxShowMenu1Data(searchKey, status);
			}
		}
	});
}
/*获取签约老师总数*/
function ajaxGetMenu2DataCount(){
	var searchKey = $.trim($("#search_teacher1").val());
	var status = $("#search_teacher_status1").val();
	var startTime = $("#menu2_start_time").val();
	var endTime = $("#menu2_end_time").val();
	$.ajax({
		url:getRootPath() + '/school/getschoolteachersagreementcount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "status":status, "startTime":startTime, "endTime":endTime},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				teacherOutCount = 0;
			}else if(result == 0){
				teacherOutCount = data.count;
				ajaxShowMenu2Data(searchKey, status, startTime, endTime);
			}
		}
	})
}
/*获取老师申请总数*/
function ajaxGetMenu3DataCount(){
	var searchKey = $.trim($("#search_teacher2").val());
	var startTime = $("#menu3_start_time").val();
	var endTime = $("#menu3_end_time").val();
	$.ajax({
		url:getRootPath() + '/school/getschoolteachersapplycount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "startTime":startTime, "endTime":endTime},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				teacherApplyCount = 0;
			}else if(result == 0){
				teacherApplyCount = data.count;
				ajaxShowMenu3Data(searchKey, startTime, endTime);
				
			}
		}
	})
}
/*获取邀请的老师总数*/
function ajaxGetMenu4DataCount(){
	var searchKey = $.trim($("#search_teacher3").val());
	var startTime = $("#menu4_start_time").val();
	var endTime = $("#menu4_end_time").val();
	$.ajax({
		url:getRootPath() + '/school/getschoolteachersinvitecount',
		type:'post',
		dataType:'json',
		data:{"searchKey":searchKey, "startTime":startTime, "endTime":endTime},
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				teacherInviteCount = 0;
			}else if(result == 0){
				teacherInviteCount = data.count;
				ajaxShowMenu4Data(searchKey, startTime, endTime);
				
			}
		}
	})
}

function ajaxImportTeacherExcel(){
	var file = $("#myFiles").val();
	
	if(file == ""){
		getDialog("fail", "请选择需要上传的excel文件!");
		return;
	}
	if(file != "" && file.lastIndexOf(".xls")<0 && file.lastIndexOf(".xlsx")<0){
		getDialog("warn", "所选择的上传文件格式不对!");
		return;
	}
	
	$.ajaxFileUpload({
         url: getRootPath()+'/school/importTeacher', //用于文件上传的服务器端请求地址
         async:false,
         secureuri: false, //是否需要安全协议，一般设置为false
         fileElementId: 'myFiles', //文件上传域的ID
         dataType: 'json', //返回值类型 一般设置为json
         success: function (data, status)  //服务器成功响应处理函数
            {
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
 * 获取校内老师数据，分页查询
 */
function ajaxShowMenu1Data(searchKey, status){
	var pageNum = Math.ceil(teacherInCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/school/getschoolselfteachers',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1, "searchKey":searchKey, "status":status},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu1_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no teacher</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
				}else{
					var jsonObj = data.teachers;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div id="'+item.userid+'" class="data_info">'
			            	  	  +'<div class="info_name">';
			            	  	  if(item.headimageUrl == null || item.headimageUrl == ''){
			            	  		  if(item.sex == 1){
			            	  			html += '<div class="teacher_logo"><img class="headImg" src="../../images/teacher/male_teacher.png"></div>';
			            	  		  }else{
			            	  			html += '<div class="teacher_logo"><img class="headImg" src="../../images/teacher/female_teacher.png"></div>';
			            	  		  }
			            	  	  }else{
			            	  		  html += '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>';
			            	  	  }
			            	  	  html += '<div class="teacher_name_word">'+item.realName+'（'+item.nickName+'）</div>'
			            	  	  +'<div class="teacher_name_word">'
			            	  	+ '<div class="letter_opt">'
		            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
		            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
		            	  		+ '</div>'
		            	  		+ '<div class="home_opt">'
		            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
		            	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
		            	  		+ '</div>';
		            	  		if(item.school.length > 7){
		            	  			html += '<div class="info_school">'+item.school.substring(0,7)+'...</div>';
		            	  		}else{
		            	  			html += '<div class="info_school">'+item.school+'</div>';
		            	  		}
		            	  		if(item.college.length >9){
		            	  			html += '<div class="info_faculty" title="'+item.college+'">'+item.college.substring(0,7)+'...</div>';
		            	  		}else{
		            	  			html += '<div class="info_faculty">'+item.college+'</div>';
		            	  		}
		            	  		if(item.major.length > 7){
		            	  			html += '<div class="info_subject" title="'+item.major+'">'+item.major.substring(0,6)+'...</div>';
		            	  		}else{
		            	  			html += '<div class="info_subject">'+item.major+'</div>';
		            	  		}
			            	  	 html += '<div class="info_num">'+item.teacherId+'</div>';
			               if(item.sex == 1){
			            	   html += '<div class="info_sex">男</div>';
			               }else{
			            	   html += '<div class="info_sex">女</div>';
			               }
			               if(item.status == 0){
			            	   html += '<div class="info_status">正常</div>'
			            	      +'<div class="info_opt">'
			             	  	  +'<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
			             	  	  +'<p style="color:red;" onclick="freezeOrStartUser(\''+item.userid+'\',1,'+item.haveRight+')">冻结</p>';
			            	   if(item.haveRight == 0){
			            		   html += '<p onclick="authOrCancelCreatClass(\''+item.userid+'\',1)">授权创课</p>';
			            	   }else{
			            		   html += '<p style=\"color:red;\" onclick="authOrCancelCreatClass(\''+item.userid+'\',2)">取消创课</p>';
			            	   }
			             	  	  
			             	  	  html += '</div>'
			             	  		   +'</div>';
			               }else if(item.status == 1){
			            	   html += '<div class="info_status"><font color="red">停用</font></div>'
			            	   	  +'<div class="info_opt">'
			            	   	  +'<p style="margin-top:18px;" onclick="freezeOrStartUser(\''+item.userid+'\',0,'+item.haveRight+')">启用</p>'
			            	   	  +'</div>'
			            	   	  +'</div>';
			               }else{
			            	   html += '<div class="info_status"></div>'
			            	      +'<div class="info_opt">'
			         	   	  	  +'</div>'
			         	   	      +'</div>';
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
	    		url:getRootPath()+'/school/getschoolselfteachers',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, status:status}
	    	}
	    });
	}
}
/**
 * 校内老师分页回调函数
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
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no teacher</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu1_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}else{
		var jsonObj = result.teachers;
		$.each(jsonObj, function (i, item) {  
              var html = '<div id="'+item.userid+'" class="data_info">'
			              +'<div class="info_name">';
			    	  	  if(item.headimageUrl == null || item.headimageUrl == ''){
			    	  		  if(item.sex == 1){
			    	  			html += '<div class="teacher_logo"><img class="headImg" src="../../images/teacher/male_teacher.png"></div>';
			    	  		  }else{
			    	  			html += '<div class="teacher_logo"><img class="headImg" src="../../images/teacher/female_teacher.png"></div>';
			    	  		  }
			    	  	  }else{
			    	  		  html += '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>';
			    	  	  }
			    	  	  html += '<div class="teacher_name_word">'+item.realName+'（'+item.nickName+'）</div>'
            	  	  +'<div class="teacher_name_word">'
            	  	+ '<div class="letter_opt">'
        	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
        	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
        	  		+ '</div>'
        	  		+ '<div class="home_opt">'
        	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
        	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
        	  		+ '</div>'
        	  		+ '</div>'
        	  		+ '</div>';
  	  		if(item.school.length > 7){
  	  			html += '<div class="info_school" title="'+item.school+'">'+item.school.substring(0,7)+'...</div>';
  	  		}else{
  	  			html += '<div class="info_school">'+item.school+'</div>';
  	  		}
	  	  	if(item.college.length >9){
	  			html += '<div class="info_faculty" title="'+item.college+'">'+item.college.substring(0,7)+'...</div>';
	  		}else{
	  			html += '<div class="info_faculty">'+item.college+'</div>';
	  		}
	  		if(item.major.length > 7){
	  			html += '<div class="info_subject" title="'+item.major+'">'+item.major.substring(0,6)+'...</div>';
	  		}else{
	  			html += '<div class="info_subject">'+item.major+'</div>';
	  		}
		  	 html += '<div class="info_num">'+item.teacherId+'</div>';
               if(item.sex == 1){
            	   html += '<div class="info_sex">男</div>';
               }else{
            	   html += '<div class="info_sex">女</div>';
               }
               if(item.status == 0){
            	   html += '<div class="info_status">正常</div>'
            	      +'<div class="info_opt">'
             	  	  +'<p onclick="resetUserPwd(\''+item.userid+'\')">重置密码</p>'
             	  	  +'<p style="color:red;" onclick="freezeOrStartUser(\''+item.userid+'\',1,'+item.haveRight+')">冻结</p>';
            	   if(item.haveRight == 0){
            		   html += '<p onclick="authOrCancelCreatClass(\''+item.userid+'\',1)">授权创课</p>';
            	   }else{
            		   html += '<p style=\"color:red;\" onclick="authOrCancelCreatClass(\''+item.userid+'\',2)">取消创课</p>';
            	   }
             	  	  
             	  	  html += '</div>'
             	  		   +'</div>';
               }else if(item.status == 1){
            	   html += '<div class="info_status"><font color="red">停用</font></div>'
            	   	  +'<div class="info_opt">'
            	   	  +'<p style="margin-top:18px;" onclick="freezeOrStartUser(\''+item.userid+'\',0,'+item.haveRight+')">启用</p>'
            	   	  +'</div>'
            	   	  +'</div>';
               }else{
            	   html += '<div class="info_status"></div>'
            	      +'<div class="info_opt">'
         	   	  	  +'</div>'
         	   	      +'</div>';
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
				getDialogCue("success", "重置密码失败");
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
function freezeOrStartUser(userId, type, haveRight){
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
					$("#"+userId+" .info_status").html("<font color=\"red\">停用</font>");
					$("#"+userId+" .info_opt").html("<p style=\"margin-top:18px;\" onclick=\"freezeOrStartUser('"+userId+"',0,"+haveRight+")\">启用</p>");
				}else if(type == 0){
					getDialogCue("success", "该用户启用成功!");
					$("#"+userId+" .info_status").html("正常");
					if(haveRight == 0){
						$("#"+userId+" .info_opt").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p style=\"color:red;\" onclick=\"freezeOrStartUser('"+userId+"',1,"+haveRight+")\">冻结</p><p onclick=\"authOrCancelCreatClass('"+userId+"',1)\">授权创课</p>");
					}else{
						$("#"+userId+" .info_opt").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p style=\"color:red;\" onclick=\"freezeOrStartUser('"+userId+"',1,"+haveRight+")\">冻结</p><p style=\"color:red;\" onclick=\"authOrCancelCreatClass('"+userId+"',2)\">取消创课</p>");
					}
				}
				
			}
		}
	});
}

/**
 * 授权或者取消用户创课
 * @param userId
 * @param type
 */
function authOrCancelCreatClass(userId, type){
	var url = getRootPath() + '/school/setcreateright';
	$.ajax({
		url:url,
		type:'post',
		data:{'allow':type, 'teacherid':userId},
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
					getDialogCue("success", "授权创课成功!");
					$("#"+userId+" .info_opt").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p style=\"color:red;\" onclick=\"freezeOrStartUser('"+userId+"',1,1)\">冻结</p><p style=\"color:red;\" onclick=\"authOrCancelCreatClass('"+userId+"',2)\">取消创课</p>");
				}else if(type == 2){
					getDialogCue("success", "取消创课成功!");
					$("#"+userId+" .info_opt").html("<p onclick=\"resetUserPwd('"+userId+"')\">重置密码</p><p style=\"color:red;\" onclick=\"freezeOrStartUser('"+userId+"',1,0)\">冻结</p><p onclick=\"authOrCancelCreatClass('"+userId+"',1)\">授权创课</p>");
				}
				
			}
		}
	});
}

/**
 * 获取签约老师数据列表，分页显示
 */
function ajaxShowMenu2Data(searchKey, status, startTime, endTime){
	var pageNum = Math.ceil(teacherOutCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/school/getschoolteachersagreement',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1, "searchKey":searchKey, "status":status, "startTime":startTime, "endTime":endTime},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu2_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no sign teacher</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
				}else{
					var jsonObj = data.teachers;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div class="data_info">'
			            	  	+ '<div class="info_name width_new">'
			            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
			            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:2px;">'+item.signString+'</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:2px;">'
			            	  	+ '<div class="letter_opt">'
		            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
		            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
		            	  		+ '</div>'
		            	  		+ '<div class="home_opt homt_opt_new">'
		            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
		            	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
							    + '<div id="info_time" class="menu2_data_common">'+item.optTimestamp+'</div>'
							    + '<div id="info_order" class="menu2_data_common">'+item.orderNums+'</div>'
							    + '<div id="info_student" class="menu2_data_common">'+item.stuNums+'</div>'
							    + '<div id="info_income" class="menu2_data_common">￥'+item.comein+'</div>';
							    if(item.status == 0){
							    	html += '<div id="info_assess" class="menu2_data_common">合约期间</div>'
							    		 + '<div id="info_opt2" class="menu2_data_common"><p>解除签约</p></div>'
								    	 + '</div>';
							    }else{
							    	html += '<div id="info_assess" class="menu2_data_common">合约到期</div>';
							    		 + '<div id="info_opt2" class="menu2_data_common"><p>继续签约</p></div>'
							    		 + '</div>';
							    }

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
	    		url:getRootPath()+'/school/getschoolteachersagreement',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, status:status, startTime:startTime, endTime:endTime}
	    	}
	    });
	}
}

/**
 * 签约老师分页回调函数
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
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no sign teacher</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu2_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}else{
		var jsonObj = result.teachers;
		$.each(jsonObj, function (i, item) {  
              var html = '<div class="data_info">'
            	  	+ '<div class="info_name width_new">'
            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:2px;">'+item.signString+'</div>'
            	  	+ '<div class="teacher_name_word desc_width_new" style="margin-top:2px;">'
            	  	+ '<div class="letter_opt">'
        	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
        	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
        	  		+ '</div>'
        	  		+ '<div class="home_opt homt_opt_new">'
        	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
        	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
        	  		+ '</div>'
        	  		+ '</div>'
        	  		+ '</div>'
				    + '<div id="info_time" class="menu2_data_common">'+item.optTimestamp+'</div>'
				    + '<div id="info_order" class="menu2_data_common">'+item.orderNums+'</div>'
				    + '<div id="info_student" class="menu2_data_common">'+item.stuNums+'</div>'
				    + '<div id="info_income" class="menu2_data_common">￥'+item.comein+'</div>';
				    if(item.status == 0){
				    	html += '<div id="info_assess" class="menu2_data_common">合约期间</div>'
				    		 + '<div id="info_opt2" class="menu2_data_common"><p>解除签约</p></div>'
					    	 + '</div>';
				    }else{
				    	html += '<div id="info_assess" class="menu2_data_common">合约到期</div>';
				    		 + '<div id="info_opt2" class="menu2_data_common"><p>继续签约</p></div>'
				    		 + '</div>';
				    }

              $("#menu2_data_list").append(html);
        });
	}
}

/**
 * 获取老师的申请数据列表，分页显示
 */
function ajaxShowMenu3Data(searchKey, startTime, endTime){
	var pageNum = Math.ceil(teacherApplyCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum == 1 || pageNum == 0){
		$.ajax({
			url:getRootPath() + '/school/getschoolteachersapply',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1,"searchKey":searchKey, "startTime":startTime, "endTime":endTime},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu3_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu3_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no teacher apply</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu3_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
				}else{
					var jsonObj = data.teachers;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div id="'+item.userid+'" class="data_info">'
			            	  	+ '<div class="info_name width_new2">'
			            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'+item.signString+'</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'
			            	  	+ '<div class="letter_opt">'
		            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
		            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
		            	  		+ '</div>'
		            	  		+ '<div class="home_opt homt_opt_new">'
		            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
		            	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
								+ '<div id="apply_register_time" class="menu2_data_common">'+item.regTimestamp+'</div>'
								+ '<div id="apply_apply_time" class="menu2_data_common">'+item.optTimestamp+'</div>';
			              if(item.status == 1){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">待处理</div>'
			            	  	   + '<div id="info_opt3" class="menu2_data_common" style="line-height:20px;margin-top:47px;height:80px;"><p onclick="dealTeacherApply(\''+item.userid+'\', 1)">同意</p><p style="color:red;" onclick="dealTeacherApply(\''+item.userid+'\', 0)">拒绝</P></div>'
			  					   + '</div>';	
			              }else if(item.status == 2){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">已同意</div>'
			            	  	   + '<div id="info_opt3" class="menu2_data_common"></div>'
								   + '</div>';
			              }else if(item.status == 3){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">已拒绝</div>'
			            	  		+ '<div id="info_opt3" class="menu2_data_common"></div>'
			            	  		+ '</div>';
			              }else{
			            	  html += '<div id="apply_apply_status" class="menu2_data_common"></div>'
			            	  		+ '<div id="info_opt3" class="menu2_data_common"></div>'
			            	  		+ '</div>';
			              }
			              $("#menu3_data_list").append(html);
			        });
				}
			}
		});
	}else{
		
		$("#menu3_data_list").after('<div id="menu3Page" class="page"></div>');

		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#menu3Page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackMenu3Data',
	    		url:getRootPath()+'/school/getschoolteachersapply',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, startTime:startTime, endTime:endTime}
	    	}
	    });
	}
}

/**
 * 签约老师分页回调函数
 * @param data
 */
function callBackMenu3Data(data){
	var result = eval("("+data+")");
	var status = parseInt(result.status);
	$("#menu3_data_list .data_info").remove();
	if(status == -1){
		getDialog("fail", "登录已超时，请重新登录!");
		location.href = getRootPath() + "/loginPage";
	}else if(status == -2){
		$(".page").remove();
		$("#menu3_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no teacher apply</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu3_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}else{
		var jsonObj = result.teachers;
		$.each(jsonObj, function (i, item) {  
              var html = '<div id="'+item.userid+'" class="data_info">'
            	  	+ '<div class="info_name width_new2">'
            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'+item.signString+'</div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'
            	  	+ '<div class="letter_opt">'
        	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
        	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
        	  		+ '</div>'
        	  		+ '<div class="home_opt homt_opt_new">'
        	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
        	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
        	  		+ '</div>'
        	  		+ '</div>'
        	  		+ '</div>'
					+ '<div id="apply_register_time" class="menu2_data_common">'+item.regTimestamp+'</div>'
					+ '<div id="apply_apply_time" class="menu2_data_common">'+item.optTimestamp+'</div>';
              if(item.status == 1){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">待处理</div>'
            	  	   + '<div id="info_opt3" class="menu2_data_common" style="line-height:20px;margin-top:47px;height:80px;"><p onclick="dealTeacherApply(\''+item.userid+'\', 1)">同意</p><p style="color:red;" onclick="dealTeacherApply(\''+item.userid+'\', 0)">拒绝</P></div>'
  					   + '</div>';	
              }else if(item.status == 2){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">已同意</div>'
            	  	   + '<div id="info_opt3" class="menu2_data_common"></div>'
					   + '</div>';
              }else if(item.status == 3){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">已拒绝</div>'
            	  		+ '<div id="info_opt3" class="menu2_data_common"></div>'
            	  		+ '</div>';
              }else{
            	  html += '<div id="apply_apply_status" class="menu2_data_common"></div>'
            	  		+ '<div id="info_opt3" class="menu2_data_common"></div>'
            	  		+ '</div>';
              }
              $("#menu3_data_list").append(html);
        });
	}
}

function dealTeacherApply(userId, type){
	var url = getRootPath() + '/school/verifyteacherapply';
	$.ajax({
		url:url,
		type:'post',
		data:{'nAgree':type, 'teacherid':userId},
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
				getDialogCue("success", "该用户邀请处理完成!");
				if(type == 1){
					$("#"+userId+" .apply_apply_status").html("已同意");
				}else{
					$("#"+userId+" .apply_apply_status").html("<font color=\"red\">拒绝</font>");
				}
				$("#"+userId+" .info_opt3").html("");
			}
		}
	});
}

/**
 * 获取学校邀请老师数据列表，分页显示
 */
function ajaxShowMenu4Data(searchKey, startTime, endTime){
	var pageNum = Math.ceil(teacherInviteCount/5);
	var pageSize = 0;
	$(".page").remove();
	if(pageNum <= 1){
		$.ajax({
			url:getRootPath() + '/school/getschoolteachersinvite',
			type:'post',
			dataType:'json',
			data: {"start":1,"rows":5,"page":1,"searchKey":searchKey, "startTime":startTime, "endTime":endTime},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				$("#menu4_data_list .data_info").remove();
				if(status == -1){
					getDialog("fail", "登录已超时，请重新登录!");
					location.href = getRootPath() + "/loginPage";
				}else if(status == -2){
					$(".page").remove();
					$("#menu4_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no invite teacher</div>");
				}else if(status == -100){
					$(".page").remove();
					$("#menu4_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
				}else{
					var jsonObj = data.teachers;
					$.each(jsonObj, function (i, item) {  
			              var html = '<div class="data_info">'
			            	  	+ '<div class="info_name width_new2">'
			            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'+item.signString+'</div>'
			            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'
			            	  	+ '<div class="letter_opt">'
		            	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
		            	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
		            	  		+ '</div>'
		            	  		+ '<div class="home_opt homt_opt_new">'
		            	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
		            	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
		            	  		+ '</div>'
								+ '<div id="apply_register_time" class="menu2_data_common">'+item.regTimestamp+'</div>'
								+ '<div id="apply_apply_time" class="menu2_data_common">'+item.optTimestamp+'</div>';
			              if(item.status == 1){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">待处理</div>';
			              }else if(item.status == 2){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">已同意</div>';
			              }else if(item.status == 3){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">拒绝</div>';
			              }else if(item.status == 4){
			            	  html += '<div id="apply_apply_status" class="menu2_data_common">已取消</div>';
			              }else{
			            	  html += '<div id="apply_apply_status" class="menu2_data_common"></div>';
			              }
								
								html += '<div id="info_opt3" class="menu2_data_common">再次邀请</div>'
									+ '</div>';
			              $("#menu4_data_list").append(html);
			        });
				}
			}
		});
	}else{
		
		$("#menu4_data_list").after('<div id="menu4Page" class="page"></div>');

		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#menu4Page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackMenu4Data',
	    		url:getRootPath()+'/school/getschoolteachersinvite',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5,searchKey:searchKey, startTime:startTime, endTime:endTime}
	    	}
	    });
	}
}

/**
 * 签约老师分页回调函数
 * @param data
 */
function callBackMenu4Data(data){
	var result = eval("("+data+")");
	var status = parseInt(result.status);
	$("#menu4_data_list .data_info").remove();
	if(status == -1){
		getDialog("fail", "登录已超时，请重新登录!");
		location.href = getRootPath() + "/loginPage";
	}else if(status == -2){
		$(".page").remove();
		$("#menu4_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >no invite teacher</div>");
	}else if(status == -100){
		$(".page").remove();
		$("#menu4_data_list").append("<div id=\"searchFailInfo\" class=\"data_info\" >search failure</div>");
	}else{
		var jsonObj = result.teachers;
		$.each(jsonObj, function (i, item) {  
              var html = '<div class="data_info">'
            	  	+ '<div class="info_name width_new2">'
            	  	+ '<div class="teacher_logo"><img class="headImg" src="'+item.headimageUrl+'"></div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:20px;">'+item.realName+'（'+item.nickName+'）</div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'+item.signString+'</div>'
            	  	+ '<div class="teacher_name_word desc_width_new2" style="margin-top:2px;">'
            	  	+ '<div class="letter_opt">'
        	  		+ '<div class="word_img" style="margin-top:8px;margin-left:7px;"><img src="../images/school/data_letter.png"></div>'
        	  		+ '<div class="desc_word" onClick="privateChat(\''+item.userid+'\',\''+item.realName+'\',\''+item.nickName+'\')">私信TA</div>'
        	  		+ '</div>'
        	  		+ '<div class="home_opt homt_opt_new">'
        	  		+ '<div class="word_img"><img src="../images/school/data_home.png"></div>'
        	  		+ '<div class="desc_word" onClick="goTechHomePage('+item.userid+')">查看主页</div>'
        	  		+ '</div>'
        	  		+ '</div>'
        	  		+ '</div>'
					+ '<div id="apply_register_time" class="menu2_data_common">'+item.regTimestamp+'</div>'
					+ '<div id="apply_apply_time" class="menu2_data_common">'+item.optTimestamp+'</div>';
              if(item.status == 1){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">待处理</div>';
              }else if(item.status == 2){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">已同意</div>';
              }else if(item.status == 3){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">拒绝</div>';
              }else if(item.status == 4){
            	  html += '<div id="apply_apply_status" class="menu2_data_common">已取消</div>';
              }else{
            	  html += '<div id="apply_apply_status" class="menu2_data_common"></div>';
              }
					
					html += '<div id="info_opt3" class="menu2_data_common">再次邀请</div>'
						+ '</div>';
              $("#menu4_data_list").append(html);
        });
	}
}


function goTechHomePage(userId){
	 location.href=getRootPath() + "/infocenter/teacher/"+userId;
}

function privateChat(uid,realname,nickname){
	 location.href=getRootPath() + "/message/message?type=5&uid="+uid+"&realname="+encodeURI(encodeURI(realname))+"&nickname="+encodeURI(encodeURI(nickname));
}