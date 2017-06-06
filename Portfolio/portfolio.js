var screen = $("#iphonehomescreen");
var iphone = $("#iphone");
var ipH = iphone.height();
var ww = window.innerWidth;
var scaled;
var switched;
var music;
var resume = getVariable("resume");
$(function(){
	$("#spacer").height(1.2*$("#nb").height());
	var pic = $("#pic");
	if(resume == "t"){
		music = $("#music").html();
		$("#resume").attr("href","t/Resume.pdf");
		var chem = $("#row2").html();
		var dev = $("#row3").html();
		$("#row2").html(dev);
		$("#row3").html(chem);
		var goal = "I primarily chose to get my degree in chemistry because I wanted a challenge. However, I also began working in IT and web development to support myself while I was getting my education, and have really enjoyed the experience. While my degree may be a bit unorthodox for this kind of position, I do have the necessary experience, skills, and passion for the work.";
		
		// setTimeout(function(){
		// 	$("#goal").html(goal);
		// },100);
		$("#goal").html(goal);
		
		var exp = "<p>I am a self-taught web and iOS developer, which is how I supported myself during my time at UNC. In the academic world, I have modelled complex molecular systems. Most notably, I was part of a team that created a model for disorder and anisotropy in third and fourth dimensional systems. Examples of my work can be seen below.</p><p>My education also included work in many different lab environments. I learned to use spectrophotometry, agarose gel electrophoresis, SDS-PAGE, NMR spectroscopy, GC-MS, PCR, and other means of analyzing organic and biochemical reactions. With these techniques and others, I was taught to carry out tasks such as planning or executing complex syntheses and making genetic modifications to bacteria.</p>";
		$("#exp").html(exp);
	}
	waDemo();
	setInterval(function(){
		if(iphone.height() !== ipH | window.innerWidth !== ww){
			waDemo();
			ww = window.innerWidth;
		}
	}, 200);
	console.log("Hello! Thanks for checking out my website. I am self taught, so some of the code might be a little unorthodox. If you have any suggestions on how I could improve it, I'd welcome the opportunity to hear from someone with more experience.");
});
function waDemo(){
	$(".borr").html("to the right");
	setTimeout(function(){
		$("#iphonehomescreen").attr("src","Widget Assistant/Widget.html");
	},700);
	screen = $("#iphonehomescreen, #fulldemo");
	iphone = $("#iphone");
	var h = screen.height();
	screen.width(0.88*iphone.width());
	screen.css("left",0.062*iphone.width());
	screen.css("top",0.115*iphone.height());
	screen.height((16/9)*screen.width());
	var temp = (iphone.height() + iphone.offset().top - $("#widgetassistant").offset().top)*1.03;
	$("#widgetassistant").height(temp);
	if (screen.height() !== h){
		$("#iphonehomescreen").attr("src","Widget Assistant/Widget.html");
	}
	ipH = iphone.height();
	var fs = 16*(window.innerWidth/1170);
	var lh = 1.3*(window.innerWidth/1170);
	if(window.innerWidth <= 970){
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
		setTimeout(function(){
			if (music === undefined){
				music = $("#music").html();
			}
			$("#musicalt").css("margin-top",10);
			$("#musicalt").html(music);
			$("#music").html("");
			$("#music").removeClass("back col-lg-12 col-md-12 col-sm-12 col-xs-12");
			$("#musicalt").addClass("back col-sm-12 col-xs-12");
			$("#row1").removeClass("match-my-cols");
			switched = true;
		},500);
	}
	setTimeout(function(){
		if(window.innerWidth > 970 && switched == true){
			$("#musicalt").css("margin-top",0);
			$("#music").html(music);
			$("#musicalt").html("");
			$("#musicalt").removeClass("back col-sm-12 col-xs-12");
			$("#music").addClass("back col-lg-12 col-md-12 col-sm-12 col-xs-12")
			$("#row1").addClass("match-my-cols");
			switched = false;
		}
	},500);
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
	var back = $("#background");
	back.height(window.innerHeight*1.2);
	if(back.width() < window.innerWidth){
		back.width(window.innerWidth);
		back.height(back.width()*3/4);
	}
}
function getVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}