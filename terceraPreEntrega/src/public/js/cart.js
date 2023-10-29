const products = document.getElementById("cartContainer");

const response = async () => {
  const cart = getCookie("cart");
  if (cart) {
    const response = await fetch(`/api/carts/${cid}`, { method: "GET" });
    const result = await response.json();
  } else {
    //si no encontro la cookie, es porque ya hay un usuario logueado
    const response = await fetch(`/api/sessions/current`, { method: "GET" });
    const result = await response.json();
    const idCart = result.payload.cart;
    const cartID = await fetch(`/api/carts/${idCart}`, { method: "GET" });
    const resultCart = await cartID.json();
    const productsInCart = resultCart.payload.products;

    productsInCart.forEach((product) => {
      products.innerHTML += ` <td>${product.product.title}</td>
                              <td>${product.product.description}</td>
                              <td>${product.product.category}</td>
                              <td>$ ${product.product.price}</td>
                              <td>${product.product.stock}</td>
                              <td>${product.quantity}</td>
                              <td>$ ${
                                product.product.price * product.quantity
                              }</td>
                              
      `;
    });
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
response();
