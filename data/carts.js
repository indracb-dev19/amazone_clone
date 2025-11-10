export const carts = [];

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

  // update total item
  let totalProduct = 0;

  carts.forEach((item) => (totalProduct += item.quantity));

  document.querySelector(".cart-quantity").innerHTML = totalProduct;
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