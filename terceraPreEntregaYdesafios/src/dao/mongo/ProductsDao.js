import productModel from "./models/product.model.js";

export default class ProductsDao {
  getProducts = (params) => {
    return productModel.find(params).lean();
  };
  paginateProducts = (params, paginateOptions) => {
    return productModel.paginate(params, paginateOptions);
  };
  getProductsBy = (params) => {
    return productModel.findOne(params).lean();
  };
  createProduct = (product) => {
    return productModel.create(product);
  };
  updateProduct = (id, product) => {
    return productModel.updateOne({ _id: id }, { $set: product });
  };
  deleteProduct = (id) => {
    return productModel.deleteOne({ _id: id });
  };
}
