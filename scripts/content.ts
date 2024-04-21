import { Character, Position } from "./character";

const divElement = document.createElement("div");
const imgUrl = chrome.runtime.getURL("images/dog.png");
divElement.innerHTML = `<img src="${imgUrl}"/>`;
document.documentElement.appendChild(divElement);
divElement.setAttribute("id", "summonCharacters");

const applyPositionToStyle = (position: Position) => {
  divElement.style.setProperty("--top", position.top + "%");
  divElement.style.setProperty("--left", position.left + "%");
};

const character = new Character(applyPositionToStyle);
character.startAction();
