export let carts = [];

// total item
let totalProduct = 0;

export function updateCart(productId) {
  const cartStorage = getCarts();
  if (cartStorage !== null) {
    carts = cartStorage;
  }

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
      deliveryOptionId: 1,
    });
  }

  // save cart
  saveCart();
}

export function updateCartQuantity(productId, productQuantity) {
  carts = getCarts();

  carts.find((cartItem) => cartItem.productId === productId).quantity =
    Number.parseInt(productQuantity);
    
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
  // get carts from storage
  const cartStorage = getCarts();
  if (cartStorage !== null) {
    carts = cartStorage;
  }

  carts = carts.filter((cartItem) => cartItem.productId !== productId);
  // save cart
  saveCart();
}

export function getCarts() {
  try {
    return JSON.parse(localStorage.getItem("cart"));
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getTotalItem() {
  const total = Number.parseInt(localStorage.getItem("totalCartItem"));

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

  localStorage.setItem("totalCartItem", totalProduct.toString());
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  carts = getCarts();

  carts.find((cartItem) => cartItem.productId === productId).deliveryOptionId =
    Number.parseInt(deliveryOptionId);

  saveCart();
}
