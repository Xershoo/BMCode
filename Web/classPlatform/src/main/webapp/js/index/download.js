/**
 * 
 */

$(function(){
	$(".down_type_img").hover(function(){
		var src = $(this).find("img").attr("src");
		if(src.indexOf("win") > 0){
			$(this).find("img").attr("src","/images/download/win_hover.png");
		}
		if(src.indexOf("and") > 0){
			$(this).find("img").attr("src","/images/download/and_hover.png");
		}
		if(src.indexOf("ios") > 0){
			$(this).find("img").attr("src","/images/download/ios_hover.png");
		}
	},function(){
		var src = $(this).find("img").attr("src");
		if(src.indexOf("win") > 0){
			$(this).find("img").attr("src","/images/download/win_down.png");
		}
		if(src.indexOf("and") > 0){
			$(this).find("img").attr("src","/images/download/and_down.png");
		}
		if(src.indexOf("ios") > 0){
			$(this).find("img").attr("src","/images/download/ios_down.png");
		}
	});
	
	$("#clientDownload").on("click", function(){
		window.open('http://121.43.33.4:12080/update/bmclass_setup.exe');
	});
	
	$("#andDownload").on("click", function(){
		$("#scanCode").dialog({
			modal : false,
			resizable : false,
			draggable : true,
			autoOpen : false,
			position : "center",// 弹出位置
			width : 400, // 窗口宽度
			height : 250
		});
		$("#scanCode").dialog("open");
	});
	
	$("#iosDownload").on("click", function(){
		var url = "https://itunes.apple.com/cn/app/ke-ba-class8/id1103570333?mt=8";
		window.open(url, "_blank");
	});
	
	setInterval(bannerShow,300);
});

var bool = true;
function bannerShow(){
	var opacity = parseFloat($(".banner_music").css("opacity"));
	var new_opacity = (opacity+0.1);
	var sub_opacity = (opacity-0.1);
	if(bool){
		if(new_opacity <= 0.7){
			$(".banner_music").css("opacity", new_opacity);
		}else{
			$(".banner_music").css("opacity", sub_opacity);
			bool = false;
		}
	}else{
		if(sub_opacity >= 0.3){
			$(".banner_music").css("opacity", sub_opacity);
		}else{
			$(".banner_music").css("opacity", new_opacity);
			bool = true;
		}
	}
}