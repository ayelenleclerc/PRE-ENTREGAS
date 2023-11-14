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
  return res.send({ status: "success", payload: cart });
};
const createCart = async (req, res) => {
  const result = await cartsService.createCart(cart);
  return res.send({ status: "success", payload: result._id });
};

const deleteProduct = async (req, res) => {
  //accedo a la lista de carritos para ver si existe el id buscado
  const cartId = await cartsService.getCartById(cid);
  // como me traer un array en vez del objeto directamente, tomo la posicion 0 para tener el objeto
  let objCart = await cartId[0];
  if (objCart) {
    //busco en el carrito el producto a eliminar y valido que exista
    const productId = await objCart.products.find(
      (product) => product.product._id == pid
    );
    if (productId) {
      let arrayProducts = await objCart.products;
      let newArrayProducts = await arrayProducts.filter(
        (product) => product.product._id != pid
      );

      if (newArrayProducts) {
        await cartsService.updateCart(
          { _id: cid },
          { products: newArrayProducts }
        );
        return "Deleted successfully";
      }
    } else {
      return `Product not found`;
    }
  } else {
    return "Cart Not Found";
  }
};

//agregar un producto al carrito

const addProduct = async (req, res, next) => {
  const { cid, pid, quantity } = req.params;
  const product = await productsService.getProductBy({
    _id: req.params.pid,
  });
  let cart;
  if (cid) {
    cart = await cartsService.getCartById({ _id: cid });
  } else {
    cart = await cartsService.getCartById({ _id: req.user.cart });
  }
  const quantityAdd = quantity ? quantity : 1;

  if (cart) {
    if (product) {
      let arrayProducts = await cart.products;
      let positionProduct = arrayProducts.findIndex(
        (product) => product.product._id == pid
      );

      if (positionProduct != -1) {
        arrayProducts[await positionProduct].quantity =
          arrayProducts[positionProduct].quantity + quantityAdd;
      } else {
        arrayProducts.push({ product: pid, quantity: quantityAdd });
      }
      await cartsService.updateCart(
        { _id: cart._id },
        { products: arrayProducts }
      );
      return res.send({ status: "success", message: "Added successfully" });
    } else {
      return res.send({ status: "error", message: "Product not found" });
    }
  } else {
    return res.send({ status: "error", message: "Cart not found" });
  }
};

//actualizar la cantidad de un producto en el carrito

const updateProduct = async (req, res) => {
  const { cid, pid, quantity } = req.params;
  //accedo a la lista de carritos para ver si existe el id buscado
  const cartId = await cartsService.getCartById(cid);
  const quantityAdd = quantity ? quantity : 1;
  // como me traer un array en vez del objeto directamente, tomo la posicion 0 para tener el objeto
  let objCart = await cartId[0];
  if (objCart) {
    const productId = await objCart.products.find(
      (product) => product.product._id == pid
    );
    if (productId) {
      let arrayProducts = await objCart.products;
      let positionProduct = await arrayProducts.findIndex(
        (product) => product.product._id == pid
      );
      //actualizo la cantidad para el id del producto que quiero actualizar
      arrayProducts[await positionProduct].quantity = quantityAdd;
      await cartsService.updateCart({ _id: cid }, { products: arrayProducts });
      return res.send({
        status: "success",
        message: "Product updated successfully",
      });
    } else {
      return res.send({ status: "error", message: "Product not found" });
    }
  } else {
    return res.send({ status: "error", message: "Cart not found" });
  }
};

const deleteTotalProduct = async (req, res) => {
  const { cid } = req.params;
  //accedo a la lista de carritos para ver si existe el id buscado
  const cart = await cartsService.getCartById({ _id: cid });
  if (cart) {
    await cartsService.updateCart({ _id: cid }, { products: [] });
    return res.send({
      status: "success",
      message: "All products deleted successfully",
    });
  } else {
    return res.send({ status: "error", message: "Cart not found" });
  }
};

const updateCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById({ _id: cid });

  if (!cart) {
    return res.status(404).send({ status: "error", message: "Cart not found" });
  }

  await cartsService.updateCart({ _id: cid }, { products: [] });

  res.send({
    status: "success",
    message: "Cart updated successfully",
  });
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
  addProduct,
  updateProduct,
  deleteProduct,
  deleteTotalProduct,
  updateCart,
  deleteCart,
};
