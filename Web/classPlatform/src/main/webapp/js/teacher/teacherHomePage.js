/**
 * teacher home page javascript sourcefile
 */
var sign_datas;
$(function() {
	getNewestCourses();
	getHotCourses();
	$(".c_btn").on("mouseover",function(){
		$(this).css("background","#0e92e9");
	}).on("mouseout",function(){
		$(this).css("background","#37A7F3");
	})
	
	$("#mainPage").addClass("teacher_rm_info");
	$("#mainPage").on("click", function() {
		$("#basicInfo").show();
		$("#pageContent").show();
		$("#coursesInfo").hide();
		$("#allCourses").removeClass("teacher_rm_info");
		$("#allCourses").addClass("teacher_info");
		$(this).addClass("teacher_rm_info");
		getNewestCourses();
		getHotCourses();
	});
	
	$("#allCourses").on("click", function() {
		$("#coursesInfo").show();
		$("#basicInfo").hide();
		$("#pageContent").hide();
		$("#mainPage").removeClass("teacher_rm_info");
		$("#mainPage").addClass("teacher_info");
		$(this).addClass("teacher_rm_info");
		getTeacherCourses();
	});
	
	$("#createCourse").on("click",function(){
		location.href = getRootPath() + "/course/create";
	})
	
	$("#createHotCourse").on("click",function(){
		location.href = getRootPath() + "/course/create";
	})
	$("#directMsg").on("click",function(){
		var uid = $("#teacherUid").val();
		var realname = $("#realName").val();
		var nickname = $("#nickName").val();
		location.href=getRootPath() + "/message/message?type=5&uid="+uid+"&realname="+encodeURI(encodeURI(realname))+"&nickname="+encodeURI(encodeURI(nickname));
	})
})

function getNewestCourses(){
	$("#newCourses .c_info").remove();
	var uid = $("#teacherUid").val();
	var url=getRootPath()+"/infocenter/teacher/getLastestCourses";
	$.ajax({
		url:url,
		type:'post',
		data:{"teacherUid":uid},
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
							html += '<img alt="" src="../../images/teacher/mask.png" class="c_img">';
						}else{
							html += '<img alt="" src='+item.coverUrl+' class="c_img">';
						}
						html += '</div>';
						if(item.courseName.length > 10){
							html += '<p class="cor_name" title="'+item.courseName+'">' + item.courseName.substring(0,9) + ' ···</p>';
						}else{
							html += '<p class="cor_name" title="'+item.courseName+'">'+item.courseName+'</p>';
						}
						if(item.schoolName == null || item.schoolName == ''){
							html += '<p class="sl_cp">暂无学校</p>';
						}else{
							html += '<p class="sl_cp">'+isVerifyNull(item.schoolName)+'</p>';
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
					$(".c_info").css("margin-left","60px");
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

function getHotCourses(){
	$("#hotCourses .c_info").remove();
	var uid = $("#teacherUid").val();
	var url=getRootPath()+"/infocenter/teacher/getHotCourses";
	$.ajax({
		url:url,
		type:'post',
		data:{"teacherUid":uid},
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
							html += '<img alt="" src="../../images/teacher/mask.png" class="c_img">';
						}else{
							html += '<img alt="" src='+item.coverUrl+' class="c_img">';
						}
						html += '</div>';
						if(item.courseName.length > 10){
							html += '<p class="cor_name" title="'+item.courseName+'">' + item.courseName.substring(0,9) + ' ···</p>';
						}else{
							html += '<p class="cor_name" title="'+item.courseName+'">'+item.courseName+'</p>';
						}
						if(item.schoolName == null || item.schoolName == ''){
							html += '<p class="sl_cp">暂无学校</p>';
						}else{
							html += '<p class="sl_cp">'+isVerifyNull(item.schoolName)+'</p>';
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
					$(".c_info").css("margin-left","60px");
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

function getTeacherCourses(){
	$("#allDatas .c_info").remove();
	var uid = $("#teacherUid").val();
	var url = getRootPath() + "/infocenter/teacher/getAllCourses";
	$.ajax({
		url : url,
		dataType : 'json',
		async : false,
		// data:{"courseType":2,"courseName":searchVal,"pageNum":1},
		data : {
			"page" : 1,"pageSize": 16, "teacherUid":uid
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
				html += '<img alt="" src="../../images/teacher/mask.png" class="c_img">';
			}else{
				html += '<img alt="" src='+item.coverUrl+' class="c_img">';
			}
			html += '</div>';
			if(item.courseName.length > 10){
				html += '<p class="cor_name" title="'+item.courseName+'">' + item.courseName.substring(0,9) + ' ···</p>';
			}else{
				html += '<p class="cor_name" title="'+item.courseName+'">'+item.courseName+'</p>';
			}
			if(item.schoolName == null || item.schoolName == ''){
				html += '<p class="sl_cp">暂无学校</p>';
			}else{
				html += '<p class="sl_cp">'+isVerifyNull(item.schoolName)+'</p>';
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
		$(".c_info").css("margin-left","68px");
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
					on : true,page : 1,pageSize:16,teacherUid:uid}
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
			html += '<img alt="" src="../../images/teacher/mask.png" class="c_img">';
		}else{
			html += '<img alt="" src='+item.coverUrl+' class="c_img">';
		}
		html += '</div>';
		if(item.courseName.length > 10){
			html += '<p class="cor_name" title="'+item.courseName+'">' + item.courseName.substring(0,9) + ' ···</p>';
		}else{
			html += '<p class="cor_name" title="'+item.courseName+'">'+item.courseName+'</p>';
		}
		if(item.schoolName == null || item.schoolName == ''){
			html += '<p class="sl_cp">暂无学校</p>';
		}else{
			html += '<p class="sl_cp">'+isVerifyNull(item.schoolName)+'</p>';
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
	$(".c_info").css("margin-left","68px");
	$("#allDatas").append(html);
}

function goCourseDtl(courseId){
	location.href = getRootPath() + "/course/detail/" + courseId;
}

function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}
