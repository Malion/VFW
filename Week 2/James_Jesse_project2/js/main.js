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

//Capture Past Data


//console.log values
var getCatergory = function(){
	localStorage.setItem("Game Catergory", gameCatergory.value);
};
var getName = function(){
	localStorage.setItem("Game Name", gameName.value);
};
var getPublisher = function(){
	localStorage.setItem("Game Publisher", gamePublisher.value);
};
var getRelease = function(){
	localStorage.setItem("Game Release Date", gameRelease.value);
};
var getRate = function(){
	localStorage.setItem("Game Rating", gameRate.value);
};
var getConsole = function(){
	var consoleList = [];
	for(i=0, j=gameConsole.length; i<j; i++) {
		if(gameConsole[i].checked){
			consoleList.push(gameConsole[i].value);
		}
	}
	localStorage.setItem("Game Console(s)", consoleList);
};
var getComments = function(){
	localStorage.setItem("Comments", comments.value);
};
//Event Listeners
gameCatergory.addEventListener("blur", getCatergory);
gameName.addEventListener("blur", getName);
gamePublisher.addEventListener("blur", getPublisher);
gameRelease.addEventListener("change", getRelease);
gameRate.addEventListener("change", getRate);
submitButton.addEventListener("click", getConsole);
comments.addEventListener("blur", getComments);

for (i=0; i<localStorage.length; i++){
	var theKey = localStorage.key(i);
	var theValue = localStorage.getItem(theKey);
	console.log(theKey + ": " + theValue)
}