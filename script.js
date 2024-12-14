/*====================login================*/








/*================navbar&footer===========*/
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        });
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
});


/*================slider===============*/
const images = [
    "images/phone.png",
    "images/welcome.png",
    "images/gaming.png",
    "images/audio.png"
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

// تغيير الصورة تلقائيًا كل 3 ثواني
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length; // تحديث الفهرس بشكل دائري
    updateSliderContent(currentIndex);
}, 3000);

// أول تحديث للصورة عند تحميل الصفحة
updateSliderContent(currentIndex);
https://fakestoreapi.in/api/products

/*====================products====================*/
document.addEventListener('DOMContentLoaded', () => {
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.in/api/products');

            // التأكد من أن الاستجابة هي JSON وليست صفحة HTML
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // التحقق من محتوى البيانات
            if (data && data.products && Array.isArray(data.products)) {
                const productsContainer = document.querySelector('.productoverview');
                if (productsContainer) {
                    data.products.forEach(product => {
                        const productHTML = `
                            <div class="product-details">
                                <div class="product-img">
                                    <img src="${product.image}" alt="${product.title}">
                                </div>
                                <p >$${product.title}</p>
                                <p >$${product.price}</p>
                                <button class="shop-now" >Buy Now</button>
                            </div>
                        `;
                        productsContainer.innerHTML += productHTML;
                    });
                } else {
                    console.error("Element with class 'productoverview' not found.");
                }
            } else {
                console.error("Invalid data format or missing 'products' array.");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchProducts();
});
