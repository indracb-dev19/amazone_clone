import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  removeFromCart,
  updateCartQuantity,
  getTotalItem,
  updateDeliveryOption,
  carts
} from "../../data/carts.js";
import { getProduct } from "../../data/products.js";
import { centsToDollar } from "../../helper/moneyConverter.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummaryHTML } from "./paymentSummary.js";

export function renderOrderSummaryHTML() {
  document.querySelector(".order-summary").innerHTML = carts.map((cartItem) => {
    let html = "";
    const product = getProduct(cartItem.productId);
    if (product && product !== undefined) {
      html += generateCheckoutProductHTML(product, cartItem);
    }
    return html;
  });

  if (document.querySelector("#total-order-item")) {
    document.querySelector("#total-order-item").innerHTML = getTotalItem();
  }

  function getDeliveredDate(addedDays) {
    const today = dayjs();
    const deliveredDate = today.add(Number.parseInt(addedDays), "days");
    return deliveredDate.format("dddd, MMM D YYYY");
  }

  function generateCheckoutProductHTML(product, cartItem) {
    return `
    <div class="cart-item-container" id="cart-item-container-${product.id}">
        <div class="delivery-date">
            Delivery date: <span id="delivery-date-label-${product.id}">
            ${getDeliveredDate(
              deliveryOptions.find(
                (deliveryOption) =>
                  deliveryOption.id === cartItem.deliveryOptionId
              ).deliveryDays
            )}</span>
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
                      }">${cartItem.quantity}</span>
                      <input type="hidden" id="update-cart-qty-input-${
                        product.id
                      }" class="update-cart-qty-input" value="${
      cartItem.quantity
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
                    <span class="delete-quantity-link link-primary" id="delete-product-${
                      product.id
                    }" data-product-id="${product.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${generateDeliveryOptionsHTML(product, cartItem)}
            </div>
        </div>
      </div>
    `;
  }

  function generateDeliveryOptionsHTML(product, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      html += `
      <div class="delivery-option"
          data-product-id="${product.id}"
          data-delivery-option-id="${deliveryOption.id}"
      >
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${product.id}" 
            value="${deliveryOption.id}" 
            ${cartItem.deliveryOptionId === deliveryOption.id ? "checked" : ""}>
          <div>
              <div class="delivery-option-date">
                  ${getDeliveredDate(deliveryOption.deliveryDays)}
              </div>
              <div class="delivery-option-price">
                  ${
                    deliveryOption.priceCents === 0
                      ? "FREE"
                      : "$" + centsToDollar(deliveryOption.priceCents)
                  } - Shipping
              </div>
          </div>
      </div>
    `;
    });

    return html;
  }

  // action for delete product
  document.querySelectorAll(".delete-quantity-link").forEach((deleteItem) => {
    // get product id
    const { productId } = deleteItem.dataset;

    deleteItem.addEventListener("click", () => {
      // get product

      const deletedProduct = carts.find(
        (cartItem) => cartItem.productId === productId
      );

      if (deletedProduct) {
        // remove from cart
        removeFromCart(productId);

        renderOrderSummaryHTML();
        renderPaymentSummaryHTML();
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
      const updateLink = document.getElementById(
        `update-quantity-${productId}`
      );

      // remove type attr for input and set again
      qtyInput.removeAttribute("type");
      qtyInput.setAttribute("type", "number");

      saveLink.removeAttribute("hidden");
      qtyLabel.setAttribute("hidden", true);
      updateLink.setAttribute("hidden", true);
    });
  });

  // action for save quantity update
  document
    .querySelectorAll(".save-update-quantity-link")
    .forEach((saveItem) => {
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
        const updateLink = document.getElementById(
          `update-quantity-${productId}`
        );

        // save quantity first
        try {
          updateCartQuantity(productId, qtyInput.value);
          // remove type attr for input and set again
          qtyInput.removeAttribute("type");
          qtyInput.setAttribute("type", "hidden");

          saveLink.setAttribute("hidden", true);
          qtyLabel.removeAttribute("hidden");
          updateLink.removeAttribute("hidden");

          qtyLabel.innerHTML = qtyInput.value;

          renderOrderSummaryHTML();
          renderPaymentSummaryHTML();
        } catch (error) {
          alert("Failed update quantity");
        }
      });
    });

  document.querySelectorAll(".delivery-option").forEach((elm) => {
    const { productId, deliveryOptionId } = elm.dataset;

    elm.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummaryHTML();
      renderPaymentSummaryHTML();
    });
  });
}
