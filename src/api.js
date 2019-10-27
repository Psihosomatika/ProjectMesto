export default class Api {
    constructor(options) {
        // тело конструктора
        this.baseURL = options['baseUrl'];
        this.headers = options['headers'];
    }
  
    getInitialCards() {//получить начальные карты
      return fetch(this.baseURL + '/cards',{
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
            console.log('Ошибка. Запрос не выполнен');
        });
    }
    getUserInformation() {//запрос инфы о пользователе с сервера
      return fetch(this.baseURL + '/users/me',{
        headers: this.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
        console.log('Ошибка. Запрос не выполнен');
    });
    }
  
    sendingProfileData(name, about){//отправка данных на сервер
      return fetch(this.baseURL + '/users/me',{
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ name, about })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
        console.log('Ошибка. Запрос не выполнен');
    })
    }
}
