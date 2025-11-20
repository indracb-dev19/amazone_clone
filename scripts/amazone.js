import { updateCart, successAddedToCart, getTotalItem } from "../data/carts.js";
import { products } from "../data/products.js";
import { centsToDollar } from "../helper/moneyConverter.js";

let productsHTML = "";

// set total item first load
setTotalItem();

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.generateImage()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.generatePrice()}
          </div>

          <div class="product-quantity-container">
            <select id="select-product-qty-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" id="success-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
    `;
});

document.getElementById("product-list").innerHTML = productsHTML;

// add to cart button
document.querySelectorAll(".add-to-cart-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;
    updateCart(productId);
    successAddedToCart(productId);
    setTotalItem();
  });
});

function setTotalItem() {
  document.querySelector('.cart-quantity').innerHTML = getTotalItem();
}
