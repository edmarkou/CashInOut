import { serveCustomer } from '../src/customer_methods.js';
test("Test 1", () => {
    expect(serveCustomer({ "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" }}, {})).toBe("0.06");
});