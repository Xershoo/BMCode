/**
 * school home page javascript sourcefile
 */

var schoolId = $("#schoolId").val();
var bannerId;
$(function() {

	$("#previewHome").on("mouseover",function(){
		$(this).css("background","#36b44d");
	}).on("mouseout",function(){
		$(this).css("background","#3FC555");
	});
	$("#basicInfo").on("click", function() {
		$("#basicInfoContent").show();
		$("#schoolAnnouncement").hide();
		$("#adImagesContent").hide();
		$(this).addClass("navigate_info");
		$(this).siblings().removeClass("navigate_info");
		location.href = getRootPath() + "/school/basicInfo";
	});
	
	$(".sh_edit_info").on("mouseover",function(){
		$(this).css("background","#3394f4");
	}).on("mouseout",function(){
		$(this).css("background","#51a4f6");
	})
	$(".sh_ad_info").on("mouseover",function(){
		$(this).css("background","#3394f4");
	}).on("mouseout",function(){
		$(this).css("background","#51a4f6");
	})
	$("#cancelSave").on("mouseover",function(){
		$(this).css("background","#afafaf");
	}).on("mouseout",function(){
		$(this).css("background","#c3c3c3");
	})
	
	$("#adImages").on("click", function() {
		$("#basicInfoContent").hide();
		$("#schoolAnnouncement").hide();
		$("#adImagesContent").show();
		$(this).addClass("navigate_info");
		$(this).siblings().removeClass("navigate_info");
		getAllBanners();
	});
	var secondDomain = $("#secondDomain").val();
	if(secondDomain == null || secondDomain  == ''){
		$(".sh_sld_info").html("无");
	}else{
		$(".sh_sld_info").html(secondDomain+".class8.com");
	}
	$("#addNewSchoolAD").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 500, // 窗口宽度
		height : 360,
		resizable : false,
		buttons : {
			"确定" : function() {
				addNewAnnouncement();
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#schoolAnnounce").on("click", function() {
		$("#schoolAnnouncement").show();
		$("#basicInfoContent").hide();
		$("#adImagesContent").hide();
		$(this).addClass("navigate_info");
		$(this).siblings().removeClass("navigate_info");
		getSchoolAnnounces();
	});
	
	var schoolName = $(".sh_name_info").html();
	var schoolLabel = $(".sh_label_info").html();
	var introduction= $(".sh_intro_info").html();
	$("#editInfo").on("click",function(){
		editBasicInfo();
	})
	$("#cancelSave").on("click",function(){
		$("#editInfo").show();
		$("#saveData").hide();
		$(this).hide();
		$("#uploadImg").hide();
		$(".sh_name_info").html(schoolName);
		$(".sh_label_info").html(schoolLabel);
		$(".sh_intro_info").html(introduction);
		$(".sh_sld_info").html(isVerifyNull(secondDomain));
	})

	$("#saveData").on("click",function(){
		updateSchoolBasicInfo();
	})
	
})
function saveBanners(Object,type,bannerId){
	var adverDiagram = $.trim(Object.parent().find("input").eq(0).val());
	var adverDiagramUrl = $.trim(Object.parent().find("input").eq(1).val());
	var myFile = Object.parent().prev().find("input").val();
	var url;
	if(adverDiagram == null || adverDiagram == ""){
		Object.siblings().eq(0).find("span").html("*请输入广告图标题");
		Object.siblings().eq(0).find("span").show();
		return false;
	}else{
		Object.siblings().eq(0).find("span").html("");
		Object.siblings().eq(0).find("span").hide();
	}
	if(adverDiagramUrl == null || adverDiagramUrl == ""){
		Object.siblings().eq(1).find("span").html("*请输入广告图链接");
		Object.siblings().eq(1).find("span").show();
		return false;
	}else{
		Object.siblings().eq(1).find("span").html("");
		Object.siblings().eq(1).find("span").hide();
	}
	if(type == 2){
		if ($.trim(myFile) == "" || $.trim(myFile) == null) {
			getDialog("warn", "请选择要上传的广告图片");
			return false;
		} else {
			var filepath = myFile;
			var extStart = filepath.lastIndexOf(".");
			var ext = filepath.substring(extStart, filepath.length).toUpperCase();
			if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG"
					&& ext != ".JPEG") {
				getDialog("warn", "广告图片限于bmp,png,gif,jpeg,jpg格式");
				return false;
			} 
		}
	}
	
	if(type == 1){
		url = getRootPath() + "/school/updateBanner";
	}else{
		url = getRootPath() + "/school/createBanner";
	}
	$.ajaxFileUpload({
        url: url, //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'banner', //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        data:{"bannerid":bannerId,"description":adverDiagram,"linkUrl":adverDiagramUrl},
        success: function (data)  //服务器成功响应处理函数
           {
       	 if(data.success == true){
       		getDialogCue("success", "编辑广告图片成功");
       		setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
       	 }else{
       		 var message = data.message;
       		 if(message != undefined && message.length > 0){
       			getDialog("fail", "您所添加的广告图片已达到上限");
       			setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
       		 }else{
       			getDialog("fail", "编辑失败，请重试");
       			setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
       		 }
       	 }
           }
   });

}

