const art = document.querySelector("#art")
const productos = document.querySelector(".productos")

const options = {method: 'GET', headers: {accept: 'application/json'}};

const pedirDatos = () => {
    fetch('https://fakestoreapi.com/products', options)
    .then(res=>res.json())
    // .then(json=>console.log(json))
    .then(res => {
        res.map((producto) => {
            art.innerHTML += 
                `<div class="articulo">
                <img src="${producto.image}" alt="${producto.title}"/>
                <h6>${producto.title}</h6>
                <div/>`

})
})
.catch(error => console.error(error));
}


const mostrarProductos = () => {
    fetch('https://fakestoreapi.com/products', options)
    .then(res=>res.json())
    // .then(json=>console.log(json))
    .then(res => {
        res.map((producto) => {
            productos.innerHTML += 
                `<div class="articulo">
                <img src="${producto.image}" alt="${producto.title}"/>
                <h6>${producto.title}</h6>
                <h6>Precio: ${producto.price}</h6>
                <button>Añadir al Carrito</button>
                <div/>`

})
})
.catch(error => console.error(error));
}

pedirDatos()
mostrarProductos()