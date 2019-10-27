import {popupImg2} from './PopupImage.js';
import {popupProfile2} from './PopupProfile.js'
export default class Card{ //класс создающий карточку

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