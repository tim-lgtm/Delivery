'use strict'

import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'


// DAY ONE
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const cardRestaurants = document.querySelector('.cards-restaurants')
const containerPromo = document.querySelector('.container-promo')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')

let login = localStorage.getItem('Dilivery')

function validName(str) {
  const regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
  return regName.test(str)
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth (){
  modalAuth.classList.toggle('is-open')
  if(modalAuth.classList.contains('is-open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function clearForm () {
  loginInput.style.borderColor = ''
  logInForm.reset();
}

function autorized () {
  
  function logOut () {
    login = ''
    localStorage.removeItem('Dilivery')
    buttonAuth.style.display = ''
    userName.style.display = ''
    buttonOut.style.display = ''
    
    checkAuth()
  }
  userName.textContent = login
  
  buttonAuth.style.display = 'none'
  userName.style.display = 'inline'
  buttonOut.style.display = 'block'

  buttonOut.addEventListener('click', logOut)
  

}

function notAutorized () {
  
  console.log('не авторизован');

  function logIn (event) {
    event.preventDefault()
    if(validName(loginInput.value)) {
      login = loginInput.value
      localStorage.setItem('Dilivery', login)
      toggleModalAuth()
      buttonAuth.removeEventListener('click', toggleModalAuth)
      closeAuth.removeEventListener('click', toggleModalAuth)
      logInForm.removeEventListener('submit',  logIn)
      logInForm.reset()
      checkAuth()
    }else{
      loginInput.style.borderColor = '#ff0000'
      loginInput.value = ''
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit',  logIn)
  modalAuth.addEventListener('click', function (event) {
    console.log(event.target);
    if(event.target.classList.contains('is-open')) {
      toggleModalAuth()
    }
  })
}

function checkAuth() {
  if(login){
    autorized()
  }else{
    notAutorized()
  }
};

function createCardRestaurants(){
  const card = `
    <a class="card card-restaurant">
      <img src="img/gusi-lebedi/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Гуси Лебеди</h3>
          <span class="card-tag tag">75 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 000 ₽</div>
          <div class="category">Русская кухня</div>
        </div>
      </div>
    </a>
  `
  cardRestaurants.insertAdjacentHTML('beforeend', card)
}

function createCardGood () {
  const card = document.createElement('div')
  card.className= 'card';
  card.insertAdjacentHTML('beforeend', `
    <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Везувий</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
          «Халапенье», соус «Тобаско», томаты.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">545 ₽</strong>
      </div>
    </div>
  
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event){
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if(login){
    if(restaurant){
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      createCardGood();
      createCardGood();
      createCardGood();
    }
  }else{
    toggleModalAuth()
  }
  
}

// cardsMenu.addEventListener('click', toggleModal)
buttonAuth.addEventListener('click', clearForm)
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function () {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})

createCardRestaurants()

checkAuth();

new Swiper ('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  autoplay: true,
  cubeEffect:{
    shadow: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    
  }
})

