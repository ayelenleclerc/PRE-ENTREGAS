export default class CartsService {
  constructor(manager) {
    this.manager = manager;
  }

  getCartById = (cid) => {
    return this.manager.getCartById(cid);
  };
  createCart = () => {
    return this.manager.createCart();
  };
  updateCart = (id, cart) => {
    return this.manager.updateCart(id, cart);
  };
  deleteCart = () => {
    return this.manager.deleteCart(id);
  };
}
