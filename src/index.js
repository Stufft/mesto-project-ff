import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openModal, closeModal, ModalListeners } from "./components/modal.js";
import { createCard, handleLike, handleDelete } from "./components/card.js";

const popupTypeEdit = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitile = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace.elements["place-name"];
const linkInput = formNewPlace.elements.link;
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
export const cardTemplate = document.querySelector("#card-template").content;

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitile.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

function handleAddCardFormSubmit(evt) {
  formNewPlace.reset();
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(
    cardData,
    handleImageClick,
    handleLike,
    handleDelete
  );
  placesList.prepend(cardElement);
  closeModal(popupTypeNewCard);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitile.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleImageClick,
    handleLike,
    handleDelete
  );
  placesList.append(cardElement);
});

ModalListeners();
