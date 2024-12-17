import { updateCartCounter } from "./MixedFunctios.js";

let listcart = JSON.parse(localStorage.getItem("listcart")) || {};
var total;
let body = document.getElementsByTagName("tbody")[0];
function add() {
  total = 0;
  body.innerHTML = ``;
  Object.values(listcart).forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `  <td class="td1">
              <img src="${product.image}" />
              <a href=href='/productDetails.html?id=${product.id}'>  ${
      product.model
    }</a>
            </td>
            <td class="td2">${product.afterDiscount}</td>
            <td class="td3">
              <div>
                <p>${product.cn}</p>
              </div>
            </td>
            <td class="td4">${(product.cn * product.afterDiscount).toFixed(
              2
            )}$</td>
            <td class="td5"><button class="btnn">&times;</button></td>`;
    row.querySelector(".btnn").addEventListener("click", () => {
      delette(product.id);
    });
    total += product.cn * product.afterDiscount;
    body.appendChild(row);
  });
}

add();

function delette(id) {
  delete listcart[id];
  localStorage.setItem("listcart", JSON.stringify(listcart));
  location.reload();
  add();
  calc();
}

let pr = document.getElementById("pricee");
let sub = document.getElementById("sub");
calc();
function calc() {
  sub.innerHTML = `${total.toFixed(2)}$`;
  pr.innerHTML = `${total.toFixed(2)}$`;
}

document
  .getElementById("chose")
  .setAttribute("href", `/UserDetails.html?check=${0}`);
let choos;
function choose(el) {
  if (el.value != "local") {
    pr.innerHTML = `${(total + 50).toFixed(2)}$`;
    choos = 1;
  } else {
    pr.innerHTML = `${total.toFixed(2)}$`;
    choos = 0;
  }

  document
    .getElementById("chose")
    .setAttribute("href", `/UserDetails.html?check=${choos}`);
}
