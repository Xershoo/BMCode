/**
 *id:存放分页导航条容器id
 *totlePage:总页数
 *pageNo:当前页 
 */
function pager(id,totlePage,pageNo,param1,param2,param3,param4,param5){
	var container = $("#"+id);
	var prefixSize = 3;
	var suffixSize = 3;
	var url = "/course/search?keyword='+param1+'&minPrice='+param2+'&maxPrice='+param3+'&startCreateTime='+param4+'&endCreateTime='+param5+'/'";
	//如果不是第一页，则添加"上一页"
	if(pageNo>1){
		container.append('<a href="/course/search/'+(pageNo-1)+'">上一页</a>');
	}
	
	//如果当前页不是第一页，添加“上一页”，如果 当前页-4>,添加“首页”
	if(pageNo-prefixSize>1){
		prefixSize -= 1
		container.append('<a href="/book/1">1</a>');
		container.append('<span class="ellipsis">...</span>')
	}
	
	for(var i = (totlePage-pageNo<prefixSize?prefixSize+(prefixSize-(totlePage-pageNo)):prefixSize);i>0;i--){
		if(pageNo-i>=1){
			container.append('<a href="/book/'+(pageNo-i)+'">'+(pageNo-i)+'</a>');
		}
	}
	
	//添加当前页
	container.append('<b>'+(pageNo-i)+'</b>');
	
	if(pageNo + suffixSize < totlePage){
		suffixSize -= 1;
	}
	
	for(var j = 1;j<=(pageNo-1<suffixSize?suffixSize+(suffixSize-(pageNo-1)):suffixSize);j++){
		if(pageNo+j<=totlePage){
			container.append('<a href="/book/'+(pageNo+j)+'">'+(pageNo+j)+'</a>');
		}else{
			break;
		}
	}
	
	if(pageNo+3<totlePage){
		container.append('<span class="ellipsis">...</span>')
		container.append('<a href="/book/'+totlePage+'">'+totlePage+'</a>');
	}
	
	//如果不是最后一页，则添加“下一页”
	if(pageNo<totlePage){
		container.append('<a href="/book/'+(pageNo+1)+'">下一页</a>');
	}
	
	/*$(".pager a").bind('click',function(event){
		$(".pager").html("");
		var href = $(this).attr("href");
		var pageNo = parseInt(href.substring(href.lastIndexOf('/')+1));
		pager("pager",50,pageNo);
		if ( event && event.preventDefault ) 
			event.preventDefault(); 
	    else 
	        window.event.returnValue = false; 
	    return false; 
	});*/
}