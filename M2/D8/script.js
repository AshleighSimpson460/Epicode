// 31) Get the element with an id of "container" from the page
//         32) Get every <td> element from the page
//         33) Use a loop for printing the text inside of every <td> element in the page
//         34) Write a function to change the heading of the page
//         35) Write a function to add an extra row to the table
//         36) Write a function to add a class of "test" to each row in the table
//         37) Write a function to add a red background to every link in the page
//         38) Console log "Page loaded" when the page is correctly loaded
//         39) Write a function to add new items to a unordered list
//         40) Write a function to empty a list

const containerDiv = document.getElementById("container");

// const everyTd = document.querySelectorAll("td")
//     for(let i = 0; i < everyTd.length; i++){
//         const element = everyTd[i];
//         element.innerText = "Printing text inside of every <td> element in the page using a for loop"
// }

const changeHeading = function () {
  const Header = document.getElementsByTagName("h1")[0];
  Header.innerText = "Changing the header";
};
changeHeading();

const newRow = function () {
  const Row = document.querySelectorAll("tr");
  for (let index = 0; index < Row.length; index++) {
    const element = Row[index];
    element.innerHTML += "<tr>This is a new row added by JavaScript</tr>";
  }
};
newRow();

const addClass = function () {
  const CSSClass = document.querySelectorAll("tr");
  for (let i = 0; i < CSSClass.length; i++) {
    const newClass = CSSClass[i];
    newClass.classList.add("test");
  }
};
addClass();

const redBackground = function () {
  const colour = document.querySelectorAll("a");
  for (let i = 0; i < colour.length; i++) {
    const background = colour[i];
    background.style.backgroundColor = "red";
  }
};
redBackground();

alert("Page Loaded");

const addItemsList = function () {
  const newItemList = document.querySelectorAll("ul");
  for (let i = 0; i < newItemList.length; i++) {
    const newList = newItemList[i];
    newList.innerHTML +=
      "<li>This list was added by a Javascript function</li>";
  }
};
addItemsList();

const emptyList = function () {
  const empty = document.querySelectorAll("li");
  for (let i = 0; i < empty.length; i++) {
    const element = empty[i];
    element.innerHTML = "";
  }
};
emptyList();

//         41) Add an eventListener to show an alert when the cursor hovers a link, displaying its href property
//         42) Create a button that will hide every image on the page when clicked
//         43) Create a button that will hide or show the table on the page when clicked
//         44) Write a function for calculating the sum of every number inside all the table cells (if their content is numeric)
//         45) Delete the last letter from the heading each time the user clicks on it
//         46) Change the background color of a <td> if the user clicks on it
//         47) Add a delete button at the bottom of the table, when clicked it should delete a random <td>
//         48) Add automatically a pink border to a cell when the mouse hovers it
//         49) Write a function to create a table with 4 rows and 3 columns programmatically and add it to the bottom of the page
//         50) Write a function to remove the last table from the page

const hoverEffect = document.querySelectorAll("a")
    for(const hover of hoverEffect){
        hover.addEventListener("mouseover",)
    }


hoverEffect

