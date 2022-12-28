const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");
const listOfTypes = document.querySelector(".listOfTypes");

const allButtons = document.querySelectorAll("button"); 
const addGameBtn = document.querySelector(".add-game");
const deleteGameBtn = document.querySelector(".delete-game");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inputGameType = document.querySelector("#gameType");

const ulListGames = document.querySelector(".ulListGames");
const ulListTypes = document.querySelector(".ulListTypes");



const getAllGames = () => {
	ulListGames.innerHTML = "";

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

const returnGameTitle = (params) => {
	inputGameName.value;
};

const addNewGame = () => {
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

	fetch(`https://thegamechanger.azurewebsites.net/game/${inputTypeId.value}`, {
		method: "DELETE",
		
		
	});
};

getAllGamesBtn.addEventListener("click", getAllGames);
getAllTypesBtn.addEventListener("click", getAllTypes);
addGameBtn.addEventListener("click", addNewGame);
deleteGameBtn.addEventListener('click', deleteGame);
