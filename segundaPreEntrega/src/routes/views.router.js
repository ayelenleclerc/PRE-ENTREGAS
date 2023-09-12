import { Router } from "express";
import ProductsManager from "../dao/managers/productManager.js";
import CartsManager from "../dao/managers/cartManager.js";
const router = Router();
const productsService = new ProductsManager();
const cartsService = new CartsManager();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const paginationResult = await productsService.getProducts(page, limit);
    const products = paginationResult.docs;
    const currentPage = paginationResult.page;
    const { hasPrevPage, hasNextPage, prevPage, nextPage } = paginationResult;

    res.render("home", {
      products,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    res.json({ error: error });
  }
});

router.get("/cart", async (req, res) => {
  const cart = await cartsService.getCart();
  const products = cart.products;
  res.render("cart", {
    products,
  });
});

export default router;
