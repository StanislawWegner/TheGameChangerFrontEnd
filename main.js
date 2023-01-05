const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");
const listOfTypes = document.querySelector(".listOfTypes");

const allButtons = document.querySelectorAll("button");
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");
const findGameBtn = document.querySelector(".find-game");
const deleteAllGamesBtn = document.querySelector(".deleteAllGames");

const addTypeBtn = document.querySelector(".add-type");
const findTypeBtn = document.querySelector(".find-type");
const deleteTypeBtn = document.querySelector(".delete-type");
const deleteAllTypesBtn = document.querySelector(".deleteAllTypes");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inputGameType = document.querySelector("#gameType");

const ulListGames = document.querySelector(".ulListGames");
const ulListTypes = document.querySelector(".ulListTypes");

const gameAlert = document.querySelector(".gameAlert");
const typeAlert = document.querySelector(".typeAlert");

const deleteAllAlert = document.querySelector(".deleteAllAlert");
const shadowImageForAlert = document.querySelector(".shadowImageForAlert");
const confirmAlertDeleteAllBtn = document.querySelector(
	".confirmAlertDeleteAll"
);
const cancelAlertDeleteAllBtn = document.querySelector(".cancelAlertDeleteAll");
const deleteAllAlertText = document.querySelector(".deleteAllAlertText");

const deleteOneTypeAlert = document.querySelector(".deleteOneTypeAlert");
const confirmAlertDeleteOneTypeBtn = document.querySelector(
	".confirmAlertDeleteOneType"
);
const cancelAlertDeleteOneTypeBtn = document.querySelector(
	".cancelAlertDeleteOneType"
);

const getAllGames = () => {
	clearListsAndAlerts();

	fetch("https://thegamechanger.azurewebsites.net/game")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				returnAllGames(i + 1, data[i].name, data[i].type);
			}
		});

	clearInputs();
};

const returnAllGames = (number, name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr</span>: ${number} --- <span>Tytuł:</span> ${name}  --- <span>Gatunek:</span> ${type}`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

const addNewGame = () => {
	clearListsAndAlerts();

	if (inputGameName.value === "" || inputTypeId.value === "") {
		gameAlert.textContent = "Wpisz nazwę i gatunek dla nowej gry";
		gameAlert.style.display = "block";
	} else {
		fetch(`https://thegamechanger.azurewebsites.net/game/newGame`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputGameName.value}`,
				type: `${inputTypeId.value}`,
			}),
		});
	}

	clearInputs();
};

