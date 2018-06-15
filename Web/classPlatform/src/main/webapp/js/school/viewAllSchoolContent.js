/**
 * join school manage javascript source file
 */

$(function() {
	$(".info_opt p").on("mouseover", function() {
		$(this).css("color", "#3266ff");
	}).on("mouseout", function() {
		$(this).css("color", "#3299ff");
	});
	$(".apply_join").on("mouseover", function() {
		$(this).css("background-color", "#2ab9f1").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#72d0f3");
	});
	$(".apply_join").on("click",function(){
		var id = $(this).parent().find("input").eq(0).val();
		var name = $(this).parent().find("input").eq(1).val();
		var current_time = getCurentTime();
		$("#sch_id").val(id);
		$("#s_name").html(name);
		$("#apply_school").dialog("open");
		$("#current_time").html(current_time);
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