/**
 * 视频在线播放javascript源文件
 */

$(function(){
	$("#teacher_courses").on("click", function(){
		var teacherId = $("#teacherId").val();
		location.href = getRootPath() + '/infocenter/teacher/' + teacherId;
	});
});