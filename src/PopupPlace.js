import Popup from './Popup.js';
import {cardContainer} from './CardList.js'
const popupPlace = document.querySelector('.popup_place');//карточка на добавление нового места
const buttonUserInfo = document.querySelector('.user-info__button');//кнопка + в профиле пользователя
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
        cardContainer.addCard(this.form.name.value, this.form.link.value);
        this.form.reset();
        this.container.classList.remove('popup_is-opened');
        this.blockSubmit();
      });
    }
}
const popupPlace2 = new PopupPlace(popupPlace, buttonUserInfo);
export {popupPlace2};