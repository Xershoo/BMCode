/**
 * 首页javascript源文件
 */
var html1 = '';
var html2 = '';
var mydate;

$(function(){
	$('.bannerWrap').flicker({
		 auto_flick_delay: 5
	});
	getDate();
	//ajaxGetStartTeacher();
	ajaxGetRecommandCourses();
	ajaxGetCourseBegin();
	ajaxGetNewTeacher();
	
	$("#scanQR").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 380, // 窗口宽度
		height : 360,
		resizable : false
	});
	
	$("#goDownload").on("click", function(){
		location.href = getRootPath() + '/app/download';
	});
	
	$("#banner_title").html("优秀的乐器教育平台<br />专注乐器教学、陪练、才艺展示");
	$("#goDownload").html("<span class=\"flick-block-text\">下载客户端</span>");
	
	$("#allTeacher").on("click", function(){
		var keyWords = $.trim($("#search_blank").val());
		location.href = getRootPath() + '/searchAllTeacher?keyWord=' + encodeURI(encodeURI(keyWords));
	});
	$("#allCourse").on("click", function(){
		location.href= getRootPath() + '/course/searchAll';
	});
});

function ajaxGetRecommandCourses(){
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
					if(jsonObj.length < 5){
						$.each(jsonObj, function (i, item) {
							html += '<div class="course_infor" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+', \''+item.latelyStartTimePlan+'\')">'
							+ '<div id="recom'+item.courseid+'" class="course_img" onmouseenter="courseSlideUp(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+', \''+item.latelyStartTimePlan+'\')"><img src="'+item.coverUrl+'"></div>'
								+ '<div class="course_price">￥'+item.priceTotal+'元</div>'
								+ '<div class="information_course">'
								+ '<div class="course_name" title="'+item.courseName+'">'+cut_str(item.courseName, 10)+'</div>'
								+ '<div class="begin_time">时间: '+item.latelyStartTimePlan+'上课</div>'
								+ '<div class="course_teacher"><div class="teaName">老师: '+item.teacherName+'</div><div class="courseFinish">完成: '+item.finishedclass+'/'+item.totalclass+'</div></div>'
								+ '</div>';
							/*if(item.recordUrl == null || item.recordUrl == ""){
							if(item.courseStatus == 0 || item.courseStatus == 5 || item.courseStatus == 6|| item.courseStatus == 10){
								html += '<div class="zhibo_course">直播</div>';
							}
						}else{
							html += '<div class="lubo_course">录播</div>';
						}*/
						if(item.live){
							html += '<div class="zhibo_course">直播</div>';
						}
								html += '</div>';
						});
						$("#newCourse").children().eq(0).html(html);
					}else{
						$.each(jsonObj, function (i, item) { 
							html += '<div class="course_infor" onmouseleave="courseSlideDown(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+', \''+item.latelyStartTimePlan+'\')">'
							+ '<div id="recom'+item.courseid+'" class="course_img" onmouseenter="courseSlideUp(\''+item.courseid+'\', \''+item.courseName+'\', \''+item.teacherName+'\', '+item.finishedclass+', '+item.totalclass+', \''+item.latelyStartTimePlan+'\')"><img src="'+item.coverUrl+'"></div>'
								+ '<div class="course_price">￥'+item.priceTotal+'元</div>'
								+ '<div class="information_course">'
								+ '<div class="course_name" title="'+item.courseName+'">'+cut_str(item.courseName, 10)+'</div>'
								+ '<div class="begin_time">时间: '+item.latelyStartTimePlan+'上课</div>'
								+ '<div class="course_teacher"><div class="teaName">老师: '+item.teacherName+'</div><div class="courseFinish">完成: '+item.finishedclass+'/'+item.totalclass+'</div></div>'
								+ '</div>';
							/*if(item.recordUrl == null || item.recordUrl == ""){
								if(item.courseStatus == 0 || item.courseStatus == 5 || item.courseStatus == 6|| item.courseStatus == 10){
									html += '<div class="zhibo_course">直播</div>';
								}
							}else{
								html += '<div class="lubo_course">录播</div>';
							}*/
							if(item.live){
								html += '<div class="zhibo_course">直播</div>';
							}
								html += '</div>';
							if(i == 3){
								$("#newCourse").children().eq(0).html(html);
								html = '';
							}else if((i+1) == jsonObj.length){
								$("#newCourse").children().eq(1).html(html);
							}
						});
					}
				}
			
			}
		}
	});
}

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
						if(i < 6){
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
						}
					});
					$("#rightCourseList").html(html);
				}
			}
		}
	});
}

