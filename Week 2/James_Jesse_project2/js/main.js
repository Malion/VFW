// Jesse James
// 2-11-2013
// VFW Project 2 1302
//Wait for DOM to load
window.addEventListener("DOMContentLoaded",function(){
	//Global Variables
	function $(x){
		var elements = document.getElementById(x);
		return elements;
	};
	var gameCatergoryTypes = ["Catergory", "Action", "Adventure", "First Person Shooter", "Racing","Role-Playing", "Strategy"];
	//Create Game Catergory List
	function makeCatergoryList(){
		var addGameForm = document.getElementsByTagName("form");
			gameCatergoryLi = $("gameCatergoryList");
			makeElement = document.createElement("select");
			makeElement.setAttribute("id","gameCatergory");
		for(i=0; i<gameCatergoryTypes.length; i++){
			var createOption = document.createElement("option");
			var optionType = gameCatergoryTypes[i];
			createOption.setAttribute("value", optionType);
			createOption.innerHTML = optionType;
			makeElement.appendChild(createOption);
		}
		gameCatergoryLi.appendChild(makeElement);
	}
	makeCatergoryList();
	//Input ID's
	var gameCatergory = $("gameCatergory");
	var gameName = document.getElementById("gameName");
	var gamePublisher = document.getElementById("gamePublisher");
	var gameRelease = document.getElementById("gameRelease");
	var gameRate = document.getElementById("gameRate");
	var gameConsole = document.getElementById("gameReviewForm").console;
	var comments = document.getElementById("comments");
	var clearData = document.getElementById("clearData");
	var displayData = document.getElementById("displayData");
	var submitButton = document.getElementById("submitButton");
	var types = [gameCatergory, gameName, gamePublisher, gameRelease, gameRate, gameConsole, comments];
	var types2 = ["Game Catergory: ", "Game Name: ", "Game Publisher: ", "Game Release: ", "Game Rate: ", "Game Console: ", "Comments: "];
	//Toggle
	function toggle(n) {
		switch (n) {
			case "on":
				var back = document.createElement("a");
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
			case "off":
				document.getElementById("addItemField").removeAttribute("display", "block");
		};
	};
	//Populate form loop
	var populateForm = function () {
		for (i = 0; i<types2.length; i++) {
			var key = types2[i];
			var value = localStorage.getItem(key);
			if (value != undefined) {
				types[i].value = value;
			};
		};
	};
	// Get Value Functions
	var getCatergory = function () {
		localStorage.setItem("Game Catergory: ", gameCatergory.value);
	};
	var getName = function () {
		localStorage.setItem("Game Name: ", gameName.value);
	};
	var getPublisher = function () {
		localStorage.setItem("Game Publisher: ", gamePublisher.value);
	};
	var getRelease = function () {
		localStorage.setItem("Game Release: ", gameRelease.value);
	};
	var getRate = function () {
		var label = document.getElementById("ratingLabel");
		label.innerHTML = "Game Rating(0-10): " + gameRate.value;
		localStorage.setItem("Game Rate: ", gameRate.value);
	};
	var getConsole = function () {
		var con = [];
		for (i = 0; i < gameConsole.length; i++) {
			if (gameConsole[i].checked) {
				con.push(gameConsole[i].value);
			};
		};
		localStorage.setItem("Game Console: ", con);
		return (con);
	};
	var getComments = function () {
		localStorage.setItem("Comments: ", comments.value);
	};
	//Form Validation
	var formValid = function(){
		if(gameCatergory.value == "" || gameCatergory.value == "Catergory"){
			alert("Please enter a catergory!");
			gameCatergory.focus();
			return false;
		}
		if(gameName.value == ""){
			alert("Please enter a game name!");
			gameName.focus();
			return false;
		}
		if(gamePublisher.value == ""){
			alert("Please enter a Publisher!");
			gamePublisher.focus();
			return false;
		}
		if(gameRelease.value == ""){
			alert("Please enter a release date!");
			gameRelease.focus();
			return false;
		}
		if(gameRate.value == ""){
			alert("Please enter a rating!");
			gameRate.focus();
			return false;
		}
		if(gameConsole.xbox360.checked || gameConsole.ps3.checked || gameConsole.wii.checked){
		}else{
			alert("Please select a console!");
			return false;
		}
		return true;
	}
	//Save Data
	function saveGame() {
		if(formValid() === true){
			var newId = Math.floor(Math.random() * 1000000001);
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
			localStorage.removeItem("Game Catergory: ");
			localStorage.removeItem("Game Name: ");
			localStorage.removeItem("Game Publisher: ");
			localStorage.removeItem("Game Release: ");
			localStorage.removeItem("Game Rate: ");
			localStorage.removeItem("Game Console: ");
			localStorage.removeItem("Comments: ");
			location.reload();
			return;
		};
	};
	//Delete Local Storage
	function deleteLocalStorage() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!");
		} else {
			localStorage.clear();
			alert("All data has been deleted");
			window.location.reload();
			return false;
		}
	}
	//Display Data
	function displayLocalStorage() {
		if (isNaN(localStorage.key(0)) || localStorage.length === 0) {
			alert("There are no saved reviews!");
			return;
		};
		toggle("on");
		for (i=0; i<localStorage.length; i++) {
			if(isNaN(localStorage.key(i))){
			}else{
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var newObj = JSON.parse(value);
				var newDiv = document.createElement("ul");
				newDiv.setAttribute("class", "displayDataList");
				newDiv.setAttribute("display", "block");
				document.body.appendChild(newDiv);
				for (var o in newObj) {
					var newLi = document.createElement("li");
					newLi.setAttribute("class", o);
					newDiv.appendChild(newLi);
					var newText = newObj[o][0] + " " + newObj[o][1];
					newLi.innerHTML = newText;
				};
			};
		};
	};
	//Populate past data
	populateForm();
	//Event Listeners
	gameCatergory.addEventListener("blur", getCatergory);
	gameName.addEventListener("blur", getName);
	gamePublisher.addEventListener("blur", getPublisher);
	gameRelease.addEventListener("blur", getRelease);
	gameRate.addEventListener("change", getRate);
	submitButton.addEventListener("click", getConsole);
	comments.addEventListener("blur", getComments);
	//Button and Link Listners
	clearData.addEventListener("click", deleteLocalStorage);
	displayData.addEventListener("click", displayLocalStorage);
	submitButton.addEventListener("click", saveGame);
});