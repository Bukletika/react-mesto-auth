export const BASE_URL = "https://auth.nomoreparties.co";

const handleResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
  .then(handleResponse)
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then(handleResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(handleResponse)
};

