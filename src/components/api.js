import autoprefixer from "autoprefixer";

const cohortId = "wff-cohort-41";
const token = "41636cd3-601f-49bf-a38b-8190ee4d6dac";
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function handleError(err) {
  console.error(err);
  return Promise.reject(err);
}

export function getCards() {
  return fetch(`${baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse)
    .catch(handleError);
}

export function profileEditData(name, about) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
    .catch(handleError);
}

export function addNewCard(name, link) {
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .catch(handleError);
}

export function deleteCard(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse)
    .catch(handleError);
}

export function likeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse)
    .catch(handleError);
}

export function unlikeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse)
    .catch(handleError);
}

export function avatarEdit(newAvatarUrl) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
    .then(checkResponse)
    .catch(handleError);
}
