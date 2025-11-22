import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHTML } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCarts } from "../data/carts.js";

// there's a better way to run asynchronous code by using async await
// async await is a shortcut of using Promise, so make our code more cleaner
// async await make asynchronous code look like synchronous, so better using async await then Promise and callback

// async make a function return promise
async function loadPage() {
    console.log('load the page');

    // other feature that we can use in async func is, await
    // await is like .then in Promise, it prevent the code run before await get response from promise
    // instead of loadProductsFetch().then(...), use await for fetch data
    // note: we can only use await inside async func
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      loadProducts(() => {
        // we can save this resolve value in a variable
        resolve("value1"); // -> to throw value to another promise, just give a value in resolve func
      });
    })

    // to return a value that can be use out of this function, just return it
    return 'async value';
}

// remember that async function return a promise, so we use then to get the value and go to the next step;
loadPage().then((value) => {
    console.log('next step');
    
    // we get the value of loadPage from the parameter
    console.log(value);
    
});

// we can use All method in Promise class to run some Promise at the same time
// Promise.all([
//   // instead of using loadProducts, lets use loadProductsFetch because it return Promise
//   loadProductsFetch(),
//   //   new Promise((resolve, reject) => {
//   //     loadProducts(() => {
//   //       resolve("value1"); // -> to throw value to another promise, just give a value in resolve func
//   //     });
//   //   }),
//   new Promise((resolve, reject) => {
//     loadCarts(() => {
//       resolve();
//     });
//   }),
// ]).then((values) => {
//   // to receive values from promises, just get it from this func paramater
//   console.log(values);

//   renderOrderSummaryHTML();
//   renderPaymentSummaryHTML();
// });

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
