var screen = $("#iphonehomescreen");
var iphone = $("#iphone");
var ipH = iphone.height();
var ww = window.innerWidth;
var scaled;
// var originalOffset;
// var orginalHeight;
$(function(){
	$("#spacer").height(1.2*$("#nb").height());
	var pic = $("#pic");
	if(resume == "t"){
		$("#resume").href = "t/Resume.pdf";
	}
	// pic.css("top",0.9*$("#nb").height());
	// pic.height(pic.width());
	waDemo();
	// setTimeout(function(){
	// 	originalOffset = parseInt($("#aboutme").css("top"),10);
	// 	originalHeight = parseInt($("#aboutme").height());
	// },500);
	setInterval(function(){
		if(iphone.height() !== ipH | window.innerWidth !== ww){
			waDemo();
			ww = window.innerWidth;
			// pic.css("top",0.9*$("#nb").height());
			// pic.height(pic.width());
		}
	}, 200);
	console.log("Hello! Thanks for checking out my website. I am self taught, so some of the code might be a little unorthodox. If you have any suggestions on how I could improve it, I'd welcome the opportunity to hear from someone with more experience.");
});
function waDemo(){
	$(".borr").html("to the right");
	screen = $("#iphonehomescreen, #fulldemo");
	iphone = $("#iphone");
	var h = screen.height();
	screen.width(0.88*iphone.width());
	screen.css("left",0.062*iphone.width());
	screen.css("top",0.115*iphone.height());
	screen.height((16/9)*screen.width());
	var temp = (iphone.height() + iphone.offset().top - $("#widgetassistant").offset().top)*1.03;
	$("#widgetassistant").height(temp);
	// var temp = ipH + 2.1*parseInt(iphone.css("top"), 10);
	// $("#widgetassistant").height(temp);
	if (screen.height() !== h){
		$("#iphonehomescreen").attr("src","Widget Assistant/Widget.html");
	}
	ipH = iphone.height();
	var fs = 16*(window.innerWidth/1170);
	var lh = 1.3*(window.innerWidth/1170);
	if(window.innerWidth <= 970 && window.innerWidth > 768){
	// 	fs = 14*(window.innerWidth/970);
	// 	lh = 1.1;
	// 	$(".txt").css("text-align","left");
	// 	$("#credit .txt").css("text-align","center");
	// } 
	// if(window.innerWidth <= 768){
		$(".borr").html("below");
		// var aboutOffset = parseInt($("#aboutme").css("top"),10) - $("#pic img").height()/1.8;
		// var heightShift = parseInt($("#aboutme").css("top"),10) - $("#pic img").height();
		// $("#aboutme").css("top", aboutOffset);
		// $("#pic").height($("#aboutme").height() - heightShift);
		fs = 23*(window.innerWidth/768);
		lh = 1.2;
		$("#music").css("margin-top",0);
	}
	// if(window.innerWidth <= 768){
	// 	var aboutOffset = parseInt($("#aboutme").css("top"),10) - $("#pic img").height()/1.8;
	// 	var heightShift = parseInt($("#aboutme").css("top"),10) - $("#pic img").height();
	// 	$("#aboutme").css("top", aboutOffset);
	// 	$("#pic").height($("#aboutme").height() - heightShift);
	// } else {
	// 	$("#aboutme").css("top", originalOffset);
	// 	$("#pic").height(originalHeight);
	// }
	if(fs < 12){
		fs = 12;
	}
	if(lh < 1.1){
		lh = 1.1;
	}
	$("#widgetassistant").css("padding-bottom", "7%");
	setTimeout(function(){
		var temp = ($("#watext").height() + $("#buttonpanel").height() + $("#watext").offset().top - $("#widgetassistant").offset().top)*1.03;
		if(ipH*0.88 <= $("#watext").height() && scaled !== temp){
			scaled = temp;
			$("#widgetassistant").height(temp);
			$("#widgetassistant").css("padding-bottom", 0);
		}
	},300);
	$(".txt, .btn-default").css("font-size",fs);
	$("h2").css("font-size", 1.6*fs);
	$(".txt").css("line-height",lh);
}