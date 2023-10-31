import { cartsService, productsService } from "../services/index.js";

const getCarts = async (req, res) => {
  const carts = await cartsService.getCarts();
  return res.send({ status: "success", payload: carts });
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById({ _id: cid });
  if (!cart)
    return res.status(404).send({ status: "error", message: "Cart not found" });
  res.send({ status: "success", payload: cart });
};
const createCart = async (req, res) => {
  const result = await cartsService.createCart();
  res.send({ status: "success", payload: result._id });
};
const updateCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsService.getCartById({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  const product = await productsService.getProductBy({ pid: pid });
  if (!product)
    return res
      .status(400)
      .send({ status: "error", message: "Product not found" });
  const productExistInCart = cart.products.find((item) => {
    return item.product.toString() === pid;
  });
  if (productExistInCart)
    return res
      .status(400)
      .send({ status: "error", message: "Product already in cart" });
  cart.products.push({ product: pid, quantity: +1 });
  await cartsService.updateCart(cid, {
    products: cart.products,
    quantity: cart.quantity,
  });
  res.send({ status: "success", payload: cart });
};
const updateCartUser = async (req, res) => {
  const { pid } = req.params;
  const cart = await cartsService.getCartById({ _id: req.user.cart });
  if (!cart) {
    return res.status(400).send({ status: "error", message: "Cart not found" });
  }
  const product = await productsService.getProductBy({ _id: pid });
  if (!product)
    return res
      .status(400)
      .send({ status: "error", message: "Product not found" });
  const productExistsInCart = cart.products.find((item) => {
    return item.product.toString() === pid;
  });
  if (productExistsInCart) {
    // Verificar si hay suficiente stock para restar
    if (cart.product.stock > cart.quantity) {
      cart.quantity += 1;
      // Restar del stock del producto
      cart.product.stock -= 1;
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Not enough stock available." });
    }
  } else {
    // Si el producto no está en el carrito, agrégalo con una cantidad de 1
    if (product.stock > 0) {
      cart.quantity += 1;

      cart.products.push({ product: pid, quantity: 1 });
      // Restar del stock del producto
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Product out of stock." });
    }
  }

  await cartsService.updateCart(req.user.cart, {
    products: cart.products,
    quantity: cart.quantity,
  });

  res.send({ status: "success", message: "Cart updated successfully" });
};
const deleteCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.deleteCart({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  await cartsService.deleteCart(cid);
  res.send({ status: "success", message: "Cart deleted successfully" });
};

export default {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  updateCartUser,
  deleteCart,
};
