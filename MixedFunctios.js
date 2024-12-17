let listcart = JSON.parse(localStorage.getItem("listcart")) || {};
export function addToCart(produuct) {
  if (!listcart[produuct.id]) {
    listcart[produuct.id] = { ...produuct };
    listcart[produuct.id].cn = 1;
  } else {
    listcart[produuct.id].cn++;
  }

  let discountCN = produuct.discount || 0;
  discountCN *= 10;
  if (discountCN > 100) discountCN /= 10;
  let afterdiscoun = produuct.price - (discountCN * produuct.price) / 100;

  listcart[produuct.id].afterDiscount = afterdiscoun.toFixed(2);

  updateCartCounter();

  localStorage.setItem("listcart", JSON.stringify(listcart));

}

export function updateCartCounter() {
  let counttotal=0;
  Object.values(listcart).forEach((product) => {
    counttotal+=product.cn;
  });
 document.querySelector(".cart-count").innerHTML = counttotal;
}
