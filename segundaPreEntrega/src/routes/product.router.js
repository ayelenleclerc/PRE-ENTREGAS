import { Router } from "express";
import ProductsManager from "../dao/managers/productManager.js";
const router = Router();
const productsService = new ProductsManager();

//endpoint "/products"
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const paginationResult = await productsService.getProducts(page, limit);

    const products = paginationResult.docs;
    const currentPage = paginationResult.page;
    const {
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      totalDocs,
      totalPages,
    } = paginationResult;

    const baseUrl = `${req.protocol}://${req.hostname}:${
      process.env.PORT || 8080
    }${req.baseUrl}`;
    const prevLink = hasPrevPage
      ? `${baseUrl}?page=${prevPage}&limit=${limit}`
      : null;
    const nextLink = hasNextPage
      ? `${baseUrl}?page=${nextPage}&limit=${limit}`
      : null;

    const paginationData = {
      currentPage,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      totalDocs,
      totalPages,
      prevLink,
      nextLink,
    };

    res.send({ status: "success", payload: products, ...paginationData });
  } catch (error) {
    res.json({ error: error });
  }
});

//endpoint product by id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsService.getProductsById(pid);
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      res.status(400).send({ status: "error", message: "Incomplete values" });
    }
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };

    const result = await productsService.createProduct(newProduct);
    res.send({ status: "success", payload: result._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const { title, description, code, price, status, stock, category } =
      req.body;

    const updateProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    };

    const product = await productsService.getProductsById({ _id: id });
    if (!product)
      return res
        .status(404)
        .send({ status: "error", error: "Videojuego no existe" });
    const result = await productsService.updateProduct(id, updateProduct);
    res.send({ status: "success", message: "Product updated" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const result = await productsService.deleteProduct(id);
    res.send({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
