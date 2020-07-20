import { roundNumber } from './helpers.js';
import { CashIn, CashOut } from './rules.js';
import data from './data.json';

const moment = require('moment');

const serveCustomer = (action, database) => {
  if (action.type === 'cash_out') {
    // checks to see if a legal person is cashing out the minimum amount
    if (
      action.user_type === 'juridical' && 
      action.operation.amount < CashOut.juridical.min.amount
    ) return;

    const fee = roundNumber(action.operation.amount / 100 * CashOut[action.user_type].percents, 2);
    if (database[action.user_id]) {
      const total_amount = database[action.user_id].total_amount - action.operation.amount - fee;
      database[action.user_id].total_amount = roundNumber(total_amount, 2);
      database[action.user_id].actions.unshift(action);
    } else {
      database[action.user_id] = {
        total_amount: -action.operation.amount - fee,
        actions: [action]
      }
    }
    console.log(fee.toFixed(2));
  } else if (action.type === 'cash_in') {
    const fee = roundNumber(action.operation.amount / 100 * CashIn.percents, 2);
    // checks to see if the fee exceeds the maximum amount of Cash in
    if (fee > CashIn.max.amount) console.log(CashIn.max.amount.toFixed(2));
    else console.log(fee.toFixed(2));
  }
}

if (Array.isArray(data)) {
  const database = {};
  data.forEach(action => serveCustomer(action, database));
} else if (typeof data === 'object') {
  serveCustomer(data, {});
} else console.log('Invalid input.')