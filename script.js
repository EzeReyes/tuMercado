const url = window.location.pathname;
const productos = document.querySelector(".productos");
const API = "https://fakestoreapi.com/products";
const INDEX = "/index.html";
const GIT = "/tuMercado/index.html";
const ITEM = "/pages/item.html";
const options = { method: 'GET', headers: { accept: 'application/json' } };

const handleChange = (id) => {
    window.location.href = `${ITEM}?id=${id}`;
};

const mostrarProductos = () => {
    fetch(API, options)
    .then(res => res.json())
    .then(res => {
        if (url === INDEX || url === GIT || url === "/tuMercado/") {
            res.forEach(producto => {
                const productItem = document.createElement('div');
                productItem.classList.add('articulo');

                productItem.innerHTML = `
                    <img src="${producto.image}" alt="${producto.title}"/>
                    <h6>${producto.title}</h6>
                    <button>Ver Detalle</button>
                `;

                const button = productItem.querySelector('button');
                button.addEventListener('click', () => handleChange(producto.id));

                productos.appendChild(productItem);
            });
        } else {
            res.forEach(producto => {
                const productItem = document.createElement('div');
                productItem.classList.add('articulo');

                productItem.innerHTML = `
                    <img src="${producto.image}" alt="${producto.title}"/>
                    <h6>${producto.title}</h6>
                    <h6>Precio: ${producto.price}</h6>
                    <button>Añadir al Carrito</button>
                `;

                productos.appendChild(productItem);
            });
        }
    })
    .catch(error => console.error('Error al obtener los productos:', error));
};

const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

const irADetalle = (id) => {
    fetch(`${API}/${id}`, options)
    .then(res => res.json())
    .then(producto => {
        const productDetailDiv = document.querySelector('.productos');
        const productItem = document.createElement('div');
        productItem.classList.add('articulo');

        productItem.innerHTML = `
            <h2>${producto.title}</h2>
            <img src="${producto.image}" alt="${producto.title}"/>
            <p>${producto.description}</p>
            <p>Precio: ${producto.price}</p>
        `;

        productDetailDiv.appendChild(productItem);
    })
    .catch(error => console.error('Error al obtener el detalle del producto:', error));
};

const productId = getProductIdFromUrl();
if (productId) {
    irADetalle(productId);
} else {
    mostrarProductos();
}

// Menu Hamburguesa

const button = document.querySelector('.button');
const nav = document.querySelector('.nav');
const imgCruz = document.querySelector('.imgCruz');

const opacidad = () => {
    if (nav.classList.contains('activo')) {
        button.style.display = "none";
        imgCruz.style.display = "block";
    } else {
        button.style.display = "block";
        imgCruz.style.display = "none";
    }
};
