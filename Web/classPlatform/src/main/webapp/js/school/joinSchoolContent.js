/**
 * join school manage javascript source file
 */

$(function(){
	
	getMySchoolDatas();
	
	$(".info_opt p").on("mouseover", function(){
		$(this).css("color","#3266ff");
	}).on("mouseout",function(){
		$(this).css("color","#3299ff");
	});
	$("#school_teacher").on("click", function(){
		$(this).addClass("teacher_common_style");
		$(".right_menu_word:not(#school_teacher)").removeClass("teacher_common_style");
		$("#menu1_data_list").show();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").show();
		getMySchoolDatas();
	});
	$("#sign_teacher").on("click", function(){
		$(this).addClass("teacher_common_style");
		$(".right_menu_word:not(#sign_teacher)").removeClass("teacher_common_style");
		$("#menu1_data_list").hide();
		$("#menu2_data_list").show();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").hide();
		getAlreadyApplyDatas();
	});
	$("#teacher_apply").on("click", function(){
		$(this).addClass("teacher_common_style");
		$(".right_menu_word:not(#teacher_apply)").removeClass("teacher_common_style");
		$("#menu1_data_list").hide();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").show();
		$("#menu4_data_list").hide();
		$("#import_teacher_btn").hide();
		getSchoolInvitedDatas();
	});
	$("#invite_teacher").on("click", function(){
		$(this).addClass("teacher_common_style");
		$(".right_menu_word:not(#invite_teacher)").removeClass("teacher_common_style");
		$("#menu1_data_list").hide();
		$("#menu2_data_list").hide();
		$("#menu3_data_list").hide();
		$("#menu4_data_list").show();
		$("#import_teacher_btn").hide();
		getRemoveContractDatas();
	});
	$("#viewSchools").on("mouseover", function() {
		$(this).css("background-color", "#2f92f4");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});
	
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
});
function go_all(){
	location.href=getRootPath()+"/allschoollist";
}

function getMySchoolDatas(){
	var url=getRootPath()+"/teacher/myjoinschools.do";
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			if(data.status == -1){
				alert("请登录后重试！");
				location.href = getRootPath() + "/index";
			}else if(data.status == 0){
				$("#menu1_data_list .data_info").remove();
				var applyed_datas = data.myschools;
				var html = "";
//				if(applyed_datas ==null || applyed_datas == ""){
//					$(".no_data").eq(0).show();
//				}
				if(applyed_datas != null && applyed_datas != ""){
					
				$.each(applyed_datas,function(i, item){
					html += "<div class='data_info'>";
					html += "<div class='info_name'>";
					html += "<div class='teacher_logo'><img class='headImg' src='"+item.schoollogo+"'></div>";
					html += "<div class='teacher_name_word nick_name'>"+item.schoolname+"</div>";
					html += "</div>";
					html += "<div class='info_school'>"+item.schoolAdminRealName+"</div>";
					html += "<div class='info_faculty'>"+item.applyTime+"</div>";
					if(item.status == 1){
						html += "<div class='info_status'>合约期间/合约到期</div>";
					}else if(item.status == 2){
						html += "<div class='info_status'>合约期间/合约到期</div>";
					}else{
						html += "<div class='info_status'>合约期间/合约到期</div>";
					}
					html += "<div class='info_opt'>";
					html += '<div style="display:none;">'+item.schoolid+'</div>';
					html += "<p>解除签约</p>";
					html += "<p>申请续约</p>";
					html += "</div>";
					html += "</div>";
				})
				}else{
//					html += "<div class='data_info'>";
//					html += "<div class='go_all'>";
//					html += "<img alt='学校图片' src='../images/school/schools.png' class='d_schools'>";
//					html += "<p>您目前还没加入任何学校，看看有没有感兴趣的学校，申请加入他们吧~~</p>";
//					html += "<input type='button' value='查看学校' class='v_schools' id='viewSchools' onClick='go_all();'>";
//					html += "</div>";
//					html += "</div>";
					$("#withNoSchools").show();
				}
			
				 $("#menu1_data_list").append(html);
			}else{
				$("#withNoSchools").show();
			}
		}
	});
}

