function recharge() {

	var amount = $("#jine").val();
	var zhifu= $(' input[name="zhifu"]:checked ').val();
	if(zhifu==1){
		$.ajax({
			url : getRootPath() + "/alipayToCharge",// 后端需要给的接口
			type : "post",
			dataType : "json",
			data : {
				"WIDtotal_fee" : amount,
				"WIDbody" : "充值"
			},
			success : function(data) {
//				window.open(data.url);
				window.location.href=data.url;
			}

		});
	}else if(zhifu==2){
		$.ajax({
			url : getRootPath() + "/wxpay/payCharge",// 后端需要给的接口
			type : "post",
			dataType : "text",
			data : {
				"WIDtotal_fee" : amount
			},
			success : function(data) {
//				window.open(getRootPath()+"/wxpay/toWxpay?code_url="+data);
				window.location.href=getRootPath()+"/wxpay/toWxpay?code_url="+data;
			}

		});
	}
	

}
$(function() {

	$.ajax({
		url : getRootPath() + "/persondata/getpayaccountinfo",// 后端需要给的接口
		type : "post",
		dataType : "json",
		success : function(data) {
			$("#dangqianyue").html(data.userpayaccountinfo.balanceSum);
			$("#dangqianyue1").html(data.userpayaccountinfo.balanceSum);
		}

	});

})
function toRecharge(){
	$("#zhanghu").css('display','none');
	$("#zhanghuchongzhi").css('display','block');
	
}