function goToCourseDetail(courseId){
	location.href = getRootPath() + '/course/detail/' + courseId;
}

function ajaxGetStartTeacher(){
	var url = getRootPath() + '/getstarTeachers';
	var html;
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data: {"count":10},
		cache:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var jsonObj = data.teachers;
				if(jsonObj.length > 0){
					var html = '';
					if(jsonObj.length < 6){
						$.each(jsonObj, function (i, item) {
								html += '<div class="teacher_intro" onclick="goToTeacherPage(\''+item.userid+'\')"  onmouseleave="slideDown(\'star\',\''+item.userid+'\',\''+item.headimageUrl+'\',\''+item.realName+'\',\''+item.nickName+'\',\''+item.majorLevel+'\',\''+item.teachYears+'\',\''+item.priceMin+'\',\''+item.description+'\')">'
									+ '<div id="star'+item.userid+'" class="teacher_img" onmouseenter="slideUp(\'star\',\''+item.userid+'\',\''+item.headimageUrl+'\',\''+item.realName+'\',\''+item.nickName+'\',\''+item.majorLevel+'\',\''+item.teachYears+'\',\''+item.priceMin+'\',\''+item.description+'\')"><img src="'+item.largeHeadimge+'"></div>'
									+ '<div class="information">'
									+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
									+ '<div class="teacher_tech">专业度：'+(item.majorLevel==""?+'0':item.majorLevel)+'级 |  教龄：'+item.teachYears+'年</div>'
									+ '<div class="class_price"><span>￥<span>'+item.priceMin+'元</span></span>起</div>'
									+ '</div>'
									+ '</div>';
						});
						$("#startTeacher").children().eq(0).html(html);
					}else{
						$.each(jsonObj, function (i, item) { 
							html += '<div class="teacher_intro" onclick="goToTeacherPage(\''+item.userid+'\')" onmouseleave="slideDown(\'star\',\''+item.userid+'\',\''+item.headimageUrl+'\',\''+item.realName+'\',\''+item.nickName+'\',\''+item.majorLevel+'\',\''+item.teachYears+'\',\''+item.priceMin+'\',\''+item.description+'\')">'
								+ '<div id="star'+item.userid+'" class="teacher_img" onmouseenter="slideUp(\'star\',\''+item.userid+'\',\''+item.headimageUrl+'\',\''+item.realName+'\',\''+item.nickName+'\',\''+item.majorLevel+'\',\''+item.teachYears+'\',\''+item.priceMin+'\',\''+item.description+'\')"><img src="'+item.largeHeadimge+'"></div>'
								+ '<div class="information">'
								+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
								+ '<div class="teacher_tech">专业度：'+(item.majorLevel==""?+'0':item.majorLevel)+'级 |  教龄：'+item.teachYears+'年</div>'
								+ '<div class="class_price"><span>￥<span>'+item.priceMin+'元</span></span>起</div>'
								+ '</div>'
								+ '</div>';
							if(i == 4){
								$("#startTeacher").children().eq(0).html(html);
								html = '';
							}else if((i+1) == jsonObj.length){
								$("#startTeacher").children().eq(1).html(html);
							}
						});
					}
				}
			}
		}
	});
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function makeQrcode(){
	//生成二维码
	$("#scanCode").dialog("close");
	$("#qrcode").html('');
	$("#scanQR").dialog("open");
	var url = "http://piano.class8.com/index";
	$("#scanQR").show();
    $('#qrcode').qrcode({
        height:180,
        width:180,
        text:utf16to8(url)
//	    background:"yellow" ,//背景颜色
//	    foreground:"red"//前景颜色
    });
}

