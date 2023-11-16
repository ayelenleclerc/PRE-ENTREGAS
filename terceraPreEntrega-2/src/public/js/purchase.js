const ticket = document.getElementById("ticket");
const finish = document.getElementById("finish");
const response = async () => {
  const response = await fetch("/api/sessions/current", {
    method: "GET",
  });
  const result = await response.json();
  const user = result.payload.name;

  const idCart = result.payload.cart;
  console.log(idCart);

  const ticketID = await fetch(`/api/carts/${idCart}/purchase`, {
    method: "GET",
  });
  const data = await ticketID.json();
  console.log(data.payload);

  ticket.innerHTML = `<h3>Ticket: ${data.payload.code}</h3>
                      <p>Usuario: ${user}</p>
                      <p>Email: ${data.payload.purchaser}</p>
                      <p>Fecha: ${data.payload.purchase_datetime}</p>
                      <div class="total">
                        <p>Total: ${data.payload.amount}</p>
                      </div>
                      `;
  finish.addEventListener("click", async () => {
    const deleteCart = await fetch(`/api/carts/${idCart}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    ticket.innerHTML = "";

    // return window.location.replace("/profile");
  });
};

response();
