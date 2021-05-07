const route = require("express").Router();

const reviewsRoute = require("./reviews");
const productsRoute = require("./product");

route.use("/reviews", reviewsRoute);
route.use("/products", productsRoute);

module.exports = route;
