import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHTML } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
    renderOrderSummaryHTML();
    renderPaymentSummaryHTML();
});