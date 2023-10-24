const iconos = document.getElementById("iconos");

const user = async () => {
  const response = await fetch("/api/sessions/current", {
    method: "GET",
  });
  const result = await response.json();
  if (result.payload) {
    iconos.innerHTML = `<div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle botonUser" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                            <i class="fa-solid fa-user fa-beat fa-2xl" style="color: #1f4251;" ></i>
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>${result.payload.name}</li>
                            <li>
                              <a class="dropdown-item Logout" id="logout">LogOut</a>
                            </li>
                          </ul>
                      </div>
                      <div>
                        <a href="/cart" id="carrito">
                          <button class="btn">
                            <i class="fa-solid fa-cart-shopping fa-beat fa-2xl" style="color: #1f4251;">
                            </i>
                          </button>
                        </a>
                      </div>`;
  }

  const logout = document.getElementById("logout");

  logout.addEventListener("click", async () => {
    const response = await fetch("/api/sessions/logout", {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    window.location = "/";
  });
};
user();
