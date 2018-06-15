<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <div class="m_left">
	<p class="m_person">
		<img alt="" src="<%=request.getContextPath()%>/images/account/set.png"
			class="m_email" width="15px" height="15px"><span class="p_set">个人设置</span>
	</p>
	<ul>
		<li class="data_chk" id="basic_info">基本信息</li>
		<c:if test="${user.roleName == 'student' || user.roleName == 'teacher'}">
			<li class="data_chk" id="student_info">学籍信息</li>
		</c:if>
		<li class="data_chk" id="account_info">账号安全</li>
	</ul>
</div>
 --%>
<div class="u_myData">

	<!-- <h3>
		<img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">修改头像</span>
	</h3> -->
	<div class="u_userIconWrap">
		<div class="u_userIconMask" title="更换头像">
			<img src="" alt="" width="122px" height="122px" class="rad_img">
		</div>
		<div class="m_r_imgrht">
<!-- 			<input type="button" value="修改头像" id="chg_img" class="m_r_btn"> -->
			<p>温馨提示：</p>
			<p>图片支持<font color="#f26666"> jpg、png、jpeg、bmp </font>格式，</p>
			<p>建议图片尺寸≥122*122像素，大小≤1M。</p>
		</div>
		<div id="chg_img" class="pn_change_btn">修改头像</div>
	</div>
	<div class="m_r_tab">
		<!-- <div class="m_r_edit">
			<div>
				<h3>
					<img alt="" src="../images/account/tips.png" width="15px"
						height="15px"><span class="tips_img">基本资料</span>
				</h3>
			</div>
			<input type="button" id="edit" class="e_btn" value="编辑资料">
			<div class="i_btn">
				<input type="submit" id="submit" value="保  存" class="submit"
					style="display: none;" /> <input type="button" id="cancel"
					value="取  消" class="cancel" style="display: none;" />
			</div>
		</div> -->
		<div class="bc_info_content">
			<div class="user_data">
				<div class="user_title user_space">用&nbsp;&nbsp;户&nbsp;&nbsp;ID：</div>
				<div class="user_left" id="userIdData"></div>
				<div class="user_title">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</div>
				<div class="user_left user_right" id="phoneData"></div>
<!-- 				<div class="user_title">职&nbsp;&nbsp;&nbsp;&nbsp;业：</div> -->
<!-- 				<div class="user_left user_right" id="occupationData"></div> -->
			</div>
			<div class="user_data">
				<div class="user_title user_space">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
				<div class="user_left" id="userNameData"></div>
				<div class="user_title">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</div>
				<div class="user_left user_right" id="nickNameData"></div>
			</div>
			<div class="user_data">
				<div class="user_title user_space">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
				<div class="user_left" id="sexData">女</div>
				<div class="user_title">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</div>
				<div class="user_left user_right" id="birthDayData"></div>
			</div>
<!-- 			<div class="user_data"> -->
				<!-- <div class="user_title">教&nbsp;&nbsp;&nbsp;&nbsp;龄：</div>
				<div class="user_left user_right" id="techYearsData">10年</div> -->
<!-- 			</div> -->
			<!-- <div class="user_data">
				<div class="user_title">就职于：</div>
				<div class="user_left user_right" id="companyData">曼彻斯特大学</div>
			</div> -->
			<div class="user_data user_sign">
				<div class="user_title user_space sign_space">个性签名：</div>
				<div class="user_left user_sign_data" id="signatureData"></div>
			</div>
			<div class="user_data user_sign">
				<div class="user_title user_space sign_space">更多信息：</div>
				<div class="user_more" id="moreData"></div>
			</div>
			
		</div>
		<div class="pn_change" id="submit">保   存</div>
	</div>
	
	<div title="更改头像" style="display: none" id="apply_school">
		<div class="xztx1">
			<div class="containers">
				<img src="/images/sago.jpg" class="cropper">
			</div>
			<div class="preview1"></div>
			<div class="preview2"></div>
			<div class="preview3"></div>
		</div>
		<div class="xztx2">
			<div class="baocun" id="btnAgain">
				<label class="btn btn-primary" for="inputImage"
					title="Upload image file"> <input class="hide"
					id="inputImage" name="file" type="file" accept="image/*">
					选择图片
				</label>
			</div>
			<div class="baocun" id="getDataURL">提交图片</div>

		</div>
	</div>
	
	<!-- <div class="dialogCon u_haveBorder"
		style="height: 366px; background: #f0f0f0" id="apply_school2" title="更改头像">
		<h3 class="u_schoolTitle">更改头像</h3>
		<div class="container">
			<div class="imageBox" style="position: relative;">
				<div class="thumbBox"></div>
				<div class="new-contentarea tc"
					style="position: absolute; left: 0; top: 0; width: 254px; height: 236px; background: #eaf4ff">
					<a href="javascript:void(0)" class="upload-img"> <label
						for="upload-file"
						style="width: 174px; height: 180px; background: #eaf4ff; padding: 56px 0 0px; cursor: pointer"><img
							src="../images/touxiangPre.png" alt="" /></label>
					</a> <input type="file" class="" name="upload-file" id="upload-file"
						accept="image/jpg,image/png,image/jpeg" />
				</div>
			</div>
			<div class="action">
				<input type="button" id="btnSave" class="Btnsty_peyton" value="上传">
				<input type="button" id="btnCrop" class="Btnsty_peyton" value="预览">
				<input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+"
					style="margin-right: 80px;"> <input type="button"
					id="btnZoomOut" class="Btnsty_peyton" value="-"> <input
					type="button" id="btnAgain" class="Btnsty_peyton" value="重新上传"
					style="width: 80px;">
			</div>
			<div class="cropped"></div>
			<p class="position_p"
				style="position: absolute; left: 0px; bottom: 35px; color: #d00">(*目前只支持JPG、PNG、JPEG,大小
				< 5M)</p>
		</div>
	</div> -->

</div>
