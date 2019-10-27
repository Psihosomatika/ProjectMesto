import Card from './Card.js';
import {placesList, array} from './var';

export default class CardList{ //класс для хранения и отрисовки карточек! 
  constructor (container,initialCards){
    this.container = container;
    this.initialCards = initialCards;
    this.addCards(initialCards);
    this.actionWithCards = this.actionWithCards.bind(this);
    this.addEventListenerlike();
  }
  addCards(cards){
    cards.forEach(({name,link})=>
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

const cardContainer = new CardList(placesList, array);
export {cardContainer};