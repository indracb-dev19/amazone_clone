import {
  updateCart,
  carts,
  loadCartsFromStorage,
} from "../../../data/carts.js";

// in tests jasmine, the order of code is very important
describe("tests suite: addToCart", () => {
  it("add existing product to cart", () => {
    // mock only run for one test, so if u want to mock, u have to create new one
    // make mocks of localStorage.setItem
    spyOn(localStorage, "setItem");

    // make mocks of localStorage.getItem and set the value to []
    spyOn(localStorage, "getItem").and.callFake(() =>
      JSON.stringify([{ productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 1, deliveryOptionId: 1 }])
    );

    // load data once to set carts to []
    loadCartsFromStorage();

    updateCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(carts.length).toEqual(1);

    // check the mock of localStorage.setItem how many times has been called
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    // check some value in cart
    expect(carts[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(carts[0].quantity).toEqual(2);
  });

  it("add new product to cart", () => {
    // make mocks of localStorage.setItem
    spyOn(localStorage, "setItem");

    // make mocks of localStorage.getItem and set the value to []
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

    // load data once to set carts to []
    loadCartsFromStorage();

    updateCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(carts.length).toEqual(1);

    // check the mock of localStorage.setItem how many times has been called
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    // check some value in cart
    expect(carts[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(carts[0].quantity).toEqual(1);
  });
});
