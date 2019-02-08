/*==============
Variables
================*/
const url = 'https://randomuser.me/api/?results=12&nat=au';
const $employeesContainer = $('#employees');
const overlay = $('#overlay');

/*==============
Fetch Function
================*/

fetch(url)
  .then(response => response.json())
  .then(data => parseData(data))







/*==============
Helper Functions
================*/

function parseData(data) {
  console.log(data);
  let html;
  const employees = data.results;


        /* <div class="card">
            <img src="member-1.jpg" alt="member-1">
            <div class="user-info">
              <div class="name">Judy Nguyen</div>
              <div class="email">jnguyen@example.com</div>
              <div class="city">Sacramento</div>
            </div>
          </div> */

  //Generate HTML to append to DIV
  employees.forEach((employee) => {
    html += '<div class="card">';
    html += `<img src=${employee.picture.medium} alt=${employee.name.first}>`; 
    html += '<div class="user-info">';
    html += `<div class="name">${capitalize(employee.name.first)}` + " " + `${capitalize(employee.name.last)}</div>`;
    html += `<div class="email">${employee.email}</div>`;
    html += `<div class="city">${capitalize(employee.location.city)}</div>`;
    html += '</div>';
    html += '</div>';
  })
  $employeesContainer.html(html);
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};





    