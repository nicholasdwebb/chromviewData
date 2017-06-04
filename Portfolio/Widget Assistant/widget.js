var weatherloaded;
var width;
var ratio;
var wpanelh;
var datepanelheight;
var infostats = {}; 
var infostats = {}; 
// The following has been modified for my portfolio website and is not actually functional. It just returns set numbers since it isn't actually on an iphone.
	infostats.sysinfo = function() {
		this.battery = 87;
		this.dispWidth = window.innerWidth;
		this.ram = 4;
    	this.ramA = 10;
    	this.battState = "charging";
	};
	infostats.notifications = function(){
		this.mail =  1848;
		this.phone  =  0;
		this.sms = 0;
		this.facebook = 1;
		this.twitter =  2;
		this.insta  = 0;
	};
	infostats.location = function(){
	    this.latLong = "Apex, NC";
	};
	infostats.calendarLoad = function() {
	    var timeNow = new Date();
		this.event = [];
		this.event[0] = {};
		this.event[0].title = "Schedule an Interview with Nicholas Webb";
		this.event[0].location = "";
		this.event[0].startTime = timeNow.getTime();
		this.event[0].endTime = timeNow.getTime() + ( 30 * 60 * 1000);
		this.event[0].allDay = false;
	};
$(document).ready(function() { 
	infostats.calendarLoad();
	infostats.notifications();
	infostats.sysinfo();
	infostats.location();
  width = infostats.dispWidth;
  if (width >= 414){
    width = 414;
  }
  ratio = width/500;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'body { -webkit-transform: scale('+ratio+','+ratio+'); position:absolute; left:0px; -webkit-transform-origin: 0% 0%}';
  document.getElementsByTagName('head')[0].appendChild(style);
  
  $(".background").css("background-color", backgroundcolor);
  $(document.body).css("color", textColor);
  $(document.body).css("text-shadow", "0px 0px 4px rgba(0, 0, 0, 0.5)");
  $(document.body).css("font-size", parseInt(fontSize));
  $(document.body).css("top",parseInt(topplacement)*width/320);

  $("#backgroundimg").css("top",-parseInt(topplacement)*(1/ratio)*width/320);

  $(document.body).css("left",parseInt(leftplacement)*width/320);
  $(".circles").css("border-color",assistantcolor)
  // $(".sk-cube").css("backgroundColor","transparent");
  $(".sk-cube-grid .sk-cube, .spinner").css("background-color",assistantcolor);
  $(".orb, .orb1").css("border-top-color",assistantcolor);
  $(".orb, .orb1").css("box-shadow", "0 0 15px "+assistantcolor);
  $(".orb, .orb1").css("border-bottom-color",assistantcolor);
  $("#time, #bat, #ram").css("border", "1px solid "+textColor);
  $("#calendar, #col1border").css("border-left-color", textColor);
  $("#"+assistanttype).show();

  setTimeout(function(){
    $("body").animate({
      opacity: 1,
    }, 1000);
  }, 1000);
  
  setTimeout(function(){
    weather();
    calendar();
    if(parseInt(rotationInterval) < 7){
      $("#weatherpanel").animate({
        opacity: 1,
        //height: wpanelh,
      }, 600);

      $("#iconstrip").animate({
        left: 30,
      }, 600, "easeOutBack");
      
      $("#datepanel").animate({
        opacity: 0,
        //height: 0,
      }, 600);
      setTimeout(rotation,8000);
    }
    else{rotation();}

    batfill();
    ramwidth();
    notpanel();

    if (tutorial === true) {
      tutor();
    }

  },700);

  setInterval(clock,1000);
  //setInterval(calendar,parseInt(updateInterval)*60000);
  // setTimeout(function(){rotation()},500);
  // setTimeout(function(){batfill()},500);
  // setTimeout(ramwidth(), 100);

  // setTimeout(calendar, 3000);
  // wait uodateInterval number of minutes, then relaod information. Reduces battery consumption and crashing.
  // var calupdate = parseInt(updateInterval)*300000;
  // setInterval(function() {
  //   calendarload();
  //   alert("timer set");
  // },calupdate);
  //},parseInt(updateInterval)*60000);


  if (blur == true) {
    // code for testing from the desktop
    // $.ajax({
    //     url:'HomeBackgroundThumbnail.jpg',
    //     type:'POST',
    //     error:
    //         function(){
    //             $(".blur").attr("src","LockBackgroundThumbnail.jpg");
    //         },
    //     success:
    //         function(){
    //            $(".blur").attr("src","HomeBackgroundThumbnail.jpg");
    //         }
    // });
    $(".blur").attr("src","Background.png");

    // code for ios
    // $.ajax({
    //     url:'file:///var/mobile/Library/SpringBoard/HomeBackgroundThumbnail.jpg',
    //     type:'HEAD',
    //     error:
    //         function(){
    //             $(".blur").attr("src","file:///var/mobile/Library/SpringBoard/LockBackgroundThumbnail.jpg");
    //         },
    //     success:
    //         function(){
    //            $(".blur").attr("src","file:///var/mobile/Library/SpringBoard/HomeBackgroundThumbnail.jpg");
    //         }
    // });

    $( ".background" ).delay(400).fadeTo( 700, 0.37);
    $( ".blur" ).delay(400).fadeTo( 700, 1.0);
    $(".blur").css("-webkit-filter","blur("+parseInt(blurradius)+"px)"); //default blur, should work on all ios devices
    // $(".blur").css("filter","blur("+blurradius+"px)"); //use if webkit blur doesn't work on your iphone for some reason

    var wpanelpos = $("#weatherpanelback").offset();
    $("#weatherpanelblur").css("left",-1*wpanelpos.left/ratio);
    $("#weatherpanelblur").css("top",-1*wpanelpos.top/ratio-20);

    var dpanelpos = $("#datepanelback").offset();
    $("#datepanelblur").css("left",-1*dpanelpos.left/ratio);
    $("#datepanelblur").css("top",-1*dpanelpos.top/ratio-20);

    var dpanelpos = $("#npanelback").offset();
    $("#npanelblur").css("left",-1*dpanelpos.left/ratio);
    $("#npanelblur").css("top",-1*dpanelpos.top/ratio-20);

    var assistantpos = $("#assistant").offset();
    $("#assistantblur").css("left",-1*assistantpos.left/ratio);
    $("#assistantblur").css("top",-1*assistantpos.top/ratio-20);

  }
  if(blur == false){
    $( ".blur" ).css('display', 'none');
  }
});

