let listcart = JSON.parse(localStorage.getItem("listcart")) || {};

function loadNavbar() {
let counttotal=0;
  Object.values(listcart).forEach((product) => {
    counttotal+=product.cn;
  });
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {

      document.querySelector("header").innerHTML = data;
      document.querySelector(".cart-count").innerHTML=Number(counttotal);


    });
}

function loadFooter() {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    });
}
document.addEventListener("DOMContentLoaded", function () {
  loadNavbar();

  loadFooter();
});
// localStorage.clear();