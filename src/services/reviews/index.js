const express = require("express");
const Review = require("../../db").Review;
const { Op, Sequelize } = require("sequelize");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    console.log("route here");
    try {
      const review = await Review.findAll();
      res.send(review);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const review = await Review.create(req.body);
      res.send(review);
    } catch (e) {
      console.log(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.send(review);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const review = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(review);
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const review = await Review.destroy({ where: { id: req.params.id } });
      console.log(review);
      if (review > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
