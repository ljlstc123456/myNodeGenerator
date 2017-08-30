(function(a, undefined){
	/*
	 * =============暴露的方法
	 * 
	 */
	//日历插件
	a.calendar = function(ele, type,callback) {
		if(type) { //单日历
			$(document).ready(function() {
				ele.daterangepicker({
					autoUpdateInput: false,
					singleDatePicker: true,
					locale: {
						cancelLabel: '取消'
					}
				});
			});

		} else { //双日历
			$(document).ready(function() {
				ele.daterangepicker({
					autoUpdateInput: false,
					singleDatePicker: false,
					locale: {
						cancelLabel: '取消'
					}
				});
			});
		}
	}
	a.getPageHtml=function ($page, $pages) {
		var $_pageNum = 6;//最多显示多少个页码
		$page -= 0;
		//当前页面小于1 则为1
		$page = $page < 1 ? 1 : $page;
		//当前页大于总页数 则为总页数
		$page = $page > $pages ? $pages : $page;
		//页数小当前页 则为当前页
		$pages = $pages < $page ? $page : $pages;

		//计算开始页
		var $_start = $page - parseInt($_pageNum / 2);
		$_start = $_start < 1 ? 1 : $_start;
		//计算结束页
		var $_end = $page + parseInt($_pageNum / 2);

		$_end = $_end > $pages ? $pages : $_end;

		//当前显示的页码个数不够最大页码数，在进行左右调整
		var $_curPageNum = $_end - $_start + 1;

		//左调整
		if($_curPageNum < $_pageNum && $_start > 1) {
			$_start = $_start - ($_pageNum - $_curPageNum);
			$_start = $_start < 1 ? 1 : $_start;
			$_curPageNum = $_end - $_start + 1;
		}
		//右边调整
		if($_curPageNum < $_pageNum && $_end < $pages) {
			$_end = $_end + ($_pageNum - $_curPageNum);
			$_end = $_end > $pages ? $pages : $_end;
		}
		return {
			start: $_start,
			end: $_end
		}

	};
	/*
	 * ========弹窗
	 *@str 是需要弹出的内容文本
	 *@type表示是提示类型 默认是成功  加上danger表示警告提示框
	 *@delay延时关闭的时间
	 */
	
	a.alert=function (str,type,delay){
		var $alert=(type!="error") ? 
		'<div class="app_alert ">'+
			'<div class="alert alert-success" role="alert">'+
				'<a href="javascript:;" class="alert-link">'+str+'</a>'+
			'</div>'+
		'</div> ' :
		'<div class="app_alert ">'+
			'<div class="alert alert-danger" role="alert">'+
				'<a href="javascript:;" class="alert-link">'+str+'</a>'+
			'</div>'+
		'</div> ' ;
		$(".app_alert").remove();
		clearTimeout(alert_timer);
		$("body").append($alert);
		var alert_timer=setTimeout(function(){
			$(".app_alert").remove();
		},delay||3000);
	}
	
	
	/*
	 * -==========主要逻辑
	 * 
	 */
	
	//输入框focus后icon颜色变化
	$(".form-group.top-form .form-control").focus(function(){
		$(this).parent("div").addClass("active");
	});
	$(".form-group.top-form .form-control").blur(function(){
		$(this).parent("div").removeClass("active");
	});
	//左侧菜单点击
	$(".main-menu .left-bar li,.menu-toggler-warp li").on("click",function(){
		$(this).addClass("active").parent("a").siblings().find("li").removeClass("active")
	});
	//屏幕小宇768px点击菜单
	$(function() {
		var  margin_top =parseInt( $(".main-menu .right-bar").css("margin-top")),
		h=$(".menu-toggler-warp").outerHeight();
		$(".menu-toggler-btn").on("click", function() {
			console.log(margin_top+h)
			var isHide = $(".menu-toggler-warp").is(":hidden");
			if(isHide) {
				$(".main-menu .right-bar").css("margin-top", margin_top+h);
				$(".menu-toggler-warp").show();
			} else {
				
				$(".main-menu .right-bar").css("margin-top", margin_top);
				$(".menu-toggler-warp").hide();
			}
		});


		//ie placeholder,placehoder.js编译在 bootstrap.min.js中
        // if(/msie/.test(navigator.userAgent.toLowerCase())){
        //    $('input:not(".diy"), textarea:not(".diy")').placeholder({ customClass: 'text-999 ft12' });
        // }
	});
	//加载效果
	$(function(){
		var html='<div class="loading_warp">'+
					'<div class="loading-content">'+
					'<img src="/img/load.png" class="loading-img"/>'+
					'</div>'+
				'</div>' ;
		function showLoad(){
			$(".loading_warp").remove();
			$('body').append(html);
		}
		function hideLoad(){
			$(".loading_warp").remove();
		}
		$.ajaxSetup({
			beforeSend:function(){
				showLoad();
			},
			success:function(data){
				hideLoad();
			},
			error:function(jqXHR, textStatus, errorMsg){ 
				hideLoad();
				App.alert(errorMsg) ;
			},
			complete:function(xhr){
				hideLoad();
				var data = JSON.parse(xhr.responseText);
				if(data.msg == "未登录"){
					window.top.location.href="/login/out" ;
				}
			},
			timeout:10000
		});
	});

})(window.App = window.App || {});



	
