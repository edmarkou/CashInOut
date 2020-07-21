import { serveCustomer } from './customer_methods.js';
import data from './data.json';

if (Array.isArray(data)) {
  const database = {};
  data.forEach(action => console.log(serveCustomer(action, database)));
} else if (typeof data === 'object') {
  console.log(serveCustomer(data, database));
} else console.log('Invalid input.')