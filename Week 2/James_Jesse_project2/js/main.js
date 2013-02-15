// Jesse James
// 2-11-2013
// VFW Project 2 1302

//Global Variables
var gameCatergory = document.getElementById("gameCatergory");
var gameName = document.getElementById("gameName");
var gamePublisher = document.getElementById("gamePublisher");
var gameRelease = document.getElementById("gameRelease");
var gameRate = document.getElementById("gameRate");
var gameConsole = document.getElementById("gameReviewForm").console;
var comments = document.getElementById("comments");
var clearData = document.getElementById("clearData");
var displayData = document.getElementById("displayData");
var submitButton = document.getElementById("submitButton");
//Toggle
function toggle(n){
	switch(n){
		case"on":
			var back = document.createElement("a")
			back.setAttribute("href", "additem.html");
			back.setAttribute("id", "back");
			document.body.appendChild(back);
			back.innerHTML = "Back";
			var clear = document.createElement("a");
			clear.setAttribute("href", "#");
			clear.setAttribute("id", "clearData2");
			document.body.appendChild(clear);
			clear.innerHTML = "Clear Data";
			var displayClear = document.getElementById("clearData2");
			displayClear.addEventListener("click", deleteLocalStorage);
			document.getElementById("addItemField").style.display = "none";
			document.getElementById("clearData").style.display = "none";
			document.getElementById("displayData").style.display = "none";
			document.getElementById("submitButton").hidden = "hidden";
			document.getElementById("addGameReview").innerHTML = "Game List";
		case"off":
			document.getElementById("addItemField").removeAttribute("display", "block");
	}	
}
//Get value functions
var populateFormCatergory = function(){
	var gameCatergoryKey = localStorage.key("gameCatergory");
	var gameCatergoryValue = localStorage.getItem(gameCatergoryKey);
	gameCatergory.value = gameCatergoryValue;
};
var populateFormName = function(){
	var gameNameKey = localStorage.key("gameName");
	var gameNameValue = localStorage.getItem(gameNameKey);
	gameName.value = gameNameValue;
};
var populateFormPublisher = function(){
	var gamePublisherKey = localStorage.key("gamePublisher");
	var gamePublisherValue = localStorage.getItem(gamePublisherKey);
	gamePublisher.value = gamePublisherValue;
};
var populateFormRelease = function(){
	var gameReleaseKey = localStorage.key("gameRelease");
	var gameReleaseValue = localStorage.getItem(gameReleaseKey);
	gameRelease.value = gameReleaseValue;
};
var populateFormRate = function(){
	var gameRateKey = localStorage.key("gameRate");
	var gameRateValue = localStorage.getItem(gameRateKey);
	gameRate.value = gameRateValue;
};
var populateFormConsole = function(){
	var gameConsoleKey = localStorage.key("gameConsole");
	var gameConsoleValue = localStorage.getItem(gameConsoleKey);
	gameConsole.value = gameConsoleValue;
};
var populateFormComments = function(){
	var commentsKey = localStorage.key("comments");
	var commentsValue = localStorage.getItem(commentsKey);
	comments.value = commentsValue;
};
populateFormCatergory();
populateFormName();
populateFormPublisher();
populateFormRelease();
populateFormRate();
populateFormConsole();
populateFormComments();

var getCatergory = function(){
	localStorage.setItem("gameCatergory", gameCatergory.value);
	console.log(gameCatergory.value);
};
var getName = function(){
	localStorage.setItem("gameName", gameName.value);
	console.log(gameName.value);
};
var getPublisher = function(){
	localStorage.setItem("gamePublisher", gamePublisher.value);
	console.log(gamePublisher.value);
};
var getRelease = function(){
	localStorage.setItem("gameRelease", gameRelease.value);
	console.log(gameRelease.value);
};
var getRate = function(){
	var label = document.getElementById("ratingLabel");
	label.innerHTML = "Game Rating(0-10): " + gameRate.value;
	localStorage.setItem("gameRate", gameRate.value);
};
var getConsole = function(){
	var con = [];
	for(i=0; i<gameConsole.length; i++) {
		if(gameConsole[i].checked){
			con.push(gameConsole[i].value);
			console.log(gameConsole[i].value);
		}
	}
	localStorage.setItem("gameConsole", con);
	return(con);
};
var getComments = function(){
	localStorage.setItem("comments", comments.value);
	console.log(comments.value);
};
//Save Data
function saveGame(){
	var newId = Math.floor(Math.random()*1000000001)
	var newType = {};
	newType.catergory = ["Game Catergory: ", gameCatergory.value];
	newType.name = ["Game Name: ", gameName.value];
	newType.publisher = ["Game Publisher: ", gamePublisher.value];
	newType.release = ["Game Release: ", gameRelease.value];
	newType.rate = ["Game Rating: ", gameRate.value];
	newType.console = ["Game Console: ", getConsole()];
	newType.comments = ["Comments: ", comments.value];
	localStorage.setItem(newId, JSON.stringify(newType));
	alert(gameName.value + " Game Review Added!");
};
//Delete Local Storage
function deleteLocalStorage(){
	if(localStorage.length === 0){
		alert("There is no data to clear!");
	} else {
		localStorage.clear();
		alert("All data has been deleted");
		window.location.reload();
		return false;
	}
}
//Display Data
function displayLocalStorage(){
	if(localStorage.length === 0){
		alert("There are no saved reviews!");
		return;
	};
	toggle("on");
	for(var n in localStorage){
		var newObj = JSON.parse(localStorage[n]);
		var newDiv = document.createElement("ul");
		newDiv.setAttribute("class", "displayDataList");
		newDiv.setAttribute("display", "block");
		document.body.appendChild(newDiv);
		for(var n in newObj) {
			var newLi = document.createElement("li");
			newLi.setAttribute("class", n);
			newDiv.appendChild(newLi);
			var newText = newObj[n][0]+" "+newObj[n][1];
			newLi.innerHTML = newText;
		};
		
	};
};
//Event Listeners
gameCatergory.addEventListener("blur", getCatergory);
gameName.addEventListener("blur", getName);
gamePublisher.addEventListener("blur", getPublisher);
gameRelease.addEventListener("blur", getRelease);
gameRate.addEventListener("change", getRate);
submitButton.addEventListener("click", getConsole());
comments.addEventListener("blur", getComments);
//Button and Link Listners
clearData.addEventListener("click", deleteLocalStorage);
displayData.addEventListener("click", displayLocalStorage);
submitButton.addEventListener("click", saveGame);
