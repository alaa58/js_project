/*================navbar&footer===========*/
// localStorage.clear();
import { addToCart} from './MixedFunctios.js';
// localStorage.clear();
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
// import { addToCart,updateCartCounter } from "../JSfiles/MixedFunctios";


document.addEventListener("DOMContentLoaded", () => {
  let allProducts = []; // تخزين جميع المنتجات
  const categorySelect = document.getElementById("categorySelect");
  const productsContainer = document.querySelector(".productoverview ");

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.in/api/products");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // التحقق من محتوى البيانات
      if (data && data.products && Array.isArray(data.products)) {
        allProducts = data.products; // تخزين جميع المنتجات

        // التأكد من وجود عنصر المنتجات
        if (productsContainer) {
          // تفريغ المحتوى السابق
          productsContainer.innerHTML = "";

          // إضافة المنتجات إلى الصفحة
          data.products.forEach((product) => {
            // إنشاء عنصر div جديد لكل منتج
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-details");

            // إضافة المحتوى داخل div
            productDiv.innerHTML = `
                            <div class="product-img">
                                <img src="${product.image}" alt="${product.title}">
                            </div>
                            <a href='../HTMLfiles/productDetails.html?id=${product.id}'  class="product_title" >${product.title}</a>
                          
                            <p class="product_price">$${product.price}  <span class="favorite-icon">
                    <i class="fa-regular fa-heart"></i>
                </span></p>
                            <button class="shop-now">Buy Now</button>
                        `;
                        productDiv.querySelector(".shop-now").addEventListener("click", () => {
                         
                            addToCart(product,1); 
                    
                        });
                        
            // إضافة المنتج إلى الحاوية
            productsContainer.appendChild(productDiv);
          });
        } else {
          console.error("Element with class 'productoverview' not found.");
        }
      } else {
        console.error("Invalid data format or missing 'products' array.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function renderProducts(productsToDisplay) {
    productsContainer.innerHTML = ""; // تفريغ المنتجات السابقة
    if (productsToDisplay.length === 0) {
      productsContainer.innerHTML = `<p>No products found for this category.</p>`;
      return;
    }
    productsToDisplay.forEach((product) => {
      productsContainer.innerHTML += `
                <div class="product-details">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <p>${product.title}</p>
                    <p>$${product.price}</p>
                    
                    <button class="shop-now">Buy Now</button>
                </div>
            `;
      document
        .querySelector(".shop-now")
        .addEventListener("click", () => addToCart(product,1));
    });
  }

  function filterProductsByCategory(category) {
    if (category === "all") {
      renderProducts(allProducts); // عرض جميع المنتجات
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      renderProducts(filteredProducts); // عرض المنتجات المصفاة
    }
  }

  categorySelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    filterProductsByCategory(selectedCategory);
  });

  // تحميل المنتجات عند تحميل الصفحة
  fetchProducts();
});
