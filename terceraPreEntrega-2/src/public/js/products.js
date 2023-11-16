async function addProduct(id) {
  const cart = getCookie("cart");
  if (cart) {
    const response = await fetch(`/api/carts/${cart}/products/${id}`, {
      method: "PUT",
    });
    const result = await response.json();
  } else {
    //si no encontro la cookie, es porque ya hay un usuario logueado
    const response = await fetch(`/api/carts/products/${id}`, {
      method: "PUT",
    });
    const result = await response.json();
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const btnAddProduct = document.querySelectorAll(".btnAddProduct");

// btnAddProduct.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target.id);
// });