const deleteGame = () => {
	clearListsAndAlerts();

	if (inputGameName.value === "" || inputTypeId.value === "") {
		gameAlert.textContent = "Wpisz nazwę i gatunek gry, którą chcesz usunąć";
		gameAlert.style.display = "block";
	} else {
		fetch(`https://thegamechanger.azurewebsites.net/game/deleteOneGame`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputGameName.value}`,
				type: `${inputTypeId.value}`,
			}),
		});
	}
	clearInputs();
};

const findGameByName = () => {
	clearListsAndAlerts();

	if (inputGameName.value === "") {
		gameAlert.textContent = "Wpisz tytuł szukanej gry";
		gameAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/game/gameName/${inputGameName.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				returnGameByName(data.name, data.type);
			});
	}

	clearInputs();
};

const returnGameByName = (name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Tytuł:</span> ${name}  --- <span>Gatunek:</span> ${type} -`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

const clearListsAndAlerts = () => {
	ulListGames.innerHTML = "";
	listOfGames.style.display = "none";
	gameAlert.style.display = "none";
	typeAlert.style.display = "none";
	ulListTypes.innerHTML = "";
	listOfTypes.style.display = "none";
};

const clearInputs = () => {
	inputGameName.value = "";
	inputTypeId.value = "";
	if(!deleteOneTypeAlert.classList.contains("showDeleteOneTypeWindow")){
		inputGameType.value = "";
	}
};

const showDeleteAllWindow = () => {
	clearListsAndAlerts();
	clearInputs();
	shadowImageForAlert.style.display = "block";
};

const deleteAllGamesWindow = () => {
	showDeleteAllWindow();
	deleteAllAlert.classList.remove("showDeleteAllTypesAlert");
	deleteAllAlertText.textContent = "Na pewno chcesz usunąć wszystkie gry?";
	deleteAllAlert.classList.add("showDeleteAllGamesAlert");
};

const cancelDeleteAllWindow = () => {
	deleteAllAlert.classList.remove("showDeleteAllGamesAlert");
	deleteAllAlert.classList.remove("showDeleteAllTypesAlert");
	shadowImageForAlert.style.display = "none";
};

const deleteAllGamesOrTypes = () => {
	if (deleteAllAlert.classList.contains("showDeleteAllGamesAlert")) {
		fetch("https://thegamechanger.azurewebsites.net/game/deleteAll", {
			method: "DELETE",
		});
	} else if (deleteAllAlert.classList.contains("showDeleteAllTypesAlert")) {
		fetch("https://thegamechanger.azurewebsites.net/genre/deleteAll", {
			method: "DELETE",
		});
	}

	cancelDeleteAllWindow();
};

getAllGamesBtn.addEventListener("click", getAllGames);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener("click", deleteGame);
findGameBtn.addEventListener("click", findGameByName);
deleteAllGamesBtn.addEventListener("click", deleteAllGamesWindow);
cancelAlertDeleteAllBtn.addEventListener("click", cancelDeleteAllWindow);
confirmAlertDeleteAllBtn.addEventListener("click", deleteAllGamesOrTypes);

// Type Of Game Functions
//
//
//
//
//
//
//
//
//
//
//

const getAllTypes = () => {
	clearListsAndAlerts();

	fetch("https://thegamechanger.azurewebsites.net/type")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				retrunAllTypes(i + 1, data[i].name, data[i].id);
			}
		});

	clearInputs();
};

const retrunAllTypes = (number, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr:</span> ${number} --- <span>Gatunek:</span> ${type} --- <span>`;
	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const addNewType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz nazwę nowego gatunku gry";
		typeAlert.style.display = "block";
	}

	fetch(`https://thegamechanger.azurewebsites.net/type`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: `${inputGameType.value}`,
		}),
	});

	clearInputs();
};

const findTypeByName = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz gatunek szukanej gry";
		typeAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/type/typeName/${inputGameType.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				returnTypeByName(data.name, data.id);
			});
	}

	clearInputs();
};

const returnTypeByName = (name, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Gatunek:</span> ${name}  --- <span>`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const deleteOneType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz gatunek gry, który chcesz usunąć";
		typeAlert.style.display = "block";
	} else if (inputGameType.value !== "") {
		deleteOneTypeAlert.classList.add("showDeleteOneTypeWindow");
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/type/deleteOneType/${inputGameType.value}`,
			{
				method: "DELETE",
			}
		);
	}
	clearInputs();
};

const cancelDeleteOneTypeWindow = () => {
	deleteOneTypeAlert.classList.remove("showDeleteOneTypeWindow");
};

const deleteAllTypesWindow = () => {
	showDeleteAllWindow();
	deleteAllAlert.classList.remove("showDeleteAllGamesAlert");
	deleteAllAlertText.textContent =
		"Na pewno chcesz usunąć wszystkie gatunki gier?";
	deleteAllAlert.classList.add("showDeleteAllTypesAlert");
};

getAllTypesBtn.addEventListener("click", getAllTypes);
addTypeBtn.addEventListener("click", addNewType);
findTypeBtn.addEventListener("click", findTypeByName);
deleteTypeBtn.addEventListener("click", deleteOneType);
deleteAllTypesBtn.addEventListener("click", deleteAllTypesWindow);
cancelAlertDeleteOneTypeBtn.addEventListener(
	"click",
	cancelDeleteOneTypeWindow
);
