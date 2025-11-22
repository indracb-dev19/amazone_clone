import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHTML } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCarts } from "../data/carts.js";

// we can use All method in Promise class to run some Promise at the same time
Promise.all([
  new Promise((resolve, reject) => {
    loadProducts(() => {
      resolve("value1"); // -> to throw value to another promise, just give a value in resolve func
    });
  }),
  new Promise((resolve, reject) => {
      loadCarts(() => {
        resolve();
      });
    })
]).then((values) => {
    // to receive values from promises, just get it from this func paramater
    console.log(values);
    
    renderOrderSummaryHTML();
    renderPaymentSummaryHTML();
});

// promise help us for avoid too many callback nested
// new Promise((resolve, reject) => {
//   loadProducts(() => {
//     resolve("value1"); // -> to throw value to another promise, just give a value in resolve func
//   });
// })
//   .then((value) => {
//     // and get the value from promise before, just access from this value function
//     console.log(value);

//     return new Promise((resolve, reject) => {
//       loadCarts(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummaryHTML();
//     renderPaymentSummaryHTML();
//   });

// loadProducts(() => {
//   loadCarts(() => {
//     renderOrderSummaryHTML();
//     renderPaymentSummaryHTML();
//   });
// });
