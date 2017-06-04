var widgetIdentifier;
$(document).ready(function() { 
	//assigns a random id so that multiple infostats.js occurences can run at once without overwriting eachother
	var widgetIdentifier = "com." + infostats.randomid(7) + "." + infostats.randomid(5);
	infostats.calendarLoad();
	infostats.notifications();
	infostats.sysinfo();
	infostats.location();
});
var infostats = {}; 
	infostats.sysinfo = function() {
		this.battery = [IS2System batteryPercent];
		this.dispWidth = [IS2System deviceDisplayWidth];
		this.ram = [IS2System ramFree];
    	this.ramA = [IS2System ramAvailable];
    	this.battState = [IS2System batteryState];
	}
	infostats.notifications = function(){
		[IS2Notifications registerForBulletinNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
		this.mail =  [IS2Notifications notificationCountForApplication:mailnotif];
		this.phone  =  [IS2Notifications notificationCountForApplication:phonenotif];
		this.sms = [IS2Notifications notificationCountForApplication:smsnotif];
		this.facebook = [IS2Notifications notificationCountForApplication:facebooknotif];
		this.twitter =  [IS2Notifications notificationCountForApplication:twitnotif];
		this.insta  = [IS2Notifications notificationCountForApplication:instanotif];
		[IS2Notifications unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	}
	infostats.location = function(){
    	[IS2Location registerForLocationNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
	    [IS2Location setLocationUpdateDistanceInterval:2 forRequester:widgetIdentifier];
	    [IS2Location setLocationUpdateAccuracy:4 forRequester:widgetIdentifier];
	    this.latLong = [IS2Location currentLatitude] +", "+[IS2Location currentLongitude];
	    [IS2Location removeRequesterForLocationDistanceInterval:widgetIdentifier];
   		[IS2Location removeRequesterForLocationAccuracy:widgetIdentifier];
   		[IS2Location unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	}
	infostats.calendarLoad = function() {
	    [IS2Calendar registerForCalendarNotificationsWithIdentifier:widgetIdentifier andCallback:^ void () {}];
	    var timeNow = new Date();
    	var timeInWeek = timeNow.getTime() + (7 * 24 * 60 * 60 * 1000);
	    this.eventsArray = JSON.parse("" + [IS2Calendar calendarEntriesJSONBetweenStartTimeAsTimestamp:timeNow.getTime() andEndTimeAsTimestamp:timeInWeek]);
		this.event = [];
		for(var i = 0; i < this.eventsArray.length; i++) {
			this.event[i] = {};
			this.event[i].title = this.eventsArray[i].title;
			this.event[i].location = this.eventsArray[i].location;
			this.event[i].startTime = this.eventsArray[i].startTimeTimestamp;
			this.event[i].endTime = this.eventsArray[i].endTimeTimestamp;
			if(this.eventsArray[i].allDay === 0){
				this.event[i].allDay = false;
			} else {
				this.event[i].allDay = true;
			}
			this.event[i].calendarName = this.eventsArray[i].associatedCalendarName;
			this.event[i].calendarColor = this.eventsArray[i].associatedCalendarHexColor;
		}
		[IS2Calendar unregisterForNotificationsWithIdentifier:widgetIdentifier];
	}
	infostats.randomid = function(l){
		var str = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	    for( var i=0; i < l; i++ ){
	        str += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return str;
	}

window.onunload = function(){
	[IS2Calendar unregisterForNotificationsWithIdentifier:widgetIdentifier];
	[IS2Location removeRequesterForLocationDistanceInterval:widgetIdentifier];
   	[IS2Location removeRequesterForLocationAccuracy:widgetIdentifier];
   	[IS2Location unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	[IS2Notifications unregisterForNotificationsWithIdentifier:widgetIdentifier]; 
	return null;
}
