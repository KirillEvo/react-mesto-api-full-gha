class ApiConfig {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  setNewCard({ name, link }){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(res => this._checkResponse(res))
  }

  setDeleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._checkResponse(res))
  }

  setUserAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._checkResponse(res))
  }

  setLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._checkResponse(res))
  }

  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(res => this._checkResponse(res))
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new ApiConfig({
  baseUrl: 'https://api.daily-pix.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
