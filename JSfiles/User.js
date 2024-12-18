let listcart = JSON.parse(localStorage.getItem("listcart")) || {};
let parent = document.querySelector(".nameproduct");

var total = 0;
Object.values(listcart).forEach((product) => {
  let div = document.createElement("div");
  div.className = "nameproduct1";
  div.innerHTML = ` <p>${product.model}</p>
          <p>${(product.cn * product.afterDiscount).toFixed(2)}$</p>`;
  total += product.cn * product.afterDiscount;
  document
    .querySelector(".Summary")
    .insertBefore(div, document.getElementById("l"));
});
const check = new URLSearchParams(window.location.search).get("check");
if (check==="0") {
    console.log(check);
  document.querySelector(".kind").innerHTML = `Free Shipping`;
  document.querySelector(".ps").innerHTML = `0$`;
} else {
  document.querySelector(".kind").innerHTML = `Local Shipping`;
  document.querySelector(".ps").innerHTML = `50$`;
  total += 50;
}
document.getElementById("total").innerHTML = `${total.toFixed(2)}$`;
