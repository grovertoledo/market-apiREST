const express = require("express");
const ProductService = require("../services/productService");
const validatorHandler = require("../middlewares/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/ProductSchema");

const router = express.Router();
const service = new ProductService();

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("soy filter");
});

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  );

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
  );

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  // res.json(
  //   {
  //     message: "update",
  //     data: body,
  //     id,
  //   }
  // );
  res.json(product);
});

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.patch(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const answer = await service.delete(id);
  // res.json(
  //   {
  //     message: "deletd",
  //     id,
  //   }
  // );
  res.json(answer);
});

module.exports = router;
