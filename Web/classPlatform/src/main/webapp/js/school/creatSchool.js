/**
 * creat school apply javascript source file
 */
var emailRegex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
var urlRegex=new RegExp("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$"); 

$(function(){
	getClass8SchoolType();
	getRealSchoolType();
	
	$(".btn_common").hover(function(){
		$(this).css("background", "#ffa800");
	}, function(){
		$(this).css("background", "#51a4f6");
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
					$_file.parents(".school_info_value").find("img").attr("src", e.target.result);
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});
	
	$("#apply_submit_btn").on("click", function(){
		var sysName = $.trim($("#sysName").val());
		var schoolIntorduce = $.trim($("#c8schoolIntorduce").val());
		var logoFile = $.trim($("#logoFile").val());
		var schoolName = $.trim($("#schoolName").val());
		var schoolWeb = $.trim($("#schoolWeb").val());
		var organCode = $.trim($("#organCode").val());
		var organFile = $.trim($("#organFile").val());
		var applyUserName = $.trim($("#applyUserName").val());
		var applyUserPhone = $.trim($("#applyUserPhone").val());
		var applyUserEmail = $.trim($("#applyUserEmail").val());
		var applyUserCard = $.trim($("#applyUserCard").val());
		var cardFile = $.trim($("#cardFile").val());
		var trustFile = $.trim($("#trustFile").val());
		var frontFile = $.trim($("#cardFrontFile").val());
		var backFile = $.trim($("#cardBackFile").val());
		
		if(sysName == "" || sysName == null){
			$(".validate_info").eq(0).html("*请输入学校名称");
			$(".validate_info").eq(0).show();
		}else{
			checkc8SchoolNameHadCreated(sysName);
		}
		if(schoolIntorduce == "" || schoolIntorduce == null){
			$(".validate_info").eq(1).html("*请输入学校介绍");
			$(".validate_info").eq(1).show();
		}
		if(logoFile == "" || logoFile == null){
			$(".validate_file_info").eq(0).html("*请选择上传学校头像图片");
			$(".validate_file_info").eq(0).show();
		}
		if(schoolName == "" || schoolName == null){
			$(".validate_info").eq(2).html("*请输入机构名称");
			$(".validate_info").eq(2).show();
		}else{
			checkrealSchoolNameHadCreated(schoolName);
		}
		if(schoolWeb != "" && schoolWeb != null && !urlRegex.test(schoolWeb)){
			$(".validate_info").eq(3).html("*输入的机构网址格式不对");
			$(".validate_info").eq(3).show();
		}
		if(organCode == "" || organCode == null){
			$(".validate_info").eq(4).html("*请输入组织机构代码");
			$(".validate_info").eq(4).show();
		}
		if(organFile == "" || organFile == null){
			$(".validate_file_info").eq(1).html("*请选择上传组织机构代码图片");
			$(".validate_file_info").eq(1).show();
		}
		if(applyUserName == "" || applyUserName == null){
			$(".validate_info").eq(5).html("*请输入申请人姓名");
			$(".validate_info").eq(5).show();
		}
		if(applyUserPhone == "" || applyUserPhone == null){
			$(".validate_info").eq(6).html("*请输入申请人电话");
			$(".validate_info").eq(6).show();
		}
		if(applyUserEmail != "" && applyUserEmail != null && !emailRegex.test(applyUserEmail)){
			$(".validate_info").eq(7).html("*输入的邮箱格式不对");
			$(".validate_info").eq(7).show();
		}
		if(applyUserCard == "" || applyUserCard == null){
			$(".validate_info").eq(8).html("*请输入申请人身份证号");
			$(".validate_info").eq(8).show();
		}
		if(applyUserCard != "" && !checkEnergyCard(applyUserCard)){
			$(".validate_info").eq(8).html("*输入的身份证号不正确");
			$(".validate_info").eq(8).show();
		}
		if(cardFile == "" || cardFile == null){
			$(".validate_file_info").eq(2).html("*请选择上传手持身份证图片");
			$(".validate_file_info").eq(2).show();
		}
		if(trustFile == "" || trustFile == null){
			$(".validate_file_info").eq(3).html("*请选择上传委托授权书图片");
			$(".validate_file_info").eq(3).show();
		}
		if(frontFile == "" || frontFile == null){
			$(".validate_file_info").eq(4).html("*请选择上传身份证正面图片");
			$(".validate_file_info").eq(4).show();
		}
		if(backFile == "" || backFile == null){
			$(".validate_file_info").eq(5).html("*请选择上传身份证反面图片");
			$(".validate_file_info").eq(5).show();
		}
		
		if(sysName != "" && checkc8SchoolNameHadCreated(sysName) && 
				schoolIntorduce != "" && logoFile != "" &&
				schoolName != "" && checkrealSchoolNameHadCreated(schoolName) &&
				(schoolWeb == "" || (schoolWeb != "" && urlRegex.test(schoolWeb))) &&
				organCode != "" && organFile != "" &&
				applyUserName != "" && applyUserPhone != "" &&
				(applyUserEmail == "" || (applyUserEmail != "" && emailRegex.test(applyUserEmail))) &&
				applyUserCard != "" && checkEnergyCard(applyUserCard) &&
				cardFile != "" && trustFile !="" && frontFile != "" && backFile != ""){
			
			$("#creatSchoolForm").attr("action", getRootPath()+"/auth/authtocreateschool");
			$("#creatSchoolForm").submit();
		}
		/*$("#creatSchoolForm").attr("action", getRootPath()+"/authtocreateschool");
		$("#creatSchoolForm").submit();*/
	});
	
	$("#sysName").on("blur", function(){
		var name = $.trim($(this).val());
		if(name == null || name == ""){
			$(".validate_info").eq(0).html("*请输入学校名称");
			$(".validate_info").eq(0).show();
		}else{
			checkc8SchoolNameHadCreated(name);
		}
	});
	
	$("#c8schoolIntorduce").on("blur", function(){
		var intorduce = $.trim($(this).val());
		if(intorduce == null || intorduce == ""){
			$(".validate_info").eq(1).html("*请输入学校介绍");
			$(".validate_info").eq(1).show();
		}else{
			$(".validate_info").eq(1).html("");
			$(".validate_info").eq(1).hide();
		}
	});
	
	$("#schoolWeb").on("blur", function(){
		var web = $.trim($(this).val());
		
		if(web != "" && !urlRegex.test(web)){
			$(".validate_info").eq(3).html("*输入的机构网址格式不对");
			$(".validate_info").eq(3).show();
		}else{
			$(".validate_info").eq(3).html("");
			$(".validate_info").eq(3).hide();
		}
	});
	
	$("#schoolName").on("blur", function(){
		var name = $(this).val();
		if(name == null || name == ""){
			$(".validate_info").eq(2).html("*请输入机构名称");
			$(".validate_info").eq(2).show();
		}else{
			checkrealSchoolNameHadCreated(name);
		}
	});
	
	$("#organCode").on("blur", function(){
		var code = $(this).val();
		if(code == "" || code == null){
			$(".validate_info").eq(4).html("*请输入组织机构代码");
			$(".validate_info").eq(4).show();
		}else{
			$(".validate_info").eq(4).html("");
			$(".validate_info").eq(4).hide();
		}
	});
	
	$("#applyUserName").on("blur", function(){
		var userName = $(this).val();
		if(userName == "" || userName == null){
			$(".validate_info").eq(5).html("*请输入申请人姓名");
			$(".validate_info").eq(5).show();
		}else{
			$(".validate_info").eq(5).html("");
			$(".validate_info").eq(5).hide();
		}
	});
	
	$("#applyUserPhone").on("blur", function(){
		var phone = $(this).val();
		if(phone == "" || phone == null){
			$(".validate_info").eq(6).html("*请输入申请人电话");
			$(".validate_info").eq(6).show();
		}else{
			$(".validate_info").eq(6).html("");
			$(".validate_info").eq(6).hide();
		}
	});
	
	$("#applyUserEmail").on("blur", function(){
		var email = $.trim($(this).val());
		
		if(email != "" && !emailRegex.test(email)){
			$(".validate_info").eq(7).html("*输入的邮箱格式不对");
			$(".validate_info").eq(7).show();
		}else{
			$(".validate_info").eq(7).html("");
			$(".validate_info").eq(7).hide();
		}
	});
	
	$("#applyUserCard").on("blur", function(){
		var card = $.trim($(this).val());
		if(card == null || card == ""){
			$(".validate_info").eq(8).html("*请输入申请人身份证号");
			$(".validate_info").eq(8).show();
		}else{
			if(!checkEnergyCard(card)){
				$(".validate_info").eq(8).html("*输入的身份证号不正确");
				$(".validate_info").eq(8).show();
			}else{
				$(".validate_info").eq(8).html("");
				$(".validate_info").eq(8).hide();
			}
		}
	});
	
	$("#logoFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(0).html("*请选择上传学校头像图片");
			$(".validate_file_info").eq(0).show();
		}else{
			$(".validate_file_info").eq(0).html("");
			$(".validate_file_info").eq(0).hide();
		}
	});
	$("#organFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(1).html("*请选择上传组织机构代码图片");
			$(".validate_file_info").eq(1).show();
		}else{
			$(".validate_file_info").eq(1).html("");
			$(".validate_file_info").eq(1).hide();
		}
	});
	$("#cardFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(2).html("*请选择上传手持身份证图片");
			$(".validate_file_info").eq(2).show();
		}else{
			$(".validate_file_info").eq(2).html("");
			$(".validate_file_info").eq(2).hide();
		}
	});
	$("#trustFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(3).html("*请选择上传委托授权书图片");
			$(".validate_file_info").eq(3).show();
		}else{
			$(".validate_file_info").eq(3).html("");
			$(".validate_file_info").eq(3).hide();
		}
	});
	
	$("#cardFrontFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(4).html("*请选择上传身份证正面图片");
			$(".validate_file_info").eq(4).show();
		}else{
			$(".validate_file_info").eq(4).html("");
			$(".validate_file_info").eq(4).hide();
		}
	});
	
	$("#cardBackFile").on("change", function(){
		var file = $(this).val();
		
		if(file == "" || file == null){
			$(".validate_file_info").eq(5).html("*请选择上传身份证反面图片");
			$(".validate_file_info").eq(5).show();
		}else{
			$(".validate_file_info").eq(5).html("");
			$(".validate_file_info").eq(5).hide();
		}
	});
});