function getAlreadyApplyDatas(){
	var url=getRootPath()+"/teacher/applySchoolRecords.do";
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			if(data.status == -1){
				alert("请登录后重试！");
				location.href = getRootPath() + "/index";
			}else if(data.status == 0){
				$("#menu2_data_list .data_info").remove();
				var applyed_datas = data.records;
				var html = "";
				if(applyed_datas ==null || applyed_datas == ""){
					$(".no_data").eq(1).show();
				}
				$.each(applyed_datas,function(i, item){
					html += '<div class="data_info">';
					html += '<div class="info_name">';
					html += '<div class="teacher_logo">';
					html += '<img class="headImg" src="'+item.schoollogo+'">';
					html += '</div>';
					html += '<div class="teacher_name_word nick_name">'+item.schoolname+'</div>';
					html += '</div>';
					html += '<div class="info_school">'+item.schoolAdminRealName+'</div>';
					html += '<div class="info_faculty">'+item.applyTime+'</div>';
					if(item.status == 1){
						html += "<div class='info_status'>审核中...</div>";
					}else if(item.status == 2){
						html += "<div class='info_status'>已通过申请</div>";
					}else if(item.status == 3){
						html += "<div class='info_status'>未通过申请</div>";
					}else if(item.status == 4){
						html += "<div class='info_status'>已取消申请</div>";
					}else{
						html += "<div class='info_status'>申请尚未处理</div>";
					}
					html += '<div class="info_opt">';
					html += '<div style="display:none;">'+item.schoolid+'</div>';
					if(item.status == 1){
						html += '<p onClick="cancelApply('+item.schoolid+');">取消申请</p>';
						html += '<p>删除记录</p>';
					}else if(item.status == 2){
						html += '<p>删除记录</p>';
					}else if(item.status == 3){
						html += '<p onClick="applyAgain('+item.schoolid+',\''+item.schoolname+'\');">重新申请</p>';
						html += '<p>删除记录</p>';
					}else if(item.status == 4){
						html += '<p onClick="applyAgain('+item.schoolid+',\''+item.schoolname+'\');">重新申请</p>';
						html += '<p>删除记录</p>';
					}else{
						html += '<p>删除记录</p>';
					}
					html += '</div>';
					html += '</div>';
				})
				 $("#menu2_data_list").append(html);
			}else{
				$(".no_data").eq(0).show();
			}
		}
	});
}

function getSchoolInvitedDatas(){
	var url=getRootPath()+"/teacher/schoolInviteRecords.do";
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			if(data.status == -1){
				alert("请登录后重试！");
				location.href = getRootPath() + "/index";
			}else if(data.status == 0){
				$("#menu3_data_list .data_info").remove();
				var applyed_datas = data.records;
				var html = "";
				if(applyed_datas ==null || applyed_datas == ""){
					$(".no_data").eq(2).show();
				}
				$.each(applyed_datas,function(i, item){
					html += "<div class='data_info'>";
					html += "<div class='data_info'>";
					html += "<div class='info_name'>";
					html += "<div class='teacher_logo'>";
					html += "<img class='headImg' src='"+item.schoollogo+"'>";
					html += "</div>";
					html += "<div class='teacher_name_word nick_name'>"+item.schoolname+"</div>";
					html += "</div>";
					html += "<div class='info_school'>"+item.schoolAdminRealName;+"</div>";
					html += "<div class='info_faculty'>"+item.applyTime+"</div>";
					if(item.status == 1){
						html += "<div class='info_status'>尚未处理</div>";
					}else if(item.status == 2){
						html += "<div class='info_status'>已接受邀请</div>";
					}else if(item.status == 3){
						html += "<div class='info_status'>已拒绝邀请</div>";
					}else if(item.status == 4){
						html += "<div class='info_status'>对方已取消邀请</div>";
					}else{
						html += "<div class='info_status'>邀请尚未处理</div>";
					}
					html += "<div class='info_opt'>";
					html += '<div style="display:none;">'+item.schoolid+'</div>';
					if(item.status == 1){
						html += '<p><span onClick="acceptSchool('+item.schoolid+',\''+item.schoolname+'\');">接受</span> | <span onClick="refuseSchool('+item.schoolid+',\''+item.schoolname+'\');">拒绝</span></p>';
						html += "<p>删除记录</p>";
					}else{
						html += "<p>删除记录</p>";
					}
					html += "</div>";
					html += "</div>";
				})
				$("#menu3_data_list").append(html);
			}else{
				$(".no_data").eq(0).show();
			}
		}
	});
}

