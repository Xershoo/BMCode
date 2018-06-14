/**
 * 
 */

var myCoursesCount = 0;
var myCreateCount = 0;
var userId;

$(function(){
	userId = $("#userId").val();
	ajaxGetMyCoursesCount();
	
	$(".headCommon").on("click", function(){
		if($(this).html() == "我的创建"){
			if(!$("#myCreate").hasClass("activeCommon")){
				$.ajax({
					url:getRootPath() + '/client/getauthteacherinfo',
					type:'post',
					data:{'userId':userId},
					dataType:'json',
					async:false,
					cache:false,
					success:function(data){
						var status = parseInt(data.status);
						if(status == 0){
							$("#myCreate").addClass("activeCommon");
							$("#myCourses").removeClass("activeCommon");
							ajaxGetMyCreateCount();
						}else{
							alert("未认证老师,请先认证.");
						}
					}
				});
			}
		}else{
			if(!$("#myCourses").hasClass("activeCommon")){
				$("#myCourses").addClass("activeCommon");
				$("#myCreate").removeClass("activeCommon");
				ajaxGetMyCoursesCount();
			}
		}
	});
	
	$("#clientCreateCourseLink").on("click", function(){
		getAuthCertificate();
	});
});

function getAuthCertificate(){
	var url=getRootPath()+"/teacher/getauthteacherinfo";
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			var url = '';
			if(data.status == -1){
				alert("请登录后重试！");
				url = getRootPath() + "/index";
				window.open(url, "_blank");
			}else if(data.status == 1){
				url = getRootPath() + '/teacher/techCertification';
				window.open(url, "_blank");
			}else if(data.status == 0){
				 url = getRootPath() + '/teacher/course/create';
				 window.open(url, "_blank");
			}
		}
	})
}

function ajaxGetMyCoursesCount(){
	var url = getRootPath() + '/client/myCourse';
	$.ajax({
		url:url,
		type:'post',
		data:{'userId':userId},
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			if(data.success){
				myCoursesCount = data.result.total;
				$(".coursesListMain").html("");
				if(myCoursesCount != 0){
					ajaxGetMyCourses();
				}
			}
		}
	});
}

function  ajaxGetMyCreateCount(){
	var url = getRootPath() + '/client/myCreate';
	$.ajax({
		url:url,
		type:'post',
		data:{'userId':userId},
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			if(data.success){
				myCreateCount = data.result.total;
				$(".coursesListMain").html("");
				if(myCreateCount != 0){
					ajaxGetMyCreate();
				}
			}
		}
	});
}

function ajaxGetMyCourses(){
	$("#createPage").css("display", "none");
	$("#coursesPage").css("display", "block");
	var pageNum = Math.ceil(myCoursesCount/8);
	var pageSize = 0;

	if(pageNum <= 1){
		var url = getRootPath() + '/client/myCourse';
		var html = '';
		$.ajax({
			url:url,
			type:'post',
			data:{'userId':userId},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.success){
					var jsonObj = data.result.list;
					if(jsonObj.length > 0){
						var html = '';
							$.each(jsonObj, function (i, item) {
								html += '<div class="courseInfo">'
									+ '<div class="coverImg"><img src="'+item.coverUrl+'"></div>'
									+ '<div class="courseInfoBasic">'
									+ '<div class="courseName" title="'+item.courseName+'">'+cut_str(item.courseName, 40)+'</div>'
									+ '<div class="proAndStu">'
									+ '<div class="proImg"><img src="/images/piano_teacher/progress.gif"></div>'
									+ '<div class="infoVal">课程进度：'+item.classHadFinished+'/'+item.classTotal+'</div>'
									+ '<div class="stuImg"><img src="/images/piano_teacher/apply.gif"></div>'	
									+ '<div class="infoVal">报名学生：'+item.countStudent+'/'+item.nMaxStudents+'</div>'	
									+ '</div>'
									+ '<div class="courseTime">'	
									+ '<div class="timeImg"><img src="/images/piano_teacher/time.gif"></div>'
									+ '<div class="infoVal">课程时间：'+item.signupTime+'</div>'
									+ '</div></div>'	
									+ '<div class="coursePrice">￥'+item.price_total+'</div>'	
									+ '<div class="courseOpt">';
								if(item.courseStatus == 5){
									 html += '<div class="opt_status">报名中</div>';
								 }else  if(item.courseStatus == 0){
									 html += '<div class="opt_status">未报名</div>';
								 }else  if(item.courseStatus == 7){
									 html += '<div class="opt_status">已取消</div>';
								 }else  if(item.courseStatus == 10){
									 html += '<div class="opt_status">正在上课</div>';
								 }else{
									 html += '<div class="opt_status">已开课</div>';
								 }
							html += '<div class="opt_info" onclick="goToInfoPage(\''+item.courseid+'\')">查看详情</div>'
									+ '<div class="opt_enterClass" onclick="tests(\''+item.canEnterClassid+'\',\''+item.courseid+'\')">进入课堂</div>'
									+ '</div></div>';
							});
							$(".coursesListMain").html(html);
					}
				
				}
			}
		});
	}else{
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#coursesPage").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackCoursesData',
	    		url:getRootPath()+'/client/myCourse',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:8,userId:userId}
	    	}
	    });
	}
}

