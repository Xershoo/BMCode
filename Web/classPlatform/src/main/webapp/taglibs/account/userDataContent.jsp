<%@ page language="java" pageEncoding="UTF-8"%>
<div class="u_myDataWrap">
	<div class="pn_menu">
		<div class="m_r_content">
			<div class="pn_basic" id="basic_info">基本信息</div>
			<div class="pn_safety" id="account_info">账号安全</div>
			<div class="pn_auth" id="identityAuth">身份认证</div>
			<div class="pn_fashion" id="personalPortrait">形象照</div>
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
	<div id="menu9_data" style="display: none;">
		<%@ include file="/taglibs/certificate/techCertification.jsp"%>
	</div>
</div>
<div class="pn_blank"></div>








