/**
 * document manage javascript source file
 */
var courseId = "";

$(function(){	
	ajaxShowFolderData();
	
	$("#upload_file_btn").hover(function(){
		$(this).css({"background":"url(../images/teacher/upload_over.png) no-repeat", "color":"#fff"});
	}, function(){
		$(this).css({"background":"url(../images/teacher/upload_out.png) no-repeat", "color":"#6B6B6B"});
	});
	
	$("#create_folder_btn").hover(function(){
		$(this).css({"background":"url(../images/teacher/creat_folder_over.png) no-repeat", "color":"#fff"});
	}, function(){
		$(this).css({"background":"url(../images/teacher/creat_folder_out.png) no-repeat", "color":"#6B6B6B"});
	});
	
	$("#selectFolderAll").on("click", function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			$(this).find("img").attr("src", "../images/teacher/no_select_bg.png");
			$("#show_doc_list").find("span").removeClass("selected");
			$("#show_doc_list").find("span").css("background","url(../images/teacher/no_select_bg.png) no-repeat");
		}else{
			$(this).addClass("selected");
			$(this).find("img").attr("src", "../images/teacher/selected_bg.png");
			$("#show_doc_list").find("span").addClass("selected");
			$("#show_doc_list").find("span").css("background","url(../images/teacher/selected_bg.png) no-repeat");
		}
	});
	
	$("#show_doc_list").children(".doc_data").find("span").on("click", function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			$(this).css("background","url(../images/teacher/no_select_bg.png) no-repeat");
			$("#selectFolderAll").removeClass("selected");
			$("#selectFolderAll").find("img").attr("src", "../images/teacher/no_select_bg.png");
		}else{
			$(this).addClass("selected");
			$(this).css("background","url(../images/teacher/selected_bg.png) no-repeat");
		}
		var checked = $("#show_doc_list").children(".doc_data").find(".selected").length;
		$("#fileField").removeAttr("disabled");
	});
	
	$(".file_name").hover(function(){
		if(!$("#upload_file_btn").hasClass("file")){
			$(this).css({"color":"blue","text-decoration":"none"});
		}
	}, function(){
		if(!$("#upload_file_btn").hasClass("file")){
			$(this).css({"color":"#000","text-decoration":"none"});
		}
	}).on("click",function(){
		if(!$("#upload_file_btn").hasClass("file")){
			$("#fileField").removeAttr("disabled");
			$("#upload_file_btn").addClass("file");
			courseId = $(this).parent().find("span").attr("classid");
			ajaxShowFileData(courseId);
			$("#delete_folder_btn").show();
			var name = $(this).html();
			$("#doc_path").html("<a href='javascript:void(0);' onclick='goBack()'>返回上一级</a>&nbsp;&nbsp;|&nbsp;&nbsp;全部文件&nbsp;&nbsp;>&nbsp;&nbsp;"+name);
			$("#show_doc_list").hide();
			$("#show_file_list").show();
		}
	});
	
	$("#upload_file_btn").on("click", function(){
		if($(this).hasClass("file")){
			$("#fileField").removeAttr("disabled");
		}else{
			var checked = $("#show_doc_list").children(".doc_data").find(".selected").length;
			if(checked == 0 || checked > 1){
				getDialog("fail", "请选择一个课程目录进行上传!");
				$("#fileField").attr("disabled","disabled");
				return;
			}else{
				$("#fileField").removeAttr("disabled");	
			}
		}
		
		var paramCourseId = "";
		if(!$("#upload_file_btn").hasClass("file")){
			paramCourseId = $("#show_doc_list").children(".doc_data").find(".selected").attr("classid");
		}else{
			paramCourseId = courseId;
		}
		$("#fileField").uploadify({
			'height'        : 30,   
	        'width'         : 80,    
	        'buttonText'    : '添加课件',
	        'fileObjName'  : 'fileField',
			'formData' : {'courseid':paramCourseId},
            'swf': '../js/uploadify/uploadify.swf',
            'uploader': getRootPath()+'/teacher/uploadFile',
            'auto' : true,
            'progressData' : 'percentage',
            'queueID': 'fileQueue',
            'fileSizeLimit' : '50MB',
            'multi'    : true,
            'overrideEvents' : ['onDialogClose', 'onSelectError'],
            'fileTypeExts' : '*.gif; *.jpg; *.png; *.doc; *.docx; *.xls; *.xlsx; *.ppt; *.pptx; *.jpeg; *.pptx; *.hmp; *.pdf; *.mp3; *.mp4; *.flv; *.avi; *.wmv',
            'onQueueComplete': function(queueData) {
            	$("#shareDialog").dialog("close");
            	 alert(queueData.uploadsSuccessful + ' 文件上传成功.');
        	    if($("#upload_file_btn").hasClass("file")){
            		ajaxShowFileData(courseId);
            	}           	
            },
            'onUploadError' : function(file, errorCode, errorMsg, errorString) {
                alert('文件:' + file.name + '上传失败' + errorString);
            },
            'onSelectError' : uploadify_onSelectError
        });
		$("#shareDialog").dialog({
			modal : false,
			resizable : false,
			draggable : true,
			autoOpen : false,
			position : "",// 弹出位置
			width : 520, // 窗口宽度
			height : 310
		});
		$("#shareDialog").dialog("open");
	});

	$("#fileField").live("change", function(){
		if(!fileChange($(this)[0])){
			return;
		}
		
		
		var file = $(this).val();
		
		if(file == ""){
			getDialog("fail", "上传文件不能为空,请选择文件!");
			return;
		}
		
		
		
		/*$.ajaxFileUpload({
	         url: getRootPath()+'/teacher/uploadFile', //用于文件上传的服务器端请求地址
	         secureuri: false, //是否需要安全协议，一般设置为false
	         fileElementId: 'fileField', //文件上传域的ID
	         dataType: 'json', //返回值类型 一般设置为json
	         data:{'courseid':paramCourseId},
	         success: function (data, status)  //服务器成功响应处理函数
	            {
	        	 	var result = parseInt(data.status);
	        	 	if(result == -1){
	        	 		getDialog("fail", data.message);
	        	 	}else if(result == 0){
	        	 		alert(data.message);
	        	 		//getDialogCue("success", data.message);
	        	 		if($("#upload_file_btn").hasClass("file")){
	            			ajaxShowFileData(courseId);
	            		}
	        	 	}else{
	        	 		console.log("未知错误");
	        	 	}
	            	if(result == -1){
	            		getDialog("fail", "上传文件不能为空,请选择文件!");
	            	}else if(result == -2){
	            		getDialog("fail", "上传的文件类型不支持，请重新选择!");
	            	}else if(result == -3){
	            		getDialog("fail", "上传的文件超过5M，请重新选择!");
	            	}else if(result == -100){
	            		getDialog("fail", "系统错误!");
	            	}else if(result == 0){
	            		getDialogCue("success", "上传成功!");
	            		if($("#upload_file_btn").hasClass("file")){
	            			ajaxShowFileData(courseId);
	            		}
	            	}else{
	            		console.log("未知错误");
	            	}
	            }
	    });*/
	});
	
	$("#delete_folder_btn").hover(function(){
		$(this).css({"background":"url(../images/teacher/creat_folder_over.png) no-repeat", "color":"#fff"});
	}, function(){
		$(this).css({"background":"url(../images/teacher/creat_folder_out.png) no-repeat", "color":"#6B6B6B"});
	}).on("click", function(){
		var chk_value = [];
		var checked_length = $("#show_file_list").children(".doc_data").find(".selected").length;
		if(checked_length == 0){
			getDialog("fail", "请选择要删除的文件!");
		}else{
			$("#show_file_list").children(".doc_data").find(".selected").each(function(){      
	            chk_value.push(parseInt($(this).attr("classid")));      
	        });
			var url = getRootPath() + '/teacher/deleteFile';
			$.ajax({
				url:url,
				type:'post',
				dataType:'json',
				data:{'fileids':chk_value},
				async:false,
				success:function(data){
					var status = parseInt(data.status);
					if(status == 0){
						getDialogCue("success", "删除成功!");
						ajaxShowFileData(courseId);
					}else if(status == -1){
						getDialog("fail", "请选择要删除的文件!");
					}else{
						console.log("未知错误");
					}
				}
			});
		}
	});
});

