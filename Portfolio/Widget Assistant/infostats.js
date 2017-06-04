// The following has been modified for my portfolio website and is not actually functional. It just returns set numbers since it isn't actually on an iphone.
// var widgetIdentifier;
var infostats = {}; 
	infostats.sysinfo = function() {
		this.battery = 87;
		this.dispWidth = window.innerWidth;
		this.ram = 4;
    	this.ramA = 10;
    	this.battState = "charging";
	};
	infostats.notifications = function(){
		//[IS2Notifications registerForBulletinNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
		this.mail =  57;
		this.phone  =  2;
		this.sms = 3;
		this.facebook = 1;
		this.twitter =  2;
		this.insta  = 0;
		//[IS2Notifications unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	};
	infostats.location = function(){
    	//[IS2Location registerForLocationNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
	    //[IS2Location setLocationUpdateDistanceInterval:2 forRequester:widgetIdentifier];
	    //[IS2Location setLocationUpdateAccuracy:4 forRequester:widgetIdentifier];
	    this.latLong = "Chapel Hill, NC";
	    //[IS2Location removeRequesterForLocationDistanceInterval:widgetIdentifier];
   		//[IS2Location removeRequesterForLocationAccuracy:widgetIdentifier];
   		//[IS2Location unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	};
	infostats.calendarLoad = function() {
	    //[IS2Calendar registerForCalendarNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
	    var timeNow = new Date();
    	//var timeInWeek = timeNow.getTime() + (7 * 24 * 60 * 60 * 1000);
	    //this.eventsArray = JSON.parse("" + [IS2Calendar calendarEntriesJSONBetweenStartTimeAsTimestamp:timeNow.getTime() andEndTimeAsTimestamp:timeInWeek]);
		// this.event = [];
		// for(var i = 0; i < this.eventsArray.length; i++) {
		// 	this.event[i] = {};
		// 	this.event[i].title = this.eventsArray[i].title;
		// 	this.event[i].location = this.eventsArray[i].location;
		// 	this.event[i].startTime = this.eventsArray[i].startTimeTimestamp;
		// 	this.event[i].endTime = this.eventsArray[i].endTimeTimestamp;
		// 	if(this.eventsArray[i].allDay === 0){
		// 		this.event[i].allDay = false;
		// 	} else {
		// 		this.event[i].allDay = true;
		// 	}
		// 	this.event[i].calendarName = this.eventsArray[i].associatedCalendarName;
		// 	this.event[i].calendarColor = this.eventsArray[i].associatedCalendarHexColor;
		// }
		this.event = [];
		this.event[0] = {};
		this.event[0].title = "Call Nicholas";
		this.event[0].location = "wherever";
		this.event[0].startTime = timeNow.getTime() + (0 * 24 * 60 * 60 * 1000);
		this.event[0].endTime = timeNow.getTime() + (1 * 24 * 60 * 60 * 1000);
		this.event[0].allDay = false;
		//[IS2Calendar unregisterForNotificationsWithIdentifier:widgetIdentifier];
	};
$(document).ready(function() { 
	//assigns a random id so that multiple infostats.js occurences can run at once without overwriting eachother
	//var widgetIdentifier = "com." + infostats.randomid(7) + "." + infostats.randomid(5);
	infostats.calendarLoad();
	infostats.notifications();
	infostats.sysinfo();
	infostats.location();
});
// 	infostats.randomid = function(l){
// 		var str = "";
// 	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// 	    for( var i=0; i < l; i++ ){
// 	        str += possible.charAt(Math.floor(Math.random() * possible.length));
// 	    }
// 	    return str;
// 	}

// window.onunload = function(){
// 	[IS2Calendar unregisterForNotificationsWithIdentifier:widgetIdentifier];
// 	[IS2Location removeRequesterForLocationDistanceInterval:widgetIdentifier];
//    	[IS2Location removeRequesterForLocationAccuracy:widgetIdentifier];
//    	[IS2Location unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
// 	[IS2Notifications unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
// 	return null;
// }
