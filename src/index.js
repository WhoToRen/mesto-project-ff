import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  changeUserAvatar,
} from "./scripts/api.js";

//переменные

const cardContainer = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileForm = document.querySelector(".popup__form");
const profileUserName = profileForm.querySelector("[name='user-name']");
const profileUserDescription = profileForm.querySelector(
  "[name='user-description']"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const newCardNameInput = document.querySelector(".popup__input_type_card-name");
const newCardUrlInput = document.querySelector(".popup__input_type_url");
const fullImagePopup = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardImageDescription = document.querySelector(".popup__caption");
const popupEditAvatar = document.querySelector(".popup_type_avatar-edit");
const popupAvatarContent = popupEditAvatar.querySelector(".popup__content");
const popupAvatarForm = popupAvatarContent.querySelector(".popup__form");
const profileImageAvatar = document.querySelector(".profile__image");

enableValidation(validationConfig);

//добавление

function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
}

// открытие попапов профиля

profileEditButton.addEventListener("click", () => {
  profileUserName.value = profileTitle.textContent;
  profileUserDescription.value = profileDescription.textContent;
  openPopup(profileEditPopup);
  clearValidation(profileEditPopup, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
  clearValidation(newCardPopup, validationConfig);
});

//закрытие попапов

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//редактирование профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  isLoading(true, profileEditPopup.querySelector(".popup__button"));
  const name = profileUserName.value;
  const about = profileUserDescription.value;

  updateUserInfo(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading(false, profileEditPopup.querySelector(".popup__button"));
    });
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

//добавление карточки

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  isLoading(true, newCardPopup.querySelector(".popup__button"));
  const cardElement = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
  };

  addNewCard(cardElement.name, cardElement.link)
    .then((newCardData) => {
      addCard(
        cardList,
        createCard(
          newCardData,
          cardContainer,
          deleteCard,
          openFullImage,
          likeCard,
          userId
        )
      );
      closePopup(newCardPopup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading(false, newCardPopup.querySelector(".popup__button"));
    });
};

newCardForm.addEventListener("submit", handleAddCardSubmit);

// ux-загрузки

function isLoading(loading, button) {
  if (loading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранение";
  }
}

//открытие полного изображения

function openFullImage(name, link) {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardImageDescription.textContent = name;

  openPopup(fullImagePopup);
}

// функция обновления аватара

function updateAvatar() {
  const avatarLink = popupAvatarForm.elements["avatar-link"].value;
  isLoading(true, popupEditAvatar.querySelector(".popup__button"));
  changeUserAvatar(avatarLink)
    .then((updatedUser) => {
      profileImageAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closePopup(popupEditAvatar);
      clearValidation(popupEditAvatar, validationConfig);
    })
    .catch((err) => {
      console.error("Не удалось изменить аватар:", err);
    })
    .finally(() => {
      isLoading(false, popupEditAvatar.querySelector(".popup__button"));
    });
}

popupAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateAvatar();
});

profileImageAvatar.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});

// промис

let userId;
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageAvatar.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((cardElement) => {
      addCard(
        cardList,
        createCard(
          cardElement,
          cardContainer,
          deleteCard,
          openFullImage,
          likeCard,
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.log("Не удалось получить данные:", err);
  });
