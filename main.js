const getAllGamesBtn = document.querySelector(".getAllGames");
const listOfGames = document.querySelector(".listOfGames");

const allButtons = document.querySelectorAll("button");
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");
const findGameBtn = document.querySelector(".find-game");
const updateGameBtn = document.querySelector(".updateGameBtn");
const deleteAllGamesBtn = document.querySelector(".deleteAllGames");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");

const ulListGames = document.querySelector(".ulListGames");

const gameAlert = document.querySelector(".gameAlert");

const deleteAllGamesAlert = document.querySelector(".deleteAllGamesAlert");
const shadowImageForAlert = document.querySelector(".shadowImageForAlert");
const confirmAlertDeleteAllGamesBtn = document.querySelector(
	".confirmAlertDeleteAllGames"
);
const cancelAlertDeleteAllGamesBtn = document.querySelector(
	".cancelAlertDeleteAllGames"
);

const updateGameAlertWindow = document.querySelector(
	".updateGameAlertWindow"
);

const cancelUpdateGameBtn = document.querySelector(".cancelUpdateGameBtn");
const inputOldGameName = document.querySelector(".inputOldGameName");
const inputNewGameName = document.querySelector(".inputNewGameName");
const saveUpdateGameBtn = document.querySelector(".saveUpdateGameBtn");
const updateGameAlert = document.querySelector(".updateGameAlert");

const getAllGames = () => {
	clearListsAndAlerts();

	fetch("https://thegamechanger.azurewebsites.net/game")
		.then((res) =>
			res.json().then((data) => ({ status: res.status, body: data }))
		)
		.then((obj) => {
			if (obj.status === 200) {
				for (let i = 0; i < obj.body.length; i++)
					returnAllGames(i + 1, obj.body[i].name, obj.body[i].type);
			} else {
				showGameAlert(obj.body.error);
			}
		})
		.catch((error) => showGameAlert(error));

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
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputGameName.value}`,
				type: `${inputTypeId.value}`,
			}),
		})
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 201) {
					showGameAlert("Nowa gra została dodana");
					returnGameByName(obj.body.name, obj.body.type);
				} else {
					showGameAlert(obj.body.error);
				}
			})
			.catch((error) => showGameAlert(error));
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
		})
			.then((res) => {
				if (res.status === 204) {
					showGameAlert(`Gra: "${inputGameName.value}", została usunięta.`);
				} else {
					res.json().then((data) => {
						showGameAlert(data.error);
					});
				}
				clearInputs();
			})
			.catch((error) => showGameAlert(error));
	}
};

const findGameByName = () => {
	clearListsAndAlerts();

	if (inputGameName.value === "") {
		showGameAlert("Wpisz tytuł szukanej gry");
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/game/gameName/${inputGameName.value}`
		)
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 200) {
					returnGameByName(obj.body.name, obj.body.type);
				} else {
					showGameAlert(obj.body.error);
				}
			})
			.catch((error) => showGameAlert(error));
	}

	clearInputs();
};

const returnGameByName = (name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Tytuł:</span> ${name}  --- <span>Gatunek:</span> ${type} -`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

const showUpdateGameNameWindow = () => {
	clearListsAndAlerts();
	clearInputs();
	shadowImageForAlert.style.display = "block";
	updateGameAlertWindow.classList.add("showUpdateGameWindow");
};

const saveUpdateGame = () => {
	if (inputOldGameName.value === "" || inputNewGameName.value === "") {
				showUpdateGameAlert("Wpisz obecną i nową nazwę");
	}
	else{
		fetch("https://thegamechanger.azurewebsites.net/game/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputOldGameName.value}`,
				newName: `${inputNewGameName.value}`,
			}),
		})
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 200) {
					returnGameByName(obj.body.name, obj.body.type);
					showGameAlert("Zaktualizowano nazwę gry");
					cancelUpdateGameWindow();
				} else {
					showUpdateGameAlert(obj.body.error);
				}
			})
			.catch((error) => showGameAlert(error));
	}
}



const showDeleteAllGamesWindow = () => {
	clearListsAndAlerts();
	clearInputs();
	shadowImageForAlert.style.display = "block";
	deleteAllGamesAlert.classList.add("showDeleteAllGamesAlert");
};

const deleteAllGames = () => {
	fetch("https://thegamechanger.azurewebsites.net/game/deleteAll", {
		method: "DELETE",
	})
		.then((res) => {
			if (res.status === 204) {
				showGameAlert("Wszystkie gry zostały usunięte");
			}
		})
		.catch((error) => showGameAlert(error));

	cancelDeleteAllGamesWindow();
};



