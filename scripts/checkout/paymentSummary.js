import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { Cart } from "../../data/carts-class.js";
import { centsToDollar } from "../../helper/moneyConverter.js";

export function renderPaymentSummaryHTML() {
  // init cart class
  const cart = new Cart("cart");
  let cartItemAmount = 0;
  let shippingAmount = 0;
  const tax = 10 / 100;

  const taxString = `${tax * 100} %`;

  cart.items.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    cartItemAmount += cartItem.quantity * product.priceCents;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingAmount += deliveryOption.priceCents;
  });

  const totalAmountWithoutTax = cartItemAmount + shippingAmount;
  const taxAmount = totalAmountWithoutTax * tax;
  const totalAmount = totalAmountWithoutTax + taxAmount;

  document.querySelector(".payment-summary").innerHTML = `
    
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.totalItem}):</div>
            <div class="payment-summary-money">$${
              cartItemAmount === NaN ? 0 : centsToDollar(cartItemAmount)
            }</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${
              shippingAmount === NaN ? 0 : centsToDollar(shippingAmount)
            }</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${
              totalAmountWithoutTax === NaN
                ? 0
                : centsToDollar(totalAmountWithoutTax)
            }</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (${taxString}):</div>
            <div class="payment-summary-money">$${
              taxAmount === NaN ? 0 : centsToDollar(taxAmount)
            }</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${
              totalAmount === NaN ? 0 : centsToDollar(totalAmount)
            }</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

    `;

  document
    .querySelector(".place-order-button")
    .addEventListener("click", async () => {
      try {
        const order = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart.items,
          }),
        }).then(
          (response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw 'error send order';
            }
          }
        );
      } catch (error) {
        alert("Failed to create orders");
      }
    });
}