function getAllBanners(){
	$("#adImagesContent .sh_ad_images").remove();
	$("#adImagesContent #newADAgain").remove();
	$("#page").hide();
	var bannerDatas;
	var url = getRootPath() + "/school/getBanners";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			var status = data.status;
			if(status == "0"){
				bannerDatas = data.result;
				showBannersData(bannerDatas);
			}else{
				getDialog("fail", "获取学校公告失败");
       			setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})

}
function showBannersData(data) {
	var html = '';
	if(data.length > 0){
		$.each(data, function(i, item) {
			html += '<div class="sh_ad_images">';
			html += '<div class="ad_back">';
			if(item.bannerUrl == null || item.bannerUrl == ''){
				html += '<img src="../images/teacher/mask.png" class="ad_img">';
			}else{
				html += '<img src='+item.bannerUrl+' class="ad_img">';
			}
			html += '</div>';
			html += '<div class="ad_content">';
			html += '<div class="ad_diagram">';
			html += '<div class="ad_diagram_name">广告图标题：</div>';
			if(item.description.length > 25){
				html += '<div class="ad_diagram_info" title="'+item.description+'">'+item.description.substring(0,24)+' ...</div>';
			}else{
				html += '<div class="ad_diagram_info" title="'+item.description+'">'+item.description+'</div>';
			}
			html += '</div>';
			html += '<div class="ad_url">';
			html += '<div class="ad_url_name">广告图链接：</div>';
			if(item.linkUrl.length > 50){
				html += '<div class="ad_url_info" title="'+item.linkUrl+'">'+item.linkUrl.substring(0,49)+' ...</div>';
			}else{
				html += '<div class="ad_url_info" title="'+item.linkUrl+'">'+item.linkUrl+'</div>';
			}
			html += '</div>';
			html += '<div class="sh_ad_info">编辑资料</div>';
			html += '<div style="display:none;">'+item.bannerid+'</div>';
			html += '</div>';
			html += '</div>';
			if(i == data.length-1){
				html += '<h2 id="newADAgain">添加广告图</h2>';
			}
		})
	}else{
		html += '<h2 id="newADAgain">添加广告图</h2>';
	}
	$("#adImagesContent").append(html);
	$(".sh_ad_images").on("mouseover",function(){
		$(this).css("background","#FFFAF0");
	}).on("mouseout",function(){
		$(this).css("background","#FFF");
	})	
$(".sh_ad_info").on("click",function(){
		if($(this).html() == "编辑资料"){
			var adDiagram;
			var adDiagramUrl;
			$(this).html("保   存");
			var html = '';
			adDiagram = $(this).parent().parent().find(".ad_diagram_info").attr("title");
			adDiagramUrl = $(this).parent().parent().find(".ad_url_info").attr("title");
			bannerId = $(this).next().html();
			$(this).parent().parent().find(".ad_diagram_info").html("<input type='text' id='adDiagram' name='adDiagram' class='sh_label_input add_input' placeholder='请填写广告图标题~' maxlength='50'value='"+adDiagram+"'/><span class='ad_info'></span>");
			$(this).parent().parent().find(".ad_url_info").html("<input type='text' id='adDiagramUrl' name='adDiagramUrl' class='sh_label_input add_input' placeholder='请填写广告图链接~' value='"+adDiagramUrl+"' maxlength='300'/><span class='ad_info'></span>");
			html += '<div class="del_banner" onClick="delBanner('+bannerId+')">删   除</div>';
			html += '<div id="cancelADImg" class="ad_cancel">取   消</div>';
			$(this).parent().append(html);
			$(this).parent().parent().find(".ad_back").append('<a href="javascript:void(0);" class="banner_file">上传图片<input type="file" id="banner" name="banner" accept="image/*" class="ban_prev"></a>');			
			
			$(".ad_cancel").on("click",function(){
				$(this).prev().remove();
				$(this).prev().prev().html("编辑资料");
				$(this).parent().parent().find("a").remove();
				if(adDiagram.length > 25){
					$(this).parent().find(".ad_diagram_info").html(adDiagram.substring(0,24)+" ...");
				}else{
					$(this).parent().find(".ad_diagram_info").html(adDiagram);
				}if(adDiagramUrl.length > 50){
					$(this).parent().find(".ad_url_info").html(adDiagramUrl.substring(0,49)+" ...");
				}else{
					$(this).parent().find(".ad_url_info").html(adDiagramUrl);
				}
				/*if(adDiagramUrl.length > 50){
					$(this).parent().find(".ad_url_info").html(adDiagramUrl.substring(0,49)+" ...");
				}else{
					$(this).parent().find(".ad_url_info").html(adDiagramUrl);
				}*/
				
				$(this).remove();
				
			})
			$(this).parent().find("input").eq(0).on("blur", function(){
				var adverDiagram = $.trim($(this).parent().find("input").eq(0).val());
				if(adverDiagram == null || adverDiagram == ""){
					$(this).parent().find("span").eq(0).html("*请输入广告图标题");
					$(this).parent().find("span").eq(0).show();
				}else{
					$(this).parent().find("span").eq(0).html("");
		 			$(this).parent().find("span").eq(0).hide();
				}
			});
			/*$(this).parent().find("input").eq(1).on("blur", function(){
				var adverDiagramUrl = $.trim($(this).parent().find("input").eq(1).val());
				if(adverDiagramUrl == null || adverDiagramUrl == ""){
					$(this).parent().find("span").eq(0).html("*请输入广告图链接");
					$(this).parent().find("span").eq(0).show();
				}else{
					$(this).parent().find("span").eq(0).html("");
					$(this).parent().find("span").eq(0).hide();
				}
			});*/
			$(".ban_prev").change(function(evt) {
				var $_file = $(this);
				var files = evt.target.files;

				for (var i = 0, f; f = files[i]; i++) {

					if (!f.type.match('image.*')) {
						continue;
					}

					var reader = new FileReader();

					reader.onload = (function(theFile) {
						return function(e) {
							$_file.parent().prev().attr("src", e.target.result); //预览图片的位置                
							$_file.parent().css("opacity","0");
						};
					})(f);

					reader.readAsDataURL(f);
				}
			});
		}else {
			var type = 1;
			saveBanners($(this),type,bannerId);
		}
	});
	
	$("#newADAgain").on("click",function(){
		if($(".ad_add_again").length > 0){
			$(this).attr("disabled","disabled");
		}else{
			var html = '';
			html += '<div class="ad_add_again sh_ad_images">';
			html += '<div class="ad_back">';
			html += '<img src="../images/teacher/mask.png" class="ad_img">';
			html += '<a href="javascript:void(0);" class="banner_file">上传图片<input type="file" id="banner" name="banner" accept="image/*" class="ban_prev"></a>';
			html += '</div>';
			html += '<div class="ad_content">';
			html += '<div class="ad_diagram">';
			html += '<div class="ad_diagram_name">广告图标题：</div>';
			html += '<div class="ad_diagram_info"><input type="text" id="adDiagram" name="adDiagram" class="sh_label_input add_input" placeholder="请填写广告图标题~" maxlength="50"/><span class="ad_info"></span></div>';
			html += '</div>';
			html += '<div class="ad_url">';
			html += '<div class="ad_url_name">广告图链接：</div>';
			html += '<div class="ad_url_info"><input type="text" id="adDiagramUrl" name="adDiagramUrl" class="sh_label_input add_input" placeholder="请填写广告图链接~"maxlength="300"/><span class="ad_info"></span></div>';
			html += '</div>';
			html += '<div class="sh_ad_info add_new_banner">保   存</div>';
			html += '<div class="del_banner rv_banner">删   除</div>';
			html += '</div>';
			html += '</div>';
			$("#adImagesContent").append(html);
		}
		$(".ban_prev").change(function(evt) {
			var $_file = $(this);
			var files = evt.target.files;

			for (var i = 0, f; f = files[i]; i++) {

				if (!f.type.match('image.*')) {
					continue;
				}

				var reader = new FileReader();

				reader.onload = (function(theFile) {
					return function(e) {
						$_file.parent().prev().attr("src", e.target.result); //预览图片的位置                
						$_file.parent().css("opacity","0");
					};
				})(f);

				reader.readAsDataURL(f);
			}
		});
		$(".add_new_banner").on("click",function(){
			var type = 2;
			saveBanners($(this),type,0);
		})
		$(".rv_banner").on("click",function(){
			$(this).parent().parent().remove();
			$("#newADAgain").removeAttr("disabled");
		})
	})
}

