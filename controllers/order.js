const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "error while fetching order" });
      }
      req.order = order;
      next();
    });
};

//create order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, orderFromDb) => {
    if (err) {
      return res.status(400).json({ error: "error while saving order" });
    }
    res.json(orderFromDb);
  });
};

//get all orders
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "no order found in db",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "cannot update order",
        });
      }
      res.json(order);
    }
  );
};
