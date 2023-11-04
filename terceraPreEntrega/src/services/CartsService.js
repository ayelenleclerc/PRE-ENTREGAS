export default class CartsService {
  constructor(manager) {
    this.manager = manager;
  }

  getCartById = (cid) => {
    return this.manager.getCartById(cid);
  };
  createCart = (cart) => {
    return this.manager.createCart(cart);
  };
  updateCart = (id, cart) => {
    return this.manager.updateCart(id, cart);
  };
  deleteCart = (id) => {
    return this.manager.deleteCart(id);
  };
}