function delBanner(bannerId){
	var url = getRootPath() + "/school/deleteBanner";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{"bannerid":bannerId},
		cache:false,
		success:function(data){
			var status = data.success;
			if(status == true){
				getDialogCue("success", "删除广告图片成功");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}else{
				getDialog("fail", "获取学校公告失败");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
}

function editBasicInfo(){
	$("#editInfo").hide();
	$("#saveData").show();
	$("#cancelSave").show();
	var schoolName = $(".sh_name_info").html();
	var schoolLabel = $(".sh_label_info").html();
	var introduction= $(".sh_intro_info").html();
	var schoolDomain = $(".sh_sld_info").html();
	var secondDomain = schoolDomain.substring(0,schoolDomain.length-11);
	$(".sh_name_info").html("<input type='text' id='schoolName' name='schoolName' class='sh_label_input add_input' placeholder='请填写学校名称~' maxlength='30' value='"+schoolName+"'/><span class='info'></span>");
	$(".sh_label_info").html("<input type='text' id='schoolLabel' name='schoolLabel' class='sh_label_input add_input' placeholder='请填写学校标签~' maxlength='15' value='"+schoolLabel+"'/><span class='info'></span>");
	$(".sh_intro_info").html("<textarea rows='10' cols='10' id='schoolIntro' name='schoolIntro' class='sh_textarea add_input' placeholder='请填写学校介绍，限定字数300以内~' maxlength='300'>"+introduction+"</textarea><span class='info'></span>");
	$(".sh_sld_info").html("<input type='text' id='schoolDomain' name='schoolDomain' class='sh_label_input add_input' placeholder='请填写学校二级域名~' maxlength='20' value='"+secondDomain+"'/>.class8.com<span class='info'></span>");
	$("#uploadImg").show();
	$("#schoolName").on("blur", function(){
		var schoolName = $.trim($(this).val());
		if(schoolName == null || schoolName == ""){
			$(".info").eq(0).html("*请输入学校名称");
			$(".info").eq(0).show();
		}else{
			$(".info").eq(0).html("");
			$(".info").eq(0).hide();
		}
	});
	$("#schoolLabel").on("blur", function(){
		var schoolLabel = $.trim($(this).val());
		if(schoolLabel == null || schoolLabel == ""){
			$(".info").eq(1).html("*请输入学校标签");
			$(".info").eq(1).show();
		}else{
			$(".info").eq(1).html("");
			$(".info").eq(1).hide();
		}
	});
	$("#schoolIntro").on("blur", function(){
		var schoolIntro = $.trim($(this).val());
		if(schoolIntro == null || schoolIntro == ""){
			$(".info").eq(2).html("*请输入学校介绍");
			$(".info").eq(2).show();
		}else{
			$(".info").eq(2).html("");
			$(".info").eq(2).hide();
		}
	});
	$("#schoolDomain").on("blur", function(){
		var secondDomain = $.trim($(this).val());
		if(secondDomain != null && secondDomain != ''){
			var sld = /^[0-9a-zA-Z]*$/g;
			if(!sld.test(secondDomain)){
				$(".info").eq(3).html("*学校二级域名输入不合法");
				$(".info").eq(3).show();
				return false;
			}else{
				$(".info").eq(3).html("");
				$(".info").eq(3).hide();
			}
		}
	});
	
	$("input[type=file]").change(function(evt) {
		var $_file = $(this);
		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#schoolLogo").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});
	
}
function updateSchoolBasicInfo(){
	var schoolName = $.trim($("#schoolName").val());
	var schoolLabel = $.trim($("#schoolLabel").val());
	var schoolIntro = $.trim($("#schoolIntro").val());
	var secondDomain = $.trim($("#schoolDomain").val());
	var myFile = $("#file").val();
	if(schoolName == "" || schoolName == null){
		$(".info").eq(0).html("*请输入学校名称");
		$(".info").eq(0).show();
		return false;
	}
	if(schoolLabel == "" || schoolLabel == null){
		$(".info").eq(1).html("*请输入学校标签");
		$(".info").eq(1).show();
		return false;
	}
	if(schoolIntro == "" || schoolIntro == null){
		$(".info").eq(2).html("*请输入学校介绍");
		$(".info").eq(2).show();
		return false;
	}
	if(secondDomain != null && secondDomain != ''){
		var sld = /^[0-9a-zA-Z]*$/g;
		if(!sld.test(secondDomain)){
			$(".info").eq(3).html("*学校二级域名输入不合法");
			$(".info").eq(3).show();
			return false;
		}
	}

	if (myFile != "" && myFile != null) {
		var filepath = myFile;
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG"
				&& ext != ".JPEG") {
			getDialog("warn", "学校LOGO限于bmp,png,gif,jpeg,jpg格式");
			return false;
		} 
	}
	
	$.ajaxFileUpload({
        url: getRootPath()+'/school/updateBasicInfo', //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'file', //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        data:{"name":schoolName,"mark":schoolLabel,"introduce":schoolIntro,"secondDomain":secondDomain},
        success: function (data)  //服务器成功响应处理函数
           {
       	 if(data.success == true){
       		getDialogCue("success", "修改学校信息成功");
			setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
       	 }else{
       		 var msg = data.message;
       		 getDialogCue("fail", msg);
       		 return false;
       	 }
           }
   });
}

function addNewAnnouncement(){
	var adTitle = $.trim($("#adTitle").val());
	var adLink = $.trim($("#adLink").val());
	var adContent = $.trim($("#adContent").val());
	var isPublish = $("input[name='isPublish']:checked").val();
	if(adTitle == null || adTitle == ''){
		$(".prompt").eq(0).css("display","block");
		$(".prompt_info").eq(0).html("*请输入公告标题");
		$(".prompt_info").eq(0).show();
		return false;
	}else{
		$(".prompt").eq(0).css("display","none");
		$(".prompt_info").eq(0).html("");
		$(".prompt_info").eq(0).hide();
	}
	if((adLink == null || adLink =='') && (adContent == null || adContent == '')){
			$(".prompt").eq(1).css("display","block");
			$(".prompt_info").eq(1).html("*请输入公告链接或公告内容");
			$(".prompt_info").eq(1).show();
			return false;
		}else{
			$(".prompt").eq(1).css("display","none");
			$(".prompt_info").eq(1).html("");
			$(".prompt_info").eq(1).hide();
	}
	
	
	var url = getRootPath() + "/school/createMessage";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{"schoolId":schoolId,"title":adTitle,"linkUrl":adLink,"content":adContent,"publishFlag":isPublish},
		cache:false,
		success:function(data){
			var status = data.success;
			if(status == true){
				getDialogCue("success", "添加学校公告成功");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}else{
				getDialog("fail", "添加学校公告失败");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
}
function getSchoolAnnounces(){
	$("#schoolAnnouncement .sh_ann_info").remove();
	$("#schoolAnnouncement #newSchoolAD").remove();
	var announceDatas;
	var count;
	var url = getRootPath() + "/school/getAllMessage";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			var status = data.status;
			if(status == "0"){
				count = data.result.total;
				announceDatas = data.result.list;
			}else{
				getDialog("fail", "获取学校公告失败");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
	
	var pageNum = Math.ceil(count / 5);
	var pageSize = 0;

	if (pageNum <= 1) {
		var html = '';
		$.each(announceDatas, function(i, item) {
			html += '<div class="sh_ann_info">';
			html += '<div class="ann_id_info ann_content">'+item.messageid+'</div>';
			html += '<div class="ann_title_info ann_content">'+item.title+'</div>';
			if(item.content.length > 20){
				html += '<div class="ann_content_info ann_content">'+item.content.substring(0,15)+'···</div>';
			}else{
				html += '<div class="ann_content_info ann_content">'+item.content+'</div>';
			}
			html += '<div class="ann_issuer_info ann_content">'+item.publishUid+'</div>';
			html += '<div class="ann_time_info ann_content">'+item.publishTime+'</div>';
			if(item.publishFlag == "1"){
				html += '<div class="ann_status_info ann_content">已发布</div>';
			}else{
				html += '<div class="ann_status_info ann_content">未发布</div>';
			}
			html += '<div class="ann_top_info ann_content">是</div>';
			html += '<div class="ann_op_info ann_btn">';
			if(item.publishFlag == "1"){
				html += '<p onClick="setTopMessage('+item.messageid+')">置顶</p>';
				html += '<p onClick="delMessage('+item.messageid+')">删除</p>';
			}else{
				html += '<p onClick="publishMessage('+item.messageid+')">发布</p>';
				html += '<p onClick="setTopMessage('+item.messageid+')">置顶</p>';
				html += '<p onClick="delMessage('+item.messageid+')">删除</p>';
			}
			html += '</div>';
			html += '</div>';
			if(i == announceDatas.length-1){
				html += '<h2 id="newSchoolAD">添加新公告</h2>';
			}
		})
		if(announceDatas.length == 0){
			html += '<h2 id="newSchoolAD">添加新公告</h2>';
		}
		$("#schoolAnnouncement").append(html);

	} else {
		if (pageNum > 1 && pageNum < 5) {
			pageSize = pageNum;
		} else {
			pageSize = 5;
		}
		$("#page").show();
		$("#page").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackAnnouncesData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,page : 1,pageSize:5,schoolId:schoolId}
			}
		});
	}
	$(".sh_ann_info").on("mouseover",function(){
		$(this).css("background","#F0FFF0");
	}).on("mouseout",function(){
		$(this).css("background","#FFF");
	});
	$("#newSchoolAD").on("click",function(){
		$("#addNewSchoolAD").dialog("open");
	})
}

function callBackAnnouncesData(data) {
	$("#schoolAnnouncement .sh_ann_info").remove();
	$("#schoolAnnouncement #newSchoolAD").remove();
	var data = eval("(" + data + ")");
	var announceDatas = data.result.list;
	var html = '';
	$.each(announceDatas, function(i, item) {
		html += '<div class="sh_ann_info">';
		html += '<div class="ann_id_info ann_content">'+item.messageid+'</div>';
		html += '<div class="ann_title_info ann_content">'+item.title+'</div>';
		if(item.content.length > 20){
			html += '<div class="ann_content_info ann_content">'+item.content.substring(0,15)+' ···</div>';
		}else{
			html += '<div class="ann_content_info ann_content">'+item.content+'</div>';
		}
		html += '<div class="ann_issuer_info ann_content">'+item.publishUid+'</div>';
		html += '<div class="ann_time_info ann_content">'+item.publishTime+'</div>';
		if(item.publishFlag == "1"){
			html += '<div class="ann_status_info ann_content">已发布</div>';
		}else{
			html += '<div class="ann_status_info ann_content">未发布</div>';
		}
		html += '<div class="ann_top_info ann_content">是</div>';
		html += '<div class="ann_op_info ann_btn">';
		if(item.publishFlag == "1"){
			html += '<p onClick="setTopMessage('+item.messageid+')">置顶</p>';
			html += '<p onClick="delMessage('+item.messageid+')">删除</p>';
		}else{
			html += '<p onClick="publishMessage('+item.messageid+')">发布</p>';
			html += '<p onClick="setTopMessage('+item.messageid+')">置顶</p>';
			html += '<p onClick="delMessage('+item.messageid+')">删除</p>';
		}
		html += '</div>';
		html += '</div>';
		if(i == announceDatas.length-1){
			html += '<h2 id="newSchoolAD">添加新公告</h2>';
		}
	})
	$("#schoolAnnouncement").append(html);
	$(".sh_ann_info").on("mouseover",function(){
		$(this).css("background","#F0FFF0");
	}).on("mouseout",function(){
		$(this).css("background","#FFF");
	});
	$("#newSchoolAD").on("click",function(){
		$("#addNewSchoolAD").dialog("open");
	})
}
function publishMessage(messageId){
	var url = getRootPath() + "/school/publishMessage";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{"messageid":messageId},
		cache:false,
		success:function(data){
			var status = data.success;
			if(status == true){
				getDialogCue("success", "发布成功");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}else{
				getDialog("fail", "请重试");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
}
function setTopMessage(messageId){
	var url = getRootPath() + "/school/setTopMessage";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{"messageid":messageId},
		cache:false,
		success:function(data){
			var status = data.success;
			if(status == true){
				getDialogCue("success", "置顶成功");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}else{
				getDialog("fail", "请重试");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
}
function delMessage(messageId){
	var url = getRootPath() + "/school/deleteMessage";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{"messageid":messageId},
		cache:false,
		success:function(data){
			var status = data.success;
			if(status == true){
				getDialogCue("success", "删除成功");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}else{
				getDialog("fail", "请重试");
				setTimeout('location.href = getRootPath() + "/school/basicInfo"',3000) ;
			}
		}
	})
}
function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}
