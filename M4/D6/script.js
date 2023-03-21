const APIURL = "https://jsonplaceholder.typicode.com/users";
const tableAPI = document.getElementById("tableAPI");
const Addresses = document.getElementById("Addresses");

const awaitFunction = async function () {
  const tableInfo = await fetch(APIURL);
  const response = await tableInfo.json();
  console.log(response);
  tableAPI.innerHTML = "";
  for (let i = 0; i < response.length; i++) {
    tableAPI.innerHTML += `
      <tr class="tableDetails">
        <td class="idNumber">${response[i].id}</td>
        <td class="name">${response[i].name}</td>
        <td class="username">${response[i].username}</td>
        <td class="email">${response[i].email}</td>
        <td class="redirect"><a href="https://jsonplaceholder.typicode.com/users/${response[i].id}"><button>redirect</button></a></td>
      </tr>
      `;
  }
};
awaitFunction();

const listAddresses = async function () {
  const AddressFetch = await fetch(APIURL);
  const response = await AddressFetch.json();

  for (let i = 0; i < response.length; i++) {
    Addresses.innerHTML += `
    <div class="col-12">
      <ul>
        <li>${response[i].address.street}, ${response[i].address.suite}, ${response[i].address.city}, (${response[i].address.geo.lng})</li>
        </ul>
    </div>
      `;
  }
};
listAddresses();

const searchTable = function () {
  const searchEngine = document.getElementById("search-engine");
  const filter = searchEngine.value.toLowerCase();
  const redirect = document.querySelectorAll(".redirect");
  const selectValue = document.getElementById("dropdown");
  const search = document.querySelectorAll(`.${selectValue.value}`);
  
  search.forEach((rows) => {
    let rowContent = rows.textContent;
    if (rowContent.toLowerCase().includes(filter.toLowerCase())) {
      rows.parentElement.style.display = "";
    } else {
      rows.parentElement.style.display = "none";
    }
  });
};