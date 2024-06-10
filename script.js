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
                    <a href="./pages/item.html?id=${producto.id}" class="btnDetail"><h6>${producto.title}</h6></a>
                `;

                const buttonDetail = productItem.querySelector('.btnDetail');
                buttonDetail.addEventListener('click', () => handleChange(producto.id));

                productos.appendChild(productItem);
            });
        } else {
            res.forEach(producto => {
                const productItem = document.createElement('div');
                productItem.classList.add('articulo');

                productItem.innerHTML = `
                    <img src="${producto.image}" alt="${producto.title}"/>
                    <a href="/pages/item.html?id=${producto.id}" class="btnDetail"><h6>${producto.title}</h6></a>
                    <h6>Precio: ${producto.price}</h6>
                    <button class="buttonCarrito">Añadir al Carrito</button>
                `;
                productos.appendChild(productItem);

                const buttonCarrito = productItem.querySelector('.buttonCarrito');
                buttonCarrito.addEventListener('click', () => agregarAlCarrito(producto));

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
        const productDetailDiv = document.querySelector('.gridItem');
        const productItem = document.createElement('div');
        productItem.classList.add('flexItem');

        productItem.innerHTML = `
            <div class="item">
            <h2>${producto.title}</h2>
            <img src="${producto.image}" alt="${producto.title}"/>
            <h3>Precio: ${producto.price}</h3>
            <button class="buttonCarrito">Añadir al Carrito</button>
            </div>
            <div class="itemDescription">
            <p>${producto.description}</p>
            </div>
        `;

        productDetailDiv.appendChild(productItem);

        const buttonCarrito = productItem.querySelector('.buttonCarrito');
        buttonCarrito.addEventListener('click', () => agregarAlCarrito(producto));

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

const button = document.querySelector('.buttonMenu');
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

button.addEventListener('click', () => {
    nav.classList.toggle('activo')
    opacidad()
})

imgCruz.addEventListener('click', () => {
    nav.classList.toggle('activo')
    opacidad()
    titulo()
})

// guardamos el carro en local storage
const guardarCarritoEnLocalStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// obtenemos el carro de localstorage
const obtenerCarritoDeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};


let carrito = obtenerCarritoDeLocalStorage();

// AGREGAR PRODUCTOS AL CARRITO ()
const agregarAlCarrito = (carro) => {

    // verifica si existe el elemento
    const productoExiste = carrito.find(elemento => 
        elemento.nombre === `${carro.title}`)

        
        if (productoExiste) {
            console.log('El producto existe');
            // Incrementar la cantidad del producto existente
            productoExiste.cantidad += carro.cantidad ? carro.cantidad : 1;
        } else {
            console.log('El producto no existe');
            // Agregar el nuevo producto al carrito
            const nuevoProducto = {
                nombre: carro.title,
                precio: carro.price,
                imagen: carro.image,
                cantidad: carro.quantity ? carro.quantity : 1
            };
            carrito.push(nuevoProducto);
            guardarCarritoEnLocalStorage(carrito);
        }
    }

    
const carritoDeCompra = document.querySelector('.carritoDeCompra');

// Agrega productos al array carrito, previo a realizar la subida a LocalStorage
const productosEnCarrito = (productos) => {
    productos.forEach(producto => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('carrito-item');    
        itemCarrito.innerHTML = `
            <img class="imgItem" src=${producto.imagen} alt=${producto.nombre}/>
            <h3>${producto.nombre}</h3>
            <h3>${producto.precio}</h3>
            <h3>${producto.cantidad}</h3>
            <button class="buttonEliminar">Eliminar</button>
        `;
        carritoDeCompra.appendChild(itemCarrito);

        const buttonEliminar = itemCarrito.querySelector('.buttonEliminar');
        buttonEliminar.addEventListener('click', () => eliminarUnProducto(producto.nombre));

})
}
productosEnCarrito(carrito)

// Se encarga de actualizar el carrito, es decir limpiarlo
const limpiarCarro = () => {
    itemCarrito = document.querySelector('.carrito-item');
    itemCarrito.innerHTML = ``;
    carritoDeCompra.appendChild(itemCarrito)
}

// Filtra el producto por nombre y lo elimina
const eliminarUnProducto = (product) => {
    elementoEliminado = carrito.indexOf(product.nombre)
    carrito.splice(elementoEliminado, 1)
    limpiarCarro()
    guardarCarritoEnLocalStorage(carrito)
    carrito = obtenerCarritoDeLocalStorage()
}

// Agrega numero de elementos en barra de navegación
    const numeroCompra = (p) => {
        const nro = document.querySelector('.numero');
        const h5 = document.createElement('h5');
        h5.innerHTML = `
        ${p.length}
        `;

    nro.appendChild(h5);
    }
    numeroCompra(carrito)
