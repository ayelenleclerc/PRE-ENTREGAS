const products = document.getElementById("cartContainer");
const comprar = document.getElementById("purchaseBtn");

const response = async () => {
  const cart = getCookie("cart");
  if (cart) {
    const response = await fetch(`/api/carts/${cid}`, { method: "GET" });
    const result = await response.json();
  } else {
    //si no encontro la cookie, es porque ya hay un usuario logueado
    const response = await fetch(`/api/sessions/current`, { method: "GET" });
    const result = await response.json();
    const user = result.payload.email;
    const idCart = result.payload.cart;
    const cartID = await fetch(`/api/carts/${idCart}`, { method: "GET" });
    const resultCart = await cartID.json();
    const productsInCart = resultCart.payload.products;
    let total = 0;

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

    productsInCart.forEach((product) => {
      total += product.product.price * product.quantity;
    });
    const amount = total.toFixed(2);
    products.innerHTML += `
    <td></td><td></td><td></td><td></td><td></td><td><strong>Total</strong></td>
    <td><strong>$ ${amount}</strong></td>
    `;
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
response();

comprar.addEventListener("click", () => {
  const cart = getCookie("cart");
  if (cart) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Por favor, inicia sesión para realizar la compra",
      footer: '<a href="/">Registrate o inicia sesión</a>',
    });
  }
});
