/**
 * 
 */
$(function(){
	$("#userType").on("change", function(){
		if($(this).val() == 'school'){
			location.href = getRootPath() + '/school/index';
		}
		if($(this).val() == 'teacher'){
			location.href = getRootPath() + '/teacher/index';
		}
		if($(this).val() == 'student'){
			location.href = getRootPath() + '/student/index';
		}
	});
});
