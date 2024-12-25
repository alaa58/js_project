import { updateCartCounter } from "./MixedFunctios.js";

let listcart = JSON.parse(localStorage.getItem("listcart")) || {};
var total;
let body = document.getElementsByTagName("tbody")[0];
function add() {
  total = 0;
  body.innerHTML = ``;
  Object.values(listcart).forEach((product) => {
    const row = document.createElement("tr");
    row.classList.add("row")
    row.innerHTML = `  <th class="td1 col">
              <a  href='../HTMLfiles/productDetails.html?id=${
                product.id
              }'>   
              <img  src="${product.image}" />
${product.model}</a>
            </th>
            <td class="td2 col">${product.afterDiscount}$</td>
            <td class="td3 col">
              <div>
                <p>${product.cn}</p>
              </div>
            </td>
            <td class="td4 col">${(product.cn * product.afterDiscount).toFixed(
              2
            )}$</td>
            <td class="td5 col"><button class="btnn">&times;</button></td>`;
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
  add();
  updateCartCounter();
  calc();
}

let pr = document.getElementById("pricee");
let sub = document.getElementById("sub");
calc();
function calc() {
  sub.innerHTML = `${total.toFixed(2)}$`;
  pr.innerHTML = `${total.toFixed(2)}$`;
}

//----------------------------
document.querySelectorAll('input[name="shipping"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    choosse(event.target);
  });
});

document
  .getElementById("chose")
  .setAttribute("href", `../HTMLfiles/UserDetails.html?check=${0}`);
let choos;

function choosse(event) {
  if (event.value != "local") {
    pr.innerHTML = `${(total + 50).toFixed(2)}$`;
    choos = 1;
  } else {
    pr.innerHTML = `${total.toFixed(2)}$`;
    choos = 0;
  }

  document
    .getElementById("chose")
    .setAttribute("href", `../HTMLfiles/UserDetails.html?check=${choos}`);
}