var uploadify_onSelectError = function(file, errorCode, errorMsg) {  
	switch(errorCode){
		case -100:
			alert("上传的文件数量超过限制,请不要超过"+$("#fileField").uploadify('settings','queueSizeLimit')+"个文件");
			break;
		case -110:
			alert("文件   ["+file.name+"]的大小超过限制的"+$("#fileField").uploadify('settings','fileSizeLimit')+"大小");
			break;
		case -120:
			alert("文件   ["+file.name+"]的大小异常");
			break;
		case -130:
			alert("文件   ["+file.name+"]的文件类型不正确");
			break;
		case -140:
			alert("同时上传的最大文件数已经超出限制的"+$("#fileField").uploadify('settings','uploadLimit')+"个文件");
			break;
	}
};  

/**
 * 返回上一级
 */
function goBack(){
	$("#fileField").val("");
	$("#upload_file_btn").removeClass("file");
	$("#delete_folder_btn").hide();
	$("#doc_path").html("全部文件");
	$("#show_doc_list").show();
	$("#show_file_list").hide();
}

/**
 * ajax获取目录列表
 */
function ajaxShowFolderData(){
	var url = getRootPath() + '/teacher/listCourseName';
	var html = '<div id="doc_list_head">'
		+ '<div class="doc_file_name">'
		+ '<div id="selectFolderAll" class="select_file"><img src="../images/teacher/no_select_bg.png"></div>'
		+ '<div class="select_title">课程名称</div>'
		+ '</div>'
		+ '<div class="doc_file_size">文件大小</div>'
		+ '<div class="doc_upd_date">修改时间</div>'
		+ '</div>'
		+ '<div class="doc_data">'
		+ '<div class="doc_data_name">'
		+ '<span class="name_check check_folder" classid="1"></span>'
		+ '<div class="folder_logo"><img src="../images/teacher/folder_logo.png"></div>'
		+ '<div class="file_name">公共目录</div>'
		+ '</div>'
		+ '<div class="doc_data_size"></div>'
		+ '<div class="doc_data_date"></div>'
		+ '</div>';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cashe:false,
		async:false,
		success:function(data){
			
			if(data.status == 0){
				var jsonObj = data.result;
				if(jsonObj.length > 0){
					$.each(jsonObj, function (i, item) {
						html += '<div class="doc_data">'
								+ '<div class="doc_data_name">'
								+ '<span class="name_check check_folder" classid="'+item.courseid+'"></span>'
								+ '<div class="folder_logo"><img src="../images/teacher/folder_logo.png"></div>';
							if(item.courseName.length > 25){
								html += '<div class="file_name" title="'+item.courseName+'">'+item.courseName.substring(0,25)+'...</div>';
							}else{
								html += '<div class="file_name">'+item.courseName+'</div>';
							}
							html += '</div>'
								+ '<div class="doc_data_size"></div>'
								+ '<div class="doc_data_date"></div>'
								+ '</div>';
					});
				}
			}else{
				console.log("查询失败");
			}
		}
	});
	$("#show_doc_list").html(html);
}

