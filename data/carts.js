export let carts = [];

// total item
let totalProduct = 0;

export function updateCart(productId) {
  const existingItem = carts.find((item) => item.productId === productId);

  const productQty = document.getElementById(
    `select-product-qty-${productId}`
  ).value;

  if (existingItem) {
    existingItem.quantity += Number.parseInt(productQty);
  } else {
    carts.push({
      productId,
      quantity: Number.parseInt(productQty),
    });
  }

  // save cart
  saveCart();
}

export function successAddedToCart(productId) {
  // show the success added to cart element
  document
    .getElementById(`success-cart-${productId}`)
    .classList.add("show-element");

  // set timeout to hide success message
  setTimeout(() => {
    document
      .getElementById(`success-cart-${productId}`)
      .classList.remove("show-element");
  }, 1000);
}

export function removeFromCart(productId) {
  carts = carts.filter((cartItem) => cartItem.productId !== productId);
  // save cart
  saveCart();
}

export function getCarts() {
  return JSON.parse(localStorage.getItem("cart"));
}

export function getTotalItem() {
  const total = Number.parseInt(localStorage.getItem('totalCartItem'));

  return !total ? 0 : total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(carts));
  calculateItem();
}

function calculateItem() {
  let total = 0;
  carts.forEach((item) => (total += item.quantity));
  
  totalProduct = total;

  localStorage.setItem('totalCartItem', totalProduct.toString());
}
