import "./pages/index.css";
import { openModal, closeModal, modalListeners } from "./components/modal.js";
import { createCard, handleLike, handleDelete } from "./components/card.js";
import {
  isValid,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getCards,
  profileEditData,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  avatarEdit,
} from "./components/api.js";

const popupTypeEdit = document.querySelector(".popup_type_edit");
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(
  ".profile__edit-avatar-button"
);
const popupTypeAvatar = document.querySelector(".popup_type_edit-avatar");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewPlace = document.forms["new-place"];
const formAvatar = document.forms["avatar-edit"];
const placeNameInput = formNewPlace.elements["place-name"];
const linkInput = formNewPlace.elements.link;
const linkInputAvatar = formAvatar.elements["avatar-link"];
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaptionImage = popupTypeImage.querySelector(".popup__caption");

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaptionImage.textContent = cardData.name;
  openModal(popupTypeImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = formEditProfile.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  profileEditData(nameInput.value, jobInput.value)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = formNewPlace.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  addNewCard(placeNameInput.value, linkInput.value)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        handleImageClick,
        handleLike,
        handleDelete
      );
      const likesCounter = cardElement.querySelector(".card__like-counter");
      likesCounter.textContent = cardData.likes.length;
      placesList.prepend(cardElement);
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = formAvatar.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  avatarEdit(linkInputAvatar.value)
    .then((updatedUser) => {
      profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(popupTypeAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handleAddCardFormSubmit);
formAvatar.addEventListener("submit", handleEditAvatarSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationSettings);
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationSettings);
  openModal(popupTypeNewCard);
});

profileAvatarButton.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationSettings);
  openModal(popupTypeAvatar);
});

getCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        handleImageClick,
        handleLike,
        handleDelete
      );
      const likesCounter = cardElement.querySelector(".card__like-counter");
      likesCounter.textContent = cardData.likes.length;
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке карточек:", err);
  });

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationSettings);

modalListeners();
