<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<input type="hidden" id="keyWord" value="${keyWord }">

		<div class="all" >
        	<div id="all1" >
	        	<div class="dingwei">
	        		<img src="<%=request.getContextPath()%>/images/bmclass/dingwei.png" />
	        		<font>您所在位置 &nbsp;:&nbsp; </font>
	        		<a id="fpage" href="/index">首页</a>
	        		<span> > </span>
	        		<a id="Apage" href="/searchAllTeacher">全部老师</a>
	        	</div>
	        	
	        	<div class="content" >
			            <!-- 单个老师 -->
			            <div class="TeaKuang" >
			        		<div class="fang">
			        			<div class="Tname"><span>郭晓阳</span></div>
				        			<div class="fontK">
				        				<font>个人履历：</font><br />
				        				<span>数学特技教师</span><br />
				        				<span>山东科技大学特聘教授</span><br />
				        				<span>国内奥数专家</span><br />
				        				<span>全国教育教学优秀教师</span><br />
				        			</div>
			        		</div>
			        		<img  class="yuan" />
			            </div>
			           
			            <!-- 分隔-->

			          <div class="zhanwei16" ></div>
			          <!-- 分页 -->  
			    		<div class="tolpage"  id="tolpage"> 
        				<ul>
        					<div class="tolpageli"> < </div>
        				<li class="tolpageli2">
        					<div > <span> 1 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 2 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 3 </span>  </div>
        				</li>
        				<li>
        					<div class=""> <span> 4 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 5 </span></div>
        				</li>
        				<li>
        					<div class=""> <span>6</span> </div>
        				</li>
        					<div class="tolpageli">  > </div>
        				</ul>
        		</div>
			            
			            
	        			<div class="zhanwei30" ></div>
	        			
		        			
	        	</div>
        	</div>	
        </div>