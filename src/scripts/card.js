//создание карточки

export function createCard(
  { link = "", name = "" },
  cardContainer,
  deleteCard,
  openFullImage,
  likeCard
) {
  const cardElement = cardContainer
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", () => openFullImage(name, link));
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  return cardElement;
}

//добавление, удаление, лайк

export function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
}

export function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
