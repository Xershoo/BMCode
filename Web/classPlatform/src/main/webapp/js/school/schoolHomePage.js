/**
 * school home page javascript sourcefile
 */
var sign_datas;
var teachers_data;
$(function() {
	getExcellentCourses();
	getStarTeachers();
	getSchoolBulletin();
	$(".c_btn").on("mouseover",function(){
		$(this).css("background","#0e92e9");
	}).on("mouseout",function(){
		$(this).css("background","#37A7F3");
	});
	$("#directMsg").on("mouseover",function(){
		$(this).css("background","rgb(255,185,51)");
	}).on("mouseout",function(){
		$(this).css("background","#ffa800");
	});
	$("#dressUpHome").on("mouseover",function(){
		$(this).css("background","#39ae4e");
	}).on("mouseout",function(){
		$(this).css("background","#3EB952");
	});
	
	$("#editInfo").on("mouseover",function(){
		$(this).css("background","#bb7100");
	}).on("mouseout",function(){
		$(this).css("background","#e08900");
	});
	
	$("#directMsg").on("click",function(){
		var uid = $("#uid").val();
		var realName = $("#realName").val();
		var nickName = $("#nickName").val();
		location.href=getRootPath() + "/message/message?type=5&uid="+uid+"&realname="+encodeURI(encodeURI(realName))+"&nickname="+encodeURI(encodeURI(nickName));
	})
	
	var homePageUrl = $("#homePageUrl").val();
	if(homePageUrl != null && homePageUrl != ""){
		$(".th_top").css("background","url('"+homePageUrl+"') repeat-x");
	}
	
	$("#mainPage").addClass("school_rm_info");
	
	$("#mainPage").on("click", function() {
		$("#basicInfo").show();
		$("#pageContent").show();
		$("#coursesInfo").hide();
		$("#teamsInfo").hide();
		$("#allCourses").addClass("school_info");
		$("#allCourses").removeClass("school_rm_info");
		$("#teachersTeam").addClass("school_info");
		$("#teachersTeam").removeClass("school_rm_info");
		$(this).addClass("school_rm_info");
		getExcellentCourses();
		getStarTeachers();
	});
	
	$("#allCourses").on("click", function() {
		$("#coursesInfo").show();
		$("#basicInfo").hide();
		$("#pageContent").hide();
		$("#teamsInfo").hide();
		$("#mainPage").addClass("school_info");
		$("#mainPage").removeClass("school_rm_info");
		$("#teachersTeam").addClass("school_info");
		$("#teachersTeam").removeClass("school_rm_info");
		$(this).addClass("school_rm_info");
		getAllCourses();
	});
	
	
	$("#teachersTeam").on("click", function() {
		$("#teamsInfo").show();
		$("#coursesInfo").hide();
		$("#basicInfo").hide();
		$("#pageContent").hide();
		$("#allCourses").addClass("school_info");
		$("#allCourses").removeClass("school_rm_info");
		$("#mainPage").addClass("school_info");
		$("#mainPage").removeClass("school_rm_info");
		$(this).addClass("school_rm_info");
		getAllTeacher();
	});
	
	$("#editInfo").on("click",function(){
		var url = getRootPath() + "/teacher/gethadauthteacher";
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			success:function(data){
				if(data.status == -1){
					alert("请登录后再试");
					location.href = getRootPath() + "/index";
				}else if(data.status == -2){
					alert("您还没有申请认证成为老师，请先去认证");
					location.href = getRootPath() + "/teacher/techCertification";
				}else if(data.status >= 0){
					var current_time = getCurentTime();
					$("#sch_id").val($("#schoolId").val());
					$("#s_name").html($("#schoolName").val());
					$("#apply_school").dialog("open");
					$("#current_time").html(current_time);
				}else{
					alert("查询认证失败！");
					location.href = getRootPath() + "/school/center";
					
				}
			}
		})
	})
	
	$("#createCourse").on("click",function(){
		location.href = getRootPath() + "/course/create";
	})
	
	$("#createHotCourse").on("click",function(){
		location.href = getRootPath() + "/course/create";
	})
	$("#dressUpHome").on("click",function(){
		location.href = getRootPath() + "/school/basicInfo";
	})
	$("#apply_school").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 510, // 窗口宽度
		height : 280,
		minWidth : 200,
		minHeight : 200,
		buttons : {
			"确定" : function() {
				
				ajaxApplySchool();
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	
	/*			campus bulletin 		*/
	$("#viewCampusBulletin").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 510, // 窗口宽度
		height : 400,
		minHeight : 200,
		resizable : false
	});
	/*			campus bulletin 		*/
})

