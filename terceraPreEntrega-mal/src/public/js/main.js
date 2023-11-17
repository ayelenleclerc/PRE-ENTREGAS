const logout = document.getElementById("logout");
const profile = document.getElementById("profile");

const user = async () => {
  const response = await fetch("/api/sessions/current", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.payload) {
        profile.innerHTML = `<h4 class="profileName">Hola ${result.payload.name}</h4>
                        <p class="profileEmail">Email: ${result.payload.email}</p>`;
      }
      return result;
    });
};

async function adios() {
  const response = await fetch("/api/sessions/logout", {
    method: "GET",
  }).then((result) => {
    if (result.status === 200) {
      return (window.location = "/");
    }
  });
}

user();
