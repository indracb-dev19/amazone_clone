import { Cart } from "../../../data/carts-class.js";

// in tests jasmine, the order of code is very important
describe("tests suite: addToCart", () => {
  it("add existing product to cart", () => {
    // init class
    const cart = new Cart('cart');

    // make cart.items to empty
    cart.items = [];

    // clear storage
    localStorage.clear();

    // inserting 1 product
    cart.items = [{ productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 1, deliveryOptionId: 1 }];

    cart.updateCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.items.length).toEqual(1);

    // check some value in cart
    expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.items[0].quantity).toEqual(2);
  });

  it("add new product to cart", () => {
    // init class
    const cart = new Cart('cart');
    
    // make cart.items to empty
    cart.items = [];
    
    // clear storage
    localStorage.clear();

    cart.updateCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.items.length).toEqual(1);

    // check some value in cart
    expect(cart.items[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.items[0].quantity).toEqual(1);
  });
});