function getSchoolBulletin(){
	$(".b_more p").remove();
	var uid = $("#schoolId").val();
	var url=getRootPath()+"/infocenter/school/getMessages";
	$.ajax({
		url:url,
		type:'post',
		data:{"schoolId":uid},
		dataType:'json',
		success:function(data){
			var html = '';
			if(data.status == 0){
				var datas = data.result.list;
				if(datas != undefined && datas.length > 0){
					$.each(datas,function(i, item){
//						if(item.linkUrl == null || item.linkUrl == ""){
							if(item.title.length > 15){
								html += '<a onClick="viewCampusBulletin('+item.messageid+')" title="'+item.title+'" class="view_bulletin"><img alt="" src="../../images/school/spot.png" title="spot" class="s_spot">'+item.title.substring(0,14)+' ···</a>';
							}else{
								html += '<a onClick="viewCampusBulletin('+item.messageid+')" title="'+item.title+'" class="view_bulletin"><img alt="" src="../../images/school/spot.png" title="spot" class="s_spot">'+item.title+'</a>';
							}
//						}else{
//							if(item.title.length > 15){
//								html += '<a href='+item.linkUrl+' title="'+item.title+'" class="view_bulletin" target="view_window"><img alt="" src="../../images/school/spot.png" title="spot" class="s_spot">'+item.title.substring(0,14)+' ···</a>';
//							}else{
//								html += '<a href='+item.linkUrl+' title="'+item.title+'" class="view_bulletin" target="view_window"><img alt="" src="../../images/school/spot.png" title="spot" class="s_spot">'+item.title+'</a>';
//							}
//						}
					})
				}else{
					html += '<p class="sl_bullet">还没有公告，赶紧去发布公告吧~</p>';
				}
			}else{
				html += '<p class="sl_bullet">还没有公告，赶紧去发布公告吧~</p>';
			}
			$(".b_more").append(html);
		}
	})
	
}

function viewCampusBulletin(messageId){
	var url=getRootPath()+"/infocenter/school/message/" + messageId;
	$.ajax({
		url:url,
		type:'post',
		data:{"messageid":messageId},
		dataType:'json',
		success:function(data){
			if(data.success == true){
				var message = data.message;
				if(message.linkUrl == null || message.linkUrl == ''){
					$("#viewCampusBulletin").dialog("open");
					var publishTime = message.publishTime + " 发布";
					$("#adTitle").html(message.title);
					$(".ad_pub_time").html(publishTime);
					$(".ad_info").html(message.content);
				}else{
					if(message.linkUrl.substring(0,7) == 'http://' || message.linkUrl.substring(0,8) == 'https://'){
						window.open(message.linkUrl,'newwindow');
					}else{
						window.open("http://"+message.linkUrl,'newwindow');
					}
				}
			}else{
				getDialog("fail", "获取该公告详情失败，请重试");
				setTimeout('location.href = getRootPath() + "/infocenter/school/"+$("#schoolId").val()',3000) ;
//				location.href = getRootPath() + "/infocenter/school/"+$("#schoolId").val();
			}
		}
	})
}

/**
 * 精品课程
 */
