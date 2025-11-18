import { removeFromCart, getCarts, updateCartQuantity, getTotalItem } from "../data/carts.js";
import { products } from "../data/products.js";
import { centsToDollar } from "../helper/moneyConverter.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let htmlCartOrderItem;

// get carts from storage
const carts = getCarts();
carts.forEach((cartItem) => {
  const product = products.find((item) => item.id === cartItem.productId);

  if (product) {
    product.quantity = cartItem.quantity;
    htmlCartOrderItem += generateCheckoutProductHTML(product);
    // put html
    document.querySelector(".order-summary").innerHTML = htmlCartOrderItem;
  }
});

setTotalItem();

function setTotalItem() {
  document.querySelector("#total-order-item").innerHTML = getTotalItem();
}

function getDeliveredDate(addedDays) {
  const today = dayjs();
  const deliveredDate = today.add(Number.parseInt(addedDays), 'days');
  return deliveredDate.format("dddd, MMM D YYYY");
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
                      Quantity: <span class="quantity-label" id="quantity-label-${
                        product.id
                      }">${product.quantity}</span>
                      <input type="hidden" id="update-cart-qty-input-${
                        product.id
                      }" class="update-cart-qty-input" value="${
                        product.quantity
                      }" min="1">
                    </span>
                    <span class="save-update-quantity-link link-primary" id="save-update-quantity-${
                      product.id
                    }" data-product-id="${product.id}" hidden>
                      Save
                    </span>
                    <span class="update-quantity-link link-primary" id="update-quantity-${
                      product.id
                    }" data-product-id="${product.id}">
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
                            ${getDeliveredDate(7)}
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
                            ${getDeliveredDate(3)}
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
                            ${getDeliveredDate(1)}
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
        // remove from cart
        removeFromCart(productId);

        // remove element
        document.getElementById(`cart-item-container-${productId}`).remove();

        //set total item
        setTotalItem();
      }
    }
  });
});

// action for update quantity
document.querySelectorAll(".update-quantity-link").forEach((updateItem) => {
  // get product id
  const { productId } = updateItem.dataset;

  updateItem.addEventListener("click", () => {
    const qtyInput = document.getElementById(
      `update-cart-qty-input-${productId}`
    );
    const qtyLabel = document.getElementById(`quantity-label-${productId}`);
    const saveLink = document.getElementById(
      `save-update-quantity-${productId}`
    );
    const updateLink = document.getElementById(`update-quantity-${productId}`);

    // remove type attr for input and set again
    qtyInput.removeAttribute("type");
    qtyInput.setAttribute("type", "number");

    saveLink.removeAttribute("hidden");
    qtyLabel.setAttribute("hidden", true);
    updateLink.setAttribute("hidden", true);
  });
});

// action for save quantity update
document.querySelectorAll(".save-update-quantity-link").forEach((saveItem) => {
  // get product id
  const { productId } = saveItem.dataset;

  saveItem.addEventListener("click", () => {
    const qtyInput = document.getElementById(
      `update-cart-qty-input-${productId}`
    );
    const qtyLabel = document.getElementById(`quantity-label-${productId}`);
    const saveLink = document.getElementById(
      `save-update-quantity-${productId}`
    );
    const updateLink = document.getElementById(`update-quantity-${productId}`);

    // save quantity first

    if (updateCartQuantity(productId, qtyInput.value)) {
      // remove type attr for input and set again
      qtyInput.removeAttribute("type");
      qtyInput.setAttribute("type", "hidden");

      saveLink.setAttribute("hidden", true);
      qtyLabel.removeAttribute("hidden");
      updateLink.removeAttribute("hidden");
      qtyLabel.innerHTML = qtyInput.value;
      setTotalItem();
    } else {
      alert("Failed update quantity");
    }
  });
});
