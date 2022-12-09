const getAllGamesBtn = document.querySelector(".getAllGames");
const getAllTypesBtn = document.querySelector(".getAllTypes");
const listOfGames = document.querySelector(".listOfGames");

const inputGameName = document.querySelector("#gameName");
const inputTypeId = document.querySelector("#typeId");
const inoutGameType = document.querySelector("#gameType");

const ulList = document.querySelector(".ulList");

const getAllGames = () => {


	fetch("https://thegamechanger.azurewebsites.net/game")
		.then((response) => response.json())
		.then((data) => {

            for(let i = 0; i < data.length; i++){
                returnAllGames(i + 1, data[i].name, data[i].genre);
            }

			
		});
};

const returnAllGames = (number, name, type) => {
	const newResult = document.createElement("li");
	newResult.innerHTML = `<p>Nr: ${number}<span> --- Tytuł:</span> ${name} <span> --- Typ:</span> ${type}</p>`;

	ulList.appendChild(newResult);
	listOfGames.style.display = 'block';

};

getAllGamesBtn.addEventListener("click", getAllGames);