function scanQrcode(){
	$("#scanQR").dialog("close");
	$("#scanCode").dialog({
		modal : false,
		resizable : false,
		draggable : true,
		autoOpen : false,
		position : "center",// 弹出位置
		width : 500, // 窗口宽度
		height : 310
	});
	$("#scanCode").dialog("open");
}

function ajaxGetNewTeacher(){
var url = getRootPath() + '/getnewTeachers';
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data: {"count":10},
		cache:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var jsonObj = data.teachers;
				if(jsonObj.length > 0){
					var html = '';
					if(jsonObj.length < 6){
						$.each(jsonObj, function (i, item) {
							html += '<div class="teacher_intro">';
							if(item.largeHeadimge == null || item.largeHeadimge == "" || item.largeHeadimge.indexOf("null") > 0){
								html += '<div id="new'+item.userid+'" class="teacher_img"><img src="images/course/creatcourse.png" onclick="goToTeacherPage(\''+item.userid+'\')"></div>';
							}else{
								html += '<div id="new'+item.userid+'" class="teacher_img"><img src="'+item.largeHeadimge+'" onclick="goToTeacherPage(\''+item.userid+'\')"></div>';
							}
								//+ '<div id="new'+item.userid+'" class="teacher_img"><img src="'+item.largeHeadimge+'"></div>'
							html += '<div class="information">'
									+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
									+ '<div class="teacher_tech">专业度：'+(item.majorLevel==""?+'0':item.majorLevel)+'级 |  教龄：'+item.teachYears+'年</div>'
									+ '<div class="class_price"><span>￥<span>'+item.priceMin+'元</span></span>起</div>'
									+ '</div>'
									+ '</div>';
						});
						$("#newTeacher").children().eq(0).html(html);
					}else{
						$.each(jsonObj, function (i, item) { 
							html += '<div class="teacher_intro">';
							if(item.largeHeadimge == null || item.largeHeadimge == "" || item.largeHeadimge.indexOf("null") > 0){
								html += '<div id="new'+item.userid+'" class="teacher_img"><img src="images/course/creatcourse.png" onclick="goToTeacherPage(\''+item.userid+'\')"></div>';
							}else{
								html += '<div id="new'+item.userid+'" class="teacher_img"><img src="'+item.largeHeadimge+'" onclick="goToTeacherPage(\''+item.userid+'\')"></div>';
							}
								//+ '<div id="new'+item.userid+'" class="teacher_img"><img src="'+item.largeHeadimge+'"></div>'
							html += '<div class="information">'
								+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
								+ '<div class="teacher_tech">专业度：'+(item.majorLevel==""?+'0':item.majorLevel)+'级 |  教龄：'+item.teachYears+'年</div>'
								+ '<div class="class_price"><span>￥<span>'+item.priceMin+'元</span></span>起</div>'
								+ '</div>'
								+ '</div>';
							if(i == 4){
								$("#newTeacher").children().eq(0).html(html);
								html = '';
							}else if((i+1) == jsonObj.length){
								$("#newTeacher").children().eq(1).html(html);
							}
						});
					}
				}
			}
		}
	});
}

function slideUp(type,userid,headimageUrl,realName,nickName,majorLevel,teachYears,priceMin,description){
	var html = '<div class="teacher_head_up"><img src="'+headimageUrl+'"></div>'
		+ '<div class="teacher_name_up">'+realName+'（'+nickName+'）</div>'
		+ '<div class="teacher_tech" style="color:#fff;">专业度：'+(majorLevel==""?+'0':majorLevel)+'级 |  教龄：'+teachYears+'年</div>'
		+ '<div class="class_price" style="color:#fff;"><span>￥<span>'+priceMin+'元</span></span>起</div>'
		+ '<div class="up_line"></div>'
		+ '<div class="teacher_intro_up">'+subStringDesc(description)+'</div>';
	if(type == "star"){
		$("#star"+userid).next().html(html);
		$("#star"+userid).next().stop();
		$("#star"+userid).next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-180px",height:"100%"});
	}
	if(type == "new"){
		$("#new"+userid).next().html(html);
		$("#new"+userid).next().stop();
		$("#new"+userid).next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-180px",height:"100%"});
	} 
}