/**
 * ajax获取文件列表
 * @param courseId
 */
function ajaxShowFileData(courseId){
	if(courseId == 1){
		courseId = 0;
	}
	var url = getRootPath() + '/teacher/file/list';
	var html = '<div id="doc_list_head">'
		+ '<div class="doc_file_name">'
		+ '<div id="selectFileAll" class="select_file"><img src="../images/teacher/no_select_bg.png"></div>'
		+ '<div class="select_title">文件名</div>'
		+ '</div>'
		+ '<div class="doc_file_size">文件大小</div>'
		+ '<div class="doc_upd_date">修改时间</div>'
		+ '</div>';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'courseid':courseId},
		async:false,
		cache:false,
		success:function(data){
			
			var status = parseInt(data.status);
			if(status == 0){
				var jsonObj = data.result;
				if(jsonObj.length > 0){
					$.each(jsonObj, function (i, item) {
						html += '<div class="doc_data">'
								+ '<div id="'+item.fileid+'" class="doc_data_name">'
								+ '<span class="name_check" classid="'+item.fileid+'"></span>';
							if(item.filename.indexOf(".doc") > 0 || item.filename.indexOf(".docx") > 0)	{
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/word.png"></div>';
							}else if(item.filename.indexOf(".xls") > 0 || item.filename.indexOf(".xlsx") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/excel.png"></div>';
							}else if(item.filename.indexOf(".ppt") > 0 || item.filename.indexOf(".pptx") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/ppt.png"></div>';
							}else if(item.filename.indexOf(".png") > 0 || item.filename.indexOf(".jpg") > 0 || item.filename.indexOf(".jpeg") > 0 || item.filename.indexOf(".gif") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/image.png"></div>';
							}else if(item.filename.indexOf(".mp3") > 0 || item.filename.indexOf(".mp4") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/music.png"></div>';
							}else if(item.filename.indexOf(".pdf") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/pdf.png"></div>';
							}else if(item.filename.indexOf(".avi") > 0 || item.filename.indexOf(".rm") > 0 || item.filename.indexOf(".rmvb") > 0 || item.filename.indexOf(".mpg") > 0 || item.filename.indexOf(".mpeg") > 0){
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/video.png"></div>';
							}else{
								html += '<div class="folder_logo" style="margin-top:23px;"><img src="../images/teacher/file.png"></div>';
							}
							if(item.filename.length > 25){
								html += '<div class="file_name" title="'+item.filename+'">'+item.filename.substring(0, 25)+'...</div>';
							}else{
								html += '<div class="file_name">'+item.filename+'</div>';
							}
							
							html += '<div class="file_opt">'
								+ '<div class="opt_logo"><img src="../images/teacher/file_rename.png" title="重命名" onclick="renameFile(\''+item.fileid+'\',\''+item.filename+'\')"></div>'
								+ '<div class="opt_logo"><a href="'+item.fileUrl+'"><img src="../images/teacher/file_down.png" title="下载"></a></div>'
								+ '<div class="opt_logo"><img src="../images/teacher/file_delete.png" title="删除" onclick="deleteFile(\''+item.fileid+'\')"></div>';
								if(item.displayType == 1){
									html += '<div class="opt_logo" style="margin-top:1px;"><img src="../images/teacher/file_share.png" title="分享" onclick="shareFile(\''+item.fileid+'\')"></div>';
								}else{
									html += '<div class="opt_logo" style="margin-top:1px;"><img src="../images/teacher/cancel_share.png" title="取消分享" onclick="cancelShareFile(\''+item.fileid+'\')"></div>';
								}
								html += '</div>'
									+ '</div>'
									+ '<div class="doc_data_size">'+bytesToSize(item.size)+'</div>'
									+ '<div class="doc_data_date">'+item.lastmodified+'</div>'
									+ '</div>';
					});
				}
			}else{
				console.log("查询文件失败");
			}
		}
	});
	$("#show_file_list").html(html);
	$("#show_file_list").children(".doc_data").hover(function(){
		$(this).children(".doc_data_name").children(".file_opt").show();
	}, function(){
		$(this).children(".doc_data_name").children(".file_opt").hide();
	});
	
	$("#selectFileAll").on("click", function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			$(this).find("img").attr("src", "../images/teacher/no_select_bg.png");
			$("#show_file_list").find("span").removeClass("selected");
			$("#show_file_list").find("span").css("background","url(../images/teacher/no_select_bg.png) no-repeat");
		}else{
			$(this).addClass("selected");
			$(this).find("img").attr("src", "../images/teacher/selected_bg.png");
			$("#show_file_list").find("span").addClass("selected");
			$("#show_file_list").find("span").css("background","url(../images/teacher/selected_bg.png) no-repeat");
		}
		
	});
	
	$("#show_file_list").children(".doc_data").find("span").on("click", function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			$(this).css("background","url(../images/teacher/no_select_bg.png) no-repeat");
			$("#selectFileAll").removeClass("selected");
			$("#selectFileAll").find("img").attr("src", "../images/teacher/no_select_bg.png");
		}else{
			$(this).addClass("selected");
			$(this).css("background","url(../images/teacher/selected_bg.png) no-repeat");
		}
	});
}

