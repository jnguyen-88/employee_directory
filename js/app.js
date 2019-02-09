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
  .then(response => response.json())
  .then(data => {
    employees = data.results;
    for(let i = 0; i < employees.length; i++){
      const card = document.createElement('div');
      card.id = i;
      card.className = 'card';
      card.innerHTML = 
      `
          <img src=${employees[i].picture.medium} alt=${employees[i].name.first}>
          <div class="user-info">
            <div class="name">${capitalize(employees[i].name.first)} `  +
            `${capitalize(employees[i].name.last)}</div>
            <div class="email">${employees[i].email}</div>
            <div class="city">${capitalize(employees[i].location.city)}</div>
          </div>
      `
      employeesContainer.appendChild(card);
    }
  })
  .then(function(){
    const cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++){
      cards[i].addEventListener("click", function(){
        cardIndex = this.id;
        generateModalHtml(employees, cardIndex)
      })
    }
  })



/*==============
 Helper Functions
================*/

function parseData(data) {
  let html = [];
  const employees = data.results;
  //Generate HTML to append to DIV
  for(let i = 0; i < employees.length; i++){
    const card = document.createElement('div');
    card.id = i;
    card.className = 'card';
    card.innerHTML = 
    `
        <img src=${employees[i].picture.medium} alt=${employees[i].name.first}>
        <div class="user-info">
          <div class="name">${capitalize(employees[i].name.first) + " " + capitalize(employees[i].name.last)}</div>
          <div class="email">${employees[i].email}</div>
          <div class="city">${capitalize(employees[i].location.city)}</div>
        </div>
    `
      employeesContainer.appendChild(card);
  }
};

function generateModalHtml(employee, i) {
  console.log(employee)
  const modal = document.createElement('div');
  let date = formatDate(employee[i].dob.date);
  modal.id = i;
  modal.className = 'modal-card';
  modal.innerHTML =
      `
        <span class="close">X</span>
        <img src="${employee[i].picture.medium}" alt=>
          <div class="user-info">
          <div class="name">${capitalize(employee[i].name.first) + " " + capitalize(employee[i].name.last)}</div>
          <div class="email">${employee[i].email}</div>
          <div class="city">${capitalize(employee[i].location.city) + ", " + capitalize((employee[i].location.state)) + " " + (employee[i].location.postcode)}</div>
        </div>
        <div class="details">
          <div class="info">${employee[i].cell}</div>
          <div class="info">${capitalize(employee[i].location.street) + " " + capitalize(employee[i].location.city)}
          </div>
          <div class="info">Birthday: ${date}</div>
        </div>
        `
        $overlay.show();
        $overlay.html(modal);
        $('.close').click(function() {
    $('#overlay').css('display', 'none');
    $('.modal-card').remove();
  })
}


/*============
 Misc Func
=============*/

function capitalize(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function addEventListenersToModal() {
  // close button listener
  $('.close').click(function() {
    $('#overlay').css('display', 'none');
    $('.modal-card').remove();
  })
}

function formatDate(day) {
  var date = new Date(day);
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
}




    