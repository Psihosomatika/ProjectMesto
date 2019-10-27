export default class Popup{//класс для всплывающего окна
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


