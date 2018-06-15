/**
 * show trade record data javascript source file
 */
var tradeCount = 0;
var type = -1;

$(function(){
	
	ajaxGetTradeCount(type);
	ajaxShowTradeData(type);
	
	$("#menuAll").on("click", function(){
		$(this).css({"border-bottom":"5px solid #51a4f6", "color":"#51a4f6"});
		$(this).siblings().css({"border-bottom":"0px", "color":"#3d3d3d"});
		
		type = -1;
		ajaxGetTradeCount(type);
		ajaxShowTradeData(type);
		
		$("#trade_data_list").show();
		$("#budget_data_list").hide();
		$("#recharge_data_list").hide();
		$("#deposit_data_list").hide();
	});
	
	$("#menu1").on("click", function(){
		$(this).css({"border-bottom":"5px solid #51a4f6", "color":"#51a4f6"});
		$(this).siblings().css({"border-bottom":"0px", "color":"#3d3d3d"});
		
		
		$("#trade_data_list").hide();
		$("#budget_data_list").show();
		$("#recharge_data_list").hide();
		$("#deposit_data_list").hide();
	});
	$("#menu2").on("click", function(){
		$(this).css({"border-bottom":"5px solid #51a4f6", "color":"#51a4f6"});
		$(this).siblings().css({"border-bottom":"0px", "color":"#3d3d3d"});
		
		type = 0;
		ajaxGetTradeCount(type);
		ajaxShowTradeData(type);
		
		$("#trade_data_list").hide();
		$("#budget_data_list").hide();
		$("#recharge_data_list").show();
		$("#deposit_data_list").hide();
	});
	$("#menu3").on("click", function(){
		$(this).css({"border-bottom":"5px solid #51a4f6", "color":"#51a4f6"});
		$(this).siblings().css({"border-bottom":"0px", "color":"#3d3d3d"});
		$("#trade_data_list").hide();
		$("#budget_data_list").hide();
		$("#recharge_data_list").hide();
		$("#deposit_data_list").show();
	});
	
	$("#search_condition_div").children().eq(1).find(".select_bg").on("click", function(){
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});
	
	$("#search_condition_div").children().eq(2).find(".select_bg").on("click", function(){
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});
});

/**
 * 获取交易记录总数
 * @param type
 */
function ajaxGetTradeCount(type){
	$.ajax({
		url:getRootPath() + '/order/getaccountbillscount',
		type:'post',
		data:{'type':type},
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			var result = parseInt(data.status);
			if(result == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(result == -100){
				tradeCount = 0;
			}else if(result == 0){
				tradeCount = data.count;
			}
		}
	});
}

/**
 * 获取交易记录数据，分页查询
 * @param type
 */