function tutor(){
  var tut = confirm("Thank you for purchasing Widget Assistant. Since you enabled the tutorial option, this tutorial will now tell you how to use Widget Assistant. If you would like to view the tutorial, press ok. Otherwise, hit cancel.");
  if (tut === true) {
    var optiontut = confirm("Would you like to go over Widget Assistant's built in options?");
    if (optiontut === true) {
      alert("The option labeled \"Assistant Style\" allows you to change widget assistant's animation style. There are several options, ranging from a simple rotating circle to a replica of Hal 9000 from 2001 A Space Odyssey.");
      alert("The Assistant Color option allows you to change the color of the assistant animation. It accepts simple names or color codes in the #ffffff, rgb, or rgba format. The Text Color and Background Color options work the same way.");
      alert("The Icons option lets you change the weather icons. The GPS option uses Infostats' location tracker to determine your location for the weather. By default it checks your location every 15 minutes.")
      alert("If you turn off the GPS option, you can set your location using the City Name option. It accepts names in the format \"Name, Country\" (or \"Name, State\" if you are in the US). Technically, it also accepts Latitude, Longitude inputs if you want to do that.");
      alert("The Weather/Calendar Updates option allows you to change how frequently the weather and calendar update (and location if you are using GPS). The rotation interval option changes how frequently Widget Assistant switches views between the weather, calendar, and notifications panels.");
      alert("The Blur Background option controls whether your background behind Widget Assistant will be blurred. The Blur Strength option sets the blur radius in px. By default it is 10. Going higher than 15 causes minor graphical glitches.");
    }
    var optionloc = confirm("Would you like to go over how to position Widget Assistant, and how to remove it from the homescreen?");
    if (optionloc === true) {
      alert("Widget Assistant can not be dragged around the homescreen like a regular iWidget. This is necessary in order to make Widget Assistant's background blur and automatic display scaling work correctly. However, you can still change it's placement on the homescreen from the options menu.");
      alert("The option labeled \"How far down?\" in Widget Assistant's option menu controls it's vertical placement. By default this value is set to 300, which places Widget Assistant at the bottom of your homescreen. It can be set to any number, but the recommended values are 0 to move Widget Assistant to the top or 150 to put it in the middle.");
      alert("The How far left option behaves similarly, and controls how far from the left edge of the screen Widget Assistant is placed. However, setting this to anything other than 0 is not recommended unless you are using an iPad.");
      alert("In order to remove Widget Assistant from the homescreen, simply press and hold on any app icon to enter the icon \"jiggle\" mode. Then press the x in the top left corner of the screen. This will remove Widget Assistant and allow you to start over. Note that you have to press on an app icon, not Widget Assistant itself.");
    }
  alert("That's it for the tutorial! If you have any more questions, you can contact me from the \"Contact Author\" tab on Widget Assistant's Cydia page. One last thing; this tutorial will restart every time you respring unless you remove Widget Assistant from the homescreen and put it back with the tutorial option disabled.");
}}

