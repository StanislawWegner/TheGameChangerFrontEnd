const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");
const listOfTypes = document.querySelector(".listOfTypes");

const allButtons = document.querySelectorAll("button");
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");
const findGameBtn = document.querySelector(".find-game");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inputGameType = document.querySelector("#gameType");

const ulListGames = document.querySelector(".ulListGames");
const ulListTypes = document.querySelector(".ulListTypes");

const gameAlert = document.querySelector(".gameAlert");

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

const getAllTypes = () => {
	ulListTypes.innerHTML = "";
	gameAlert.style.display = "none";

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
	}
	fetch(
		`https://thegamechanger.azurewebsites.net/game/gameName/${inputGameName.value}`
	)
		.then((res) => res.json())
		.then((data) => {
			returnGameByName(data.name, data.genre, data.id);
		});
};

const returnGameByName = (name, type, id) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>--- <span>Tytuł:</span> ${name}  --- <span>Typ:</span> ${type} - <span>Id:</span> ${id}</p>`;

	ulListGames.appendChild(newResult);
	listOfGames.style.display = "block";
};


getAllGamesBtn.addEventListener("click", getAllGames);
getAllTypesBtn.addEventListener("click", getAllTypes);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener("click", deleteGame);
findGameBtn.addEventListener("click", findGameByName);
