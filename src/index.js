import "./pages/index.css";
import Api from './api.js';
import CardList from './CardList.js';
import {popupPlace2} from './PopupPlace.js';
import {popupProfile2} from './PopupProfile.js'
import {userInfoName, userInfoJob, placesList} from './var.js';
import {cardContainer} from './CardList.js'

const keyToken = 'b6e8c1d3-d314-46fd-9a4c-f95ba3fc422a';
const serverUrl = NODE_ENV === 'development' ?  'http://nomoreparties.co/cohort8/' : 'https://nomoreparties.co/cohort8/';
//'http://praktikum.tk/cohort8/' : 'https://praktikum.tk/cohort8/';
const newUserName = document.querySelector('#newUserName'); //первое поле формы Profile (имя)
const aboutMe = document.querySelector('#aboutMe'); //второе поле формы Profile (информация о себе)

//здесь был класс апи

//Используется класс апи
const api = new Api({//запрос с сервера Заменила 'http://95.216.175.5/cohort3' на serverUrl
  baseUrl: serverUrl,
  headers: {
    authorization: keyToken,
    'Content-Type': 'application/json'
  }
})
export {api};
api.getInitialCards().then(res => {
  cardContainer.addCards(res);
})

api.getUserInformation().then((result) => {
  userInfoName.textContent = result.name
  userInfoJob.textContent = result.about
  document.querySelector('.user-info__photo').style.backgroundImage = result.avatar
  newUserName.value = result.name
  aboutMe.value = result.about
})


//здесь был класс кард, создающий карточку
//здесь был класс кардлист, для хранения и отрисовки карточек
//здесь был класс попап для открытия всплывающего окна


//попап увеличения картинки