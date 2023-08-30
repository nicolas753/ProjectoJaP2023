const catID = localStorage.getItem("catID");
const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let productsData = []; // Variable para almacenar los datos de los productos
let currentSortCriteria = "sortByCount"; // Criterio de orden actual
let searchQuery = ""; // Consulta de búsqueda actual

async function fetchProducts() {
    const response = await fetch(url);
    const data = await response.json();

    productsData = data.products;

    const titleSection = document.getElementById("title-section");
    titleSection.innerHTML = ` 
    <h2 class="alert-heading">Productos</h2>
    <p>Verás aquí todos los productos de la categoría ${data.catName}</p>  
`;

    filterAndDisplayProducts();

    const productsList = document.getElementById("products-list");
    data.products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "card mb-3";
        productCard.innerHTML = ` 
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h3 class="card-title">${product.name} - ${product.currency} ${product.cost}</h3>
                        <p class="card-text text-muted">${product.soldCount} vendidos</p>
                    </div>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        </div>
    `;
        productsList.appendChild(productCard);
    });
}


// Resto del código para mostrar los productos y la sección de filtros


function filterAndDisplayProducts() {
    // Filtrar productos por rango de precio y término de búsqueda
    const minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value) || 0;
    const maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value) || Infinity;

    const filteredProducts = productsData.filter(product => {
        const productPrice = parseFloat(product.cost);
        return productPrice >= minPrice && productPrice <= maxPrice &&
            (product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery));
    });


    // Ordena productos según el criterio actual
    const sortedProducts = sortProducts(filteredProducts, currentSortCriteria);

    // Resto del código para mostrar los productos filtrados y ordenados
    const productListElement = document.getElementById("products-list");
    productListElement.innerHTML = ""; // Limpia la lista antes de agregar los productos

    sortedProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "card mb-3";
        productCard.innerHTML = ` 
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h3 class="card-title">${product.name} - ${product.currency} ${product.cost}</h3>
                        <p class="card-text text-muted">${product.soldCount} vendidos</p>
                    </div>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        </div>
    `;
        productListElement.appendChild(productCard);
    });
}

function sortProducts(productsArray, criteria) {
    return productsArray.slice().sort((a, b) => {
        if (criteria === "sortAscPrice") {
            return parseFloat(a.cost) - parseFloat(b.cost);
        } else if (criteria === "sortDescPrice") {
            return parseFloat(b.cost) - parseFloat(a.cost);
        } else if (criteria === "sortDescRelevance") {
            return parseInt(b.soldCount) - parseInt(a.soldCount);
        } else {
            return 0; // No hay ordenamiento, mantiene el orden actual
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();

    // Agrega listeners para los botones de ordenamiento y filtros
    document.getElementById("sortAscPrice").addEventListener("click", function () {
        currentSortCriteria = "sortAscPrice";
        filterAndDisplayProducts();
    });

    document.getElementById("sortDescPrice").addEventListener("click", function () {
        currentSortCriteria = "sortDescPrice";
        filterAndDisplayProducts();
    });

    document.getElementById("sortDescRelevance").addEventListener("click", function () {
        currentSortCriteria = "sortDescRelevance";
        filterAndDisplayProducts();
    });

    document.getElementById("searchInput").addEventListener("input", function () {
        searchQuery = this.value.toLowerCase();
        filterAndDisplayProducts();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        filterAndDisplayProducts();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", filterAndDisplayProducts);
    document.getElementById("rangeFilterPriceMin").addEventListener("click", filterAndDisplayProducts);
    document.getElementById("rangeFilterPriceMax").addEventListener("click", filterAndDisplayProducts);

});


const logUser = localStorage.getItem('email'); //Agarra el usuario que se guardo en el local al ingresar
const navUser = document.querySelector('.navbar-nav'); //llama a la lista del navbar
if (logUser && navUser) {
    const li = document.createElement('li'); //crea elemento li
    li.classList.add('nav-link'); //agrega la clase de boostrap al elemento nuevo
    li.textContent = logUser; //agrega el contenido dentro de logUser (el mail)
    navUser.appendChild(li); //agrega al navbar
}