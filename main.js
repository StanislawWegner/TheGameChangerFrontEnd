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
const gamesForTypBtn = document.querySelector(".gamesForTypBtn");
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
const deleteOneTypeAlertText = document.querySelector(
	".deleteOneTypeAlertText"
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
		showGameAlert("Wpisz nazwę i gatunek dla nowej gry");
	} else {
		fetch(`https://thegamechanger.azurewebsites.net/game/newGame`, {
			method: "POST",
			credentials: "same-origin",
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
		showGameAlert("Wpisz nazwę i gatunek gry, którą chcesz usunąć");
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
		showGameAlert("Wpisz tytuł szukanej gry");
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
	inputGameType.value = "";
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

const showGameAlert = (text) => {
	gameAlert.textContent = text;
	gameAlert.style.display = "block";
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
				retrunAllTypes(i + 1, data[i].name);
			}
		});

	clearInputs();
};

const retrunAllTypes = (number, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr:</span> ${number} --- <span>Gatunek:</span> ${type} <span>`;
	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const addNewType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		showTypeAlert("Wpisz nazwę nowego gatunku gry");
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
		showTypeAlert("Wpisz gatunek szukanej gry");
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/type/typeName/${inputGameType.value}`
		)
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 404) {
					typeAlert.textContent = obj.body.error;
					typeAlert.style.display = "block";
				} else {
					returnTypeByName(obj.body.name);
				}
			});
	}
	clearInputs();
};

const returnTypeByName = (name) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Gatunek:</span> ${name}  --- <span>`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const deleteAllGamesRelatedToOneType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		showTypeAlert("Wpisz gatunek gry, który chcesz usunąć");
	} else if (inputGameType.value !== "") {
		fetch(
			`https://thegamechanger.azurewebsites.net/type/gameQuantity/${inputGameType.value}`
		)
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 404) {
					showTypeAlert(obj.body.error);
				} else if (obj.body === 1) {
					const text = `Gatunek: ${inputGameType.value}, jest powiązany z 1 grą. Usunięcie go usunie również powiązaną grę.`;
					showDeleteOneTypeWindow(text);
				} else if (obj.body > 1) {
					const text = `Gatunek: ${inputGameType.value}, jest powiązany z ${obj.body} grami. Usunięcie go usunie również wszystkie powiązane gry.`;
					showDeleteOneTypeWindow(text);
				} else {
					deleteOneType();
				}
			});
	}
};

const deleteOneType = () => {
	fetch(
		`https://thegamechanger.azurewebsites.net/type/deleteOneType/${inputGameType.value}`,
		{
			method: "DELETE",
		}
	);

	cancelDeleteOneTypeWindow();
	clearInputs();
};

const getAllGamesForOneType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		showTypeAlert("Wpisz gatunek, aby sprawdzić ile ma przypisanych gier");
	} else if (inputGameType.value !== "") {
		fetch(
			`https://thegamechanger.azurewebsites.net/type/gameList/${inputGameType.value}`
		)
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 404) {
					showTypeAlert(obj.body.error);
				} else {
					for (let i = 0; i < obj.body.length; i++) {
						returnAllGamesForOneType(i + 1, obj.body[i].name, obj.body[i].type);
					}
				}
				clearInputs();
			});
	}
};

const returnAllGamesForOneType = (number, name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr</span>: ${number} --- <span>Tytuł:</span> ${name}  --- <span>Gatunek:</span> ${type}`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const cancelDeleteOneTypeWindow = () => {
	deleteOneTypeAlert.classList.remove("showDeleteOneTypeWindow");
	shadowImageForAlert.style.display = "none";
};

const deleteAllTypesWindow = () => {
	showDeleteAllWindow();
	deleteAllAlert.classList.remove("showDeleteAllGamesAlert");
	deleteAllAlertText.textContent =
		"Na pewno chcesz usunąć wszystkie gatunki gier?";
	deleteAllAlert.classList.add("showDeleteAllTypesAlert");
};

const showDeleteOneTypeWindow = (text) => {
	shadowImageForAlert.style.display = "block";
	deleteOneTypeAlert.classList.add("showDeleteOneTypeWindow");
	deleteOneTypeAlertText.textContent = text;
};

const showTypeAlert = (text) => {
	typeAlert.textContent = text;
	typeAlert.style.display = "block";
};

getAllTypesBtn.addEventListener("click", getAllTypes);
addTypeBtn.addEventListener("click", addNewType);
findTypeBtn.addEventListener("click", findTypeByName);
deleteTypeBtn.addEventListener("click", deleteAllGamesRelatedToOneType);
deleteAllTypesBtn.addEventListener("click", deleteAllTypesWindow);
cancelAlertDeleteOneTypeBtn.addEventListener(
	"click",
	cancelDeleteOneTypeWindow
);
confirmAlertDeleteOneTypeBtn.addEventListener("click", deleteOneType);
gamesForTypBtn.addEventListener("click", getAllGamesForOneType);