function callBackCoursesData(data){
	var result = eval("("+data+")");
	
	if(result.success){
		var jsonObj = result.result.list;
		if(jsonObj.length > 0){
			var html = '';
				$.each(jsonObj, function (i, item) {
					html += '<div class="courseInfo">'
						+ '<div class="coverImg"><img src="'+item.coverUrl+'"></div>'
						+ '<div class="courseInfoBasic">'
						+ '<div class="courseName" title="'+item.courseName+'">'+cut_str(item.courseName, 40)+'</div>'
						+ '<div class="proAndStu">'
						+ '<div class="proImg"><img src="/images/piano_teacher/progress.gif"></div>'
						+ '<div class="infoVal">课程进度：'+item.classHadFinished+'/'+item.classTotal+'</div>'
						+ '<div class="stuImg"><img src="/images/piano_teacher/apply.gif"></div>'	
						+ '<div class="infoVal">报名学生：'+item.countStudent+'/'+item.nMaxStudents+'</div>'	
						+ '</div>'
						+ '<div class="courseTime">'	
						+ '<div class="timeImg"><img src="/images/piano_teacher/time.gif"></div>'
						+ '<div class="infoVal">课程时间：'+item.signupTime+'</div>'
						+ '</div></div>'	
						+ '<div class="coursePrice">￥'+item.price_total+'</div>'	
						+ '<div class="courseOpt">';
						if(item.courseStatus == 5){
							 html += '<div class="opt_status">报名中</div>';
						 }else  if(item.courseStatus == 0){
							 html += '<div class="opt_status">未报名</div>';
						 }else  if(item.courseStatus == 7){
							 html += '<div class="opt_status">已取消</div>';
						 }else  if(item.courseStatus == 10){
							 html += '<div class="opt_status">正在上课</div>';
						 }else{
							 html += '<div class="opt_status">已开课</div>';
						 }
					html += '<div class="opt_info" onclick="goToInfoPage(\''+item.courseid+'\')">查看详情</div>'
						+ '<div class="opt_enterClass" onclick="tests('+item.canEnterClassid+','+item.courseid+')">进入课堂</div>'
						+ '</div></div>';
				});
				$(".coursesListMain").html(html);
		}
	
	}
}