function getExcellentCourses(){
	$("#newCourses .c_info").remove();
	var uid = $("#schoolId").val();
	var url=getRootPath()+"/infocenter/school/getHotCourses";
	$.ajax({
		url:url,
		type:'post',
		data:{"schoolId":uid},
		dataType:'json',
		success:function(data){
			if(data.status == 0){
				var courses = data.result;
				var html = '';
				if(courses.length > 0){
					$.each(courses,function(i, item){
						html += '<div class="c_info" onClick="goCourseDtl('+item.courseid+')">';
						html += '<div class="main_img">';
						if(item.coverUrl == null || item.coverUrl == ''){
							html += '<img alt="" src="../images/teacher/mask.png" class="c_img">';
						}else{
							html += '<img alt="" src='+item.coverUrl+' class="c_img">';
						}
						html += '</div>';
						var courseName = item.courseName;
						if(item.courseName.length > 10){
							html += '<p class="cor_name" title='+courseName+'>'+item.courseName.substr(0,9)+'...</p>';
						}else{
							html += '<p class="cor_name" title='+courseName+'>'+item.courseName+'</p>';
						}
					
						if(item.teacherName != null && item.teacherName != ''){
								html += '<p class="sl_cp" title='+item.teacherName+'>'+item.teacherName+ ' 老师</p>';
						}else{
							html += '<p class="sl_cp">暂无老师~</p>';
						}
						html += '<p>';
						if(item.priceTotal == null || item.priceTotal == ''){
							html += '<span class="free">免费</span>';
						}else{
							html += '<span class="c_price">￥ '+item.priceTotal+'</span>&nbsp;&nbsp;<span class="newP">￥'+item.priceTotal+'</span>';
						}
						html += '</p>';
						html += '</div>';
					})
					$("#newCourses").append(html);
				}else{
					$("#goCreateCor").show();
				}
			}else{
				$("#goCreateCor").show();
			}
		}
	})
}

/**
 * 明星老师
 */
function getStarTeachers(){
	$("#hotCourses .teacher_info").remove();
	var uid = $("#schoolId").val();
	var url=getRootPath()+"/infocenter/school/getStarTeachers";
	$.ajax({
		url:url,
		type:'post',
		data:{"schoolId":uid},
		dataType:'json',
		success:function(data){
			if(data.status == 0){
				var teachers = data.result;
				var html = '';
				if(teachers.length > 0){
					$.each(teachers,function(i, item){
						html += '<div class="teacher_info" onClick="goTeacherDtl('+item.teacherUid+')">';
						if(item.avatarUrl == null || item.avatarUrl == ''){
							if(item.sex == 1){
								html += '<img alt="" src="../images/teacher/male_teacher.png" class="th_star">';
							}else{
								html += '<img alt="" src="../images/teacher/female_teacher.png" class="th_star">';
							}
						}else{
							html += '<img alt="" src='+item.avatarUrl+' class="th_star">';
						}
						html += '<p class="th_name">'+item.realName+'</p>';
//						html += '<p class="th_name">'+isVerifyNull(item.occupation)+'</p>';
						html += '<p class="th_cor">'+item.teachYears+'年教龄</p>';
						html += '</div>';
					})
					$("#hotCourses").append(html);
				}else{
					$("#goCreateHotCor").show();
				}
			}else{
				$("#goCreateHotCor").show();
			}
		}
	})
}
/**
 * 课程中心
 */
