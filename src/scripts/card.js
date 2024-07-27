import { deleteMyCard, dislikeCardServer, likeCardServer } from "./api.js";

//создание карточки

export function createCard(
  { link = "", name = "", likes = [], _id = "", owner = {} },
  cardContainer,
  deleteCard,
  openFullImage,
  likeCard,
  userId
) {
  const cardElement = cardContainer
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.dataset.id = _id;
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", () => openFullImage(name, link));

  if (owner._id === userId) {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => deleteCard(_id));
  } else {
    cardElement.querySelector(".card__delete-button").style.display = "none";
  }

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard(_id, userId));
  cardElement.querySelector(".card__like-count").textContent = likes.length;
  if (likes.some((like) => like._id === userId)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }
  return cardElement;
}

// лайк

export function likeCard(cardId, userId) {
  return (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
    if (evt.target.classList.contains("card__like-button_is-active")) {
      likeCardServer(cardId)
        .then((data) => {
          evt.target.nextElementSibling.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log("Не удалось поставить лайк:", err);
        });
    } else {
      dislikeCardServer(cardId)
        .then((data) => {
          evt.target.nextElementSibling.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log("Не удалось убрать лайк:", err);
        });
    }
  };
}

//добавление

export function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
}

// удаление

export function deleteCard(cardId) {
  deleteMyCard(cardId)
    .then(() => {
      const cardToDelete = document.querySelector(
        `.places__item[data-id="${cardId}"]`
      );
      if (cardToDelete) {
        cardToDelete.remove();
      } else {
        console.log("Не удалось удалить картчоку");
      }
    })
    .catch((err) => {
      console.log("Не удалось удалить карточку", err);
    });
}
