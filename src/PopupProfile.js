import Validate from './validate.js';
import Popup from './Popup.js';
import {userInfoName, userInfoJob} from './var.js';
import {api} from './index.js'
const formEditProfile = document.forms.editProfile
const validate = new Validate(formEditProfile,buttonEdit);
const buttonEdit = document.querySelector('.user-info__edit-btn')//кнопка edit в профиле пользователя
const popupProfile = document.querySelector('.popup_profile');//сама карточка профиля пользователя(что надо сохранить)
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
export {popupProfile2};