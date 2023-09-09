import { Router } from "express";
import CartsManager from "../dao/managers/cartManager.js";
import ProductsManager from "../dao/managers/productManager.js";

const router = Router();
const cartsService = new CartsManager();
const productsService = new ProductsManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartsService.getCartById(req.params.cid);
    res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cartData = req.body;
    const cart = await cartsService.createCart(cartData);
    res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsService.getCartById(cid);
    if (!cart)
      return res
        .status(400)
        .send({ status: "error", message: "Cart not found." });

    const productExists = await productsService.getProductsById(pid);
    if (!productExists)
      return res
        .status(400)
        .send({ status: "error", message: "Product doesn't exist." });

    const productIsInCart = cart.products.find(({ product }) =>
      product.equals(pid)
    );

    if (!productIsInCart) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      productIsInCart.quantity++;
    }

    await cartsService.updateCart(cid, cart.products);
    res.send({ status: "success", payload: "Product added." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const newProducts = req.body;
    const cart = await cartsService.getCartById(cid);
    if (!cart)
      return res
        .status(400)
        .send({ status: "error", message: "Cart not found" });

    await cartsService.updateCart(cid, newProducts);
    res.send({ status: "success", payload: "Cart updated." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const newQuantity = req.body;
    const cart = await cartsService.getCartById(cid);
    if (!cart)
      return res
        .status(400)
        .send({ status: "error", message: "Cart not found" });
    const productExists = await productsService.getProductsById(pid);
    if (!productExists)
      return res
        .status(400)
        .send({ status: "error", message: "Product doesn't exist." });

    const productIsInCart = cart.products.find(({ product }) =>
      product.equals(pid)
    );
    if (!productIsInCart)
      return res
        .status(400)
        .send({ status: "error", message: "Product not found in cart." });

    await cartsService.updateCarttUnits(cid, pid, newQuantity);
    res.send({ status: "success", payload: "Quantity updated." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartExists = await cartsService.getCartById(req.params.cid);
  if (!cartExists)
    return res
      .status(400)
      .send({ status: "error", message: "Product not found." });
  else {
    const result = await cartsService.deleteAllProductsFromCartById(
      req.params.cid
    );
    res.send({
      status: "success",
      message: "All products have been deleted from cart.",
    });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsService.getCartById(cid);
    if (!cart)
      return res
        .status(400)
        .send({ status: "error", message: "Cart not found." });

    const productExists = await productsService.getProductsById(pid);
    if (!productExists)
      return res
        .status(400)
        .send({ status: "error", message: "Product doesn't exist." });

    const productIsInCart = cart.products.find(({ product }) =>
      product.equals(pid)
    );

    if (!productIsInCart)
      return res
        .status(400)
        .send({ status: "error", message: "Product not found in cart." });

    await cartsService.deleteProductFromCartById(cid, pid);
    res.send({ status: "success", message: "Product deleted." });
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

export default router;