/**
 * 文件重命名
 * @param fileId
 * @param fileName
 */
function renameFile(fileId,fileName){
	if(!$("#"+fileId+" .file_name").hasClass("open_rename")){
		//var str = $("#"+fileId+" .file_name").html();
		var html_input = '<input type="text" id="newName" name="newName" value="'+fileName+'">';
		$("#"+fileId+" .file_name").html(html_input);
		
		var html_btn = '<div class="file_opt_btn" onclick="saveRename(\''+fileId+'\',\''+fileName+'\')">保存</div>'
				+ '<div class="file_opt_btn" onclick="cancelRename(\''+fileId+'\',\''+fileName+'\')">取消</div>';
		$("#"+fileId+" .file_name").after(html_btn);
	}
	$("#"+fileId+" .file_name").addClass("open_rename");
}

/**
 * 保存重命名
 * @param fileId
 * @param fileName
 */
function saveRename(fileId, fileName){
	var new_name = $.trim($("#"+fileId+" .file_name").find("input").val());
	if(new_name == null || new_name == ""){
		getDialog("fail", "请输入文件新名称!");
	}else if(new_name == fileName){
		getDialog("fail", "新文件名不能和原文件名一致!");
	}else{
		var url = getRootPath() + '/teacher/renameFile';
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:{'fileid':fileId, 'newName':new_name},
			async:false,
			success:function(data){
				var status = parseInt(data.status);
				if(status == -1){
					getDialog("warn", data.message);
				}else if(status == -2){
					getDialog("fail", "文件重命名失败!");
				}else if(status == 0){
					getDialogCue("success", "操作成功");
					ajaxShowFileData(courseId);
				}else{
					console.log("未知错误");
				}
			}
		});
	}
}

