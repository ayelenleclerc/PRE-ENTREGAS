export default class ProductsService {
  constructor(manager) {
    this.manager = manager;
  }
  getProducts = (params) => {
    return this.manager.getProducts(params);
  };
  paginateProducts = () => {
    return this.manager.paginateProducts(params, paginateOptions);
  };
  getProductBy = (params) => {
    return this.manager.getProductBy(params);
  };
  createProduct = (product) => {
    return this.manager.createProduct(product);
  };
  updateProduct = (id, product) => {
    return this.manager.updateProduct(id, product);
  };
  deleteProduct = (id) => {
    return this.manager.deleteProduct(id);
  };
}
