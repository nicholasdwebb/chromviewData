//The settings below determine which apps trigger the notifications. You can replace them to change the app.
//For example, changing the "com.apple.MobileSMS" to "net.whatsapp.WhatsApp" will
//change the messages notification from iMessage to WhatsApp.

var smsnotif = "com.apple.MobileSMS"; //default: "com.apple.MobileSMS"
var phonenotif = "com.apple.mobilephone"; //default: "com.apple.mobilephone"
var mailnotif = "com.apple.mobilemail"; //default: "com.apple.mobilemail"
var facebooknotif = "com.facebook.Facebook"; //default: "com.facebook.Facebook"
var twitnotif = "com.atebits.Tweetie2"; //default: "com.atebits.Tweetie2" (twitter)
var instanotif = "com.burbn.instagram"; //default: "com.burbn.instagram"

//Here's a guide on finding the bundleID: https://kb.acronis.com/content/39368

//Uncommenting the variables below overrides iWidget's configuration options. These options are safe to change
//although they may screw up Widget Assistant if set improperly.
var tutorial = false;
var twelvehr = true;
var forecastdays = 5;
var backgroundcolor = "black";
var textColor = "white";
var textShadows = true;
var tempunit = "f";
var gps = false;
var city = "Apex, NC";
var icons = "stardock";
var fontSize = 18;
var lang = "en"; // en,fr,de,sp,it,ja
var updateInterval = 15; //weather update time in minutes
var rotationInterval = 10; //time in seconds between panel switching
var notupdate = 30; //time in seconds between notification updates
var blur = true;
var blurradius = 10;
var topplacement = 320;
var leftplacement = -5;
var assistantcolor = "white";
var assistanttype = "orb"; //circles, boxy-circles, spinning-box, orb, Hal