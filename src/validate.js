export default class Validate{
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