function rotation(){

    $("#weatherpanel").animate({
      opacity: 1,
      //height: wpanelh,
    }, 600);

    $("#iconstrip").animate({
      left: 30,
    }, 1000, "easeOutBack");
    
    $("#datepanel").animate({
      opacity: 0,
      //height: 0,
    }, 600);

    $("#notificationspanel").animate({
      opacity: 0,
      //height: datepanelheight,
    }, 600);
  
  setTimeout(function(){
    $("#weatherpanel").animate({
      opacity: 0,
      //height: 0,
    }, 600);

    $("#iconstrip").animate({
      left: -42,
    }, 800, "easeOutBack");
    
    $("#datepanel").animate({
      opacity: 1,
      //height: datepanelheight,
    }, 600);

    $("#notificationspanel").animate({
      opacity: 0,
      //height: datepanelheight,
    }, 600);

    infostats.sysinfo();
    setTimeout(infostats.sysinfo, parseInt(rotationInterval) * 333);
    setTimeout(infostats.sysinfo, parseInt(rotationInterval) * 666);

  }, parseInt(rotationInterval) * 1000);

  setTimeout(function(){
    $("#weatherpanel").animate({
      opacity: 0,
      //height: 0,
    }, 600);

    $("#iconstrip").animate({
      left: -110,
    }, 800, "easeOutBack");
    
    $("#datepanel").animate({
      opacity: 0,
      //height: datepanelheight,
    }, 600);

    $("#notificationspanel").animate({
      opacity: 1,
      //height: datepanelheight,
    }, 600);

    notpanel();
    setTimeout(notpanel,parseInt(rotationInterval) * 333);
    setTimeout(notpanel,parseInt(rotationInterval) * 666);

  }, parseInt(rotationInterval) * 1000 * 2);

  setTimeout(function(){rotation()},parseInt(rotationInterval) * 1000 * 3)
}

function notpanel(){
	infostats.notifications();
 	$("#mnot").html(infostats.mail);
 	$("#pnot").html(infostats.phone);
 	$("#smsnot").html(infostats.sms);
 	$("#fnot").html(infostats.facebook);
 	$("#tnot").html(infostats.twitter);
 	$("#inot").html(infostats.insta);
}

//now handled by calandgps.js
// function calendar(){
//   var event1 = $("#eventOneTitle").html();
//   var event1location = $("#eventOneLocation").html();
//   var event1time = $("#eventOneTime").html();

//   if (event1location != "Unknown"){
//     event1 += ", "+attranslator(lang)+" "+event1location;
//   }

//   event1 += ", "+event1time;

//   $("#event").html(eventintro(lang)+" "+event1);
// }

function clock(){
  var date = new Date();
  var hours = date.getHours();
  if (twelvehr === true) {
	  if (hours > 12){
	    hours = date.getHours() - 12;
	  }
	  else if (hours === 0){
	    hours = 12;
	  }
  }
  else {
    hours = date.getHours();
  }
  var minutes = date.getMinutes();
  if (minutes < 10){
    minutes = "0"+date.getMinutes();
  }
  var seconds = date.getSeconds();
  if (seconds < 10){
    seconds = "0"+date.getSeconds();
  }
  $("#time").html("<span id=\"t1\">"+hours+":"+minutes+"</span><span id=\"spacer\"> </span><span id=\"t2\">"+seconds+"</span>");
 
  var t2top = ($("#t1").height()-$("#t2").height())/(2*ratio);
  $("#t2").css("bottom",t2top);

}

