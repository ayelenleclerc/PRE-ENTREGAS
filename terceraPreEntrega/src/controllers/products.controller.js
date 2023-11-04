import { generateProducts } from "../mocks/products.js";
import { productsService } from "../services/index.js";

const paginateProducts = async (req, res) => {
  const products = await productsService.paginateProducts(
    {},
    { page: 1, limit: 5 }
  );
  return res.send({ status: "success", payload: products });
};
const getProductsBy = async (req, res) => {
  const { pid } = parseInt(req.params.pid);
  const product = await productsService.getProductBy(pid);
  if (product === "Not Found") {
    return res.status(400).json({ message: "Producto no encontrado" });
  } else if (product) {
    return res.status(200).json(product);
  } else {
    return res.status(400).json({ message: "Producto no encontrado" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productsService.createProduct(req.body);
    if (product === "The insert code already exists") {
      return res
        .status(400)
        .json({ message: "Error al crear el producto", product });
    } else if (product === "Complete all fields") {
      return res
        .status(400)
        .json({ message: "Error al crear el producto", product });
    } else {
      return res.status(201).json({ message: "Producto creado", product });
    }
  } catch (error) {
    throw new error("Error al crear el producto", error);
  }
};
const updateProduct = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productsService.updateProduct(id, req.body);
  if (product) {
    return res.status(200).json({ message: "Producto actualizado", product });
  } else {
    return res.status(400).json({ message: "Error al actualizar el producto" });
  }
};
const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productsService.deleteProduct(id);
  if (product === `Can't find product with id : ${id}`) {
    return res
      .status(400)
      .json({ message: "Error al eliminar el producto", product });
  } else if (product) {
    return res.status(200).json({ message: "Producto eliminado", product });
  } else {
    return res.status(400).json({ message: "Error al eliminar el producto" });
  }
};

const mockingProducts = async (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const mockProduct = generateProducts();
    products.push(mockProduct);
  }
  return res.send({ status: "success", payload: products });
};

export default {
  getProductsBy,
  paginateProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  mockingProducts,
};
