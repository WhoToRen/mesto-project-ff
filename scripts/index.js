const cardContainer = document.querySelector("#card-template").content;
const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
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


//создание карточки

function createCard({link ='', name=''}, cardContainer, deleteCard, openFullImage, likeCard) {
	const cardElement = cardContainer
    .querySelector(".places__item")
    .cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector(".card__title").textContent = name;
	cardImage.src = link;
	cardImage.alt = name;
	cardElement.querySelector('.card__image').addEventListener('click', () => openFullImage(name, link));
	cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
	cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
	return cardElement;
}

//добавление, удаление, лайк

function addCard(cardList, cardElement) {
	cardList.prepend(cardElement);
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

//открытие попапов

function openPopup (popupElement) {
	document.addEventListener('keydown', handleClose);
	popupElement.classList.add('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
	openPopup(profileEditPopup);
})

profileAddButton.addEventListener('click', () => {
	openPopup(newCardPopup);
})

//закрытие попапов

function closePopup (popupElement) {
	popupElement.classList.remove('popup_is-opened');
 }

function handleClose() {
  console.log('click');
}

popups.forEach(popup => {
	popup.addEventListener('mousedown', evt => {
		 if (evt.target.classList.contains('popup_is-opened')) {
		  	closePopup(popup);
		 }
		 if (evt.target.classList.contains('popup__close')) {
			 closePopup(popup);
		 }
	 })
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
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

