const form = document.getElementById("formProducts");
const addCart = document.querySelectorAll(".btn-AddCart");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = FormData(form);
  const obj = {};
  data.forEach((values, key) => {
    obj[key] = values;
  });
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
});

addCart.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.parentNode.parentNode.getAttribute("id");

    const response = await fetch("/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    console.log(response);
  });
});

// const category = [
//   "Akapol",
//   "Bonafide",
//   "Felfort",
//   "Ferrero",
//   "Fun Candy",
//   "Gillete",
//   "Jorgito",
//   "Kinder",
//   "Molinos Cañuelas",
//   "Molinos Rio de la Plata",
//   "Nutella",
//   "Preservativos",
//   "Sedal",
//   "Tabacalera Sarandi",
//   "TicTac",
//   "Valente",
//   "Varios",
// ];
