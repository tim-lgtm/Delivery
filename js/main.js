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
const restaurantTitle = document.querySelector('.restaurant-title');
const restaurantRating = document.querySelector('.rating');
const restaurantPrice = document.querySelector('.price');
const restaurantCategory = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const clearCart = document.querySelector('.clear-cart'); 
console.log('modalPrice: ', modalPrice);

let login = localStorage.getItem('Dilivery')


const cart = []

const getData = async function(url){
  const response = await fetch(url)

  if(!response.ok){
    throw new Error(`Ошибка по адресу ${url} статут ошибки ${response.status}`)
  }

  return await response.json();

}



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
  buttonOut.style.display = 'flex'
  cartButton.style.display = 'flex'
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

function createCardRestaurants({name, stars, time_of_delivery: timeOfDelivery, price, kitchen,image, products}){

  const cardRestaurant = document.createElement('a');
  cardRestaurant.className = 'card card-restaurant ';
  cardRestaurant.products = products;
  cardRestaurant.info = {name, stars, price, kitchen}

  const card = `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  `
  cardRestaurant.insertAdjacentHTML('beforeend', card)
  cardRestaurants.insertAdjacentElement('beforeend', cardRestaurant)
}
// тест ДЗ



function createCardGood ({id, name, description, price, image}) {

  const card = document.createElement('div')
  card.className= 'card';
  card.id = id
  card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price} ₽</strong>
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
      console.dir(restaurant);
      const {name, price, stars, kitchen} = restaurant.info

      restaurantTitle.textContent = name
      restaurantRating.textContent = stars
      restaurantPrice.textContent = `Цена от ${price} `
      restaurantCategory.textContent = kitchen

      getData(`./db/${restaurant.products}`).then(function(data) {
        data.forEach(createCardGood);
      })
    }
  }else{
    toggleModalAuth()
  }
  
}

function addToCard(event) {
  const target = event.target;
  const buttonAddToCard = target.closest('.button-add-cart')
  
  if(buttonAddToCard){
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCard.id;

    
    console.log();
    const food = cart.find(function (item) {
      return item.id === id;
    });

    if(food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title, 
        cost,
        count: 1
      })
    }
  }
}

function renderCart () {
  modalBody.textContent = ''

  cart.forEach(function ({id, title, cost, count}) {
    const itemCart = `
      <div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price"> ${cost} р</strong>
				<div class="food-counter">
        <button class="counter-button counter-minus" data-id="${id}">-</button>
        <span class="counter">${count}</span>
        <button class="counter-button counter-plus" data-id="${id}">+</button>
					</div>
			</div>
    `;

    modalBody.insertAdjacentHTML('afterbegin', itemCart)
  });

  const totalPrice = cart.reduce(function (result, item) {
    return result + (parseFloat(item.cost) * item.count)
  }, 0);
  modalPrice.textContent = totalPrice + ' P';
};

function changeCount (item) {
  const target = event.target;

  if(target.classList.contains('counter-button')){
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    if(target.classList.contains('counter-minus')){
      food.count--
      if(food.count === 0){
        cart.splice(cart.indexOf(food), 1)
      }
    };
    if(target.classList.contains('counter-plus')) food.count++;
    renderCart( )
  }
 
}


function init () {
  getData('./db/partners.json').then(function(data) {
    data.forEach(createCardRestaurants)
  });
  cardsMenu.addEventListener('click', addToCard)
  buttonAuth.addEventListener('click', clearForm);
  cartButton.addEventListener("click", function () {
    toggleModal();
    renderCart();
  });
  close.addEventListener("click", toggleModal);
  cardRestaurants.addEventListener('click', openGoods);
  modalBody.addEventListener('click', changeCount);
  clearCart.addEventListener('click', function () {
    cart.length = 0;
    renderCart()
  })
  inputSearch.addEventListener( 'keypress', function (event) {

    const value = event.target.value.trim() 
    if(event.charCode === 13) {

      if(!value){
        event.target.value = ' ';
        return
      }
      getData('./db/partners.json')
      .then(function (data) {

        return data.map(function (partner) {
          return partner.products
        })

      })
      .then(function (linksPtoduct) { 
        linksPtoduct.forEach(function (link) {
          getData(`./db/${link}`)
            .then(function (data) {
              
              const resultSerch = data.filter(function (item) {
                const name = item.name.toLowerCase()
                return name.includes(value.toLowerCase())
              }) 
              containerPromo.classList.add('hide');
              restaurants.classList.add('hide');
              menu.classList.remove('hide');
               
              

              restaurantTitle.textContent = 'Результат поиска';
              restaurantRating.textContent = '';
              restaurantPrice.textContent = '';
              restaurantCategory.textContent = 'Разное';
              resultSerch.forEach(createCardGood);

            })
        })
       })

    };

  });


  logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  new Swiper ('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    autoplay: true,
  });
}
init()
checkAuth();




				