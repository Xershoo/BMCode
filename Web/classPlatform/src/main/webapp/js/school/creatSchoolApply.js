/**
 * 
 */
$(function(){
	$(".creatBtn").hover(function() {
        $(this).css("background", "url(../images/sub_button_mouseDown.png) no-repeat");
    },
    	function() {
        $(this).css("background", "url(../images/sub_button_mouseOver.png) no-repeat");
    });
	
	$("#schoolBtn").on("click", function(){
		location.href = getRootPath() + "/auth/toCreatSchool";
	});
})
