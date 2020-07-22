import { serveCustomer } from '../src/customer_methods.js';
import { roundNumber } from '../src/helpers.js';

test("Test 1", () => {
    expect(serveCustomer({ 
        "date": "2016-01-05", 
        "user_id": 1, 
        "user_type": "natural", 
        "type": "cash_in",
        "operation": { "amount": 200.00, "currency": "EUR" }}, {})
    ).toBe("0.06");
});

test("Test 2", () => {
    expect(serveCustomer({ 
        "date": "2016-01-05",
        "user_id": 1, 
        "user_type": "natural", 
        "type": "cash_in", 
        "operation": { 
            "amount": 200.00, 
            "currency": "EUR" 
        }}, {})
    ).toBe("0.06");
});

test("Test 3", () => {expect(serveCustomer({}, {})).toBe(null);

});
test("Test 4", () => {
    expect(serveCustomer({ 
        "date": "2016-01-10", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_out", 
        "operation": { 
            "amount": 10000.00, 
            "currency": "EUR" 
        }}, {})
    ).toBe("27.00");
});
test("Test 5", () => {
    expect(serveCustomer({ 
        "date": "2016-01-10", 
        "user_id": 2, 
        "user_type": "juridical", 
        "type": "cash_out", 
        "operation": { 
            "amount": 1000.00, 
            "currency": "EUR" 
        }}, {})
    ).toBe("3.00");
});
test("Test 6", () => {
    expect(serveCustomer({ 
        "date": "2016-01-10", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_out", 
        "operation": { 
            "amount": 1000.00, 
            "currency": "EUR" 
        }}, 
        {
            "2": {
                "weekly_amount": 700, 
                "last_natural_cashout_date": "2016-01-08"
            }
        })
    ).toBe("2.10");
});

test("Test 7", () => {
    expect(serveCustomer({ 
        "date": "2016-01-08", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_out", 
        "operation": { 
            "amount": 900.00, 
            "currency": "EUR" 
        }}, 
        {
            "2": {
                "weekly_amount": 1200, 
                "last_natural_cashout_date": "2016-01-08"
            }
        })
    ).toBe("2.70");
});

test("Test 8", () => {
    expect(serveCustomer({ 
        "date": "2016-01-08", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_out", 
        "operation": { 
            "amount": 900.00, 
            "currency": "EUR" 
        }}, 
        {
            "2": {
                "weekly_amount": 1200, 
                "last_natural_cashout_date": "2016-02-08"
            }
        })
    ).toBe("0.00");
});

test("Test 9", () => {
    expect(serveCustomer({ 
        "date": "2016-01-10", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_out", 
        "operation": { "amount": 200.00, "currency": "EUR" }}, 
        {"weekly_amount": 700, "last_natural_cashout_date": "2016-01-08"})
    ).toBe("0.00");
});

test("Test 10", () => {
    expect(serveCustomer({ 
        "date": "2016-01-06", 
        "user_id": 2, 
        "user_type": "juridical", 
        "type": "cash_out", 
        "operation": { 
            "amount": 0.01, "currency": "EUR" 
        }}, {})
    ).toBe(null);
});

test("Test 11", () => {
    expect(serveCustomer({ 
        "date": "2016-01-06", 
        "user_id": 2, 
        "user_type": "natural", 
        "type": "cash_in", 
        "operation": { 
            "amount": 100000.00, 
            "currency": "EUR" 
        }}, {})
    ).toBe("5.00");
});

test("Test 12", () => {
    expect(serveCustomer({ 
        "date": "2016-01-06", 
        "user_id": 2, 
        "user_type": "juridical", 
        "type": "cash_out", 
        "operation": { 
            "amount": 0.01, 
            "currency": "EUR" 
        }}, {})
    ).toBe(null);
});

test("Test 13", () => {
    expect(roundNumber(0.30011111, 3)).toBe(0.301);
});

test("Test 14", () => {
    expect(roundNumber(102, 2)).toBe(102);
});