function getAllCourses(){
	$("#allDatas .c_info").remove();
	var uid = $("#schoolId").val();
	var url = getRootPath() + "/infocenter/school/getAllCourses";
	$.ajax({
		url : url,
		dataType : 'json',
		async : false,
		// data:{"courseType":2,"courseName":searchVal,"pageNum":1},
		data : {
			"page" : 1,"pageSize": 16, "schoolId":uid
		},
		success : function(data) {
			count = data.result.total;
			sign_datas = data.result.list;
			if(sign_datas == null || sign_datas == ''){
				$("#goCreateAllCor").show();
			}
		}
	})
	var pageNum = Math.ceil(count / 16);
	var pageSize = 0;

	if (pageNum <= 1) {
		var html = '';
		$.each(sign_datas, function(i, item) {
			html += '<div class="c_info" onClick="goCourseDtl('+item.courseid+')">';
			html += '<div class="main_img">';
			if(item.coverUrl == null || item.coverUrl == ''){
				html += '<img alt="" src="../images/teacher/mask.png" class="c_img">';
			}else{
				html += '<img alt="" src='+item.coverUrl+' class="c_img">';
			}
			html += '</div>';
			var courseName = item.courseName;
			if(item.courseName.length > 10){
				html += '<p class="cor_name" title='+courseName+'>'+item.courseName.substr(0,9)+'...</p>';
			}else{
				html += '<p class="cor_name" title='+courseName+'>'+item.courseName+'</p>';
			}
			if(item.teacherName != null && item.teacherName != ''){
				html += '<p class="sl_cp" title='+item.teacherName+'>'+item.teacherName+ ' 老师</p>';
			}else{
				html += '<p class="sl_cp">暂无老师~</p>';
			}
			html += '<p>';
			if(item.priceTotal == null || item.priceTotal == ''){
				html += '<span class="free">免费</span>';
			}else{
				html += '<span class="c_price">￥ '+item.priceTotal+'</span>&nbsp;&nbsp;<span class="newP">￥'+item.priceTotal+'</span>';
			}
			html += '</p>';
			html += '</div>';
		})
		$("#allDatas").append(html);

	} else {
		if (pageNum > 1 && pageNum < 10) {
			pageSize = pageNum;
		} else {
			pageSize = 10;
		}
		$("#page").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackCoursesData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,page : 1,pageSize:16,schoolId:uid}
			}
		});
	}

}

function callBackCoursesData(data) {
	$("#allDatas .c_info").remove();
	var data = eval("(" + data + ")");
	var sign_datas = data.result.list;
	var html = '';
	$.each(sign_datas, function(i, item) {
		html += '<div class="c_info" onClick="goCourseDtl('+item.courseid+')">';
		html += '<div class="main_img">';
		if(item.coverUrl == null || item.coverUrl == ''){
			html += '<img alt="" src="../images/teacher/mask.png" class="c_img">';
		}else{
			html += '<img alt="" src='+item.coverUrl+' class="c_img">';
		}
		html += '</div>';
		var courseName = item.courseName;
		if(item.courseName.length > 10){
			html += '<p class="cor_name" title='+courseName+'>'+item.courseName.substr(0,9)+'...</p>';
		}else{
			html += '<p class="cor_name" title='+courseName+'>'+item.courseName+'</p>';
		}
		if(item.teacherName != null && item.teacherName != ''){
			html += '<p class="sl_cp" title='+item.teacherName+'>'+item.teacherName+ ' 老师</p>';
		}else{
			html += '<p class="sl_cp">暂无老师~</p>';
		}
		html += '<p>';
		if(item.priceTotal == null || item.priceTotal == ''){
			html += '<span class="free">免费</span>';
		}else{
			html += '<span class="c_price">￥ '+item.priceTotal+'</span>&nbsp;&nbsp;<span class="newP">￥'+item.priceTotal+'</span>';
		}
		html += '</p>';
		html += '</div>';
	})
	$("#allDatas").append(html);
}

/**
 * 教师团队
 */
