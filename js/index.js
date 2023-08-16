document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Redirecciona a login si no hay una sesión iniciada y está en index.html
if (!sessionStorage.getItem("isLoggedIn") && window.location.pathname.endsWith("index.html")) {
    window.location.href = "login.html";
  }

