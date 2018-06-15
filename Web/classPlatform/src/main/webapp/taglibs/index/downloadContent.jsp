<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <div class="downloadBanner">
    	<div class="banner_music"></div>
    	<!--  
    	<div class="download_logo"><img src="<%=request.getContextPath()%>/images/download/logo.png"></div>
    	-->
    	<div class="download_title"><img src="<%=request.getContextPath()%>/images/download/title.png"></div>
    	<div class="downloadType">
    		<div id="clientDownload" class="down_type_img"><img src="<%=request.getContextPath()%>/images/download/win_down.png"></div>
    		<div id="andDownload" class="down_type_img"><img src="<%=request.getContextPath()%>/images/download/and_down.png"></div>
    		<div id="iosDownload" class="down_type_img" style="margin-right:0px;"><img src="<%=request.getContextPath()%>/images/download/ios_down.png"></div>
    	</div>
    	<%-- <div class="download_logo"><img src="<%=request.getContextPath()%>/images/download/download_logo.png"></div> --%>
    	<!-- <div class="download_infor">DL PIANODL PIANODL PIANODL PIANODL PIANODL PIANODL PIANODL PIANODL PIANODL PIANODL</div> -->
    </div>
    <div id="scanCode" title="扫码下载" style="display: none;">
  		<div id="codeImg"><img src="<%=request.getContextPath()%>/images/download/erweima.jpg"></div>
    </div>