function getAllTeacher(){
	$("#allTeachersData .teacher_info").remove();
	var uid = $("#schoolId").val();
	var url = getRootPath() + "/infocenter/school/getAllTeachers";
	$.ajax({
		url : url,
		dataType : 'json',
		async : false,
		// data:{"courseType":2,"courseName":searchVal,"pageNum":1},
		data : {
			"page" : 1,"pageSize": 16, "schoolId":uid
		},
		success : function(data) {
			count = data.result.total;
			teachers_data = data.result.list;
			if(teachers_data == null || teachers_data == ''){
				$("#goCreateAllTeachers").show();
			}
		}
	})
	var pageNum = Math.ceil(count / 16);
	var pageSize = 0;

	if (pageNum <= 1) {
		var html = '';
		$.each(teachers_data, function(i, item) {
			html += '<div class="teacher_info" onClick="goTeacherDtl('+item.teacherUid+')">';
			if(item.avatarUrl == null || item.avatarUrl == ''){
				if(item.sex == 1){
					html += '<img alt="" src="../images/teacher/male_teacher.png" class="th_star">';
				}else{
					html += '<img alt="" src="../images/teacher/female_teacher.png" class="th_star">';
				}
			}else{
				html += '<img alt="" src='+item.avatarUrl+' class="th_star">';
			}
			html += '<p class="th_name">'+item.realName+'</p>';
//			html += '<p class="th_name">'+isVerifyNull(item.occupation)+'</p>';
			html += '<p class="th_cor">'+item.teachYears+'年教龄</p>';
			html += '</div>';
		})
		$("#allTeachersData").append(html);

	} else {
		if (pageNum > 1 && pageNum < 10) {
			pageSize = pageNum;
		} else {
			pageSize = 10;
		}
		$("#teacherPage").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackTeachersData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,page : 1,pageSize:16,schoolId:uid}
			}
		});
	}

}

function callBackTeachersData(data) {
	$("#allTeachersData .teacher_info").remove();
	var data = eval("(" + data + ")");
	var teachers_data = data.result.list;
	var html = '';
	$.each(teachers_data, function(i, item) {
		html += '<div class="teacher_info" onClick="goTeacherDtl('+item.teacherUid+')">';
		if(item.avatarUrl == null || item.avatarUrl == ''){
			if(item.sex == 1){
				html += '<img alt="" src="../images/teacher/male_teacher.png" class="th_star">';
			}else{
				html += '<img alt="" src="../images/teacher/female_teacher.png" class="th_star">';
			}
		}else{
			html += '<img alt="" src='+item.avatarUrl+' class="th_star">';
		}
		html += '<p class="th_name">'+item.realName+'</p>';
//		html += '<p class="th_name">'+isVerifyNull(item.occupation)+'</p>';
		html += '<p class="th_cor">'+item.teachYears+'年教龄</p>';
		html += '</div>';
	})
	$("#allTeachersData").append(html);
}

function ajaxApplySchool() {
	var sch_id =$("#sch_id").val(); 
	var isChecked = $('#r_agree').is(':checked');
	if(!isChecked){
		alert("请仔细阅读《老师签约学校协议》并同意！");
		return false;
	}
	var url = getRootPath() + "/teacher/applyToSchool.do";
	$.ajax({
		url : url,
		type : 'post',
		data : {"schoolid" :sch_id},
		dataType : 'json',
		success : function(data) {
			if(data.status == 0){
				alert("申请成功！");
				location.href = getRootPath()+ "/teacher/toJoinSchool";
			}else if(data.status == -1){
				alert("申请失败，请登录后再试！");
				location.href = getRootPath()+ "/index";
			}else if(data.status == -2){
				alert("申请失败，已经申请过学校，不能重复申请！");
				location.href = getRootPath()+ "/teacher/toJoinSchool";
			}else{
				alert("申请学校失败，请重试！");
				location.href = getRootPath()+ "/allschoollist";
			}
		}
	});
}


function goCourseDtl(courseId){
	location.href = getRootPath() + "/course/detail/" + courseId;
}
function goTeacherDtl(teacherUid){
	location.href=getRootPath() + "/infocenter/teacher/"+teacherUid;
}

function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}
//获取当前时间
function getCurentTime()
{ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day + " ";
   
    if(hh < 10)
        clock += "0";
    
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm; 
    
    clock += ":";
    if(ss < 10)
    	clock += "0";
    
    clock += ss;
    return(clock); 
} 