function ajaxShowTradeData(type){
	var pageNum = Math.ceil(tradeCount/5);
	var pageSize = 0;
	$("#page").html("");
	if(pageNum == 1 || pageNum == 0){
		$.ajax({
			url:getRootPath() + '/order/getaccountbills',
			type:'post',
			dataType:'json',
			data: {"rows":5,"page":1, "type":type},
			cache:false,
			success:function(data){
					var status = parseInt(data.status);
					if(status == -1){
						getDialog("fail", "登录已超时，请重新登录!");
						location.href = getRootPath() + "/loginPage";
					}else if(status == -2){
						if(type == -1){
							var html = '<table>'
									+ '<tr height="30px;">'
									+ '<th width="150px">交易号</td>'
									+ '<th width="150px">交易时间</td>'
									+ '<th width="180px">交易分类|交易内容</td>'
									+ '<th width="120px">交易方</td>'
									+ '<th width="120px">交易金额</td>'
									+ '<th width="120px">交易状态</td>'
									+ '<th>操作</td>'
									+ '</tr>'
									+ '<tr height="120px;">'
									+ '<td colspan="7">无交易记录</td>'
									+ '</tr>'
									+ '</table>';
							$("#trade_table").html(html);
						}else if(type == 0){
							var html = '<table>'
								+ '<tr height="30px;">'
								+ '<th width="150px">交易号</td>'
								+ '<th width="150px">交易时间</td>'
								+ '<th width="180px">交易内容</td>'
								+ '<th width="120px">交易方</td>'
								+ '<th width="120px">交易金额</td>'
								+ '<th width="120px">交易状态</td>'
								+ '<th>操作</td>'
								+ '</tr>'
								+ '<tr height="120px;">'
								+ '<td colspan="7">无充值交易记录</td>'
								+ '</tr>'
								+ '</table>';
						$("#recharge_table").html(html);
						}
					}else if(status == -100){
						if(type == -1){
							var html = '<table>'
									+ '<tr height="30px;">'
									+ '<th width="150px">交易号</td>'
									+ '<th width="150px">交易时间</td>'
									+ '<th width="180px">交易分类|交易内容</td>'
									+ '<th width="120px">交易方</td>'
									+ '<th width="120px">交易金额</td>'
									+ '<th width="120px">交易状态</td>'
									+ '<th>操作</td>'
									+ '</tr>'
									+ '<tr height="120px;">'
									+ '<td colspan="7">查询失败</td>'
									+ '</tr>'
									+ '</table>';
							$("#trade_table").html(html);
						}else if(type == 0){
							var html = '<table>'
								+ '<tr height="30px;">'
								+ '<th width="150px">交易号</td>'
								+ '<th width="150px">交易时间</td>'
								+ '<th width="180px">交易内容</td>'
								+ '<th width="120px">交易方</td>'
								+ '<th width="120px">交易金额</td>'
								+ '<th width="120px">交易状态</td>'
								+ '<th>操作</td>'
								+ '</tr>'
								+ '<tr height="120px;">'
								+ '<td colspan="7">查询失败</td>'
								+ '</tr>'
								+ '</table>';
						$("#recharge_table").html(html);
						}
					}else{
						var jsonObj = data.list;
						if(type == -1){
							var html = '<table>'
								+ '<tr height="30px;">'
								+ '<th width="150px">交易号</td>'
								+ '<th width="150px">交易时间</td>'
								+ '<th width="180px">交易分类|交易内容</td>'
								+ '<th width="120px">交易方</td>'
								+ '<th width="120px">交易金额</td>'
								+ '<th width="120px">交易状态</td>'
								+ '<th>操作</td>'
								+ '</tr>';
							$.each(jsonObj, function (i, item) {  
					              html += '<tr height="120px;">'
					            	  + '<td>交易号：'+item.tradeNo+'</td>'
					            	  + '<td>'+item.tradeTime+'</td>'
					            	  + '<td>'+item.courseName+'</td>'
					            	  + '<td>'+item.otherName+'</td>'
					            	  + '<td>¥'+item.price+'</td>'
					            	  + '<td>交易成功</td>'                       //加判断修改交易状态
					            	  + '<td></td>'
					            	  + '</tr>';
					        });
							html += '</table>';
							$("#trade_table").html(html);
						}else if(type == 0){
							var html = '<table>'
								+ '<tr height="30px;">'
								+ '<th width="150px">交易号</td>'
								+ '<th width="150px">交易时间</td>'
								+ '<th width="180px">交易内容</td>'
								+ '<th width="120px">交易方</td>'
								+ '<th width="120px">交易金额</td>'
								+ '<th width="120px">交易状态</td>'
								+ '<th>操作</td>'
								+ '</tr>';
							$.each(jsonObj, function (i, item) {  
					              html += '<tr height="120px;">'
					            	  + '<td>交易号：'+item.tradeNo+'</td>'
					            	  + '<td>'+item.tradeTime+'</td>'
					            	  + '<td>'+item.courseName+'</td>'
					            	  + '<td>'+item.otherName+'</td>'
					            	  + '<td>+¥'+item.price+'</td>'
					            	  + '<td>交易成功</td>'                       //加判断修改交易状态
					            	  + '<td></td>'
					            	  + '</tr>';
					        });
							html += '</table>';
							$("#recharge_table").html(html);
						}
					}
			}
		});
	}else{		
		
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#page").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackTradeData',
	    		url:getRootPath()+'/order/getaccountbills',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:5, type:type}
	    	}
	    });
	}
}
/**
 * 交易记录分页回调函数
 * @param data
 */
