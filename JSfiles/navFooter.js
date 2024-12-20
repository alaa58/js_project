let listcart = JSON.parse(localStorage.getItem("listcart")) || {};
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}
function loadNavbar() {
let counttotal=0;
  Object.values(listcart).forEach((product) => {
    counttotal+=product.cn;
  });

  fetch("../HTMLfiles/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      
      document.querySelector("header").innerHTML = data;
      document.querySelector(".cart-count").innerHTML=Number(counttotal);
     document.querySelector(".Nam").innerHTML = getCookie("userName");

    });
}

function loadFooter() {
  fetch("../HTMLfiles/footer.html")
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