function batfill(){

  //code below deals mostly with the clock, placed here rather than in clock() for timing purposes
  var timew = ($("#t1").width()+$("#spacer").width()+$("#t2").width()+3)/ratio;
  $("#time,#bat,#ram").width(timew);
  $("#bat,#ram").height($("#t1").height()/ratio);
  datepanelheight = $("#t1").height() * 3 * 1.666 / ratio;
  $("#datepanel,#notificationspanel").height(datepanelheight);
  //end of clock related code

  $("#bat").html("<span id=\"b1\">"+infostats.battery+"%</span>");

  var batw = (( $("#bat").width() * (infostats.battery * .01 ) + 8 ) / ( ratio ));
  var bath = ( $("#bat").height() / ratio );
  
  if (infostats.battery >= 75) {
    fillcolor = "rgba(106, 235, 63, 0.6)";
  }
  else if (infostats.battery >= 50) {
    fillcolor = "rgba(161, 219, 59, 0.4)"
  }
  else if (infostats.battery >= 25) {
    fillcolor = "rgba(219, 171, 59, 0.5)"
  }
  else {
    fillcolor = "rgba(245, 64, 51, 0.5)"
  }

  $("#batfill").width(batw);
  //fill animation, a bit glitchy. Might fix later. Disable line above if you want to use.
  // $("#batfill").animate({
  //     width: batw,
  // }, 1000);
  $("#batfill").height(bath);
  $("#batfill").css("background-color",fillcolor)

  var bfillleft = ($("#bat").offset().left - $("#datepanel").offset().left)/ratio;
  var bfilltop = $("#batwrap").css("top")/ratio
  $("#batfill").css("left", bfillleft);

  setTimeout(batfill, 10000);

  //label related code, here because I don't plan ahead.
  var labelleft = timew/4;
  $("#batteryicon").addClass("fa fa-battery-full fa-battery-three-quarters fa-battery-half fa-battery-quarter fa-battery-empty");
  $("#label").css("left",labelleft);
  if (infostats.battery >= 85) {
    $("#batteryicon").removeClass("fa-battery-three-quarters fa-battery-half fa-battery-quarter fa-battery-empty");
  }  
  else if (infostats.battery >= 60) {
    $("#batteryicon").removeClass("fa-battery-full fa-battery-half fa-battery-quarter fa-battery-empty");
  }
  else if (infostats.battery >= 40) {
    $("#batteryicon").removeClass("fa-battery-full fa-battery-three-quarter fa-battery-quarter fa-battery-empty");
  }  
  else if (infostats.battery >= 15) {
    $("#batteryicon").removeClass("fa-battery-full fa-battery-three-quarter fa-battery-half fa-battery-empty");
  }  
  else {
    $("#batteryicon").removeClass("fa-battery-full fa-battery-three-quarter fa-battery-half fa-battery-quarter");
  }
  
  //date related code, also here because I don't plan ahead.
  var cal = new Date();
  $("#date").html(translator.nameMonth(cal.getMonth())+" "+cal.getDate()+", "+cal.getFullYear());

}

function ramwidth(){
  var rampercent = Math.round(100 * infostats.ram / infostats.ramA);
  $("#ram").html("<span id=\"r1\">"+rampercent+"%</span>");
  $("#ram").css("font-size",$("#b1").css("font-size"));

  var ramw = (( $("#ram").width() * rampercent / 100 ) + 8 ) / ( ratio );
  var ramh = ( $("#ram").height() / ratio );
  
  if ( rampercent >= 50) {
    fillcolor = "rgba(106, 235, 63, 0.4)";
  }
  else if ( rampercent >= 35) {
    fillcolor = "rgba(161, 219, 59, 0.4)"
  }
  else if ( rampercent >= 10) {
    fillcolor = "rgba(219, 171, 59, 0.5)"
  }
  else {
    fillcolor = "rgba(245, 64, 51, 0.5)"
  }

  $("#ramfill").width(ramw);
  // $("#ramfill").animate({
  //     "width": ramw,
  // }, 1000);
  setTimeout(ramwidth, 1000);
  $("#ramfill").height(ramh);
  $("#ramfill").css("background-color",fillcolor)

  var ramfillleft = ($("#ram").offset().left - $("#datepanel").offset().left)/ratio;
  $("#ramfill").css("left", ramfillleft);
}