/**
 * 取消重命名
 * @param fileId
 * @param fileName
 */
function cancelRename(fileId, fileName){
	$("#"+fileId+" .file_name").removeClass("open_rename");
	if(fileName.length > 25){
		$("#"+fileId+" .file_name").attr("title", fileName);
		fileName = fileName.substring(0, 25) + "...";
	}
	$("#"+fileId+" .file_name").html(fileName);
	$("#"+fileId).children(".file_opt_btn").remove();
}

/**
 * 删除一个文件
 * @param fileId
 */
function deleteFile(fileId){
	var chk_value = [parseInt(fileId)];
	var url = getRootPath() + '/teacher/deleteFile';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'fileids':chk_value},
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				getDialogCue("success", "删除成功");
				ajaxShowFileData(courseId);
			}else if(status == -1){
				getDialog("fail", "请选择要删除的文件!");
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 分享文件
 * @param fileId
 */
function shareFile(fileId){
	teaDocDialog("share", "文件分享后，学生将在课程页面中可以查看与下载该文件，是否现在分享？");
	$("#dialog_queding_btn").on("click", function(){
		closeDialog();
 	    ajaxShareFile(fileId);
	});
	$("#dialog_cancel_btn").on("click", function(){
		closeDialog();
	});
	
	/*$("#dialog_content").html('文件分享后，学生将在课程页面中可以查看与下载该文件，是否现在分享？');
	$("#shareDialog").dialog({
		modal : true,
		resizable : false,
		draggable : false,
		autoOpen : false,
		position : "center",// 弹出位置
		width : 520, // 窗口宽度
		height : 310,
		buttons: {
		       "是": function() {
		    	   $("#shareDialog").dialog("close");
		    	   ajaxShareFile(fileId);
		       		  },
		       "否": function() {
		    	   		$( this ).dialog( "close" );
		       		  }
		         }
	});
	$("#ui-dialog-title-shareDialog").html("分享");
	$("#shareDialog").dialog("open");*/
}

/**
 * 取消分享
 * @param fileId
 */
function cancelShareFile(fileId){
	teaDocDialog("cancel_share", "文件取消分享后，学生将无法在课程页中看见与下载该文件，是否现在取消分享？");
	$("#dialog_queding_btn").on("click", function(){
		closeDialog();
		ajaxCancelShareFile(fileId);
	});
	$("#dialog_cancel_btn").on("click", function(){
		closeDialog();
	});
	/*$("#dialog_content").html('文件取消分享后，学生将无法在课程页中看见与下载该文件，是否现在取消分享？');
	$("#shareDialog").dialog({
		modal : true,
		resizable : false,
		draggable : false,
		autoOpen : false,
		position : "center",// 弹出位置
		width : 520, // 窗口宽度
		height : 310,
		buttons: {
		       "是": function() {
		    	   $("#shareDialog").dialog("close");
		    	   ajaxCancelShareFile(fileId);
		       		  },
		       "否": function() {
		    	   		$( this ).dialog( "close" );
		       		  }
		         }
	});
	$("#ui-dialog-title-shareDialog").html("取消分享");
	$("#shareDialog").dialog("open");*/
}

function ajaxShareFile(fileId){
	var url = getRootPath() + "/teacher/unLockFile";
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'fileid':fileId},
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				getDialogCue("success", "分享成功!");
				ajaxShowFileData(courseId);
			}else{
				getDialogCue("success", "分享失败!");
			}
		}
	});
}

