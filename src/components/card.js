import { deleteCard, likeCard, unlikeCard } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;

export function handleLike(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const promise = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  promise
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при работе с лайками:", err);
    });
}

export function handleDelete(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

export function createCard(
  cardData,
  handleImageClick,
  handleLike,
  handleDelete
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeCounter.textContent = cardData.likes.length;

  deleteButton.addEventListener("click", () =>
    handleDelete(cardData._id, cardElement)
  );

  likeButton.addEventListener("click", () =>
    handleLike(cardData._id, likeButton, likeCounter)
  );

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}
