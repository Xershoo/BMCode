var courseInCount = 0;
$(function() {
	
	var identity= $('#identity').val();
	
	//翻页调用  
    function PageCallback(index) {             
        getCourseShow(index);  
    }  
    
    //请求数据  
    function getCourseShow(pageIndex) {
    	var keyword = '';
    	var minPrice = '';
    	var maxPrice = '';
    	var signupStartTime = '';
    	var signupEndTime = '';
    	var onlineType = '';
    	
    	var minPrices = $("#minPrices").val();
    	var maxPrices = $("#maxPrices").val();
    	var startTimes = $("#startTimes").val();
    	var endTimes = $("#endTimes").val();
    	
		if($("#check1").is(':checked')){
			minPrice = 0;
			maxPrice = 100;
		}else if($("#check2").is(':checked')){
			minPrice = 100;
			maxPrice = 200;
		}else if($("#check3").is(':checked')){
			minPrice = 200;
			maxPrice = 500;
    	}else if($("#check4").is(':checked')){
    		minPrice = 500
    		maxPrice = 1000;
    	}else if($("#check5").is(':checked')){
    		minPrice = 1000;
    	}
		
		keyword = $.trim($("#keyword").val());
    	if($("#check8").is(':checked')){
    		onlineType = 0;
    	}else if($("#check9").is(':checked')){
    		onlineType = 1;
    	} 
    	
    	$("#content").html('');
    	var pageSize = 30;

    	var url = getRootPath() + '/course/searchAll?pageNum='+(pageIndex+1);
    	if(keyword != ''){
    		url += '&keyword='+encodeURI(encodeURI(keyword));
    	}
    	if((minPrice != '' || minPrice == 0) && maxPrice != ''){
    		url += '&minPrice='+minPrice+'&maxPrice='+maxPrice;
    	}
    	if(minPrice != '' && maxPrice == ''){
    		url += '&minPrice='+minPrice;
    	}
    	if($("#check8").hasClass("checked")){
    		onlineType = 0;
    		url += '&onlineType='+onlineType;
    	}else if($("#check9").hasClass("checked")){
    		onlineType = 1;
    		url += '&onlineType='+onlineType;
    	}
    	if(startTimes != '' && startTimes != null){
    		url += '&startTime='+startTimes;
    	}
    	if(endTimes != '' && endTimes != null){
    		url += '&endTime='+endTimes;
    	}
    	location.href = url ;
    }  
    
    getCoursesCondition();
    
	$("#searchBtn").on("click",function(){
		getCourseShow(0);
	})
	
	checkSearPrice();
	checkPlayType();
})

function  getCoursesCondition(){
	var minPrices = $("#minPrices").val();
	var maxPrices = $("#maxPrices").val();
	var keywords = $.trim($("#keywords").val());
	var startTime = $.trim($("#startTime").val());
	var endTime = $.trim($("#endTime").val());
	var onlineType = $.trim($("#onlineType").val());
	
	if(minPrices == 0 && maxPrices == 100){
		$("#check1").addClass("checked");
	}else if(minPrices == 100 && maxPrices == 200){
		$("#check2").addClass("checked");
	}else if(minPrices == 200 && maxPrices == 500){
		$("#check3").addClass("checked");
	}else if(minPrices == 500 && maxPrices == 1000){
		$("#check4").addClass("checked");
	}else if(minPrices == 1000 ){
		$("#check5").addClass("checked");
		}
	
	if(onlineType == '0'){
		$("#check6").addClass("checked");
	}else if(onlineType == '1'){
		$("#check7").addClass("checked");
	}
	
	$("#keyword").val(keywords);
	$("#startTimes").val(startTime);
	$("#endTimes").val(endTime);
}

function checkPlayType(){
	$("#check6").click(function() {
		if($("#check6").is(':checked')) {
			$("#check7").prop("checked",false);
		}
	});
	$("#check7").click(function() {
		if($("#check7").is(':checked')) {
			$("#check6").prop("checked",false);
		}
	});
}

function checkSearPrice(){
	$("#check1").click(function() {
		if($("#check1").is(':checked')) {
			$("#check2").prop("checked",false);
			$("#check3").prop("checked",false);
			$("#check4").prop("checked",false);
			$("#check5").prop("checked",false);
		}
	});
	$("#check2").click(function() {
		if($("#check2").is(':checked')) {
			$("#check1").prop("checked",false);
			$("#check3").prop("checked",false);
			$("#check4").prop("checked",false);
			$("#check5").prop("checked",false);
		}
	});
	$("#check3").click(function() {
		if($("#check3").is(':checked')) {
			$("#check1").prop("checked",false);
			$("#check2").prop("checked",false);
			$("#check4").prop("checked",false);
			$("#check5").prop("checked",false);
		}
	});
	$("#check4").click(function() {
		if($("#check4").is(':checked')) {
			$("#check1").prop("checked",false);
			$("#check2").prop("checked",false);
			$("#check3").prop("checked",false);
			$("#check5").prop("checked",false);
		}
	});
	$("#check5").click(function() {
		if($("#check5").is(':checked')) {
			$("#check1").prop("checked",false);
			$("#check2").prop("checked",false);
			$("#check3").prop("checked",false);
			$("#check4").prop("checked",false);
		}
	});
}