function callBackTradeData(data){
	var result = eval("("+data+")");
	var status = parseInt(result.status);
	if(status == -1){
		getDialog("fail", "登录已超时，请重新登录!");
		location.href = getRootPath() + "/loginPage";
	}else if(status == -2){
		if(type == -1){
			var html = '<table>'
					+ '<tr height="30px;">'
					+ '<th width="150px">交易号</td>'
					+ '<th width="150px">交易时间</td>'
					+ '<th width="180px">交易分类|交易内容</td>'
					+ '<th width="120px">交易方</td>'
					+ '<th width="120px">交易金额</td>'
					+ '<th width="120px">交易状态</td>'
					+ '<th>操作</td>'
					+ '</tr>'
					+ '<tr height="120px;">'
					+ '<td colspan="7">无交易记录</td>'
					+ '</tr>'
					+ '</table>';
			$("#trade_table").html(html);
		}else if(type == 0){
			var html = '<table>'
				+ '<tr height="30px;">'
				+ '<th width="150px">交易号</td>'
				+ '<th width="150px">交易时间</td>'
				+ '<th width="180px">交易内容</td>'
				+ '<th width="120px">交易方</td>'
				+ '<th width="120px">交易金额</td>'
				+ '<th width="120px">交易状态</td>'
				+ '<th>操作</td>'
				+ '</tr>'
				+ '<tr height="120px;">'
				+ '<td colspan="7">查询失败</td>'
				+ '</tr>'
				+ '</table>';
		$("#recharge_table").html(html);
		}
	}else if(status == -100){
		if(type == -1){
			var html = '<table>'
					+ '<tr height="30px;">'
					+ '<th width="150px">交易号</td>'
					+ '<th width="150px">交易时间</td>'
					+ '<th width="180px">交易分类|交易内容</td>'
					+ '<th width="120px">交易方</td>'
					+ '<th width="120px">交易金额</td>'
					+ '<th width="120px">交易状态</td>'
					+ '<th>操作</td>'
					+ '</tr>'
					+ '<tr height="120px;">'
					+ '<td colspan="7">查询失败</td>'
					+ '</tr>'
					+ '</table>';
			$("#trade_table").html(html);
		}
	}else{
		var jsonObj = result.list;
		if(type == -1){
			var html = '<table>'
				+ '<tr height="30px;">'
				+ '<th width="150px">交易号</td>'
				+ '<th width="150px">交易时间</td>'
				+ '<th width="180px">交易分类|交易内容</td>'
				+ '<th width="120px">交易方</td>'
				+ '<th width="120px">交易金额</td>'
				+ '<th width="120px">交易状态</td>'
				+ '<th>操作</td>'
				+ '</tr>';
			$.each(jsonObj, function (i, item) {  
	              html += '<tr height="120px;">'
	            	  + '<td>交易号：'+item.tradeNo+'</td>'
	            	  + '<td>'+item.tradeTime+'</td>'
	            	  + '<td>'+item.courseName+'</td>'
	            	  + '<td>'+item.otherName+'</td>'
	            	  + '<td>¥'+item.price+'</td>'
	            	  + '<td>交易成功</td>'                       //加判断修改交易状态
	            	  + '<td></td>'
	            	  + '</tr>';
	        });
			html += '</table>';
			$("#trade_table").html(html);
		}else if(type == 0){
			var html = '<table>'
				+ '<tr height="30px;">'
				+ '<th width="150px">交易号</td>'
				+ '<th width="150px">交易时间</td>'
				+ '<th width="180px">交易内容</td>'
				+ '<th width="120px">交易方</td>'
				+ '<th width="120px">交易金额</td>'
				+ '<th width="120px">交易状态</td>'
				+ '<th>操作</td>'
				+ '</tr>';
			$.each(jsonObj, function (i, item) {  
	              html += '<tr height="120px;">'
	            	  + '<td>交易号：'+item.tradeNo+'</td>'
	            	  + '<td>'+item.tradeTime+'</td>'
	            	  + '<td>'+item.courseName+'</td>'
	            	  + '<td>'+item.otherName+'</td>'
	            	  + '<td>+¥'+item.price+'</td>'
	            	  + '<td>交易成功</td>'                       //加判断修改交易状态
	            	  + '<td></td>'
	            	  + '</tr>';
	        });
			html += '</table>';
			$("#recharge_table").html(html);
		}
	}
}