var getClass8SchoolType = function(){
	var url = getRootPath() + "/auth/getclass8schoolitems";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		success:function(data){
			var status = parseInt(data.status)
			if(status == -1){
				getDialog("fail", "未登录或登录已超时!");
				setTimeout("location.href = getRootPath() + '/';",3000);
				
			}else if(status == 0){
				var jsonObj = data.classify;
				$.each(jsonObj, function (i, item) {  
		              var html = '<option value="'+item.id+'">'+item.name+'</option>';
		              $("#schoolType").append(html);
		        });
			}else{
				getDialog("fail", "获取平台学校类型失败!");
				setTimeout("location.href = getRootPath() + '/';",3000);
				//location.href = getRootPath() + "/school/creatSchoolApply";
			}
		}
	})
}

var getRealSchoolType = function(){
	var url = getRootPath() + "/auth/getrealschoolitems";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		success:function(data){
			var status = parseInt(data.status)
			if(status == -1){
			}else if(status == 0){
				var jsonObj = data.classify;
				$.each(jsonObj, function (i, item) {  
		              var html = '<option value="'+item.id+'">'+item.name+'</option>';
		              $("#schoolStyle").append(html);
		        });
			}else{
				getDialog("fail", "获取实体学校类型失败!");
				setTimeout("location.href = getRootPath() + '/';",3000)
				//location.href = getRootPath() + "/school/creatSchoolApply";
			}
		}
	})
}

