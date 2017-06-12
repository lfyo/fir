(function(){
	var myFir = function(){
		var firIm = (function(){ //目的：形成块级作用域，避免外界修改
			var arr = ['BetaAppHost','{','　　return "fir.im -- lfy copyRinght"','}'];
			var firShowArr = ["http://lfyo.github.io/fir"];
			var betaAppHost = $("#betaAppHost").get(0);
			var firShow = $("#firShow").get(0);
			var usersWrapper = $("#users-wrapper");
			var startScroll = true;
			var endTime = 0; //结束时间
			var startTime = 0; //开始时间
			var pageCount = 0; //默认显示第一页
			var allPage = 5; //全部页数
			var jsons = {
				init : function(){ //初始化
					setTimeout(function(){
						$("#loadingCover").find("img").hide();//图片隐藏
						jsons.loading();
						jsons.creattext(betaAppHost,arr);	//添加文字动画
					},800);
					jsons.addScroll(); //滚动
					jsons.usersWrapperHover(); //第四屏 hover
				},
				addScroll : function(){ // 鼠标滚动事件
					var _this = this;
					$(document).on("mousewheel DOMMouseScroll", function(e){
						e.preventDefault();
						if(!startScroll){
							startTime = new Date().getTime();
							var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
							if((endTime - startTime) <= -1000){ //每一屏之间切换相隔 1000ms
								if(delta<0){ //向下切换【默认第一屏显示】
									pageCount ++;
									if(pageCount > allPage){ //上线判断
										pageCount = allPage;
										return false;
									}
									_this.goPageDown(pageCount);
								}else{ //向上切换
									pageCount --;
									if(pageCount<0){ //下线判断
										pageCount = 0;
										return false;
									}
									_this.goPageUp(pageCount); //上翻
								}
								endTime = new Date().getTime();
							}else{
								return false;
							}
						}
					});
				},
				goPageDown : function(pageNum){ //向下滚动
					var _this = this;
					switch(pageNum){
						case 1 :
							$("#navbar").addClass("color-white");
							$("#plane").addClass("fly-out"); //飞机飞出
							$("#betaAppHost").hide();//动态文字隐藏
							setTimeout(function(){ //延时两秒，旋转出第二屏
								$("#flipRotate").addClass("flipRotate");
							},1000);
							break;
						case 2:
							//第二屏上下错开效果
							$("#flipRotate").removeClass("featuresAnimOut").addClass("featuresAnimIn");
							break;
						case 3:
							//第三屏 显示 ，盒子动画
							$("#flipRotate").addClass("filpOut");
							$("#expanded").css("opacity",0);
							$(".section-3").addClass("animateIn");
							break;
						case 4:
							//第四屏 滑入 显示区
							$(".section-4").addClass("reday");
							break;
						case 5:
							//第四屏 滑入 显示区
							$(".section-5").addClass("reday");
							$("#navbar").removeClass("color-white");
							$("#firShow").html("");
							setTimeout(function(){
								_this.creattext(firShow,firShowArr);
							},800);
							break;
					}
				},
				goPageUp : function(pageNum){ //向上滚动
					var _this = this;
					switch(pageNum){
						case 0:
							$("#navbar").removeClass("color-white");
							$("#flipRotate").removeClass("flipRotate");
							$("#plane").removeClass("fly-out").addClass("fly-in"); //飞机飞出
							setTimeout(function(){
								$("#betaAppHost").html("");
								$("#betaAppHost").show();
								$("#plane").removeClass("fly-in");
								_this.creattext(betaAppHost,arr);	//添加文字动画
							},1500);
							break;
						case 1:
							$("#flipRotate").removeClass("featuresAnimIn").addClass("featuresAnimOut");
							break;
						case 2:
							$("#flipRotate").removeClass("filpOut");
							setTimeout(function(){
								$("#expanded").css("opacity",1);
								$(".section-3").removeClass("animateIn");
							},800);
							break;
						case 3:
							$(".section-4").removeClass("reday");
							break;
						case 4:
							$("#navbar").addClass("color-white");
							$(".section-5").removeClass("reday");
							break;
					}
				},
				creattext : function(id,arr){ //创建动态文字
					var speed = 100;
					var c = "",index = 0,pos = 0;
					var strLen = arr[0].length;
					var tlen = arr.length; 
					var row = 0;
					appendWord();
					function appendWord(){
						c='';
						row = Math.max(0,index-tlen);
						while(row < index){
				    		c += arr[row++] + '\r\n';
						}
						id.innerText = c+arr[index].slice(0,pos)+"|"; 
						if(pos==strLen){
							pos = 0;
							c = arr[index]+"\r\n";
							index ++;			
							if(index < tlen){
								strLen = arr[index].length;
								setTimeout(appendWord,speed);
							}else{
								id.innerText = id.innerText.replace("|","");
							}
						}else{
							pos++;
							setTimeout(appendWord,speed);
						}	
					}
				},
				loading : function(){ // 开场动画
					var winw = $(window).width() + 200;
					var winh = $(window).height() + 200;
					var loading = $("#loadingCover").find(".circle");
					var plane = $("#plane");
					var w = loading.width();
					var h = loading.height();
					var timer = null;
					clearInterval(timer);
					timer = setInterval(function(){
						loading.css({
							"width" : w += 20,
							"height" : h += 20,
							marginTop : -(w/2),
							marginLeft : -(h/2)
						})
						if(w > winw && h >= winh){
							clearInterval(timer);
							//首页 动画完成，淡出loadingCover
							$("#loadingCover").fadeOut();
							//为飞机添加 飞入动画 样式，2s后清楚 飞入动画 样式，目的：飞机可以在中心位置飞来飞去
							plane.addClass("fly-in");
							startScroll = false;
							setTimeout(function(){
								plane.removeClass("fly-in");
							},1500);
						}
					},16);
				},
				usersWrapperHover : function(){ //鼠标hover
					usersWrapper.find(".item").on("mouseover",function(){
						$(this).addClass("active").siblings().removeClass("active");
						$(this).parents(".container").attr("class","container");
						$(this).parents(".container").addClass($(this).data("item"));
						return false;
					});
				}
			};
			return jsons.init();
		})();
		return firIm;
	};
	window.myFirs = myFir ; //返回调用接口
})();