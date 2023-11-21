const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.status === 200) {
    window.location = "/profile";
  }
});

async function restorePassword() {
  Swal.fire({
    text: "Ingresa tu email para restablecer tu contraseña",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas escribir tu email para restablecer tu contraseña";
      }
    },
  }).then(async (result) => {
    try {
      if (result.value) {
        const email = result.value;
        const response = await fetch("/api/sessions/passwordRestoreRequest", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        Swal.fire({
          status: "success",
          text: "Se ha enviado un email para restablecer tu contraseña",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
