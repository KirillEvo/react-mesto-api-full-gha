class ApiConfig {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  setNewCard({ name, link }){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(res => this._checkResponse(res))
  }

  setDeleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._checkResponse(res))
  }

  setUserAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._checkResponse(res))
  }

  setLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new ApiConfig({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '8a11f491-8e8d-4f21-8a97-06c1a42ecab4',
    'Content-Type': 'application/json'
  }
});

export default api;
