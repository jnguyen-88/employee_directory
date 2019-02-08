/*==============
Variables
================*/
const url = 'https://randomuser.me/api/?results=12&nat=au';
const $employeesContainer = $('#employees');
const $overlay = $('#overlay');

/*==============
Fetch Function
================*/

fetch(url)
  .then(response => response.json())
  .then(data => parseData(data))
  .then(function() {
    const cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function(){
      alert("hello")
  });
}
  })


/*==============
Helper Functions
================*/

function parseData(data) {
  console.log(data);
  let html = [];
  const employees = data.results;

  //Generate HTML to append to DIV
  for(let i = 0; i < employees.length; i++){
    html += `
      <div class="card">
        <img src=${employees[i].picture.medium} alt=${employees[i].name.first}>
        <div class="user-info">
          <div class="name">${capitalize(employees[i].name.first)} `  +
          `${capitalize(employees[i].name.last)}</div>
          <div class="email">${employees[i].email}</div>
          <div class="city">${capitalize(employees[i].location.city)}</div>
        </div>
      </div>
    `
  }
  $employeesContainer.html(html);
};



function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};









    