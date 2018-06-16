<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<div class="u_userIconWrap">
		<div class="u_userIconMask" title="更换头像">
			<img src="" alt="" width="122px" height="122px" class="rad_img">
		</div>
		<div class="m_r_imgrht">
			<p>温馨提示：</p>
			<p>图片支持<font color="#f26666"> jpg、png、jpeg、bmp </font>格式，</p>
			<p>建议图片尺寸≥122*122像素，大小≤1M。</p>
		</div>
		<div id="chg_img" class="pn_change_btn">修改头像</div>
	</div>
	<div class="m_r_tab">
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
</div>
