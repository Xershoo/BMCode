/**
 * head jsp file javascript source file
 */

$(function(){
	
	document.onkeydown = function(e){	
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	           $('#loginBtn').trigger("click");
	     }
	};
	
	$(".menuCommon").hover(function(){
		$(this).css("color", "#81cbf8");
	}, function(){
		$(this).css("color", "#5a5a5a");
	});
	
	$("#message").on("mouseenter", function(){
		messageList();
	});
	$(".message_list").on("mouseleave", function(){
		messageListNone();
	});
	
	$("#touxiang").on("mouseenter", function(){
		userList();
	});
	$(".user_list").on("mouseleave", function(){
		userListNone();
	});
	
	/*$("#changeImg").on("mouseenter", function(){
		changeIdentity();
	});
	$(".s1_option").on("mouseleave", function(){
		changeIdentityConfirm();
	});*/
	
	$(".message_list li").hover(function(){
		$(this).css({"background":"#42b8f6", "color":"#fff"});
	}, function(){
		$(this).css({"background":"#fff", "color":"#5a5a5a"});
	});
	
	$(".user_list li").hover(function(){
		$(this).css({"background":"#42b8f6", "color":"#fff"});
	}, function(){
		$(this).css({"background":"#fff", "color":"#5a5a5a"});
	});
	
	var b = true;
	$(".searchType li").hover(function(){
		$(this).css({"background":"#42b8f6", "color":"#fff"});
	}, function(){
		$(this).css({"background":"#fff", "color":"#5a5a5a"});
	}).on("click", function(){
		var val = $(this).html();
		$("#select_word").html(val);
		$(".searchType").hide();
		if(val == "课程"){
			$("#search_blank").attr("placeholder", "想找什么课,搜搜呗");
		}
		if(val == "老师"){
			$("#search_blank").attr("placeholder", "想找哪位老师,搜搜呗");
		}
		b = true;
	});
	
	$("#change_select").on("click", function(){
		if(b){
			$(".searchType").show();
			b = false;
		}else{
			$(".searchType").hide();
			b = true;
		}	
	});
	
	/*$(".s1_option li").hover(function(){
		$(this).css({"background":"#42b8f6", "color":"#fff"});
	}, function(){
		$(this).css({"background":"#fff", "color":"#5a5a5a"});
	});*/
	
	$("#loginOut").on("click", function(){
		location.href = getRootPath() + '/logout';
	});
	
	$("#forgetPwd").on("click", function(){
		var url = getRootPath()+"/toForgetPassword";
		location.href = url;
	});
	
	$("#head_createCourseLink").on("click", function(){
		if($("#loginBtn")[0] == null || $("#loginBtn")[0] == "undefined"){
			getAuthCertificate();	
		}else{
			alert("请先登录，然后再创建课程.");
		}
	});
	
	$("#registerBtn").on("click", function(){
		location.href= getRootPath() + '/register';
	});
	
	$("#mainLink").on("click", function(){
		location.href= getRootPath() + '/';
	});
	$("#mainLinkcourses").on("click", function(){
		location.href= getRootPath() + '/';
	});
	
	$("#logo_img").on("click", function(){
		location.href= getRootPath() + '/';
	});
	
	$("#head_downClient").on("click", function(){
		location.href= getRootPath() + '/app/download';
	});
	$("#head_allCourse").on("click", function(){
		location.href= getRootPath() + '/course/searchAll';
	});
	$("#head_allTeacher").on("click", function(){
		var keyWords = $.trim($("#search_blank").val());
		location.href = getRootPath() + '/searchAllTeacher?keyWord=' + encodeURI(encodeURI(keyWords));
	});
	
	if($("#loginBtn")[0] == null || $("#loginBtn")[0] == "undefined"){
		var count_course;
		var count_private;
		var count_system;
		var count;
		var url;
			 url=getRootPath() + '/message/messageTypeCount';
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			async:false,
			data:{
				'notread':0,
				'type':50,
			},
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
				$("#course_message_head").text(data.count);	
				count_course=data.count;
				}
			},
		});	
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			async:false,
			data:{
				'notread':0,
				'type':0,
			},
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
				$("#private_message_head").text(data.count);
				count_private=data.count;
				}
			},
		});	
		
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			async:false,
			data:{
				'notread':0,
				'type':100,
			},
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
				$("#system_message_head").text(data.count);	
				count_system=data.count;
				}
			},
		});	
		count=count_course+count_private+count_system;
		if(count == 0){
			$("#redDot").css("display","none");
		}else{
			$("#redDot").css("display","block");
		}
	}else{
		$("#username")[0].focus();
	}
	
	$("#qq_login").on("click", function(){
		location.href = getRootPath() + "/qqlogin";
	});
	
	$("#weibo_login").on("click", function(){
		location.href = getRootPath() + "/weibologin";
	});
	
	$("#search_btn").on("click",function(){
		var keyWords = $.trim($("#search_blank").val());
		var searchType = $.trim($("#select_word").html());
		if(searchType == "课程"){
			location.href = getRootPath() + '/course/search?keyword=' + encodeURI(encodeURI(keyWords));
		}
		if(searchType == "老师"){
			location.href = getRootPath() + '/searchAllTeacher?keyWord=' + encodeURI(encodeURI(keyWords));
		}
	})
});

