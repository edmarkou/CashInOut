import { roundNumber } from './helpers.js';
import { CashIn, CashOut } from './rules.js';
import data from './data.json';
import moment from 'moment/min/moment-with-locales';
moment.locale('lt'); // Mon - Sat weeks

const serveCustomer = (action, database) => {
  switch(action.type) {
    case 'cash_out': {
      let fee = 0;
      // checks to see if a legal person is cashing out the minimum amount
      if (action.user_type === 'juridical') {
        // check if the juridical client cashing out the minimum amount
        if (action.operation.amount < CashOut.juridical.min.amount) return null;
        else fee = roundNumber(action.operation.amount / 100 * CashOut.juridical.percents, 2);
      } else if (action.user_type === 'natural') {
        // check if there was a natural cashout from this user
        if (database[action.user_id]) {
          // check if the dates are from the same week
          if (moment(action.date).isSame(database[action.user_id].last_natural_cashout_date, 'week'))
            database[action.user_id].weekly_amount += action.operation.amount; // increase the weekly amount
          else {
            database[action.user_id].weekly_amount = action.operation.amount; // restarts the weekly amount with the new amount taken
          }
          // atach the new cashout date
          database[action.user_id].last_natural_cashout_date = action.date;
        } else {
          // creating a new cashout
          database[action.user_id] = {
            weekly_amount: action.operation.amount,
            last_natural_cashout_date: action.date
          };
        } // check if the weekly amount used is greater than the limit, if yes, a fee is required
        if (database[action.user_id].weekly_amount > CashOut.natural.week_limit.amount) {
          // get the unused weekly limit
          const weekly_limit_unused = CashOut.natural.week_limit.amount - (database[action.user_id].weekly_amount - action.operation.amount);
          if (weekly_limit_unused > 0) 
            fee = roundNumber((action.operation.amount - weekly_limit_unused) / 100 * CashOut.juridical.percents, 2);
          else 
            fee = roundNumber(action.operation.amount / 100 * CashOut.juridical.percents, 2);
        }
      }
      return fee.toFixed(2);
    }
    case 'cash_in': {
      const fee = roundNumber(action.operation.amount / 100 * CashIn.percents, 2);
      // checks to see if the fee exceeds the maximum amount of Cash in
      if (fee > CashIn.max.amount) return CashIn.max.amount.toFixed(2);
      else return fee.toFixed(2);
    }
    default:
      return null;
  }
}

if (Array.isArray(data)) {
  const database = {};
  data.forEach(action => console.log(serveCustomer(action, database)));
} else if (typeof data === 'object') {
  console.log(serveCustomer(data, database));
} else console.log('Invalid input.')