const cancelUpdateGameWindow = () => {
	updateGameAlertWindow.classList.remove("showUpdateGameWindow");
	shadowImageForAlert.style.display = "none";
	updateGameAlert.style.display = "none";
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
	inputOldGameName.value = "";
	inputNewGameName.value = "";
	inputOldTypeName.value = "";
	inputNewTypeName.value = "";
};

const cancelDeleteAllGamesWindow = () => {
	deleteAllGamesAlert.classList.remove("showDeleteAllGamesAlert");
	shadowImageForAlert.style.display = "none";
};

const showGameAlert = (text) => {
	gameAlert.textContent = text;
	gameAlert.style.display = "block";
};

const showUpdateGameAlert = (text) => {
	updateGameAlert.textContent = text;
	updateGameAlert.style.display = "block";
};
getAllGamesBtn.addEventListener("click", getAllGames);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener("click", deleteGame);
findGameBtn.addEventListener("click", findGameByName);
deleteAllGamesBtn.addEventListener("click", showDeleteAllGamesWindow);
cancelAlertDeleteAllGamesBtn.addEventListener(
	"click",
	cancelDeleteAllGamesWindow
);
confirmAlertDeleteAllGamesBtn.addEventListener("click", deleteAllGames);
updateGameBtn.addEventListener("click", showUpdateGameNameWindow);
saveUpdateGameBtn.addEventListener("click", saveUpdateGame)
cancelUpdateGameBtn.addEventListener("click", cancelUpdateGameWindow);

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


const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfTypes = document.querySelector(".listOfTypes");

const addTypeBtn = document.querySelector(".add-type");
const findTypeBtn = document.querySelector(".find-type");
const deleteTypeBtn = document.querySelector(".delete-type");
const gamesForTypBtn = document.querySelector(".gamesForTypBtn");
const updateTypeBtn = document.querySelector(".updateTypeBtn");
const deleteAllTypesBtn = document.querySelector(".deleteAllTypes");

const inputGameType = document.querySelector("#gameType");

const ulListTypes = document.querySelector(".ulListTypes");

const typeAlert = document.querySelector(".typeAlert");

const deleteAllTypesAlert = document.querySelector(".deleteAllTypesAlert");
const confirmAlertDeleteAllTypesBtn = document.querySelector(
	".confirmAlertDeleteAllTypes"
);
const cancelAlertDeleteAllTypesBtn = document.querySelector(
	".cancelAlertDeleteAllTypes"
);

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

const updateTypeAlertWindow = document.querySelector(
	".updateTypeAlertWindow"
);

const cancelUpdateTypeBtn = document.querySelector(".cancelUpdateTypeBtn")
const inputOldTypeName = document.querySelector(".inputOldTypeName");
const inputNewTypeName = document.querySelector(".inputNewTypeName");
const saveUpdateTypeBtn = document.querySelector(".saveUpdateTypeBtn");
const updateTypeAlert = document.querySelector(".updateTypeAlert");

const getAllTypes = () => {
	clearListsAndAlerts();

	fetch("https://thegamechanger.azurewebsites.net/type")
		.then((res) =>
			res.json().then((data) => ({ status: res.status, body: data }))
		)
		.then((obj) => {
			if (obj.status === 200) {
				for (let i = 0; i < obj.body.length; i++)
					retrunAllTypes(i + 1, obj.body[i].name);
			} else {
				showTypeAlert(obj.body.error);
			}
		})
		.catch((error) => showTypeAlert(error));

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
	} else {
		fetch(`https://thegamechanger.azurewebsites.net/type`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputGameType.value}`,
			}),
		})
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 201) {
					showTypeAlert("Dodano nowy gatunek");
					returnTypeByName(obj.body.name);
				} else {
					showTypeAlert(obj.body.error);
				}
			})
			.catch((error) => showTypeAlert(error));
	}

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
					showTypeAlert(obj.body.error);
				} else {
					returnTypeByName(obj.body.name);
				}
			})
			.catch((error) => showTypeAlert(error));
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
				if (obj.body === 1) {
					const text = `Gatunek: "${inputGameType.value}", jest powiązany z 1 grą. Usunięcie go usunie również powiązaną grę.`;
					showDeleteOneTypeWindow(text);
				} else if (obj.body > 1) {
					const text = `Gatunek: "${inputGameType.value}", jest powiązany z ${obj.body} grami. Usunięcie go usunie również wszystkie powiązane gry.`;
					showDeleteOneTypeWindow(text);
				} else if (obj.body === 0) {
					deleteOneType();
				} else {
					showTypeAlert(obj.body.error);
				}
			})
			.catch((error) => showTypeAlert(error));
	}
};

const deleteOneType = () => {
	fetch(
		`https://thegamechanger.azurewebsites.net/type/deleteOneType/${inputGameType.value}`,
		{
			method: "DELETE",
		}
	)
		.then((res) => {
			if (res.status === 204) {
				showTypeAlert(`Gatunek: "${inputGameType.value}", został usunięty`);
			} else {
				res.json().then((data) => {
					showTypeAlert(data.error);
				});
			}
			cancelDeleteOneTypeWindow();
		})
		.catch((error) => showTypeAlert(error));
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
				if (obj.status === 200) {
					for (let i = 0; i < obj.body.length; i++) {
						showTypeAlert(
							`Do gatunku "${inputGameType.value}" są przypisane (${obj.body.length}) gry`
						);
						returnAllGamesForOneType(i + 1, obj.body[i].name, obj.body[i].type);
					}
				} else {
					showTypeAlert(obj.body.error);
				}
				clearInputs();
			})
			.catch((error) => showTypeAlert(error));
	}
};