function ajaxGetMyCreate(){
	$("#coursesPage").css("display", "none");
	$("#createPage").css("display", "block");
	var pageNum = Math.ceil(myCreateCount/8);
	var pageSize = 0;

	if(pageNum <= 1){
		var url = getRootPath() + '/client/myCreate';
		var html = '';
		$.ajax({
			url:url,
			type:'post',
			data:{'userId':userId},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.success){
					var jsonObj = data.result.list;
					if(jsonObj.length > 0){
						var html = '';
							$.each(jsonObj, function (i, item) {
								html += '<div class="courseInfo">'
									+ '<div class="coverImg"><img src="'+item.coverUrl+'"></div>'
									+ '<div class="courseInfoBasic">'
									+ '<div class="courseName" title="'+item.courseName+'">'+cut_str(item.courseName, 40)+'</div>'
									+ '<div class="proAndStu">'
									+ '<div class="proImg"><img src="/images/piano_teacher/progress.gif"></div>'
									+ '<div class="infoVal">课程进度：'+item.classHadFinished+'/'+item.classTotal+'</div>'
									+ '<div class="stuImg"><img src="/images/piano_teacher/apply.gif"></div>'	
									+ '<div class="infoVal">报名学生：'+item.totalSignupStudent+'/'+item.nMaxStudents+'</div>'	
									+ '</div>'
									+ '<div class="courseTime">'	
									+ '<div class="timeImg"><img src="/images/piano_teacher/time.gif"></div>'
									+ '<div class="infoVal">课程时间：'+item.startTimePlan+'</div>'
									+ '</div></div>'	
									+ '<div class="coursePrice">￥'+item.price_total+'</div>'	
									+ '<div class="courseOpt">';
								if(item.courseStatus == 5){
									 html += '<div class="opt_status">报名中</div>';
								 }else  if(item.courseStatus == 0){
									 html += '<div class="opt_status">未报名</div>';
								 }else  if(item.courseStatus == 7){
									 html += '<div class="opt_status">已取消</div>';
								 }else  if(item.courseStatus == 10){
									 html += '<div class="opt_status">正在上课</div>';
								 }else{
									 html += '<div class="opt_status">已开课</div>';
								 }
								html += '<div class="opt_info" onclick="goToInfoPage(\''+item.courseid+'\')">查看详情</div>'
								+ '<div class="opt_enterClass" onclick="tests('+item.canEnterClassid+','+item.courseid+')">进入课堂</div>'
								+ '</div></div>';
							});
							$(".coursesListMain").html(html);
					}
				
				}
			}
		});
	}else{
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#createPage").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackCreateData',
	    		url:getRootPath()+'/client/myCreate',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:8,userId:userId}
	    	}
	    });
	}
}

function callBackCreateData(data){

	var result = eval("("+data+")");
	
	if(result.success){
		var jsonObj = result.result.list;
		if(jsonObj.length > 0){
			var html = '';
				$.each(jsonObj, function (i, item) {

					html += '<div class="courseInfo">'
						+ '<div class="coverImg"><img src="'+item.coverUrl+'"></div>'
						+ '<div class="courseInfoBasic">'
						+ '<div class="courseName" title="'+item.courseName+'">'+cut_str(item.courseName, 40)+'</div>'
						+ '<div class="proAndStu">'
						+ '<div class="proImg"><img src="/images/piano_teacher/progress.gif"></div>'
						+ '<div class="infoVal">课程进度：'+item.classHadFinished+'/'+item.classTotal+'</div>'
						+ '<div class="stuImg"><img src="/images/piano_teacher/apply.gif"></div>'	
						+ '<div class="infoVal">报名学生：'+item.totalSignupStudent+'/'+item.nMaxStudents+'</div>'	
						+ '</div>'
						+ '<div class="courseTime">'	
						+ '<div class="timeImg"><img src="/images/piano_teacher/time.gif"></div>'
						+ '<div class="infoVal">课程时间：'+item.startTimePlan+'</div>'
						+ '</div></div>'	
						+ '<div class="coursePrice">￥'+item.price_total+'</div>'	
						+ '<div class="courseOpt">';
					if(item.courseStatus == 5){
						 html += '<div class="opt_status">报名中</div>';
					 }else  if(item.courseStatus == 0){
						 html += '<div class="opt_status">未报名</div>';
					 }else  if(item.courseStatus == 7){
						 html += '<div class="opt_status">已取消</div>';
					 }else  if(item.courseStatus == 10){
						 html += '<div class="opt_status">正在上课</div>';
					 }else{
						 html += '<div class="opt_status">已开课</div>';
					 }
					html += '<div class="opt_info" onclick="goToInfoPage(\''+item.courseid+'\')">查看详情</div>'
					+ '<div class="opt_enterClass" onclick="tests('+item.canEnterClassid+','+item.courseid+')">进入课堂</div>'
					+ '</div></div>';
				});
				$(".coursesListMain").html(html);
		}
	}
}

function goToInfoPage(courseId){
	var url = getRootPath() + '/course/detailClient/' + courseId;
	//window.open(url,"newwindow","height=750, width=1280, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=no");
	window.open(url, "_blank");
}

function updateCourse(courseId){
	var url = getRootPath() + '/teacher/course/update/'+courseId;
	//window.open(url,"newwindow","height=750, width=1280, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=no");
	window.open(url, "_blank");
}

function subCourseName(name){
	var result="";
	if(name == null || name == ""){
		return "无";
	}else{
		if(name.length > 40){
			result = name.substring(0, 40) + "...";
		}else{
			result = name;
		}
	}
	return result;
}