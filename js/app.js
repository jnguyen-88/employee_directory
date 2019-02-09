/*==============
Variables
================*/
const url = 'https://randomuser.me/api/?results=12&nat=au';
const employeesContainer = document.querySelector('#employees');
const $overlay = $('#overlay');
const close = document.querySelector('.close');
let employees;


/*==============
Fetch Functions
================*/

fetch(url)
  .then(parseJSON)
  .then(createCards)
  .then(clickCard)



/*==============
 Helper Functions
================*/

function parseJSON(response){
  return response.json();
};

function createCards(data) {
    employees = data.results;
    for(let i = 0; i < employees.length; i++){
      const card = document.createElement('div');
      let employee = employees[i];
      card.id = i;
      card.className = 'card';
      let firstName = capitalize(employee.name.first);
      let lastName = capitalize(employee.name.last);
      let email = employee.email;
      let city = capitalize(employee.location.city)
      card.innerHTML = 
      `
          <img src=${employee.picture.medium} alt=${firstName}>
          <div class="user-info">
            <div class="name">${firstName + " " + lastName}</div>
            <div class="email">${email}</div>
            <div class="city">${city}</div>
          </div>
      `
      employeesContainer.appendChild(card);
    }
}

function clickCard() {
  const cards = document.querySelectorAll('.card');
  for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", function(){
      cardIndex = this.id;
      generateModalHtml(employees, cardIndex)
    })
  }
}

function generateModalHtml(employees, i) {
  const modal = document.createElement('div');
  let date = formatDate(employees[i].dob.date);
  let firstName = capitalize(employees[i].name.first);
  let lastName = capitalize(employees[i].name.last);
  let email = employees[i].email;
  let city = capitalize(employees[i].location.city);
  let state = capitalize(employees[i].location.state);
  let postCode = employees[i].location.postcode;
  let cell = employees[i].cell;
  let street = capitalize(employees[i].location.street);
  modal.id = i;
  modal.className = 'modal-card';
  modal.innerHTML =
      `
        <span class="close">X</span>
        <img src="${employees[i].picture.medium}" alt=>
          <div class="user-info">
          <div class="name">${firstName + " " + lastName}</div>
          <div class="email">${email}</div>
          <div class="city">${city + ", " + state + " " + postCode}</div>
        </div>
        <div class="details">
          <div class="info">${cell}</div>
          <div class="info">${street + " " + city}
          </div>
          <div class="info">Birthday: ${date}</div>
        </div>
        `
        $overlay.show();
        $overlay.html(modal);
        $('.close').click(closeModal)
}


/*============
 Misc Func
=============*/

function capitalize(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function closeModal() {
  $('#overlay').css('display', 'none');
  $('.modal-card').remove();
}

function formatDate(day) {
  var date = new Date(day);
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
}




    