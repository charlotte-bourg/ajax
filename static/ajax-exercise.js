'use strict';

// PART 1: SHOW A FORTUNE

function showFortune() { // why does this work (not reload page) without evt.preventDefault(); 
  fetch('/fortune') // we don't need to prevent default because there's no form attached :)
    .then((response) => response.text())
    .then((fortune) => {
      document.querySelector('#fortune-text').innerHTML = fortune; 
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  fetch(`${url}?zipcode=${zipcode}`)
    .then((response) => response.json())
    .then((responseData) => {
      document.querySelector('#weather-info').innerHTML = responseData['forecast'];
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  const orderStatus = document.querySelector('#order-status');
  orderStatus.classList.remove('order-error');
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  }
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs), 
    headers: {
      'Content-Type': 'application/json',
    }, //required but don't really need to worry about what this does for the purpose of Hackbright
  })
    .then((response) => response.json())
    .then((responseJson) => {
      orderStatus.innerHTML = responseJson['msg'];
      if (responseJson['code'] === 'ERROR'){
        orderStatus.classList.add('order-error');
      }
    });
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);


function getDogPic(){
  fetch('/dog-pic')
    .then((response) => response.text())
    .then((responseURL) => {
      const dogDiv = document.querySelector('#dog-image'); 
      if (dogDiv.innerHTML.includes('api-img')){
        document.querySelector('#api-img').src = `${responseURL}`
      }
      else{
        dogDiv.insertAdjacentHTML('beforeend',`<br><img id = 'api-img' src = "${responseURL}" width = 500>`);
      }
    });
}

document.querySelector('#get-dog-image').addEventListener('click', getDogPic);