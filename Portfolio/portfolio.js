var screen = $("#iphonehomescreen, #fulldemo");
var iphone = $("#iphone");
var ipH = iphone.height();
var ww = window.innerWidth;
var scaled;
var switched;
var music;
var ref1orig;
var ref2orig;
var ref3orig;
var ref4orig;
var ref5orig;
var mAlt = "";
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
		$("#goal").html(goal);
		var exp = "<p>I am a self-taught web and iOS developer, which is how I supported myself during my time at UNC. In the academic world, I have modelled complex molecular systems. Most notably, I was part of a team that created a model for disorder and anisotropy in third and fourth dimensional systems. Examples of my work can be seen below.</p><p>My education also included work in many different lab environments. I learned to use spectrophotometry, agarose gel electrophoresis, SDS-PAGE, NMR spectroscopy, GC-MS, PCR, and other means of analyzing organic and biochemical reactions. With these techniques and others, I was taught to carry out tasks such as planning or executing complex syntheses and making genetic modifications to bacteria.</p>";
		$("#exp").html(exp);
	}
	waDemo();
	setInterval(function(){
		if(window.innerWidth !== ww){
			waDemo();
			ww = window.innerWidth;
		} else if ($("#music" + mAlt + " .txt").css("font-size") !== $(".txt").css("font-size") | $("#music" + mAlt + " h2").css("font-size") !== $("h2:first-of-type").css("font-size")){
			$("#music" + mAlt + " h2").css("font-size",$("h2:first-of-type").css("font-size"));
			$("#music" + mAlt + " .txt").css("font-size", $(".txt").css("font-size"));	
			$("#music" + mAlt + " .txt").css("line-height", $(".txt").css("line-height"));	
		}
	}, 500);
	console.log("Hello! Thanks for checking out my website. I am self taught, so some of the code might be a little unorthodox. If you have any suggestions on how I could improve it, I'd welcome the opportunity to hear from someone with more experience.");
});
function waDemo(){
	setTimeout(function(){
		$("#iphonehomescreen").attr("src","Widget Assistant/Widget.html");
		var t = $("#references").offset().top - 1.2*$("nav").height();
		$("#ref").css("top", t);
	},700);
	$(".back").addClass("boxshadow");
	$("#references").css("margin-top",0);
	screen = $("#iphonehomescreen, #fulldemo");
	iphone = $("#iphone");
	// var h = screen.height();
	screen.width(0.88*iphone.width());
	screen.css("left",0.062*iphone.width());
	screen.css("top",0.115*iphone.height());
	screen.height((16/9)*screen.width());
	var temp = (iphone.height() + iphone.offset().top - $("#widgetassistant").offset().top)*1.03;
	$("#widgetassistant").height(temp);
	ipH = iphone.height();
	var fs = 16*(window.innerWidth/992);
	var lh = 1.3*(window.innerWidth/992);
	if(window.innerWidth <= 992){
		$(".borr").html("below");
		fs = 23*(window.innerWidth/768);
		lh = 1.2;
		$(".back").removeClass("boxshadow");
		$("#references").css("margin-top","20px");
		setTimeout(function(){
			if (music === undefined){
				music = $("#music").html();
				ref1orig = $("#ref1").html();
				ref2orig = $("#ref2").html();
				ref3orig = $("#ref3").html();
				ref4orig = $("#ref4").html();
				ref5orig = $("#ref5").html();
			}
			$("#musicalt").html(music);
			$("#ref4").html(ref2orig);
			$("#ref2").html(ref3orig);
			$("#ref3").html(ref4orig);
			$("#music").html("");
			$("#music").removeClass("back col-lg-12 col-md-12 col-sm-12 col-xs-12 txt");
			$("#musicalt").addClass("back col-sm-12 col-xs-12 txt");
			$("#row1").removeClass("match-my-cols");
			switched = true;
			mAlt = "alt";
		},500);
	} else {
		$(".borr").html("to the right");
		setTimeout(function(){
			if(switched == true){
				$("#music").html(music);
				$("#ref1").html(ref1orig);
				$("#ref2").html(ref2orig);
				$("#ref3").html(ref3orig);
				$("#ref4").html(ref4orig);
				$("#ref5").html(ref5orig);
				$("#musicalt").html("");
				$("#musicalt").removeClass("back col-sm-12 col-xs-12 txt");
				$("#music").addClass("back col-lg-12 col-md-12 col-sm-12 col-xs-12 txt");
				$("#row1").addClass("match-my-cols");
				switched = false;
				mAlt = "";
			}
		},500);
	}
	if(fs > 17){
		fs = 17;
	}
	if(fs < 12){
		fs = 12;
	}
	if(lh < 1.1){
		lh = 1.1;
	}
	// setTimeout(function(){
	// 	var temp = ($("#watext").height() + $("#watext").offset().top - $("#widgetassistant").offset().top)*0.98;
	// 	if(ipH*0.88 <= $("#watext").height() && $("#widgetassistant").height() !== temp){
	// 		scaled = temp;
	// 		$("#widgetassistant").height(scaled);
	// 		$("#widgetassistant").css("padding-bottom", 0);
	// 	} else {
	// 		$("#widgetassistant").css("padding-bottom", "7%");
	// 	}
	// 	temp = ($("#watext").height() + $("#iphone").height())*1.13;
	// 	if(window.innerWidth < 768 && $("#widgetassistant").height() !== temp){
	// 		$("#below").html("below")
	// 		$("#widgetassistant").height(temp);
	// 	} else if (window.innerWidth >= 768) {
	// 		$("#below").html("to the right")
	// 	}
	// },500);
	setTimeout(function(){
		var temp = 0;
		if(window.innerWidth < 768){
			$("#below").html("below")
			temp = ($("#widgetassistantdemo img").height() + $("#widgetassistantdemo img").offset().top - $("#widgetassistant").offset().top)*0.98;
			$("#widgetassistant").height(temp);
			$("#widgetassistant").css("padding-bottom", "7%");
		} else if (window.innerWidth >= 768) {
			$("#below").html("to the right")
			temp = $("#music").height() + $("#music").offset().top - $("#widgetassistant").offset().top
			$("#widgetassistant").css("padding-bottom", 0);
			$("#widgetassistant").height(temp);
		}
	},500);
	$(".txt, .btn-default").css("font-size",fs);
	$("h2").css("font-size", 1.6*fs);
	$("h3").css("font-size", 1.3*fs);
	$(".txt").css("line-height",lh);
	var back = $("#background");
	back.height(window.innerHeight*1.2);
	// if(back.width() < window.innerWidth){
	// 	back.width(window.innerWidth);
	// 	back.height(window.innerHeight);
	// 	backgroundAnim()
	// }
}
// var int;
// function backgroundAnim(){
// 	clearInterval(int);
// 	function t(){
// 		$("#background div").toggleClass("anim");
// 	}
// 	t();
// 	var int = setInterval(function(){
// 		t();
// 	},10500);
// }

function getVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}