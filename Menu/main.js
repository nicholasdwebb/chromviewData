var foodTypes = {};
foodTypes["Mexican"] = {
	options: [
		"Burritos",
		"Tostadas",
		"Tacos",
		"Mexican4",
		"Mexican5",
	],
	count: 1,
};
foodTypes["American"] = {
	options: [
		"Cheeseburgers",
		"Chicken",
		"Mac and Cheese",
		"American4",
		"American5",
	],
	count: 3,
};
foodTypes["Italian"] = {
	options: [
		"Spaghetti",
		"Ziti",
		"Italian3",
		"Italian4",
		"Italian5",
	],
	count: 1,
};
foodTypes["Crockpot"] = {
	options: [
		"Minestrone",
		"Pulled Pork",
		"Chicken Tortilla Soup",
		"Crockpot4",
		"Crockpot5",
	],
	count: 1,
};
foodTypes["Miscellaneous"] = {
	options: [
		"Misc1",
		"Misc2",
		"Misc3",
	],
	count: 2,
};

var entry;
var foods = [];
var dialogs = [];
var initialized = false;

$(function(){

	if(window.innerWidth < 420){
		$("#container").width(window.innerWidth * .95);
	}
	
	genFoods();

	entry = document.querySelectorAll(".day");
	entry.forEach(function(e, i){
		generate(i);
	});

	document.querySelectorAll(".replace").forEach(function(e, i){
		$(e).click(function(){
			function close(){
				setTimeout(function(){$("#dialog").dialog("destroy");},501);
				$("#container").animate({
					opacity: 1,
				}, 500);
				$(".ui-dialog").animate({
					opacity: 0,
				}, 500);
			}
			foods.forEach(function(foo, t){
				dialogs[t] = {
					text: foo,
					click: function() {
						generate(i, foo);
						close();
					}
				}
			});
			dialogs[foods.length] = {
					text: "Surprise me!",
					click: function() {
						generate(i);
						close();
					}
				}
			dialogs[foods.length+1] = {
					text: "Never mind...",
					click: function() {
						close();
					}
				}
			var w = $("body").width()*.25;
			if(w < 150){
				w = 150;
			} else if(w > 250){
				w = 250;
			}
			$("#dialog").dialog({
				dialogClass: "dialog background",
				title: "What are you in the mood for?",
				width: w,
				buttons: dialogs
			});
			$("#dialog.ui-dialog-content.ui-widget-content").hide();
			$("div.dialog").css("top", 30);
			$("#container").animate({
				opacity: 0.2,
			}, 500);
			$(".ui-dialog").animate({
				opacity: 1,
			}, 500);
		});
	});

});

function generate(i, specific){
	if(specific !== undefined){
		foods = [specific];
		var temp = foodTypes[specific].options;
	} else {
		var temp = foods[rand(foods.length)];
		specific = temp;
		temp = foodTypes[temp].options;
	}
	temp = temp[rand(temp.length)];
	var hold = $(entry[i]).html();
	if( hold == temp){
		generate(i);
	} else {
		verify(temp, i, specific);
	}
}

function verify(temp, i, specific){
	var verified = true;
	for(var n=0; n<entry.length; n++){
		var current = $(entry[n]).html();
		if( temp === current && i !== n ){
			verified = false;
			generate(i, specific);
			n = entry.length;
		}
	}
	if(verified){
		genFoods();
		if(foodTypes[specific].count>0 || initialized == true){
			$(entry[i]).html(temp);
			foodTypes[specific].count--;
			if(i == entry.length - 1){
				initialized = true;
			}
		} else {
			generate(i);
		}
	}
}

function genFoods(){
	foods = [];
	Object.keys(foodTypes).forEach(function(key){
		foods.push(key);
	});
}

function rand(n){
	return Math.floor(Math.random()*n);
}