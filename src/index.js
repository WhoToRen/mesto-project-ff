import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { createCard, addCard, deleteCard, likeCard } from './scripts/card.js'
import { openPopup, closePopup } from './scripts/modal.js'

//переменные

const cardContainer = document.querySelector("#card-template").content;
const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const profileUserName = document.querySelector('.popup__input_type_name');
const profileUserDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');
const fullImagePopup = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardImageDescription = document.querySelector('.popup__caption');



//открытие попапов

profileEditButton.addEventListener('click', () => {
	profileUserName.value = profileTitle.textContent
	profileUserDescription.value = profileDescription.textContent
	openPopup(profileEditPopup);
})

profileAddButton.addEventListener('click', () => {
	openPopup(newCardPopup);
})

//закрытие попапов

popups.forEach(popup => {
	popup.addEventListener('mousedown', evt => {
		 if (evt.target.classList.contains('popup_is-opened')) {
		  	closePopup(popup);
		 }
		 if (evt.target.classList.contains('popup__close')) {
			 closePopup(popup);
		 }
	 })
})

//редактирование профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileForm.elements[0].value;
  profileDescription.textContent = profileForm.elements[1].value;
  closePopup(profileEditPopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

//добавление карточки

const handleAddCardSubmit = (evt) => {
	evt.preventDefault();
	const cardElement = {
		name: newCardNameInput.value,
		link: newCardUrlInput.value
	  };
	addCard(cardList, createCard(cardElement, cardContainer, deleteCard, openFullImage, likeCard));
	closePopup(newCardPopup);
  newCardForm.reset();
}
newCardForm.addEventListener('submit', handleAddCardSubmit)

//открытие полного изображения

function openFullImage(name, link) {
	popupCardImage.src = link;
	popupCardImage.alt = name;
	popupCardImageDescription.textContent = name;

	openPopup(fullImagePopup);
}

initialCards.forEach(cardElement => {
	addCard(cardList, createCard(cardElement, cardContainer, deleteCard, openFullImage, likeCard));
});

