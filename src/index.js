const popupPlace = document.querySelector('.popup_place');//карточка на добавление нового места

const buttonUserInfo = document.querySelector('.user-info__button');//кнопка + в профиле пользователя
const buttonEdit = document.querySelector('.user-info__edit-btn')//кнопка edit в профиле пользователя

const popupProfile = document.querySelector('.popup_profile');//сама карточка профиля пользователя(что надо сохранить)

const userInfoName = document.querySelector('.user-info__name');// имя в профиле пользователя
const userInfoJob = document.querySelector('.user-info__job');// работа в профиле пользователя

const placesList = document.querySelector('.places-list');//контейнер для попапов с картинками
const containerPopupImage = document.querySelector('.popup_image');
const keyToken = '0033b03a-a304-475c-9aa3-b7023076205e'
const newUserName = document.querySelector('#newUserName'); //первое поле формы Profile (имя)
const aboutMe = document.querySelector('#aboutMe'); //второе поле формы Profile (информация о себе)
const formEditProfile = document.forms.editProfile

class Api {
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

const api = new Api({//запрос с сервера
  baseUrl: 'http://95.216.175.5/cohort3',
  headers: {
    authorization: keyToken,
    'Content-Type': 'application/json'
  }
})
api.getInitialCards().then(res => {
  console.log(res);
  const cardContainer = new CardList(placesList, res);
})

api.getUserInformation().then((result) => {
  userInfoName.textContent = result.name
  userInfoJob.textContent = result.about
  document.querySelector('.user-info__photo').style.backgroundImage = result.avatar
  newUserName.value = result.name
  aboutMe.value = result.about
})

class Card{ //класс создающий карточку

  constructor(name,link){
    this.cardElement = this.createCard(name,link);
  } 
  createCard(name,link){// будет создавать DOM-элемент карточки
    //создание структуры карты
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('place-card');
    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.setAttribute('style', `background-image:url(${link})`);
    placeCardImage.addEventListener('click', (event) => {//открывает попап с увеличенной картинкой
      if(event.target.classList.contains('place-card__image')){
        popupImg2.applyImage(link);
        popupImg2.open();
      }
    });
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('place-card__delete-icon');

    const descriptionCard = document.createElement('div');
    descriptionCard.classList.add('place-card__description');
    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = `${name}`;
    const buttonLike = document.createElement('button');
    buttonLike.classList.add('place-card__like-icon');
    //наследование (родительство)
    placeCardImage.appendChild(buttonDel);
    cardContainer.appendChild(placeCardImage);
    descriptionCard.appendChild(placeCardName);
    descriptionCard.appendChild(buttonLike);
    cardContainer.appendChild(descriptionCard);

    return cardContainer;
  } 
}


class CardList{ //класс для хранения и отрисовки карточек
  constructor (container,initialCards){
    this.container = container;
    this.initialCards = initialCards;
    this.render();
    this.actionWithCards = this.actionWithCards.bind(this);
    this.addEventListenerlike();
  }
  render (){
    this.initialCards.forEach(({name,link})=>
    this.addCard(name,link)
    )
  }

  addCard(name,link){
    const{cardElement}= new Card(name,link);
    this.container.appendChild(cardElement);
  }
  actionWithCards(event){
   if(event.target.closest('.place-card__like-icon')){
    event.target.classList.toggle('place-card__like-icon_liked');
   }
 
   if(event.target.closest('.place-card__delete-icon')){
    this.container.removeChild(event.target.closest('.place-card'));
   }
  }
  addEventListenerlike(){
    placesList.addEventListener('click', this.actionWithCards);
  }

}


class Popup{//класс для всплывающего окна
  constructor(container, button){
    this.container = container;

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close)

    if (button){ 
      this.button = button;
      this.button
      .addEventListener('click', this.open)
    }
  }

  open(){//показывает попап
    this.container.classList.add('popup_is-opened')
  }
  close(){//скрыть попап
    this.container.classList.remove('popup_is-opened')
  }

}
//попап увеличения картинки
class PopupImage extends Popup{
  constructor(container){
    super(container);
  }
  applyImage(link){//принимает картинку
    this.container.querySelector('.popup__container').setAttribute('style', `background-image:url(${link})`);
  }

}

const popupImg2 = new PopupImage(containerPopupImage)

//класс попапа где пользователь может добавить свою карточку
class PopupPlace extends Popup{
  constructor(container,button){
    super(container, button);
    this.form = this.container
      .querySelector('.popup__form');
    this.inputName = this.form
      .querySelector('.popup__input_type_name');
    this.inputLink = this.form
      .querySelector('.popup__input_type_link-url');
    this.buttonPopup = this.form
      .querySelector('.popup__button');

    
    this.addValidationFormPlace();//проверяю, прошла ли форма валидацию
    this.toAddACardUser();//добавить карточку от пользователя
  }