//用户创建学校，检查所填学校是所被占用
function checkc8SchoolNameHadCreated(name){
	var url = getRootPath() + "/auth/checkc8SchoolNameHadCreated";
	var bool = false;
	$.ajax({
		url:url,
		type:'post',
		async:false, 
		data:{'name':name},
		dataType:'json',
		success:function(data){
			var status = parseInt(data.status)
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				setTimeout("location.href = getRootPath() + '/loginPage';",3000)
			}else if(status == 0){
				bool = true;
				$(".validate_info").eq(0).html("");
				$(".validate_info").eq(0).hide();
			}else if(status == 1){
				$(".validate_info").eq(0).html("*输入的学校名称已存在");
				$(".validate_info").eq(0).show();
			}else{
				console.log("创建学校申请失败");
			}
		}
	});
	return bool;
}

//用户创建学校，检查所申请学校是否被申请过了，如果实体学校被申请了，就不能再创建相应学校
function checkrealSchoolNameHadCreated(name){
	var url = getRootPath() + "/auth/checkrealSchoolNameHadCreated";
	var bool = false;
	$.ajax({
		url:url,
		async:false, 
		type:'post',
		data:{'name':name},
		dataType:'json',
		success:function(data){
			var status = parseInt(data.status)
			if(status == -1){
				//提示已超时  重新登录
				getDialog("fail", "登录已超时，请重新登录!");
				setTimeout("location.href = getRootPath() + '/loginPage';",3000)
			}else if(status == 0){
				bool = true;
				$(".validate_info").eq(2).html("");
				$(".validate_info").eq(2).hide();
			}else if(status == 1){
				$(".validate_info").eq(2).html("*输入的学校名称已存在");
				$(".validate_info").eq(2).show();
			}else{
				console.log("创建学校申请失败");
			}
		}
	});
	return bool;
}

//检查身份证号码是否合法
function checkEnergyCard(idCard) {
	//校验长度，类型
	if (isCardNo(idCard) === false) {
		return false;
	}
	//检查省份
	else if (checkProvince(idCard) === false) {
		return false;
	}
	//校验生日
	else if (checkBirthday(idCard) === false) {
		return false;
	}
	//检验位的检测
	else if (checkParity(idCard) === false) {
		return false;
	} else {
		return true;
	}

}
