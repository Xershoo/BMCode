<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="doc_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="document_mgn" name="module"/>
	</jsp:include>
	<!-- over -->
	
	<div id="right_show_doc">
		<div id="doc_title">
			<div id="title_word">教学资料库</div>
		</div>
		<div id="doc_opt_btn">
			<div id="upload_file_btn" class="btn_common">
			上传文件
				<!-- <input type="file" name="fileField" class="z_file" id="fileField" onchange="" multiple="multiple" accept="image/*, application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx, audio/*, video/*"> -->
				
			</div>
			<div id="create_folder_btn" class="btn_common">新建文件夹</div>
			<div id="delete_folder_btn" class="btn_common">删除文件</div>
			
		</div>
		<div id="doc_path">全部文件</div>
		
		<!-- 目录列表 -->
		<div id="show_doc_list"></div>
		<!-- 文件列表 -->
		<div id="show_file_list"></div>
	</div>
</div>

	<!-- 弹出分享窗口 -->
	<div id="shareDialog" title="上传课件" style="display: none">
		<!-- <div id="dialog_img"><img src="../images/share_dialog.png" width="94px" height="94px"></div> -->
		<div id="dialog_content">
			<input type="file" name="fileField" class="z_file" id="fileField" onchange="" multiple="multiple" accept="image/*, application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx, audio/*, video/*">
			<div id="fileQueue"></div>
		</div>
	</div>
	<!-- over -->
