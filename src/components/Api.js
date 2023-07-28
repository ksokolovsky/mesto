export default class Api {
    constructor() {

    }

    getUserData() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                    return Promise.reject(`Ошибка: ${res.status}!`);
                }})
        .catch(err => console.log(err));
    }

    getInitialCard() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(console.log(res.status))
            }
        })
        .then(res => res)
        }
    
    changeUserInfo(profileInfo) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
            method: "PATCH",
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileInfo.name,
                about: profileInfo.profession
              })
        })
    }

    addCard(cardInfo) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
            method: "POST",
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        });
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    }

    dislikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            }
        })
    }

    changeAvatar(avatarLink) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => alert(err))
    }
    
}
