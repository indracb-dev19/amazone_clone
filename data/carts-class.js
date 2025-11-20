// we also can recreate object with a better way, using Class
// Class more cleaner and have more feature than function

class Cart {
  items; // -> public property
  totalItem = 0;
  #localStorageKey; // -> private property, only can access inside this class

  constructor(_localStorageKey) {
    this.#localStorageKey = _localStorageKey;
    this.#loadCartsFromStorage();
  }

  #loadCartsFromStorage() { // -> private method
    // to access the variable inside object, we can use "this" or the object name "cart"
    this.items = JSON.parse(localStorage.getItem(this.#localStorageKey)) ?? [];
  }

  saveCart() { // -> public method
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
    this.calculateItem();
  }

  calculateItem() {
    let total = 0;
    this.items.forEach((item) => (total += item.quantity));

    this.totalItem = total;

    localStorage.setItem("totalCartItem-oop", this.totalItem.toString());
  }

  updateCart(productId) {
    const existingItem = this.items.find(
      (item) => item.productId === productId
    );
    let productQty = 1;

    if (document.getElementById(`select-product-qty-${productId}`)) {
      productQty = document.getElementById(
        `select-product-qty-${productId}`
      ).value;
    }

    if (existingItem) {
      existingItem.quantity += Number.parseInt(productQty);
    } else {
      this.items.push({
        productId,
        quantity: Number.parseInt(productQty),
        deliveryOptionId: 1,
      });
    }

    // save cart
    this.saveCart();
  }

  updateCartQuantity(productId, productQuantity) {
    this.items.find((cartItem) => cartItem.productId === productId).quantity =
      Number.parseInt(productQuantity);

    this.saveCart();
  }

  successAddedToCart(productId) {
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

  removeFromCart(productId) {
    this.items = this.items.filter(
      (cartItem) => cartItem.productId !== productId
    );
    // save cart
    this.saveCart();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    this.items.find(
      (cartItem) => cartItem.productId === productId
    ).deliveryOptionId = Number.parseInt(deliveryOptionId);

    this.saveCart();
  }
}

// how we call the Class
const cart = new Cart('cart-oop');
// "cart" is an instance of Cart class that have access to every method and property in it
