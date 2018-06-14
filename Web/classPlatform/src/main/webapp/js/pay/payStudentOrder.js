$(function(){
	checkPassword();
	queryAccount();
	
	
	
});
function checkPassword(){
	$.ajax({
		url : getRootPath() + '/persondata/hadsetpaypwd',
		type : 'POST',
		dataType : 'json',
		async:false,
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==0){
				
			}else if(data.status==-2){
//				alert("请先设置支付密码！")
//				window.location.href= getRootPath() + '/toSetPaySafety';
				$('#red').css('display','block');
				$('#confirm_password').val('1');
				
			}
		},
	});	
}
function confirmPay(){
	var orderId=$("#orderId").text();
	var password=$("#password").val();
	var flag=$('#confirm_password').val();
	if(flag==0){
		$.ajax({
			url : getRootPath() + '/order/topayorderbyaccount',
			type : 'POST',
			dataType : 'json',
			data:{
				"orderid":orderId,
				"paypwd":password
			},
			async:false,
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
					$("#pay_content").css('display','none');
					$("#success_content").css('display','block');
				}else if(data.status==-2){
					alert("未设置支付密码，请先设置支付密码");
				}else if(data.status==-3){
					alert("密码错误！请重新输入");
				}else if(data.status==-6){
					alert("用户余额不足，请先充值");
				}
			},
		});
	}else{
		alert("请先设置支付密码！");
	}
		
}
function queryAccount(){
	$.ajax({
		url : getRootPath() + "/persondata/getpayaccountinfo",// 后端需要给的接口
		type : "post",
		dataType : "json",
		success : function(data) {
			$("#dangqianyue").html(data.userpayaccountinfo.balanceSum);
		}

	});
}
function zhifubao(){
	$("#pay_account").css('display','none');
	$("#pay_zhifubao").css('display','block');
	$("#pay_weixin").css('display','none');
	$(".pay_div1_div3").css('border-bottom','3px  solid #000000');
	$(".pay_div1_div1").css('border-bottom','0px  solid #000000');
	$(".pay_div1_div2").css('border-bottom','0px  solid #000000');
}
function weixin(){
	$("#pay_account").css('display','none');
	$("#pay_zhifubao").css('display','none');
	$("#pay_weixin").css('display','block');
	$(".pay_div1_div3").css('border-bottom','0px  solid #000000');
	$(".pay_div1_div1").css('border-bottom','0px  solid #000000');
	$(".pay_div1_div2").css('border-bottom','3px  solid #000000');
}
function accountPay(){
	$("#pay_account").css('display','block');
	$("#pay_zhifubao").css('display','none');
	$("#pay_weixin").css('display','none');
	$(".pay_div1_div1").css('border-bottom','3px  solid #000000');
	$(".pay_div1_div3").css('border-bottom','0px  solid #000000');
	$(".pay_div1_div2").css('border-bottom','0px  solid #000000');
}
function confirmPayZhifubao(){
	
	var orderId=$("#orderId").text();
	$.ajax({
		url : getRootPath() + "/topayorderbyali",// 后端需要给的接口
		type : "post",
		dataType : "json",
		data : {
			"orderid" : orderId,
		},
		success : function(data) {
//			window.open(data.url);
			window.location.href=data.url;
		}

	});
}
function confirmPayweixin(){
	
	var orderId=$("#orderId").text();
//	$.ajax({
//		url : getRootPath() + "/wxpay/topayorderbyweixin",// 后端需要给的接口
//		type : "post",
//		dataType : "json",
//		data : {
//			"orderid" : orderId,
//		},
//		success : function(data) {
////			window.open(data.url);
//			window.location.href=data;
//		}
//		
//	});
	window.location.href= getRootPath() + "/wxpay/topayorderbyweixin?orderid="+orderId;
}
