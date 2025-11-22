import { renderOrderSummaryHTML } from "../../../scripts/checkout/orderSummary.js";
import { Cart } from "../../../data/carts-class.js";
import { loadProducts, loadProductsFetch } from "../../../data/products.js";

// to make a view like the real code, we need to created a container in tests.html

describe("tests suite: renderOrderSummaryHTML", () => {
  const testContainer = document.querySelector(".tests-container");
  const productIdTest1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productIdTest2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // beforeAll hooks runs before all the test run
  beforeAll((done) => {
    // use loadProductsFetch to simplify the code
    loadProductsFetch().then(() => done());

    // loadProducts(() => {
    //   // done func is used to check if we already receive the response from backend
    //   done()
    // });
  });

  // Using hooks to make our code more clean

  // beforeEach hook, let us run code before the test and share variable or value in it
  beforeEach(() => {
    // init class
    const cart = new Cart("cart");
    
    // make cart.items to empty
    cart.items = [];
    
    // clear storage
    localStorage.clear();

    testContainer.innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `;

    [
      {
        productId: productIdTest1,
        quantity: 4,
        deliveryOptionId: 1,
      },
      {
        productId: productIdTest2,
        quantity: 2,
        deliveryOptionId: 1,
      },
    ].forEach((item) => {
      cart.updateCart(item.productId, item.quantity);
    });

    renderOrderSummaryHTML();
  });

  afterEach(() => {
    // after the test passed, remove the html from container
    testContainer.innerHTML = "";
  });

  it("display carts item", () => {
    // check if carts render 2 items
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(2);

    // check if item quantity is correct
    expect(
      document.getElementById(`quantity-label-${productIdTest1}`).innerText
    ).toContain("4");
  });

  it("remove carts item", () => {
    // check if carts render 2 item
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(2);

    // trigger delete link
    document.getElementById(`delete-product-${productIdTest1}`).click();

    // check if carts render 2 item
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);

    // expect that product1 item is empty
    expect(
      document.getElementById(`cart-item-container-${productIdTest1}`)
    ).toEqual(null);

    // expect that product2 item is not empty
    expect(
      document.getElementById(`cart-item-container-${productIdTest2}`)
    ).not.toEqual(null);
  });
});
