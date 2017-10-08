var foodTypes = {};
foodTypes["Mexican"] = {
	options: [
		"Burritos",
		"Tostadas",
		"Tacos",
		"Fajitas",
		"Enchiladas",
	],
	count: 1,
};
foodTypes["American"] = {
	options: [
		"Cheeseburgers",
		"Chicken Caesar Salad",
		"Crispy Chicken",
		"Chicken Sandwiches",
		"Lemon Chicken",
		"Chicken Parmesan Sandwiches",
		"Chicken Salad",
		"Sloppy Joes",
		"Sliders",
		"Turkey Melts",
		"Pork Chops",
	],
	count: 3,
};
foodTypes["Pasta"] = {
	options: [
		"Spaghetti",
		"Ziti",
		"Lasagna",
		"Carbonara",
		"Pizza Pasta",
		"Fettuccine",
		"Sausage and Pepper Pasta",
		"Stuffed Shells",
		"Ravioli",
		"Tortellini",
		"Tuna Helper",
		"Angel Hair with Tomatoes",
	],
	count: 1,
};
foodTypes["Crockpot"] = {
	options: [
		"Minestrone",
		"Pulled Pork",
		"Chicken Tortilla Soup",
		"Chili",
		"Potato Soup",
		"Ham and Beans",
		"Chicken and Dumplings",
		"Slow Cooked Ham",
		"Chicken Noodle Soup",
		"Hawaiin Chicken",
		"Gumbo",
	],
	count: 1,
};
foodTypes["Miscellaneous"] = {
	options: [
		"Breakfast Burritos",
		"Fish",
		"Quiche Cups",
		"Flatbread Pizza",
		"Order Takeout",
		"Fried Rice",
		"Subs",
	],
	count: 2,
};

var entry;
var foods = [];
var dialogs = [];
var initialized = false;
var counts = [];

$(function(){

	if(window.innerWidth < 420){
		$("#container").width(window.innerWidth * .95);
	}

	var i = 0
	Object.keys(foodTypes).forEach(function(key){
		counts[i] = foodTypes[key].count;
		i++
	});

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
			dialogs[foods.length+2] = {
				text: "Reset the whole week",
				click: function() {
					reset();
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
				dialogClass: "dialog",
				title: "What are you in the mood for?",
				width: w,
				buttons: dialogs
			});
			$("#dialog.ui-dialog-content.ui-widget-content").hide();
			$("div.dialog").css("top", 30);
			$(".ui-dialog-buttonset button, .ui-dialog-titlebar").addClass("background");
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
			var x = $(".day").eq(i);
			var h = x.height();// - parseInt(x.css("border-top"));
			$(".cal").eq(i).height(h);
			$("#container button").eq(i).height(h);
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

function reset(){
	var i = 0
	Object.keys(foodTypes).forEach(function(key){
		foodTypes[key].count = counts[i];
		i++;
	});
	for(var i=0; i<entry.length; i++){
		generate(i);
	}
}