function ajaxCancelShareFile(fileId){
	var url = getRootPath() + "/teacher/lockFile";
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'fileid':fileId},
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				getDialogCue("success", "取消成功!");
				ajaxShowFileData(courseId);
			}else{
				getDialogCue("success", "取消失败!");
			}
		}
	});
}

function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';

     var k = 1024;

     sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

     i = Math.floor(Math.log(bytes) / Math.log(k));

	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target) {     
	var fileSize = 0;   
	var bool = true;
    if (isIE && !target.files) {      
      var filePath = target.value;      
      var fileSystem = new ActiveXObject("Scripting.FileSystemObject");         
      var file = fileSystem.GetFile (filePath);      
      fileSize = file.Size;     
    } else {     
      fileSize = target.files[0].size;      
    }    
    var size = fileSize / 1024 /1024;     
    if(size>50){
    	target.value = "";
    	bool = false;
    	getDialog("warn", "附件不能大于50M,请重新选择!");
    }
    /*if(target.files.length > 20){
    	target.value = "";
    	bool = false;
    	getDialog("warn", "多课件上传不能超过20个!");
    }
    var fileLength = $("#show_file_list").children(".doc_data").length;
    var fileCount = fileLength + target.files.length;
    if(fileCount > 20){
    	target.value = "";
    	bool = false;
    	getDialog("warn", "课程课件不能超过20个!");
    }*/
    return bool;
}   

function checkFileNameSub(fileName){
	/*var num = fileName.lastIndexOf(".");
	var name = fileName.substring(0, num);
	var extension = fileName.substring(num);*/
	if(name.length > 20){
		
	}
}