function weather(){
	if (gps === true){
		infostats.location();
		city = infostats.latLong;
	}
  	weatherloaded = 0;
    setTimeout(function(){weather();calendar();}, parseInt(updateInterval)*60000);
    $.simpleWeather({
      location: city,
      woeid: '',
      unit: tempunit,
      success: function(weather) {
      	//console.dir(weather);
        weatherloaded = 1
        $("#weatherspeech").css("width","40%");
        $("#weatherspeech").css("top","13%");
        $("#weatherpanel").css("height","");
        $("#weathericon, #temp, #city, #forecast").show();
        $("#temp").html(weather.temp+'&deg;');
        $("#city").html(weather.city);
        $("#weathericon").attr("src","Icons/"+icons+"/"+weather.code+".png");

        if(parseInt(forecastdays) >= 8){
    		forecastdays = 7;
    	} else if(parseInt(forecastdays) <= 3) {
    		forecastdays = 3;
    	}else {
    		forecastdays = parseInt(forecastdays);
    	}

        for(var i = 0; i <= forecastdays - 1; i++){
        	var n = i + 1;
        	$("#forecastdays").append("<td id=\"day"+n+"\"></td>");
        	$("#forecasticons").append("<td><img id=\"icon"+n+"\"></td>");
        	$("#forecasthilo").append("<td id=\"hilo"+n+"\"></td>");
	        $("#day" + n).html(translator.nameday(weather.forecast[i].day));
	        $("#day" + n).show();
	        $("#icon" + n).attr("src","Icons/"+icons+"/"+weather.forecast[i].code+".png");
	        $("#icon" + n).show();
	        $("#hilo" + n).html(weather.forecast[i].low+"&deg;/"+weather.forecast[i].high+"&deg;");
	        $("#hilo" + n).show();
    	}

    	var bspace = (($("#weatherpanel").width() * .95 - ($("#icon1").width() * forecastdays)) / (forecastdays + 1)) / ratio;
    	// $("#forecast").css("border-spacing", bspace + "px 0");
    	var cwidth = ($("#weatherpanel").width()/ratio * .95 - bspace * (forecastdays + 1)) / forecastdays;
    	$("#forecastdays td").width(cwidth + "px");

        $("#weatherspeech").html(translator.localweather());
        if(lang == "ja"){
          $("#weatherspeech").css("font-size","0.92em");
        }
      },
      error: function(error) {
        $("#weatherspeech").css("width","90%");
        $("#weatherspeech").css("top","40%");
        $("#weatherpanel").css("height","100px")
        $("#weatherspeech").html("Can not retrieve weather.");
        $("#weathericon, #temp, #city, #forecast").hide();
        setTimeout(weather, 1*60000);
        //doesn't run for some reason, might figure out later
      }
    });

    setTimeout(function(){
      if (weatherloaded === 0){
        $("#weatherspeech").css("width","90%");
        $("#weatherspeech").css("top","40%");
        $("#weatherpanel").css("height","100px")
        $("#weatherspeech").html("Can not retrieve weather.");
        $("#weathericon, #temp, #city, #forecast").hide();
        setTimeout(weather, 1*60000);
      }
    }, 2000); //wait 2 seconds, then if internet is unavailable begin calling for weather every minute until it is.
            // Change the 1*6000 to another value if you wish to change the call frequency
    
    setTimeout(function(){
      wpanelh = $("#weatherpanel").height()/ratio;
    },7000);
}
	   	function timeValueCorrection(value) {
	    	if (value < 10) {
	    	     return "0" + value;
	    	} else {
	    	     return value;
	    	}
	  	}

	  	function twelvehrCorrection(value) {
		  	if (twelvehr === true){
			    if (value > 12) {
			         return value - 12;
			    } 
			    else if (value === 0) {
			    	return 12;
			    }
			    else {
			         return value;
			    }
			}
			return value;
		}
function calendar(){
	infostats.calendarLoad();
	var str = "";
	var e = infostats.event[0];
	if (infostats.event.length > 0) {
    	str += translator.eventintro() + " " + e.title + " ";
    	if (e.location !== "") {
    		str += translator.at() + " " + e.location;
    	}
    	if (e.allDay === true){
    		str += " " + translator.allday();
    	} else {
	    	var timeStart = new Date(e.startTime);
	    	var timeEnd = new Date(e.endTime);
	    	str += ", " + translator.eventday(timeStart) + " ";
	    	str += translator.from() + " " + twelvehrCorrection(timeStart.getHours()) + ":" + timeValueCorrection(timeStart.getMinutes()) + " "; 
	    	if (timeStart.getDay() == timeEnd.getDay()) {
	    		str += translator.to() + " " + twelvehrCorrection(timeEnd.getHours()) + ":" + timeValueCorrection(timeEnd.getMinutes());
	    	} else {
	    		str += translator.to() + " " + translator.eventday(timeEnd) + " ";
	    		str += translator.at() + " " + twelvehrCorrection(timeEnd.getHours()) + ":" + timeValueCorrection(timeEnd.getMinutes());
	    	}
    	}
    } else {
    	str += translator.noevent();
    }
	$("#event").html(str);
}

