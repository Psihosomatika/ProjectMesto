import "./pages/index.css";
import Api from './api.js';
import CardList from './CardList.js';
import {popupPlace2} from './PopupPlace.js';
import {popupProfile2} from './PopupProfile.js'
import {userInfoName, userInfoJob, placesList} from './var.js';
import {cardContainer} from './CardList.js'


const keyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTY0ZGVhMDViZDUxYjVjODIxMDMxZWEiLCJpYXQiOjE1ODM2NzgwMDIsImV4cCI6MTU4NDI4MjgwMn0.exsO68C9ca8DDoyQZzt6jlgJpCZiyWtMeApvKPrDlrc'
const serverUrl = NODE_ENV === 'development' ? 'http://api.mestobackend.ml' : 'https://api.mestobackend.ml'
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