function login()
{

	var h_username=$.trim($("#username").val());
	var h_password=$.trim($("#password").val());
	/*var h_rememberMe=$("#rememberMe").prop("checked");*/
	
	if(h_username == ""){
		/*$("#msg_word").html("请输入账号");
		$("#message").css({"display":"block","top":"350px"});*/
		alert("请输入账号");
		return;
	}
	if(h_username != "" && h_username.length < 4)
	{
		 /*$("#msg_word").html("请输入正确的账号");
		 $("#message").css({"display":"block","top":"350px"});*/
		alert("请输入正确的账号");
		 return;
	}
	if(h_password == ""){
		 /*$("#msg_word").html("请输入密码");
		 $("#message").css({"display":"block","top":"435px"});*/
		 alert("请输入密码");
		 return;
	}
	if(h_password != "" && h_password.length < 6)
	{
		 /*$("#msg_word").html("请输入正确的密码");
		 $("#message").css({"display":"block","top":"435px"});*/
		alert("请输入正确的密码");
		 return;
	}
	var url=getRootPath()+"/login?"+location.search.substring(1);
	$.ajax({
		url:url,
		type:'post',
		data:{"loginName":h_username,"password":h_password,"rememberMe":false},
		dataType:'json',
		success:function(data){
			if(!data.success){
				/*$("#msg_word").html(data.message);
				$("#message").css({"display":"block","top":"275px"});*/
				alert(data.message);
			}else{
				location.href = getRootPath() + data.successUrl;
			}
		}
	});
}

function messageList(){
	$('.arrow-up').css("left","1105px");
	$('.user_list').hide();	
	//$('.s1_option').hide();
	$('.arrow-up').show();
	$('.message_list').show();
}
function messageListNone(){
	$('.arrow-up').hide();	
	$('.message_list').hide();	
}

function userListNone(){
	$('.arrow-up').hide();
	$('.user_list').hide();
	
}
function userList(){
	$('.arrow-up').css("left","1062px");
	$('.message_list').hide();
	//$('.s1_option').hide();
	$('.arrow-up').show();
	$('.user_list').show();
}

function changeIdentity(){
	$('.arrow-up').css("left","1125px");
	$('.message_list').hide();
	$('.user_list').hide();
	$('.arrow-up').show();
	$('.s1_option').show();		
}
function changeIdentityConfirm(){
	$('.arrow-up').hide();
	$('.s1_option').hide();
}

function goToMainPage(roleName){
	if(roleName == "student"){
		var uid = $("#uid").val();
		location.href = getRootPath() + '/infocenter/student/'+uid ;
	}
	if(roleName == "teacher"){
		location.href = getRootPath() + '/teacher/center';
	}
	if(roleName == "school"){
		location.href = getRootPath() + '/school/center';
	}
}

function goToMyCourse(roleName){
	if(roleName == "student"){
		location.href = getRootPath() + '/student/schedule/toMyCourse';
	}
	if(roleName == "teacher"){
		location.href = getRootPath() + '/teacher/schedule/toMyCourse';
	}
}

function goToMyClass(roleName){
	if(roleName == "student"){
		location.href = getRootPath() + '/student/course';
	}
	if(roleName == "teacher"){
		location.href = getRootPath() + '/teacher/course/manage';
	}
	if(roleName == "school"){
		location.href = getRootPath() + '/school/course';
	}
}

function confirmIden(type){
	if(type==1){
		$('#change_identity').text('我是学生');
		location.href = getRootPath() + '/student/index';
	}else if(type==2){
		$('#change_identity').text('我是老师');
		location.href = getRootPath() + '/teacher/index';
	}else if(type==3){
		$('#change_identity').text('我是校长');
		location.href = getRootPath() + '/school/index';
	}
	$('.s1_option').hide();
	
}

function getAuthCertificate(){
		var url=getRootPath()+"/teacher/getauthteacherinfo";
		$.ajax({
			url:url,
			type:'post',
			data:{},
			dataType:'json',
			success:function(data){
				if(data.status == -1){
					alert("请登录后重试！");
					location.href = getRootPath() + "/index";
				}else if(data.status == 1){
					location.href = getRootPath() + '/teacher/techCertification';
				}else if(data.status == 0){
					 window.location.href= getRootPath() + '/teacher/course/create';
					
				}
			}
		})
	}
function weixinlogin(){
	location.href = getRootPath() + '/weixinlogin';
}