const returnAllGamesForOneType = (number, name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr</span>: ${number} --- <span>Tytuł:</span> ${name}  --- <span>Gatunek:</span> ${type}`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const showUpdateTypeWindow = () => {
	clearListsAndAlerts();
	clearInputs();
	shadowImageForAlert.style.display = "block";
	updateTypeAlertWindow.classList.add("showUpdateTypeWindow");
};

const saveUpdateType = () => {
	if (inputOldTypeName.value === "" || inputNewTypeName.value === "") {
				showUpdateTypeAlert("Wpisz obecną i nową nazwę");
	}
	else{
		fetch("https://thegamechanger.azurewebsites.net/type/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${inputOldTypeName.value}`,
				newName: `${inputNewTypeName.value}`,
			}),
		})
			.then((res) =>
				res.json().then((data) => ({ status: res.status, body: data }))
			)
			.then((obj) => {
				if (obj.status === 200) {
					returnTypeByName(obj.body.name);
					showTypeAlert("Zaktualizowano nazwę gatunku");
					cancelUpdateTypeWindow();
				} else {
					showUpdateTypeAlert(obj.body.error);
				}
			})
			.catch((error) => showGameAlert(error));
	}
}

const deleteAllTypes = () => {
	fetch("https://thegamechanger.azurewebsites.net/type/deleteAll", {
		method: "DELETE",
	})
		.then((res) => {
			if (res.status === 204) {
				showTypeAlert("Wszystkie gatunki zostały usunięte");
			}
		})
		.catch((error) => showTypeAlert(error));
	cancelDeleteAllTypesWindow();
};




const showDeleteAllTypesWindow = () => {
	clearListsAndAlerts();
	clearInputs();
	shadowImageForAlert.style.display = "block";
	deleteAllTypesAlert.classList.add("showDeleteAllTypesAlert");
};



const cancelDeleteOneTypeWindow = () => {
	deleteOneTypeAlert.classList.remove("showDeleteOneTypeWindow");
	shadowImageForAlert.style.display = "none";
	clearInputs();
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

const cancelDeleteAllTypesWindow = () => {
	deleteAllTypesAlert.classList.remove("showDeleteAllTypesAlert");
	shadowImageForAlert.style.display = "none";
};

const cancelUpdateTypeWindow = () => {
	updateTypeAlertWindow.classList.remove("showUpdateTypeWindow");
	shadowImageForAlert.style.display = "none";
	updateTypeAlert.style.display = "none";
};

const showUpdateTypeAlert = (text) => {
	updateTypeAlert.textContent = text;
	updateTypeAlert.style.display = "block";
};

getAllTypesBtn.addEventListener("click", getAllTypes);
addTypeBtn.addEventListener("click", addNewType);
findTypeBtn.addEventListener("click", findTypeByName);
deleteTypeBtn.addEventListener("click", deleteAllGamesRelatedToOneType);
deleteAllTypesBtn.addEventListener("click", showDeleteAllTypesWindow);
confirmAlertDeleteAllTypesBtn.addEventListener("click", deleteAllTypes);
cancelAlertDeleteAllTypesBtn.addEventListener(
	"click",
	cancelDeleteAllTypesWindow
);
cancelAlertDeleteOneTypeBtn.addEventListener(
	"click",
	cancelDeleteOneTypeWindow
);
confirmAlertDeleteOneTypeBtn.addEventListener("click", deleteOneType);
gamesForTypBtn.addEventListener("click", getAllGamesForOneType);
updateTypeBtn.addEventListener("click", showUpdateTypeWindow);
saveUpdateTypeBtn.addEventListener("click", saveUpdateType);
cancelUpdateTypeBtn.addEventListener("click", cancelUpdateTypeWindow);
