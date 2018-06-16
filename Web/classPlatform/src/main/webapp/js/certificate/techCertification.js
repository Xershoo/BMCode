/**
 * identity IDCard javascript sourcefile
 */

var myTinyDialog;
var locked = 1;
// 弹出框的函数
function getDialog(dialogContent) {
	if (myTinyDialog) {
		myTinyDialog.remove();
	}
	myTinyDialog = tinyDialog({
		'content' : dialogContent,
		'width' : 500,
		'height' : 300,
		'closeX' : true,
		'mask' : true,
	});
}

$(function() {
	
	getAuthCertificates();
	
	$("#identify").on("click", function() {
		$("#t_main").hide();
		$("#idenfyDtl").show();
		$("#defineH3").css("color", "#333333");
	});

	$("#identifyEdu").on("click", function() {
		$("#t_main").hide();
		$("#idenfyEdu").show();
		$("#defineH4").css("color", "#333333");
	});

	$("#identifyTech").on("click", function() {
		$("#t_main").hide();
		$("#idenfyTech").show();
		$("#defineH5").css("color", "#333333");
	});
	$("#identifyOther").on("click", function() {
		$("#t_main").hide();
		$("#idenfyOther").show();
		$("#defineH6").css("color", "#333333");
	});

	$("#identify").on("mouseover", function() {
		$(this).css("background-color", "#E63737").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#f26666");
	});

	$("#identifyEdu").on("mouseover", function() {
		$(this).css("background-color", "#E63737").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#f26666");
	});

	$("#identifyTech").on("mouseover", function() {
		$(this).css("background-color", "#E63737").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#f26666");
	});

	$("#identifyOther").on("mouseover", function() {
		$(this).css("background-color", "#E63737").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#f26666");
	});

	$("#submitIdCard").on("mouseover", function() {
		$(this).css("background-color", "#51a4f6").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#ffa800");
	});

	$("#cancelIdCard").on("mouseover", function() {
		$(this).css("background-color", "#3997f4").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#submitEduCard").on("mouseover", function() {
		$(this).css("background-color", "#51a4f6").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#ffa800");
	});

	$("#cancelEduCard").on("mouseover", function() {
		$(this).css("background-color", "#3997f4").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#submitTechCard").on("mouseover", function() {
		$(this).css("background-color", "#51a4f6").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#ffa800");
	});

	$("#cancelTechCard").on("mouseover", function() {
		$(this).css("background-color", "#3997f4").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#submitOtherCard").on("mouseover", function() {
		$(this).css("background-color", "#51a4f6").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#ffa800");
	});

	$("#cancelOtherCard").on("mouseover", function() {
		$(this).css("background-color", "#3997f4").css("cursor", "pointer");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#chooseFile1").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#img1").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#chooseFile2").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#img2").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#chooseFile3").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#img3").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#authEdu").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#highEdu").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#authTech").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#highTech").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#authOther").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#highOther").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#realName").blur(function() {
		var realName = $("#realName").val();
		isValidRealName(realName);
	});
	$("#idCardNum").blur(function() {
		var idCardNum = $("#idCardNum").val();
		isValidIdCardNum(idCardNum);
	});

	//	$( "#dialog-confirm" ).dialog({
	//		resizable: false,
	//	     height:140,
	//	     modal: true,
	//	     buttons: {
	//	         "知道了": function() {
	//	           $( this ).dialog( "close" );
	//	         }
	//	     }
	//	});

//	var status = $("#status").val();
//	if(status != "null" && status != ""){
//		if (status == 0) {
//			alert("提交成功，我们会尽快为您审核~！");
//		} else{
////			$("#dialog-confirm").dialog("open");
//			alert("上传失败！");
//		}
//	}
	
});

