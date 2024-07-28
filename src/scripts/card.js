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
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
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

  cardLikeButton.addEventListener(
    "click",
    likeCard(_id, userId, cardLikeCount)
  );
  cardLikeCount.textContent = likes.length;
  if (likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  return cardElement;
}

// лайк

export function likeCard(cardId, userId, likeCount) {
  return (evt) => {
    const likeButton = evt.target;
    if (likeButton.classList.contains(
      "card__like-button_is-active")) {
      dislikeCardServer(cardId)
        .then((data) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log("Не удалось убрать лайк:", err);
        });
    } else {
      likeCardServer(cardId)
        .then((data) => {
          likeButton.classList.add("card__like-button_is-active");
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log("Не удалось поставить лайк:", err);
        });
    }
  };
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
      }
    })
    .catch((err) => {
      console.log("Не удалось удалить карточку", err);
    });
}