function getRemoveContractDatas(){
	var url=getRootPath()+"/teacher/schoolContractRecords.do";
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			if(data.status == -1){
				alert("请登录后重试！");
				location.href = getRootPath() + "/index";
			}else if(data.status == 0){
				$("#menu4_data_list .data_info").remove();
				var applyed_datas = data.records;
				var html = "";
				if(applyed_datas ==null || applyed_datas == ""){
					$(".no_data").eq(3).show();
				}
				$.each(applyed_datas,function(i, item){
					html += "<div class='data_info'>";
					html += "<div class='basic_info'>";
					html += "<div class='teacher_logo'>";
					html += "<img class='headImg hd_img' src='"+item.schoollogo+"'>";
					html += "</div>";
					html += "<div class='teacher_name_word nick_name'>"+item.schoolname+"</div>";
					html += "</div>";
					html += "<div class='charge_name'>"+item.schoolAdminRealName+"</div>";
					html += "<div class='sign_time'>"+item.applyTime+"</div>";
					html += "<div class='ter_time'>"+item.contractEndTime+"</div>";
					html += "<div class='ter_reason'>合约到期，未续约</div>";
					html += "<div class='info_opt'>";
					html += '<div style="display:none;">'+item.schoolid+'</div>';
					html += "<p>申请续约</p>";
					html += "<p>删除记录</p>";
					html += "</div>";
					html += "</div>";
				})
				$("#menu4_data_list").append(html);
			}else{
				$(".no_data").eq(0).show();
			}
		}
	});
				
}

function cancelApply(schoolId) {
	if (confirm("确定要取消申请吗？")) {
		var url = getRootPath() + "/teacher/cancelMyApply.do";
		$.ajax({
			url : url,
			type : 'post',
			data : {
				"schoolid" : schoolId
			},
			dataType : 'json',
			success : function(data) {
				if (data.status == -1) {
					alert("请登录后重试！");
					location.href = getRootPath() + "/index";
				} else if (data.status == -2) {
					alert("没有查到申请记录，请重试！");
					location.href = getRootPath() + "/teacher/toJoinSchool";
				} else if (data.status == 0) {
					alert("恭喜您，取消成功！");
					location.href = getRootPath() + "/teacher/toJoinSchool";
				} else {
					alert("出现错误，请重试！");
					location.href = getRootPath() + "/teacher/toJoinSchool";
				}
			}
		});
	}
}
function applyAgain(schoolId, schoolName) {
	var current_time = getCurentTime();
	$("#sch_id").val(schoolId);
	$("#s_name").html(schoolName);
	$("#apply_school").dialog("open");
	$("#current_time").html(current_time);
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
				location.href = getRootPath()+ "/teacher/allschoollist";
			}
		}
	});
}

function acceptSchool(schoolId,schoolName){
	if(confirm("确定要接受"+schoolName+"学校的邀请吗？")){
		var url = getRootPath() + "/teacher/schoolid.do";
		$.ajax({
			url : url,
			type : 'post',
			data : {"schoolid" :schoolId,"nAgree":"1"},
			dataType : 'json',
			success : function(data) {
				if(data.status == 0){
					alert("处理成功！");
					location.href = getRootPath()+ "/teacher/toJoinSchool";
				}else if(data.status == -1){
					alert("处理失败，请登录后再试！");
					location.href = getRootPath()+ "/index";
				}else{
					alert("处理学校失败，请重试！");
					location.href = getRootPath()+ "/teacher/toJoinSchool";
				}
			}
		});
	}
}

function refuseSchool(schoolId,schoolName){
	if(confirm("确定要拒绝"+schoolName+"学校的邀请吗？")){
		var url = getRootPath() + "/teacher/schoolid.do";
		$.ajax({
			url : url,
			type : 'post',
			data : {"schoolid" :schoolId,"nAgree":"2"},
			dataType : 'json',
			success : function(data) {
				if(data.status == 0){
					alert("处理成功！");
					location.href = getRootPath()+ "/teacher/toJoinSchool";
				}else if(data.status == -1){
					alert("处理失败，请登录后再试！");
					location.href = getRootPath()+ "/index";
				}else{
					alert("处理学校失败，请重试！");
					location.href = getRootPath()+ "/teacher/toJoinSchool";
				}
			}
		});
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
