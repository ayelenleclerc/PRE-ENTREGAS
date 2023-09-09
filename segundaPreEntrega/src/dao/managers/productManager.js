import productsModel from "../models/product.model.js";

export default class ProductsManager {
  getProducts = (page, limit) => {
    return productsModel.paginate({}, { page, limit, lean: true });
  };

  getProductsById = (pid) => {
    return productsModel.findOne({ _id: pid }).lean();
  };

  createProduct = (product) => {
    return productsModel.create(product);
  };

  updateProduct = (id, product) => {
    return productsModel.updateOne({ _id: id }, { $set: product });
  };

  deleteProduct = (id) => {
    return productsModel.deleteOne({ _id: id });
  };
}
