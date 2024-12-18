import { addToCart } from "./MixedFunctios.js";

// localStorage.clear();
document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    processData(productId);
  } else {
    document.body.innerHTML = "<h1>Product not found!</h1>";
  }

  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(
        `https://fakestoreapi.in/api/products/${productId}`
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error in fetch data", error);
    }
  }

  async function processData(productId) {
    const apiData = await fetchProductDetails(productId);
    if (apiData) {
      performAction(apiData.product);
    }
  }

  function performAction(product) {
    let containCard = document.querySelector(".all");
    let discountCN = product.discount || 0;
    discountCN *= 10;
    if (discountCN > 100) discountCN /= 10;

    containCard.innerHTML = `   <div class="images">
            <img src="${product.image}" />
          </div>
          <div class="contain">
            <h2 class="category">${product.category}</h2>
            <h2 class="lbl">${product.title}</h2>
            <p class="des">
              ${product.description}
            </p>
            <div class="prices">
              <div>
                <p class="price pric" >${product.price}$</p>
                <p><span class="discount dis">${discountCN}%</span></p>
              </div>
              <p class="afterdiscount">3</p>
            </div>
  
            <div class="cn_cart">
              <div class="count">
                <button type="button" class="dec" class="decreament">-</button>
                <button type="input" class="numbers">1</button>
                <button type="button" class="inc"  class="increament">+</button>
              </div>
  <button class="add_cart" type="button">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>add to cart</p>
              </button>
            </div>
          </div>`;
    discount(product.price, discountCN);

    let count;
    count = Number(document.querySelector(".numbers").innerHTML);

    document.querySelector(".dec").addEventListener("click", () => {
      count--;
      if (count < 0) count = 0;
      document.querySelector(".numbers").innerHTML = count;
    });
    document.querySelector(".inc").addEventListener("click", () => {
      count++;
      document.querySelector(".numbers").innerHTML = count;
    });

    document
      .querySelector(".add_cart")
      .addEventListener("click", () => addToCart(product, count));

    //------------------------------
  }
  let afterdiscoun;
  function discount(pric, discoun) {
    afterdiscoun = (discoun * pric) / 100;
    document.querySelector(".afterdiscount").innerHTML = `${(
      pric - afterdiscoun
    ).toFixed(2)}$`;
  }
});
// new Swiper(".sale_Sec", {
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   slidesPerView: 3,
//   spaceBetween: 10,
//   loop: true,
// });

const response = await fetch("https://fakestoreapi.in/api/products");
const data = await response.json();
const productsToDisplay = data.products.slice(0, 5);
productsToDisplay.forEach((product) => {
  let div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `<div class="iconns">
                <span><i class="fa-solid fa-cart-shopping"></i></span>
                <span> <i class="fa-solid fa-heart"></i></span>
                <i class="fa-solid fa-share"></i>
              </div>
              <span class="sale_discount">20%</span>
              <img src="${product.image}" />
              <h3><a href="#">${product.model}</a></h3>
              <div class="Stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="price">
                <p><span>${product.price}$</span></p>
                
              </div>
              <button class="shop-now">Buy Now</button>

            `;

  div.querySelector(".shop-now").addEventListener("click", () => {
    addToCart(product, 1);
  });

  document.querySelector(".products").appendChild(div);
});
