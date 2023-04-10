const UserRouter = require('./User.routes');
const NewUserRouter = require('./NewUser.routes');
const CustomerRouter = require('./Customer.routes');
const SaleRouter = require('./Sale.routes');
const AdminRouter = require('./Admin.routes');
const SaleProductRouter = require('./SaleProduct.routes');

module.exports = { 
  UserRouter, 
  NewUserRouter, 
  CustomerRouter, 
  SaleRouter, 
  AdminRouter,
  SaleProductRouter,
};
