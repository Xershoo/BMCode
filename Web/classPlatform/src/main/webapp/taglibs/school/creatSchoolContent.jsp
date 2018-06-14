<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- 填写申请信息 -->
<form id="creatSchoolForm" action="" method="post" enctype="multipart/form-data">
<div id="input_info_main">
	<div id="input_info_menu">创建学校</div>
	<div class="school_info_title"><div class="title_word">学校基本信息</div></div>
	<div class="school_info_main">
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>主营分类</div>
			<div class="school_info_value"><select id="schoolType" name="c8shoolItem"></select></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>学校名称</div>
			<div class="school_info_value"><input type="text" id="sysName" name="c8schoolName"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label">学校标签</div>
			<div class="school_info_value"><input type="text" id="schoolLabel" name="c8schoolMark"></div>
		</div>
		<div class="school_info_input" style="height:135px;">
			<div class="school_info_label"><em>*</em>学校介绍</div>
			<div class="school_info_value" style="height:135px;"><textarea id="c8schoolIntorduce" name="c8schoolIntorduce" rows="7" cols="57"></textarea> </div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>学校头像</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img1" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_logo_file_value">上传图片<input id="logoFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="sample_school_logo" class="school_info_value"></div>
			<div class="upload_logo_desc">
				<p style="color:#d8271c">注意:</p>
				<p>1.图片大小需要小于1M</p>
				<p>2.图片将应用于学校首页等页面</p>
			</div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
	</div>
	
	<div class="school_info_title"><div class="title_word">机构信息</div></div>
	<div class="school_info_main">
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>机构名称</div>
			<div class="school_info_value"><input type="text" id="schoolName" name="realschollName"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label">机构官网</div>
			<div class="school_info_value"><input type="text" id="schoolWeb" name="realschoolUrl"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>机构类型</div>
			<div class="school_info_value"><select id="schoolStyle" name="realschoolItem"></select></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>机构代码</div>
			<div class="school_info_value"><input type="text" id="organCode" name="realschoolOrgCode"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>组织机构代码图片</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img2" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_organ_file_value">上传图片<input id="organFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="sample_organ_logo" class="school_info_value"></div>
			<div class="upload_logo_desc" style="margin-top:77px;">
				<p style="color:#d8271c">注意:</p>
				<p>1.图片清晰可见</p>
				<p>2.照片内容真实有效，不得做任何修改</p>
				<p>3.图片大小需要小于1M</p>
			</div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label">营业执照编号</div>
			<div class="school_info_value"><input type="text" id="businessNum" name="realschoolBusinessLicence"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label">营业执照文件</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img3" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_organ_file_value">上传图片<input id="businessFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="sample_business_logo" class="school_info_value"></div>
			<div class="upload_logo_desc" style="margin-top:77px;">
				<p style="color:#d8271c">注意:</p>
				<p>1.图片清晰可见</p>
				<p>2.照片内容真实有效，不得做任何修改</p>
				<p>3.图片大小需要小于1M</p>
			</div>
		</div>
	</div>
	
	<div class="school_info_title"><div class="title_word">申请人信息</div></div>
	<div class="school_info_main">
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>姓名</div>
			<div class="school_info_value"><input type="text" id="applyUserName" name="applyName"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>手机</div>
			<div class="school_info_value"><input type="text" id="applyUserPhone" name="applyMobile"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label">邮箱</div>
			<div class="school_info_value"><input type="text" id="applyUserEmail" name="applyEmail"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input">
			<div class="school_info_label"><em>*</em>身份证号</div>
			<div class="school_info_value"><input type="text" id="applyUserCard" name="applyIdCard"></div>
			<div class="validate_info"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>手持身份证上传</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img4" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_card_file_value">上传图片<input id="cardFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="sample_card_logo" class="school_info_value"></div>
			<div class="upload_logo_desc" style="margin-top:77px;">
				<p style="color:#d8271c">注意:</p>
				<p>1.手持身份证正面，五官可见</p>
				<p>2.证件信息清晰无模糊，且不能有遮挡</p>
				<p>3.照片不要有任何的修改和处理</p>
			</div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>委托授权书上传</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img5" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_trust_file_value">上传图片<input id="trustFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="sample_trust_logo" class="school_info_value"></div>
			<div class="upload_logo_desc" style="margin-top:77px;">
				<p style="color:#d8271c">注意:</p>
				<p>1.委托书需要盖有组织机构的公章</p>
				<p>2.照片内容原件，不得做任何修改</p>
				<p>3.图片大小需要小于1M</p>
			</div>
		</div>
		<div id="downLoad_trust_sample"><a href="javascript:void(0)">下载委托授权书模板</a></div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
		
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>身份证正面上传</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img4" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_card_file_value">上传图片<input id="cardFrontFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="card_front_logo" class="school_info_value"></div>
			<div class="upload_logo_desc">
				<p style="color:#d8271c">注意:</p>
				<p>1.证件信息清晰无模糊，且不能有遮挡</p>
				<p>2.照片不要有任何的修改和处理</p>
			</div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
		<div class="school_info_input" style="height:165px;">
			<div class="school_info_label"><em>*</em>身份证反面上传</div>
			<div id="upload_school_logo" class="school_info_value">
				<img id="img4" src="<%=request.getContextPath()%>/images/school/upload_file_logo.png" width="194px" height="142px">
				<div id="input_card_file_value">上传图片<input id="cardBackFile" type="file" class="z_file" name="myFiles" accept="image/*"></div>
			</div>
			<div id="sample_title" class="school_info_label">图示</div>
			<div id="card_back_logo" class="school_info_value"></div>
			<div class="upload_logo_desc">
				<p style="color:#d8271c">注意:</p>
				<p>1.证件信息清晰无模糊，且不能有遮挡</p>
				<p>2.照片不要有任何的修改和处理</p>
			</div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div class="validate_file_info"></div>
		</div>
		<div class="school_info_input" style="height:30px;">
			<div class="school_info_label" style="height:30px;"></div>
			<div id="agree_desc">点击提交，即表示您已同意Class8的<font color="#51a4f6">使用协议</font>。</div>
		</div>
		<div id="submit_btn_div">
			<div id="apply_submit_btn" class="btn_common">提交</div>
			<div id="apply_cancel_btn" class="btn_common">取消</div>
		</div>
	</div>
</div>
</form>