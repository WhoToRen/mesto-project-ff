const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  addCard(createCard(item.link, item.name, deleteCard));
});

function createCard(cardLink, cardName, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardName;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove();
}

function addCard(cardElement) {
  cardList.append(cardElement);
}
