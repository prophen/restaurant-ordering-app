import { menuArray } from "./data.js";
const orderArray = [];

function renderMenu(arr) {
  let htmlString = "";
  arr.forEach((item) => {
    htmlString += `
    <div class="menu-item">
      <div class="emoji">${item.emoji}</div>
      <div class="details">
          <h3 class="item-name">${item.name}</h3>
          <p class="ingredients">${item.ingredients}</p>
          <p class="price">$${item.price}</p>
      </div>
      <button id="${item.id}">+</button>
    </div>
    `;
  });

  document.querySelector(".menu").innerHTML = htmlString;
}

function addOrderItem(arr, orderId) {
  const item = arr.filter((item) => item.id == orderId)[0];
  orderArray.push(item);
  let orderString = `
    <div class="order-items">
      <span>${item.name}</span>
      <button class="remove-btn" data-id="${item.id}">remove</button>
      <span class="price">$${item.price}</span>
    </div>
  `;
  document.querySelector(".order-details").style.visibility = "visible";
  document.querySelector(".order-list").innerHTML += orderString;
  getTotalPrice();
}

function getTotalPrice() {
  let totalPrice = 0;
  orderArray.forEach((item) => {
    totalPrice += item.price;
  });
  document.querySelector(".total-section .price").innerText = `$${totalPrice}`;
}

document.addEventListener("click", (e) => {
  if (e.target.id in menuArray.map((item) => item.id)) {
    addOrderItem(menuArray, e.target.id);
  }

  if (e.target.dataset.id) {
    const orderItemIndex = orderArray.findIndex(
      (item) => item.id == e.target.dataset.id
    );
    orderArray.splice(orderItemIndex, 1);
    e.target.parentElement.remove();
    getTotalPrice();
    if (orderArray.length === 0) {
      document.querySelector(".order-details").style.visibility = "hidden";
    }
  }

  if (e.target.id === "order-btn") {
    document.querySelector(".modal").classList.remove("hidden");
  }
});

document.querySelector("#payment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('input[aria-label="name"]');
  document.querySelector(".order-details").classList.add("hidden");
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".confirmation").classList.remove("hidden");
  document.querySelector(
    ".confirmation p"
  ).textContent = `Thanks, ${nameInput.value}! Your order is on its way!`;
});
renderMenu(menuArray);
