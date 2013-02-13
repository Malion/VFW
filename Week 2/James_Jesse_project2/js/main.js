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
var getCatergory = function(){
	var cat = gameCatergory.value;
	return(cat);
};
var getName = function(){
	var nam = gameName.value;
	return(nam);
};
var getPublisher = function(){
	var pub = gamePublisher.value;
	return(pub);
};
var getRelease = function(){
	var rel = gameRelease.value;
	return(rel);
};
var getRate = function(){
	var rat = gameRate.value;
	return(rat);
};
var getConsole = function(){
	var con = [];
	for(i=0, j=gameConsole.length; i<j; i++) {
		if(gameConsole[i].checked){
			con.push(gameConsole[i].value);
		}
	}
	return(con);
};
var getComments = function(){
	var com = comments.value;
	return(com);
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
	newType.comments = ["Comments : ", comments.value];
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
	}
	toggle("on");
	var newDiv = document.createElement("ul");
	newDiv.setAttribute("id", "list");
	newDiv.setAttribute("display", "block");
	document.body.appendChild(newDiv);
	for(i=0, len=localStorage.length; i<len; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var newObj = JSON.parse(value);
		for(var n in newObj) {
			var newLi = document.createElement("li");
			newDiv.appendChild(newLi);
			var newText = newObj[n][0]+" "+newObj[n][1];
			newLi.innerHTML = newText;
		}
	}
};
//Event Listeners
var cat = submitButton.addEventListener("click", getCatergory);
var nam = submitButton.addEventListener("click", getName);
var pub = submitButton.addEventListener("click", getPublisher);
var rel = submitButton.addEventListener("click", getRelease);
var rat = submitButton.addEventListener("click", getRate);
var con = submitButton.addEventListener("click", getConsole);
var com = submitButton.addEventListener("click", getComments);
//Button and Link Listners
clearData.addEventListener("click", deleteLocalStorage);
displayData.addEventListener("click", displayLocalStorage);
submitButton.addEventListener("click", saveGame);