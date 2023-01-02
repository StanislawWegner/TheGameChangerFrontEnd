const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");
const listOfTypes = document.querySelector(".listOfTypes");

const allButtons = document.querySelectorAll("button");
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");
const findGameBtn = document.querySelector(".find-game");

const addTypeBtn = document.querySelector(".add-type");
const findTypeBtn = document.querySelector(".find-type");
const deleteTypeBtn = document.querySelector(".delete-type");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inputGameType = document.querySelector("#gameType");

const ulListGames = document.querySelector(".ulListGames");
const ulListTypes = document.querySelector(".ulListTypes");

const gameAlert = document.querySelector(".gameAlert");
const typeAlert = document.querySelector(".typeAlert");

const getAllGames = () => {
	clearListsAndAlerts();

	fetch("https://thegamechanger.azurewebsites.net/game")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				returnAllGames(i + 1, data[i].name, data[i].genre, data[i].id);
			}
		});

	clearInputs();
};

const returnAllGames = (number, name, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr</span>: ${number} --- <span>Tytuł:</span> ${name}  --- <span>Typ:</span> ${type} - <span>Id:</span> ${id}</p>`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

const addNewGame = () => {
	clearListsAndAlerts();

	if (inputGameName.value === "" || inputTypeId.value === "") {
		gameAlert.textContent = "Wpisz nazwę nowej gry i Id gatunku";
		gameAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/game/${inputTypeId.value}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${inputGameName.value}`,
				}),
			}
		);
	}

	clearInputs();
};

const deleteGame = () => {
	clearListsAndAlerts();

	if (inputTypeId.value === "") {
		gameAlert.textContent = "Wpisz Id gry którą chcesz usunąć";
		gameAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/game/${inputTypeId.value}`,
			{
				method: "DELETE",
			}
		);
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
				returnGameByName(data.name, data.genre, data.id);
			});
	}

	clearInputs();
};

const returnGameByName = (name, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Tytuł:</span> ${name}  --- <span>Typ:</span> ${type} - <span>Id:</span> ${id}</p>`;

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

getAllGamesBtn.addEventListener("click", getAllGames);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener("click", deleteGame);
findGameBtn.addEventListener("click", findGameByName);

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

	fetch("https://thegamechanger.azurewebsites.net/genre")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				retrunAllTypes(i + 1, data[i].name, data[i].id);
			}
		});

	clearInputs();
};

const retrunAllTypes = (number, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr:</span> ${number}--- <span>Typ:</span> ${type} --- <span>Id:</span> ${id} </p>`;
	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const addNewType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz nazwę nowego gatunku gry";
		typeAlert.style.display = "block";
	}

	fetch(`https://thegamechanger.azurewebsites.net/genre`, {
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
		typeAlert.textContent = "Wpisz typ szukanej gry";
		typeAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/genre/typeName/${inputGameType.value}`
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
	newResult.innerHTML = `<p>--- <span>Typ:</span> ${name}  --- <span>Id:</span> ${id}</p>`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const deleteType = () => {
	clearListsAndAlerts();

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz Id gatunku gry do usunięcia";
		typeAlert.style.display = "block";
	} else {
		fetch(
			`https://thegamechanger.azurewebsites.net/genre/delete/${inputGameType.value}`,
			{
				method: "DELETE",
			}
		);
	}
	clearInputs();
};

getAllTypesBtn.addEventListener("click", getAllTypes);
addTypeBtn.addEventListener("click", addNewType);
findTypeBtn.addEventListener("click", findTypeByName);
deleteTypeBtn.addEventListener("click", deleteType);
