import Popup from './Popup.js';
const containerPopupImage = document.querySelector('.popup_image');
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
export {popupImg2};