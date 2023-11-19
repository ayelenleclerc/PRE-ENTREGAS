import { generateProducts } from "../mocks/products.js";
import { productsService } from "../services/index.js";
import ErrorsDictionary from "../dictionaries/errors.js";
import errorCodes from "../dictionaries/errorCodes.js";

const paginateProducts = async (req, res, next) => {
  try {
    const products = await productsService.paginateProducts(
      {},
      { page: 1, limit: 5 }
    );
    return res.send({ status: "success", payload: products });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const getProductsBy = async (req, res, next) => {
  try {
    const { pid } = parseInt(req.params.pid);
    const product = await productsService.getProductBy(pid);
    if (product === "Not Found") {
      return res.status(400).json({ message: "Producto no encontrado" });
    } else if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productsService.createProduct(req.body);
    if (product === "The insert code already exists") {
      return res
        .status(400)
        .json({ message: "Error! product not created", product });
    } else if (product === "Complete all fields") {
      return res
        .status(400)
        .json({ message: "Error! product not created", product });
    } else {
      return res.status(201).json({ message: "Product created", product });
    }
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productsService.updateProduct(id, req.body);
    if (product) {
      return res.status(200).json({ message: "Product updated", product });
    } else {
      return res.status(400).json({ message: "Error! product not updated" });
    }
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productsService.deleteProduct(id);
    if (product === `Can't find product with id : ${id}`) {
      return res
        .status(400)
        .json({ message: "Error! Product not deleted", product });
    } else if (product) {
      return res.status(200).json({ message: "Product deleted", product });
    } else {
      return res.status(400).json({ message: "Error! Product not deleted" });
    }
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};

const mockingProducts = async (req, res, next) => {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      const mockProduct = generateProducts();
      products.push(mockProduct);
    }
    return res.send({ status: "success", payload: products });
  } catch (error) {
    const knownError = ErrorsDictionary[error.name];
    const customError = new Error();
    if (knownError) {
      customError.name = knownError;
      customError.message = error.message;
      customError.code = errorCodes[knownError];
      next(customError);
    } else {
      next(error);
    }
  }
};

export default {
  getProductsBy,
  paginateProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  mockingProducts,
};
