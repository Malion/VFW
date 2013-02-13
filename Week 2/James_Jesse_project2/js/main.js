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
//Capture Past Data


//Toggle
function toggle(n){
	switch(n){
		case"on":
			document.getElementById("addItemField").style.display = "none";
			document.getElementById("clearData").style.display = "none";
			document.getElementById("displayData").style.display = "none";
			document.getElementById("submitButton").hidden = "hidden";
		case"off":
			document.getElementById("addItemField").removeAttribute("display", "block");
	}	
}

//console.log values

var getCatergory = function(){
	console.log(gameCatergory.value);
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
/*
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
*/
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
	var newDiv = document.createElement("ol");
	newDiv.setAttribute("id", "list");
	newDiv.setAttribute("display", "block");
	var newList = document.createElement("ul");
	newDiv.appendChild(newList);
	document.body.appendChild(newDiv);
	for(i=0, len=localStorage.length; i<len; i++){
		var newLi = document.createElement("ol");
		newList.appendChild(newLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		console.log(value)
		var newObj = JSON.parse(value);
		var newSubUl = document.createElement("ul");
		newLi.appendChild(newSubUl);
		for(var n in newObj) {
			var newSubLi = document.createElement("li");
			newSubUl.appendChild(newSubLi);
			var newText = newObj[n][0]+" "+newObj[n][1];
			newSubLi.innerHTML = newText;
		}
		var back = document.createElement("input");
		back.setAttribute("type", "button");
		back.setAttribute("id", "back");
		back.setAttribute("value", "Back");
		back
	}
};
//Event Listeners

var cat = gameCatergory.addEventListener("blur", getCatergory);
var nam = gameName.addEventListener("blur", getName);
var pub = gamePublisher.addEventListener("blur", getPublisher);
var rel = gameRelease.addEventListener("change", getRelease);
var rat = gameRate.addEventListener("change", getRate);
var con = submitButton.addEventListener("click", getConsole);
var com = comments.addEventListener("blur", getComments);
clearData.addEventListener("click", deleteLocalStorage);
displayData.addEventListener("click", displayLocalStorage);

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
}
/*
for (i=0; i<localStorage.length; i++){
	var theKey = localStorage.key(i);
	var theValue = localStorage.getItem(theKey);
	console.log(theKey + ": " + theValue)
}
*/
submitButton.addEventListener("click", saveGame);