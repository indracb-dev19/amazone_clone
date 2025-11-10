import { removeFromCart, getCarts } from "../data/carts.js";
import { products } from "../data/products.js";
import { centsToDollar } from "../helper/moneyConverter.js";

let htmlCartOrderItem;
let totalOrderItem = 0;

// get carts from storage
const carts = getCarts();
carts.forEach((cartItem) => {
  const product = products.find((item) => item.id === cartItem.productId);

  if (product) {
    calculateTotalItem(cartItem.quantity, "add");
    product.quantity = cartItem.quantity;

    htmlCartOrderItem += generateCheckoutProductHTML(product);

    // put html
    document.querySelector(".order-summary").innerHTML = htmlCartOrderItem;
  }
});

function calculateTotalItem(quantity, calcType) {
  if (calcType === "add") {
    // calculate order item
    totalOrderItem += quantity;
  } else if (calcType === "reduce") {
    // calculate order item
    totalOrderItem -= quantity;
  }
  // set total order item to html
  document.querySelector("#total-order-item").innerHTML = totalOrderItem;
}

function generateCheckoutProductHTML(product) {
  return `
    <div class="cart-item-container" id="cart-item-container-${product.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${product.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    $${centsToDollar(product.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${
                      product.quantity
                    }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${
                      product.id
                    }">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// action for delete product
document.querySelectorAll(".delete-quantity-link").forEach((deleteItem) => {
  // get product id
  const { productId } = deleteItem.dataset;

  deleteItem.addEventListener("click", () => {
    // give user confirmation
    if (confirm("Are you sure want to delete this product?")) {
      // accept to delete product
      // get product

      const deletedProduct = carts.find(
        (cartItem) => cartItem.productId === productId
      );

      if (deletedProduct) {
        // calculate the total item
        calculateTotalItem(deletedProduct.quantity, "reduce");

        // remove from cart
        removeFromCart(productId);

        // remove element
        document.getElementById(`cart-item-container-${productId}`).remove();
      }
    }
  });
});
