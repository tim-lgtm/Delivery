const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// DAY ONE

const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')

let login = localStorage.getItem('Dilivery')
console.log('login: ', login);

function toggleModalAuth (){
  modalAuth.classList.toggle('is-open')
}


function autorized (){
  
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

function notAutorized (){
  
  console.log('не авторизован');

  function logIn (event) {
    event.preventDefault()
    if(loginInput.value.trim()){
      login = loginInput.value
      localStorage.setItem('Dilivery', login)
      toggleModalAuth()
      buttonAuth.removeEventListener('click', toggleModalAuth)
      closeAuth.removeEventListener('click', toggleModalAuth)
      logInForm.removeEventListener('submit',  logIn)
      logInForm.reset()
      checkAuth()
    }else{
      alert('Введите Ваш логин');
      return
    }
    
    
  }



  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit',  logIn)
}


function checkAuth() {
  if(login){
    autorized()
  }else{
    notAutorized()
  }
}
checkAuth()
