const products = document.getElementById("cartContainer");
const comprar = document.getElementById("purchaseBtn");

let carrito = [];
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
    let amount = 0;

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
      amount += product.product.price * product.quantity;
    });
    products.innerHTML += `
    <td></td><td></td><td></td><td></td><td></td><td><strong>Total</strong></td>
    <td><strong>$ ${amount}</strong></td>
    `;
    carrito.push(idCart, amount, user);
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
response();

const codeTicket = () => Date.now().toString(15);

comprar.addEventListener("click", () => {
  const cart = getCookie("cart");
  if (cart) {
    window.location = `/`;
  } else {
    console.log(carrito);
    const newCart = {
      code: codeTicket(),
      purchase_datetime: Date.now(),
      amount: parseFloat(carrito[1]),
      purchaser: carrito[2].toString(),
    };

    let cid = carrito[0];
    const response = async () =>
      await fetch(`/api/carts/${cid}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCart),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });

    response();
  }
});
