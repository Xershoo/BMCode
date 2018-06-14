<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<div class="piano-upload">
		<div class="piano-image" id="pianoSelfImage"><img id="pianoPhotoUrls" style="width:466px;height:360px"></div>
		<div class="piano-image piano-rule">
			<div class="rule-data">
				<p>温馨提示：</p>
				<p>图片支持<font color="#f26666">jpg、png、jpeg、bmp</font>格式</p>
				<p>建议图片尺寸 >= 466*360像素，大小 <= 1M</p>
			</div>
			<div id="chooseImage" class="piano-btn">选择照片
<!-- 				<input type="file" class="piano-file" accept="image/*"> -->
			</div>
			<div id="uploadImage" class="piano-btn piano-other-btn">上传照片</div>
		</div>
	</div>

	
	<div title="上传形象照" style="display: none" id="imageUpload">
		<div class="xztx1">
			<div class="containers">
				<img src="/images/sago.jpg" class="croppers">
			</div>
			<div class="image1"></div>
			<div class="image2"></div>
			<div class="image3"></div>
		</div>
		<div class="xztx2">
			<div class="baocun" id="btnAgain">
				<label class="btn btn-primary" for="inputImages"
					title="Upload image file"> <input class="hide"
					id="inputImages" name="file" type="file" accept="image/*">
					选择图片
				</label>
			</div>
			<div class="baocun" id="getDataURLs">提交图片</div>

		</div>
	</div>

</div>
