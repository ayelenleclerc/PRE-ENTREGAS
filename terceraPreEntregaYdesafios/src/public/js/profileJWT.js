const token = localStorage.getItem("accessToken");

if (!token) window.location.replace("/login");

fetch("/api/sessions/perfileInfo", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const user = data.payload;
    const welcome = document.getElementById("welcome");
    const email = document.getElementById("email");
    welcome.innerHTML = `Hola, ${user.name}, tu rol es: ${user.role}`;
    email.innerHTML = `Email: ${user.email}`;
  });
