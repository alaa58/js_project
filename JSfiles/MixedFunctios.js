let listcart = JSON.parse(localStorage.getItem("listcart")) || {};

export function addToCart(produuct, con) {
  if (!listcart[produuct.id]) {
    listcart[produuct.id] = { ...produuct };
    listcart[produuct.id].cn = 1;
  } else {
    console.log(con);
    console.log(typeof con);
    listcart[produuct.id].cn += con;
    console.log(listcart[produuct.id].cn);
  }

  let discountCN = produuct.discount || 0;
  discountCN *= 10;
  if (discountCN > 100) discountCN /= 10;
  let afterdiscoun = produuct.price - (discountCN * produuct.price) / 100;

  listcart[produuct.id].afterDiscount = afterdiscoun.toFixed(2);


  localStorage.setItem("listcart", JSON.stringify(listcart));
  updateCartCounter();

}

export function updateCartCounter() {
  listcart = JSON.parse(localStorage.getItem("listcart")) || {};
  let counttotal = 0;
  console.log(Object.values(listcart).length);
  Object.values(listcart).forEach((product) => {
    counttotal += product.cn;
  });
  document.querySelector(".cart-count").innerHTML = counttotal;
}
