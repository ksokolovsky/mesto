export default class Api {
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._checkRes = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkRes);
    }
    
    
    getUserData() {
        return this._request(`${this._baseUrl}/users/me`, {headers: this._headers})
    }

    getInitialCard() {
        return this._request(`${this._baseUrl}/cards`, {headers: this._headers})
        }
    
    changeUserInfo(profileInfo) {
        return this._request(`${this._baseUrl}/users/me`, {headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: profileInfo.name,
                about: profileInfo.profession
              })
        })
    }

    //bilo cardInfo v treh mestah
    addCard(cardData) {
        return this._request(`${this._baseUrl}/cards`, {headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })

    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
            method: 'PUT',
        })
    }

    dislikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
            method: 'DELETE',
        })
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {headers: this._headers,
            method: 'DELETE',
        })
    }

    changeAvatar(avatarLink) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
    }
}
