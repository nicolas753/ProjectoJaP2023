document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      // Simula una autenticación exitosa
      // Guarda el estado de autenticación en Session Storage
      sessionStorage.setItem("isLoggedIn", "true");
      // Redirige a la página principal
      window.location.href = "index.html";
    }
  });
});