function courseSlideUp(courseId, courseName, teacherName, finishedclass, totalclass, latelyStartTimePlan){
	//var html = '';
	/*if(recordUrl == null || recordUrl == ""){
		html += '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">报名</div>';
	}else{
		html += '<div class="course_baoming" onclick="goToVideoOnline(\''+courseId+'\')">点播</div>';
	}*/
	var html = '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">详情</div>'
	   html += '<div class="information_course" style="margin-top:38px;">'
			+ '<div class="course_name" style="color:#fff;" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
			+ '<div class="begin_time" style="color:#fff;">时间: '+latelyStartTimePlan+'上课</div>'
			+ '<div class="course_teacher" style="color:#fff;"><div class="teaName">老师: '+teacherName+'</div><div class="courseFinish">完成: '+finishedclass+'/'+totalclass+'</div></div>'
			+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-148px",height:"100%"});
}

function entryCourse(courseId,courseStatus){
	if(courseStatus == 40){
		alert("该课程已经结算完成,不能报名.");
		return;
	}else if(courseStatus == 0){
		alert("该课程还未开始报名.");
		return;
	}else if(courseStatus == 6){
		alert("该课程报名已经结束,请另选其它课程.");
		return;
	}else if(courseStatus == 7){
		alert("该课程已经被取消.");
		return;
	}else if(courseStatus == 10){
		alert("该课程已经开始上课,不能报名.");
		return;
	}else if(courseStatus == 5){
		var url = getRootPath() + "/student/toPayCourse/" + courseId;
		location.href = url;
	}else{
		alert("该课程不能报名.");
		return;
	}
	
}

function slideDown(type,userid,headimageUrl,realName,nickName,majorLevel,teachYears,priceMin,description){
	var html = '<div class="teacher_name">'+realName+'（'+nickName+'）<span><img src="../images/index/letter.png"></span></div>'
		+ '<div class="teacher_tech">专业度：'+(majorLevel==""?+'0':majorLevel)+'级 |  教龄：'+teachYears+'年</div>'
		+ '<div class="class_price"><span>￥<span>'+priceMin+'元</span></span>起</div>';
	if(type == "star"){
		$("#star"+userid).next().html(html);	
		$("#star"+userid).next().stop();
		$("#star"+userid).next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"109px"});
	}
	if(type == "new"){
		$("#new"+userid).next().html(html);	
		$("#new"+userid).next().stop();
		$("#new"+userid).next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"109px"});
	}
}

function courseSlideDown(courseId, courseName, teacherName, finishedclass, totalclass, latelyStartTimePlan){
	var html = '<div class="information_course">'
		+ '<div class="course_name" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
		+ '<div class="begin_time">时间: '+latelyStartTimePlan+'上课</div>'
		+ '<div class="course_teacher"><div class="teaName">老师: '+teacherName+'</div><div class="courseFinish">完成: '+finishedclass+'/'+totalclass+'</div></div>'
		+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"91px"});
}

function subStringDesc(str){
	var result = '';
	if(str == null || str == ""){
		return result;
	}else{
		if(str.length > 55){
			result = str.substring(0,55) + "...";
			return result;
		}else{
			return str;
		}
	}
}

function goToTeacherPage(userId){
	location.href = getRootPath() + '/infocenter/teacher/' + userId;
}

function goToVideoOnline(courseId){
	location.href = getRootPath() + '/course/view/' + courseId;
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

function get_length(s){
    var char_length = 0;
    for (var i = 0; i < s.length; i++){
        var son_char = s.charAt(i);
        encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
    }
    return char_length;
}

