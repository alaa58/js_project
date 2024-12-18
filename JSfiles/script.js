/*===============scrool-up===============*/
window.addEventListener("scroll", function() {
  const scrollToTopButton = document.getElementById("scrollToTop");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopButton.style.display = "block";
  } else {
      scrollToTopButton.style.display = "none";
  }
});

document.getElementById("scrollToTop").addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*================navbar&footer===========*/

/*================slider===============*/
const images = [
  "images/phone.png",
  "images/welcome.png",
  "images/gaming.png",
  "images/audio.png",
];

let currentIndex = 0;

const sliderImage = document.querySelector(".banner-img img");

function updateSliderContent(index) {
  sliderImage.src = images[index];

  sliderImage.style.opacity = 0;

  setTimeout(() => {
    sliderImage.style.transition = "opacity 1s ease";
    sliderImage.style.opacity = 1;
  }, 500);
}
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSliderContent(currentIndex);
}, 3000);
updateSliderContent(currentIndex);

/*====================products====================*/
import { addToCart } from "./MixedFunctios.js";

document.addEventListener("DOMContentLoaded", () => {
  let allProducts = []; // Store all products
  let currentPage = 1; // Keep track of the current page
  const categorySelect = document.getElementById("categorySelect");
  const productsContainer = document.querySelector(".productoverview ");
  const loadMoreButton = document.querySelector(".loadmore-button");

  // Variable to store the selected category
  let selectedCategory = "all";

  // Function to fetch products
  async function fetchProducts(page) {
    try {
      const response = await fetch(`https://fakestoreapi.in/api/products?page=${page}&limit=8`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check if products are available
      if (data && data.products && Array.isArray(data.products)) {
        const products = data.products;
        allProducts = allProducts.concat(products); // Append new products to existing

        // Render filtered products based on category
        renderProducts(allProducts, selectedCategory);

        // If no products were returned, disable the "Load More" button
        if (products.length === 0) {
          loadMoreButton.disabled = true;
        }
      } else {
        console.error("Invalid data format or missing 'products' array.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to render products based on category
  function renderProducts(productsToDisplay, category) {
    if (!productsContainer) {
      console.error("Products container not found.");
      return;
    }

    // Filter products by category before rendering
    const filteredProducts = category === "all"
      ? productsToDisplay
      : productsToDisplay.filter((product) => product.category === category);

    // Clear existing products
    productsContainer.innerHTML = "";

    // Render the filtered products
    filteredProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-details");
      
      // Create product item
      productDiv.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <a href='../HTMLfiles/productDetails.html?id=${product.id}' class="product_title">${product.title}</a>
        <p class="product_price">$${product.price} <span class="favorite-icon">
            <i class="fa-regular fa-heart"></i>
        </span></p>
        <button class="shop-now">Buy Now</button>
      `;
      
      // Add "Buy Now" functionality
      productDiv.querySelector(".shop-now").addEventListener("click", () => {
        addToCart(product, 1);
      });

      // Append the product div to the container
      productsContainer.appendChild(productDiv);
    });
  }

  // Function to handle category change
  categorySelect.addEventListener("change", (event) => {
    selectedCategory = event.target.value; // Update selected category
    renderProducts(allProducts, selectedCategory); // Re-render with new category filter
  });

  // Event listener for "Load More" button
  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    fetchProducts(currentPage); // Fetch more products
  });

  // Initial fetch of products when the page loads
  fetchProducts(currentPage);
});
