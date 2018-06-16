<%@ page language="java" pageEncoding="UTF-8"%>
<div class="u_myDataWrap">
	<!-- middle left begin -->
<!-- 	<div class="m_left"> -->
<!-- 		<p class="m_person"> -->
<!-- 			<img alt="" src="../images/account/set.png" class="m_email" width="15px" height="15px"><span class="p_set">个人设置</span> -->
<!-- 		</p> -->
<!-- 		<ul> -->
<!-- 			<li class="data_chk" id="basic_info">基本信息</li> -->
<!-- 			<li class="data_chk" id="student_info">学籍信息</li> -->
<!-- 			<li class="data_chk" id="account_info">账号安全</li> -->
<!-- 		</ul> -->
<!-- 	</div> -->
	<div class="pn_menu">
		<div class="m_r_content">
			<div class="pn_basic" id="basic_info">基本信息</div>
			<div class="pn_safety" id="account_info">账号安全</div>
			<div class="pn_fashion" id="personalPortrait">形象照</div>
			<div class="pn_fashion" onClick="location.href='<%=request.getContextPath()%>/teacher/techCertification'">我的认证</div>
		</div>
	</div>

	<%@ include file="/taglibs/common/accountMenu.jsp" %>
	<div id="menu1_data" style="display: none;">
		<%@ include file="/taglibs/account/basicInfo.jsp"%>
	</div>
	<div id="menu2_data" style="display: none;">
		<%@ include file="/taglibs/account/studentInfo.jsp"%>
	</div>
	<div id="menu3_data" style="display: none;">
		<%@ include file="/taglibs/account/accountInfo.jsp"%>
	</div>
	<div id="menu4_data" style="display: none;">
		<%@ include file="/taglibs/account/security.jsp"%>
	</div>
	<div id="menu5_data" style="display: none;">
		<%@ include file="/taglibs/account/changeMobile.jsp"%>
	</div>
	<div id="menu6_data" style="display: none;">
		<%@ include file="/taglibs/account/encrypted.jsp"%>
	</div>
	<div id="menu7_data" style="display: none;">
		<%@ include file="/taglibs/account/encryptedNext.jsp"%>
	</div>
	<div id="menu8_data" style="display: none;">
		<%@ include file="/taglibs/account/imageUpload.jsp"%>
	</div>
</div>
<div class="pn_blank"></div>








