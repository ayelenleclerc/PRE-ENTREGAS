const profile = document.getElementById("profile");

const response = async () => {
  const response = await fetch("/api/sessions/current", {
    method: "GET",
  });
  const result = await response.json();

  profile.innerHTML = `<h3>${result.payload.name}</h3>`;
};

response();