  blockSubmit () {
    this.buttonPopup.setAttribute('disabled', true);
    this.buttonPopup.classList.add('popup__button_disabled');
  }
  enableButton () {
    this.buttonPopup.removeAttribute('disabled');
    this.form.querySelector('.popup__button').classList.remove('popup__button_disabled');
  }

  addValidationFormPlace (){
    this.form.addEventListener('input', event => {
      if (this.inputName.value.length > 0 && this.inputLink.value.length > 0){
        this.enableButton ();
      }else{
        this.blockSubmit ();
      }
    });
  }
 //добавление инфы введенной пользователем на сайт
  toAddACardUser(){
    this.buttonPopup.addEventListener('click', event => {
      event.preventDefault();
      cardCo.addCard(this.form.name.value, this.form.link.value);
      this.form.reset();
      this.container.classList.remove('popup_is-opened');
      this.blockSubmit();
    });
  }
}
const popupPlace2 = new PopupPlace(popupPlace, buttonUserInfo);

class Validate{
  constructor (form){
    this.form = form
    this.newInputName = this.form
      .querySelector('.popup__input_type_new-name');//поле для воода имени пользователя
    this.inputAboutMe = this.form
      .querySelector('.popup__input_type_about-me');//поле для ввода информации о себе
    this.buttonPopupSave = this.form
      .querySelector('.popup__btn-save');//кнопка сохранить
  }

  blockSubmit () {
    this.buttonPopupSave.setAttribute('disabled', true);
    this.buttonPopupSave.classList.add('popup__button_disabled');
  }
  enableButton () {
    this.buttonPopupSave.removeAttribute('disabled');
    this.buttonPopupSave.classList.remove('popup__button_disabled');
  }
  addValidationFormProfile(){
    this.form.addEventListener('keyup', event => {
      this.resetError(event.target);
      this.validateTextField(event.target);
      const inputs = Array.from(this.form.elements);

      let validInputs = []
      inputs.forEach((element) => {
        if (element.id !== submit.id) {
          if (!this.validateTextField(element)) { validInputs.push(false)} else {validInputs.push(true)}
        }
      });
      
      if (validInputs.indexOf(false) !== -1) {
        this.blockSubmit ();
      } else {
        this.enableButton ();
      }
    });
  }

  validateTextField(element){ 
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (!element.checkValidity()) {//Если элемент не прошел валидацию, то выводим сообщение об ошибке 1(о пустом поле) 
      errorElement.textContent = element.validationMessage;
      this.activateError(errorElement);
      return false
    } else if (!this.checkTheLength(element)) {//если элемент не прошел дополнительную валидацию, то выводим сообщение об ошибке 2
      const errorMessage = 'Должно быть от 2 до 30 символов';
      errorElement.textContent = errorMessage;
      this.activateError(errorElement);
      return false
    }
    return true//если все ок - элемент прошел валидацию, то истина
  }
  activateError(element){//активация ошибки
    element.parentNode.classList.add('input-container__invalid');
  }
  checkTheLength(element) {//доп проверка на количество символов
    return element.value.length>1 && element.value.length<31
  }
  resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
  }
}

const validate = new Validate(formEditProfile,buttonEdit)

class PopupProfile extends Popup{
  constructor(container,button){
    super(container, button);
    this.form = this.container
      .querySelector('.popup__form');//выбираю форму этого попапа
    this.newInputName = this.form
      .querySelector('.popup__input_type_new-name');//поле для воода имени пользователя
    this.newInputName.value = userInfoName.textContent;//"авто" ввод имени
    this.inputAboutMe = this.form
      .querySelector('.popup__input_type_about-me');//поле для ввода информации о себе
    this.inputAboutMe.value = userInfoJob.textContent;//"авто" ввод инфы о себе
    this.buttonPopupSave = this.form
      .querySelector('.popup__btn-save');//кнопка сохранить
    validate.addValidationFormProfile();
    this.addToSite();
  }

  //Добавление инфы из полей ввода на сайт
  addToSite(){
    this.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = this.newInputName.value;
    const about = this.inputAboutMe.value;
    userInfoName.textContent = name;
    userInfoJob.textContent = about;
    this.container.classList.remove('popup_is-opened');

    api.sendingProfileData(name,about).then((data) => {
        userInfoName.textContent = name
        userInfoJob.textContent = about
      })
    });
    
  }
} 
const popupProfile2 = new PopupProfile(popupProfile, buttonEdit);