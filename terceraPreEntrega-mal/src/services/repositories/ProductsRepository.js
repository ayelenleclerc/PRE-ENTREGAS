export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = (params) => {
    return this.dao.getProducts(params);
  };
  paginateProducts = (params, paginateOptions) => {
    return this.dao.paginateProducts(params, paginateOptions);
  };

  getProductBy = (params) => {
    return this.dao.getProductsBy(params);
  };
  createProduct = (product) => {
    return this.dao.createProduct(product);
  };
  updateProduct = (id, product) => {
    return this.dao.updateProduct(id, product);
  };
  deleteProduct = (id) => {
    return this.dao.deleteProduct(id);
  };
}
