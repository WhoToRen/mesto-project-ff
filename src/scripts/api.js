const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "f0354754-3e6b-42d0-9bb2-204dcc70e47e",
    "Content-Type": "application/json",
  },
};

// проверка

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Возникла ошибка: ${res.status}`);
};

// получение карточек

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

// получение инфы о юзере

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => handleResponse(res))
};

// обновление инфы о юзере

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => handleResponse(res));
};

// новая карточка

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
    .then((res) => handleResponse(res))
};

// смена аватара

export const changeUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink }),
  }).then((res) => handleResponse(res));
};

// лайк-дизлайк

export function likeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ cardId }),
  }).then((res) => handleResponse(res));
}

export function dislikeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({ cardId }),
  }).then((res) => handleResponse(res));
}

// удаление карточки

export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};
