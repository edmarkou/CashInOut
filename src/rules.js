export const CashIn = {
  "percents": 0.03,
  "max": {
    "amount": 5,
    "currency": "EUR"
  }
};
export const CashOut = {
  "natural": {
    "percents": 0.3,
    "week_limit": {
      "amount": 1000,
      "currency": "EUR"
    }
  },
  "juridical": {
    "percents": 0.3,
    "min": {
      "amount": 0.5,
      "currency": "EUR"
    }
  }
};