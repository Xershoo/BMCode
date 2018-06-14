/**
 * 
 */
var myTinyDialog;

//需操作类弹出框的函数
function  getDialog(type, msg){
	var html = dialogContent(type, msg);
    if(myTinyDialog)
    {
        myTinyDialog.remove();
    }
    myTinyDialog = tinyDialog({
        'content':html,
        'width':580,
        'height':380,
        'closeX':false,
        'mask':true  
    });
    if(type=="warn" || type=="fail"){
    	$("#dialog_queding_btn").on("click", function(){
    		closeDialog();
    	});
    }
}

//成功提示
function  getDialogCue(type, msg){
	var html = dialogContent(type, msg);
	if(myTinyDialog)
	{
		myTinyDialog.remove();
	}
	myTinyDialog = tinyDialog({
		'content':html,
		'width':262,
		'height':85,
		'closeX':false,
		'mask':true  
	});
	/*if(type=="success" && msg.length > 12){
		$("#cue_word").css("line-height","2");
	}else{
		$("#cue_word").css("line-height","85px");
	}*/
	setTimeout(closeDialog,1500) ;
	
}

function teaDocDialog(type, msg){
	var html = dialogContent(type, msg);
	if(myTinyDialog)
	{
		myTinyDialog.remove();
	}
	myTinyDialog = tinyDialog({
		'content':html,
		'width':520,
		'height':310,
		'closeX':false,
		'mask':true  
	});
}

/**
 * 关闭dialog
 */
function closeDialog(){
	  myTinyDialog.remove();
}


function dialogContent(type, msg){
	var html = "";
	if(type == "warn"){
		html += '<div class="dialog_title">警告</div>'
			  + '<div class="dialog_content">'
			  + '<div class="dialog_type"><img src="'+getRootPath()+'/images/dialog/warn.png"><span class="dialog_word">'+msg+'</span></div>'
			  + '</div>'
			  + '<div class="dialog_btn">'
			  + '<div id="dialog_queding_btn" class="dialog_btn_common">确定</div>'
			  + '</div>';
	}
	if(type == "success"){
		html +=  '<div class="cue_word">'+msg+'</div>';
			
	}
	if(type == "fail"){
		html += '<div class="dialog_title">提示</div>'
			  + '<div class="dialog_content">'
			  + '<div class="dialog_type"><img src="'+getRootPath()+'/images/dialog/warn.png"><span class="dialog_word">'+msg+'</span></div>'
			  + '</div>'
			  + '<div class="dialog_btn">'
			  + '<div id="dialog_queding_btn" class="dialog_btn_common">确定</div>'
			  + '</div>';
	}
	if(type == "confirm"){
		html += '<div class="dialog_title">确认</div>'
			  + '<div class="dialog_content">'
			  + '<div class="dialog_type"><img src="'+getRootPath()+'/images/dialog/confirm.png"><span class="dialog_word">'+msg+'</span></div>'
			  + '</div>'
			  + '<div class="dialog_btn">'
			  + '<div id="dialog_queding_btn" class="dialog_btn_common">确定</div>'
			  + '<div id="dialog_cancel_btn" class="dialog_btn_common">取消</div>'
			  + '</div>';
	}
	if(type == "share"){
		html += '<div class="dialog_title">分享</div>'
			  + '<div class="dialog_tea_content">'
			  + '<div class="dialog_tea_type"><div class="dialog_tea_img"><img src="'+getRootPath()+'/images/dialog/warn.png"></div><span class="dialog_share_word">'+msg+'</span></div>'
			  + '</div>'
			  + '<div class="dialog_tea_btn">'
			  + '<div id="dialog_queding_btn" class="dialog_btn_common">确定</div>'
			  + '<div id="dialog_cancel_btn" class="dialog_btn_common">取消</div>'
			  + '</div>';
	}
	if(type == "cancel_share"){
		html += '<div class="dialog_title">取消分享</div>'
			  + '<div class="dialog_tea_content">'
			  + '<div class="dialog_tea_type"><div class="dialog_tea_img"><img src="'+getRootPath()+'/images/dialog/warn.png"></div><span class="dialog_share_word">'+msg+'</span></div>'
			  + '</div>'
			  + '<div class="dialog_tea_btn">'
			  + '<div id="dialog_queding_btn" class="dialog_btn_common">确定</div>'
			  + '<div id="dialog_cancel_btn" class="dialog_btn_common">取消</div>'
			  + '</div>';
	}
	return html;
}