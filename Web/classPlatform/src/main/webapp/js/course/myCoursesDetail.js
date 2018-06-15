/**
 * courses manage javascript source file
 */

$(function(){
	
	$(".cor_dtl").on("mouseover",function(){
		$(this).css("color","#3366ff");
	}).on("mouseout",function(){
		$(this).css("color","#3399ff");
	});
	
	$("#cor_query").on("mouseover",function(){
		$(this).css("background-color","#58cb72").css("cursor","pointer");
	}).on("mouseout",function(){
		$(this).css("background-color","#5abd72");
	});
	
	
	$("#cor_query").on("click",function(){
		var url = getRootPath() + "/student/course/list.do";
		var c_name = $("#c_name").val();
		var apply_time = $("#apply_time").val();
		var s_course = $("#s_course").val();
		var c_status = $('input[name="c_status"]:checked').val();
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:{"courseName":c_name,"courseStatus":c_status,"pageNum":1},
			success:function(data){
				var sign_datas = data.list;
				$("#menu1_data_list .data_info").remove();
				if(sign_datas ==null || sign_datas == ""){
					$(".no_data").eq(0).show();
				}
				var html = "";
				$.each(sign_datas,function(i, item){ 
					html += '<div class="data_info">';
					html += '<div class="info_name">';
					html += '<div class="teacher_logo"><img src='+item.coverUrl+' width="110px" height="85px"></div>';
					html += '<div class="teacher_name_word">'+item.courseName+'</div>';
					html += '<div class="teacher_name_word2">';
					html += '<p>'+item.teacherName+' | '+item.schoolName+'</p>';
					html += '<p>'+item.signupStartTime+' 至 '+item.signupEndTime+'</p>';
					html += '</div>';
					html += '</div>';
					html += '<div class="info_school">￥'+item.price_total+'</div>';
					html += '<div class="info_faculty">'+item.signupTime+'</div>';
					if(item.courseStatus == 0){
						html += '<div class="info_subject">未开始报名</div>';
					}else if(item.courseStatus == 5){
						html += '<div class="info_subject">报名中...</div>';
					}else if(item.courseStatus == 15){
						html += '<div class="info_subject">报名截止，待上课</div>';
					}else if(item.courseStatus == 16){
						html += '<div class="info_subject">课程进行中</div>';
					}else if(item.courseStatus == 17){
						html += '<div class="info_subject">已完结</div>';
					}else if(item.courseStatus == 20){
						html += '<div class="info_subject">已取消</div>';
					}else{
						html += '<div class="info_subject">冻结状态</div>';
					}
					html += '<div class="info_num">'+item.classHadFinished+'/'+item.classTotal+'</div>';
					html += '<div class="info_opt">';
					html += '<p class="cor_dtl" id="courseDtl1">申请退款</p>';
					html += '<p class="cor_dtl" id="courseCal">查看原因</p>';
					html += '<p class="cor_dtl" id="courseCal">删除课程</p>';
					html += '</div>';
					html += '</div>';
				})
				$("#menu1_data_list").append(html);
			}
		});
	});

});
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
					html += "<div src='"+item.schoollogo+"'>";
					html += "<img class='headImg' src='images/teacher_logo.png'>";
					html += "</div>";
					html += "<div class='teacher_name_word nick_name'>"+item.schoolname+"</div>";
					html += "</div>";
					html += "<div class='charge_name'>"+schoolAdminRealName+"</div>";
					html += "<div class='sign_time'>"+applyTime+"</div>";
					html += "<div class='ter_time'>"+contractEndTime+"</div>";
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
