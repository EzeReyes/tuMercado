const art = document.querySelector("#art")

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
                <h6>${producto.price}</h6>
                <div/>`

})
})
.catch(error => console.error(error));
}


pedirDatos()
