const url = window.location.pathname;
const productos = document.querySelector(".productos");
const API = "https://fakestoreapi.com/products";
const INDEX = "/index.html";
const GIT = "/tuMercado/index.html";

console.log(url)
const options = {method: 'GET', headers: {accept: 'application/json'}};
const mostrarProductos = () => {
    // Esta función evalua en que pagina se encuentra, de esta forma renderiza una vista o otra con los datos consumidos desde la API)
    fetch(API, options)
    .then(res=>res.json())
    // .then(json=>console.log(json))
    .then(res => {
        if (url === INDEX || url === GIT || url === "/tuMercado/" ) { 
            res.map((producto) => { productos.innerHTML += 
                `<div class="articulo">
                    <img src="${producto.image}" alt="${producto.title}"/>
                    <h6>${producto.title}</h6>
                <div/>`}) 
            } else {
                res.map((producto) => {
                productos.innerHTML += `<div class="articulo">
                <img src="${producto.image}" alt="${producto.title}"/>
                <h6>${producto.title}</h6>
                <h6>Precio: ${producto.price}</h6>
                <button>Añadir al Carrito</button>
            <div/>`});}
})
.catch(error => console.error(error));
}

mostrarProductos()
