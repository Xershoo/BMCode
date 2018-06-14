/**
 * 
 */

var coursesCount = 0;
var mydate;

$(function(){
	$('.bannerWrap').flicker({
		 auto_flick_delay: 5,
		 arrows:false,
		 dot_navigation:false
	});
	getDate();
	ajaxGetCourseBegin();
	ajaxGetRecommandCoursesCount();
});

function ajaxGetCourseBegin(){
	var url = getRootPath() + '/course/getWillBeginCourses';
	var html = '';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var list = data.result.list;
				if(list.length > 0){
					$.each(list, function (i, item) {
							if(i == 0){
								html += '<div class="right_course_main" style="margin-top:10px;">';
							}else{
								html += '<div class="right_course_main">';
							}
							
							html += '<div class="course_bg" onclick="goToCourseDetail(\''+item.courseid+'\')"><img src="'+item.coverUrl+'" ></div>'
								+ '<div class="right_course_name" title="'+item.courseName+'" onclick="goToCourseDetail(\''+item.courseid+'\')">'+cut_str(item.courseName, 9)+'</div>'
								+ '<div class="course_begin_time">'+handleDate(item.latelyStartTimePlan)+'</div>'
								+ '<div class="arrow-right"></div>'
								+ '<div class="clock_dot"><img src="/images/index/dot.png" ></div>'
								+ '</div>';
					});
					$("#rightCourseList").html(html);
				}
			}
		}
	});
}

function ajaxGetRecommandCoursesCount(){
	var url = getRootPath() + '/course/getRecommendCourses';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == 0){
				coursesCount = data.result.total;
				ajaxGetRecommandCourses();
			}
		}
	});
}

function ajaxGetRecommandCourses(){
	if(coursesCount == 0){
		return;
	}
	var pageNum = Math.ceil(coursesCount/8);
	var pageSize = 0;
	if(pageNum <= 1){
		var url = getRootPath() + '/course/getRecommendCourses';
		var html = '';
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				if(status == 0){
					var jsonObj = data.result.list;
					if(jsonObj.length > 0){
						var html = '';
							$.each(jsonObj, function (i, item) {
								if((i+1)%4==0){
									html += '<div class="course_infor" style="margin-right:0px;" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')">';
								}else{
									html += '<div class="course_infor" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')">';
								}
								
								html += '<div id="recom'+item.courseid+'" class="course_img" onmouseenter="courseSlideUp(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')"><img src="'+item.coverUrl+'"></div>'
									+ '<div class="course_price">￥'+item.priceTotal+'</div>'
									+ '<div class="information_course">'
									+ '<div class="course_name" title="'+item.courseName+'">'+cut_str(item.courseName, 10)+'</div>'
									+ '<div class="begin_time">completed: '+item.finishedclass+'/'+item.totalclass+'</div>'
									+ '<div class="course_teacher">instructor: '+item.teacherName+'</div>'
									+ '</div>';
							if(item.live){
								html += '<div class="zhibo_course">直播</div>';
							}
									html += '</div>';
							});
							$("#client_courses_list").html(html);
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
	    		url:getRootPath()+'/course/getRecommendCourses',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:8}
	    	}
	    });
	}
	
}

function callBackCoursesData(data){
	var result = eval("("+data+")");
	var status = parseInt(result.status);

	var jsonObj = result.result.list;
	if(jsonObj.length > 0){
		var html = '';
			$.each(jsonObj, function (i, item) {
				if((i+1)%4==0){
					html += '<div class="course_infor" style="margin-right:0px;" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')">';
				}else{
					html += '<div class="course_infor" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')">';
				}
				
				html += '<div id="recom'+item.courseid+'" class="course_img" onmouseenter="courseSlideUp(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+')"><img src="'+item.coverUrl+'"></div>'
					+ '<div class="course_price">￥'+item.priceTotal+'</div>'
					+ '<div class="information_course">'
					+ '<div class="course_name" title="'+item.courseName+'">'+cut_str(item.courseName, 10)+'</div>'
					+ '<div class="begin_time">completed: '+item.finishedclass+'/'+item.totalclass+'</div>'
					+ '<div class="course_teacher">instructor: '+item.teacherName+'</div>'
					+ '</div>';
			if(item.live){
				html += '<div class="zhibo_course">直播</div>';
			}
					html += '</div>';
			});
			$("#client_courses_list").html(html);
	}
}

function courseSlideUp(courseId, courseName, teacherName, finishedclass, totalclass){
	var html = '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">detail</div>';
	   html += '<div class="information_course" style="margin-top:38px;">'
			+ '<div class="course_name" style="color:#fff;" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
			+ '<div class="begin_time" style="color:#fff;">completed: '+finishedclass+'\/'+totalclass+'</div>'
			+ '<div class="course_teacher" style="color:#fff;">instructor: '+teacherName+'</div>'
			+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-148px",height:"100%"});
}

function courseSlideDown(courseId, courseName, teacherName, finishedclass, totalclass){
	var html = '<div class="information_course">'
		+ '<div class="course_name" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
		+ '<div class="begin_time">completed: '+finishedclass+'\/'+totalclass+'</div>'
		+ '<div class="course_teacher">instructor: '+teacherName+'</div>'
		+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"90px"});
}

function subCourseName(name){
	if(name == "" || name == null){
		return "无";
	}else{
		var result;
		if(name.length > 9){
			result = name.substring(0,9) + "...";
		}else{
			result = name;
		}
		return result;
	}
}

//获取服务器时间
function getDate() {
	$.ajax({
		url : getRootPath() + "/getCurTime",// 后端需要给的接口
		type : "post",
		dataType : "text",
		success : function(data) {
			//mydate = data;
			 var date = new Date(data);
			 if((date.getMonth()+1) < 10){
				 mydate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
			 }else{
				 mydate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			 }
		}
	})
}

function handleDate(date){
	if(date == null || date == ""){
		return "";
	}
	var result = '';
	var curYear = parseInt(mydate.substring(0,4));
	var curMonth = parseInt(mydate.substring(5,7));
	var curDay = parseInt(mydate.substring(8,10));

	var paramYear = parseInt(date.substring(0,4));
	var paramMonth = parseInt(date.substring(5,7));
	var paramDay = parseInt(date.substring(8,10));
	var paramTime = date.substring(11,16);
	
	if(curYear == paramYear){
		if(paramMonth == curMonth){
			if(curDay == paramDay){
				result = '今天' + paramTime;
			}else if((paramDay-curDay) == 1){
				result = '明天' + paramTime;
			}else if((paramDay-curDay) == 2){
				result = '后天' + paramTime;
			}else{
				result = (paramDay-curDay) + '天后' + paramTime;
			}
		}else{
			result = (paramMonth-curMonth) + '月后' + paramTime;
		}
	}else{
		result = (paramYear-curYear) + '年后' + paramTime;
	}
	return result;
}

function goToVideoOnline(courseId){
	var url = getRootPath() + '/course/view/' + courseId;
	window.open(url, "_blank");
}

function goToCourseDetail(courseId){
	var url = getRootPath() + '/course/detailClient/' + courseId;
	window.open(url, "_blank");
}