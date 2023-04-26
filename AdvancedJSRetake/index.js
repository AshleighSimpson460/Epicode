const apiURL = "https://dummyjson.com/products";

function handleDetails(id) {
  /* const params = new URLSearchParams() /
  / params.set("id", id) /
  / const newUrlToFetch = ${apiURL}/${id};
  console.log(newUrlToFetch);
  window.location.href = newUrlToFetch; */

  const newUrlToFetch = `${apiURL}/${id}`;
  console.log(newUrlToFetch);

  // Fetch additional data for the given product ID
  fetch(newUrlToFetch)
    .then(response => response.json())
    .then(productData => {
      // Render your custom website using the productData
      console.log(productData);
      // ... add your custom rendering logic here
      window.location.href = newUrlToFetch
     
    })
    .catch(error => {
      console.error(`Error fetching product data for ID ${id}:, ${error}`);
    });
}

fetch(apiURL)
  .then((res) => res.json())
  .then((items) => {
    console.log(items);

    for (let i = 0; i < items.products.length; i++) {
      let cardDiv = document.getElementById("cardJS");
      cardDiv.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
                <img src="${items.products[i].thumbnail}" class="card-img-top" alt="...">
                <div class="card-body p-2">
                    <h3 class="card-title brand">${items.products[i].brand}</h3>
                    <p class="card-text brand-title">${items.products[i].title}</p>
                    <p class="card-text description">${items.products[i].description}</p>
                    <h6 class="card-subtitle">£<span class="price">${items.products[i].price}</span></h6>
                    <h6 class="card-text rating">Rating: <span>${items.products[i].rating}</span></h6>
                    <h5 class="card-subtitle category">${items.products[i].category}</h5>
                    <button class="btn btn-primary mt-2" onClick="addToCart(event)">Add to Cart</button>
                    <button class="btn btn-primary mt-2" data-id="${items.products[i].id}" onClick="handleDetails(${items.products[i].id})">Details</button>
                    <button id="removebtn"style="display:none" onClick="removeProduct(event)" class="btn btn-primary mt-2">remove</button>
                </div>
            </div>
            `;
    }
  });

const cart = [];
const total = [];



function addToCart(event) {
  const targetEl = event.target.parentNode;

  const cartDiv = document.getElementById("cartDiv");
  const price = document.getElementById("priceTotal");
  const productPrice = targetEl.querySelector(".price").innerText;

  const product = targetEl.querySelector(".brand-title").innerText;

  cart.push(product);

  const newLi = document.createElement("li");
  newLi.innerText = product;
  cartDiv.appendChild(newLi);

  const itemPrice = parseFloat(Number(productPrice).toFixed(2));
  total.push(itemPrice);

  price.innerText = "£" + total.reduce((a, b) => a + b, 0);

  targetEl.querySelector("#removebtn").style.display = "inline-block";
}

function removeProduct(event) {
  const targetEl = event.target.parentNode;
  const productName = targetEl.querySelector(".brand-title").innerText;
  const itemPrice = targetEl.querySelector(".price").innerText;
  const allNames = document.querySelectorAll("#cart-container li");
  const totalPrice = document.querySelector("#priceTotal ");
  for (let i = 0; i < allNames.length; i++) {
    if (productName === allNames[i].innerHTML) {
      allNames[i].remove();
    }
  }
  const reducedPrice = Number(totalPrice.innerText.replace("£", "")) - Number(itemPrice);
  totalPrice.innerText = "£" + parseFloat(reducedPrice).toFixed(2);
}
