const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Product = require("../../db").Product;

// const Module = require("../../db").Module;

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product_image",
  },
});

const imageUpload = multer({ storage: cloudStorage });
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    console.log("route here");
    try {
      const product = await Product.findAll();
      res.send(product);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (e) {
      console.log(e);
    }
  });

router.post(
  "/:id/upload",
  imageUpload.single("images"),
  async (req, res, next) => {
    try {
      const product = await Product.update(
        { imageUrl: req.file.path },
        { where: { id: req.params.id }, returning: true }
      );
      if (product) {
        res.send(product[1]);
      } else {
        res.send("Not Found");
      }
    } catch (e) {
      console.log(e);
    }
  }
);

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const product = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(product);
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const product = await Product.destroy({ where: { id: req.params.id } });
      console.log(product);
      if (product > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
