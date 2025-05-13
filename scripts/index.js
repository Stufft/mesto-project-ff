const placeInfo = initialCards.map(({ name, link }) => ({
  name,
  link,
}));

const cardTemplate = document.querySelector("#card-template").content;

function addContent({ name, link }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardList = document.querySelector(".places__list");
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    removeCard(cardElement);
  });
  cardList.append(cardElement);
}

function removeCard(cardElement) {
  cardElement.remove();
}

function render() {
  placeInfo.forEach(addContent);
}

render();