function checkForm() {
	var realName = $("#realName").val();
	var idCardNum = $("#idCardNum").val();
	var chooseFile1 = $("#chooseFile1").val();
	var chooseFile2 = $("#chooseFile2").val();
	var chooseFile3 = $("#chooseFile3").val();
	if (isValidRealName(realName) && isValidIdCardNum(idCardNum)
			&& isValidFile1(chooseFile1) && isValidFile2(chooseFile2)
			&& isValidFile3(chooseFile3)) {
		return true;
	} else {
		return false;
	}
}
var isValidRealName = function(realName) {
	if ($.trim(realName) == "" || $.trim(realName) == null) {
		$(".info").eq(0).show();
		$(".info").eq(0).html("请输入真实姓名！");
		return false;
	} else {
		$(".info").eq(0).hide();
		$(".info").eq(0).html("");
		return true;
	}
}
var isValidIdCardNum = function(idCardNum) {
	var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
	if ($.trim(idCardNum) == "" || $.trim(idCardNum) == null) {
		$(".info").eq(1).show();
		$(".info").eq(1).html("请输入身份证号码！");
		return false;
	} else {
		if (!reg.test(idCardNum)) {
			$(".info").eq(1).show();
			$(".info").eq(1).html("您输入的身份证号码格式有误，请重新输入！");
			return false;
		} else {
			$(".info").eq(1).hide();
			$(".info").eq(1).html("");
			return true;
		}
	}
}
var isValidFile1 = function(chooseFile1) {
	if ($.trim(chooseFile1) == "" || $.trim(chooseFile1) == null) {
		alert("请选择要上传的手持身份证照片！");
		return false;
	} else {
		var filepath = chooseFile1;
//		var filepath = $("input[name='chooseFile1']").val();
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG"
				&& ext != ".JPEG") {
			alert("手持身份证照片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		} else {
			return true;
		}
	}
}
var isValidFile2 = function(chooseFile2) {
	if ($.trim(chooseFile2) == "" || $.trim(chooseFile2) == null) {
		alert("请选择要上传的身份证正面照片！");
		return false;
	} else {
		var filepath = chooseFile2;
//		var filepath = $("input[name='chooseFile2']").val();
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG"
				&& ext != ".JPEG") {
			alert("身份证正面照片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		} else {
			return true;
		}
	}
}
var isValidFile3 = function(chooseFile3) {
	if ($.trim(chooseFile3) == "" || $.trim(chooseFile3) == null) {
		alert("请选择要上传的身份证反面照片！");
		return false;
	} else {
		var filepath = chooseFile3;
//		var filepath = $("input[name='chooseFile3']").val();
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG"
				&& ext != ".JPEG") {
			alert("身份证反面照片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		} else {
			return true;
		}
	}
}
function submitEduCer(cerType){
	var  edu = "";
	var myFiles = "";
	var nCerType = "";
	if(cerType == 1){
		var education = $("#education").val();
		if(education == 0){
				$(".info").eq(2).show();
				$(".info").eq(2).html("请选择最高学历！");
				return false;
		} else {
				$(".info").eq(2).hide();
				$(".info").eq(2).html("");
				edu = education;
		}  
		var file = $("#authEdu").val();
		
		if(file == ""){
			alert("请选择需要上传的证书！");
			return;
		}
		myFiles = "authEdu";
		nCerType = cerType;
	}
	if(cerType == 2){
		var file = $("#authTech").val();
		
		if(file == ""){
			alert("请选择需要上传的证书！");
			return;
		}
		myFiles = "authTech";
		nCerType = cerType;
	}
	if(cerType == 3){
		var eduOth = $("#eduOth").val();
		if(eduOth == 0){
			$(".info").eq(5).show();
			$(".info").eq(5).html("请选择最高学历！");
			return false;
		} else {
			$(".info").eq(5).hide();
			$(".info").eq(5).html("");
			edu = eduOth;
		}
		var file = $("#authOther").val();
		
		if(file == ""){
			alert("请选择需要上传的证书！");
			return;
		}
		myFiles = "authOther";
		nCerType = 10;
	}
	
	$.ajaxFileUpload({
         url: getRootPath()+'/teacher/authtoteacheraddCert', //用于文件上传的服务器端请求地址
         secureuri: false, //是否需要安全协议，一般设置为false
         fileElementId: myFiles, //文件上传域的ID
         dataType: 'json', //返回值类型 一般设置为json
         data:{"nCerType":nCerType,"cername":edu},
         success: function (data, status)  //服务器成功响应处理函数
            {
        	 if(data.status == -1){
        		 alert("请登录后再操作！");
        		 location.href = getRootPath() + "/index";
        	 }else if(data.status == 0){
        		 alert("上传成功！");
        		 location.href = getRootPath() + "/teacher/techCertification";
        	 }else{
        		 alert("操作失败，请重试！");
        		 location.href = getRootPath() + "/teacher/techCertification";
        	 }
            }
    });
}

function getAuthCertificates(){
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
				
			}else if(data.status == 0){
				var auth = data.auth;
				var other = data.other;
				$("#idVerify").attr("src","../images/piano_certificate/pass_id.gif");
				$("#eduVerify").attr("src","../images/piano_certificate/pass_edu.gif");
				$("#techVerify").attr("src","../images/piano_certificate/pass_tech.gif");
				$("#otherVerify").attr("src","../images/piano_certificate/pass_other.png");
				/*$.each(other,function(i, item){
					if(item.certificateType == 1){
						$("#eduVerify").attr("src","../images/piano_certificate/pass_edu.gif");
					}
					if(item.certificateType == 2){
						$("#techVerify").attr("src","../images/piano_certificate/pass_tech.gif");
					}
					if(item.certificateType == 10){
						$("#otherVerify").attr("src","../images/piano_certificate/pass_other.gif");
					}
				})*/
				$("#alIdentify").show();
				$("#alIdentifyEdu").show();
				$("#alIdentifyTech").show();
				$("#alIdentifyOther").show();
				$("#identify").hide();
				$("#identifyEdu").hide();
				$("#identifyTech").hide();
				$("#identifyOther").hide();
				$(".th_iden").html("已认证");
			}
		}
	})
}

function cancelSubmit() {
	$("#t_main").show();
	$("#idenfyDtl").hide();
	$("#idenfyEdu").hide();
	$("#idenfyTech").hide();
	$("#idenfyOther").hide();
}
