const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");
const listOfTypes = document.querySelector(".listOfTypes");

const allButtons = document.querySelectorAll("button");
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");
const findGameBtn = document.querySelector(".find-game");

const addTypeBtn = document.querySelector(".add-type");
const findType = document.querySelector(".find-type");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inputGameType = document.querySelector("#gameType");

const ulListGames = document.querySelector(".ulListGames");
const ulListTypes = document.querySelector(".ulListTypes");

const gameAlert = document.querySelector(".gameAlert");
const typeAlert = document.querySelector(".typeAlert");

const getAllGames = () => {
	ulListGames.innerHTML = "";
	gameAlert.style.display = "none";

	fetch("https://thegamechanger.azurewebsites.net/game")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				returnAllGames(i + 1, data[i].name, data[i].genre, data[i].id);
			}
		});
};

const returnAllGames = (number, name, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr</span>: ${number} --- <span>Tytuł:</span> ${name}  --- <span>Typ:</span> ${type} - <span>Id:</span> ${id}</p>`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

const addNewGame = () => {
	gameAlert.style.display = "none";

	fetch(`https://thegamechanger.azurewebsites.net/game/${inputTypeId.value}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: `${inputGameName.value}`,
		}),
	});
};

const deleteGame = () => {
	gameAlert.style.display = "none";

	fetch(`https://thegamechanger.azurewebsites.net/game/${inputTypeId.value}`, {
		method: "DELETE",
	});
};

const findGameByName = () => {
	ulListGames.innerHTML = "";
	gameAlert.style.display = "none";

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
};

const returnGameByName = (name, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Tytuł:</span> ${name}  --- <span>Typ:</span> ${type} - <span>Id:</span> ${id}</p>`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};

getAllGamesBtn.addEventListener("click", getAllGames);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener("click", deleteGame);
findGameBtn.addEventListener("click", findGameByName);





// Type Of Game Functions

const getAllTypes = () => {
	ulListTypes.innerHTML = "";
	typeAlert.style.display = "none";

	fetch("https://thegamechanger.azurewebsites.net/genre")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				retrunAllTypes(i + 1, data[i].name, data[i].id);
			}
		});
};

const retrunAllTypes = (number, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p><span>Nr:</span> ${number}--- <span>Typ:</span> ${type} --- <span>Id:</span> ${id} </p>`;
	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

const addNewType = () => {
	typeAlert.style.display = "none";

	if(inputGameType.value === ''){
		typeAlert.textContent = 'Wpisz nazwę nowego gatunku gry';
		typeAlert.style.display = 'block';
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
};


const findTypeByName = () => {
	ulListTypes.innerHTML = "";
	typeAlert.style.display = "none";

	if (inputGameType.value === "") {
		typeAlert.textContent = "Wpisz tytuł szukanego typu gry";
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
};

const returnTypeByName = (name, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Typ:</span> ${name}  --- <span>Id:</span> ${id}</p>`;

	ulListTypes.appendChild(newResult);
	listOfTypes.style.display = "block";
};

getAllTypesBtn.addEventListener("click", getAllTypes);
addTypeBtn.addEventListener("click", addNewType);
findType.addEventListener("click", findTypeByName);
