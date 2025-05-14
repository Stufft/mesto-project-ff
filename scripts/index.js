const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addContent(cardData, removeCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    removeCard(cardElement);
  });
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function render() {
  initialCards.forEach((cardData) => {
    const cardElement = addContent(cardData, removeCard);
    cardList.append(cardElement);
  });
}

render();
