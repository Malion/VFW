// Jesse James
// 3-2-2013
// VFW Project 4 1302
//Wait for DOM to load
window.addEventListener("DOMContentLoaded",function(){
	//Global Variables
	function $(x){
		var elements = document.getElementById(x);
		return elements;
	};
	var gameCatergoryTypes = ["Catergory", "Action", "Adventure", "First Person Shooter", "Racing","Role-Playing"];
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
	var gameName = $("gameName");
	var gamePublisher = $("gamePublisher");
	var gameRelease = $("gameRelease");
	var gameRate = $("gameRate");
	var gameConsole = $("gameReviewForm").console;
	var comments = $("comments");
	var clearData = $("clearData");
	var displayData = $("displayData");
	var submitButton = $("submitButton");
	var types = [gameCatergory, gameName, gamePublisher, gameRelease, gameRate, gameConsole, comments];
	var types2 = ["Game Catergory: ", "Game Name: ", "Game Publisher: ", "Game Release: ", "Game Rate: ", "Game Console: ", "Comments: "];
	//Toggle
	function toggleDisplay(n) {
		switch (n) {
			case "on":
				var back = document.createElement("a");
				back.setAttribute("href", "additem.html");
				back.setAttribute("id", "back");
				document.body.appendChild(back);
				back.innerHTML = "Back";
				var clear = document.createElement("input");
				clear.setAttribute("type", "button");
				clear.setAttribute("id", "clearData2");
				clear.setAttribute("value", "Clear Data");
				document.body.appendChild(clear);
				var displayClear = document.getElementById("clearData2");
				displayClear.addEventListener("click", deleteLocalStorage);
				if($("editButton") === null || $("editButton") === undefined){
				} else {
					var thisEditButton = $("editButton")
					document.body.removeChild(thisEditButton);
				}
				$("addItemField").style.display = "none";
				$("clearData").style.display = "none";
				$("displayData").style.display = "none";
				$("submitButton").hidden = "hidden";
				$("addGameReview").innerHTML = "Game List";
				break;
			case "off":
				var backButton = $("back");
				var clearButton2 = $("clearData2");
				document.body.removeChild(backButton);
				document.body.removeChild(clearButton2);
				$("addItemField").removeAttribute("style");
				$("displayData").removeAttribute("style");
				$("submitButton").removeAttribute("hidden");
				$("addGameReview").innerHTML = "Add A Game Review";
				$("clearData").style.display = "";
				for(i=0; i<document.getElementsByClassName("displayDataList").length; i++){
					document.getElementsByClassName("displayDataList")[i].style.display = "none";
				}
				break;
			default:
				return false;
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
	// Add Thumbnail to Display
	function thumbnail(){
		
	}
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
		label.innerHTML = "Game Rating(0-10):";
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
		if(xbox360.checked || ps3.checked || wii.checked){
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
	//Edit Entry Function
	function editThis() {
		var myConfirm = confirm("Do you want to edit this review?");
		if(myConfirm === true){
			toggleDisplay("off")
			var thisValue = localStorage.getItem(this.key);
			var thisObj = JSON.parse(thisValue);
			gameCatergory.value = thisObj.catergory[1];
			gameName.value = thisObj.name[1];
			gamePublisher.value = thisObj.publisher[1];
			gameRelease.value = thisObj.release[1];
			gameRate.value = thisObj.rate[1];
			//var gameConsoles = document.forms.gameReviewForm[0].console;
			for(i=0; i<gameConsole.length; i++){
				if(thisObj.console[1][i] === "Xbox 360"){
					gameConsole[0].setAttribute("checked", "checked")
				} else if(thisObj.console[1][i] === "Playstation 3") {
					gameConsole[1].setAttribute("checked", "checked")
				} else if(thisObj.console[1][i] === "Wii") {
					gameConsole[2].setAttribute("checked","checked")
				}
			}
			comments.value = thisObj.comments[1];
			//localStorage.removeItem(this.key);
			getRate();
			submitButton.style.display = "none";
			var editButton = document.createElement("input");
			editButton.key = this.key;
			editButton.setAttribute("id","editButton");
			editButton.setAttribute("type","button");
			editButton.setAttribute("value","Edit Review");
			editButton.setAttribute("name","Edit Button");
			document.body.appendChild(editButton);
			editButton.addEventListener("click", editThisReview);
		} else {
			return;
		};
	};
	//Edit review save data
	function editThisReview(){
		if(formValid() === true){
			var newId = this.key
			var newType = {};
			newType.catergory = ["Game Catergory: ", gameCatergory.value];
			newType.name = ["Game Name: ", gameName.value];
			newType.publisher = ["Game Publisher: ", gamePublisher.value];
			newType.release = ["Game Release: ", gameRelease.value];
			newType.rate = ["Game Rating: ", gameRate.value];
			newType.console = ["Game Console: ", getConsole()];
			newType.comments = ["Comments: ", comments.value];
			localStorage.setItem(newId, JSON.stringify(newType));
			alert(gameName.value + " Game Review Edited!");
			localStorage.removeItem("Game Catergory: ");
			localStorage.removeItem("Game Name: ");
			localStorage.removeItem("Game Publisher: ");
			localStorage.removeItem("Game Release: ");
			localStorage.removeItem("Game Rate: ");
			localStorage.removeItem("Game Console: ");
			localStorage.removeItem("Comments: ");
			editButton.style.display = "none";
			displayLocalStorage();
			return;
		}
	}
	//Delete Entry Function
	function deleteThis() {
		var thisConfirm = confirm("Are you sure you want to delete this entry?")
		if(thisConfirm){
			localStorage.removeItem(this.key);
			location.reload();
		} else {
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
	function listLinks(key, thisLi){
		//Delete Display Data Button
		var deleteLink = document.createElement("a");
		deleteLink.key = key;
		deleteLink.setAttribute("href","#");
		deleteLink.setAttribute("class","deleteEntry");
		deleteLink.setAttribute("title","deleteEntry");
		deleteLink.setAttribute("id","deleteEntry");
		thisLi.appendChild(deleteLink);
		deleteLink.innerHTML = "Delete Review";
		//Edit Display Link
		var editLink = document.createElement("a");
		editLink.key = key;
		editLink.setAttribute("href","#");
		editLink.setAttribute("class","editEntry");
		editLink.setAttribute("title","editEntry");
		editLink.setAttribute("id","editEntry");
		thisLi.appendChild(editLink);
		editLink.innerHTML = "Edit Review";
;
	}
	//Auto Fill Default Data
	function addDefaultData(){
		for(var n in json){
			var newId = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(newId, JSON.stringify(json[n]))
		}
	}
	//Add image to display list
	function addImage(catergory, thisLi){
		var newLi = document.createElement("li");
		thisLi.appendChild(newLi);
		var image = document.createElement("img");
		var sorce = image.setAttribute("src", "img/"+ catergory + ".png");
		image.setAttribute("class","image")
		newLi.appendChild(image);
	}
	//Display Data
	function displayLocalStorage() {
		if (isNaN(localStorage.key(0)) || localStorage.length === 0) {
			alert("There are no saved reviews so default reviews were added.");
			addDefaultData();
		};
		toggleDisplay("on");
		for (i=0; i<localStorage.length; i++) {
			if(isNaN(localStorage.key(i))){
			}else{
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var newObj = JSON.parse(value);
				var newDiv = document.createElement("ul");
				var thisLi = document.createElement("li");
				newDiv.setAttribute("id", "displayDataList");
				newDiv.setAttribute("class", "displayDataList");
				newDiv.setAttribute("display", "block");
				document.body.appendChild(newDiv);
				addImage(newObj.catergory[1], newDiv);
				for (var o in newObj) {
					var newLi = document.createElement("li");
					newLi.setAttribute("class", o);
					newDiv.appendChild(newLi);
					var newText = newObj[o][0] + " " + newObj[o][1];
					newLi.innerHTML = newText;
					newDiv.appendChild(thisLi);
				};
				listLinks(key, thisLi);
			};
		};
		//This is for the event listeners on the new links because it wouldnt work the other way.
		for(i=0; i<document.getElementsByClassName("displayDataList").length; i++){
					var eachDelete =document.getElementsByClassName("deleteEntry")[i];
					var eachEdit = document.getElementsByClassName("editEntry")[i];
					eachDelete.addEventListener("click", deleteThis);
					eachEdit.addEventListener("click", editThis);
				}
	};
	//Populate past data
	populateForm();
	getRate();
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