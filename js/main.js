const productos = [
    {
        id: "gaseosas-01",
        titulo: "Coca-Cola",
        imagen: "./img/coca-cola.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "gaseosas-02",
        titulo: "Fanta",
        imagen: "./img/fanta.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "gaseosas-03",
        titulo: "Sprite",
        imagen: "./img/sprite.jpeg",
        categoria: {
            nombre: "Gaseosas",
            id: "GASEOSAS"
        },
        precio: 2700
    },
    {
        id: "jugos-01",
        titulo: "Jugo de Naranja",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "jugos-02",
        titulo: "Jugo de Manzana",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "jugos-03",
        titulo: "Jugo de Pomelo",
        imagen: "./img/jugos.jpeg",
        categoria: {
            nombre: "Jugos",
            id: "JUGOS"
        },
        precio: 2000
    },
    {
        id: "aguas-01",
        titulo: "Agua chica",
        imagen: "./img/agua1.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 900
    },
    {
        id: "aguas-02",
        titulo: "Agua grande",
        imagen: "./img/agua2.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 1800
    },
    {
        id: "aguas-03",
        titulo: "bidon",
        imagen: "./img/agua3.jpeg",
        categoria: {
            nombre: "Aguas",
            id: "AGUAS"
        },
        precio: 2700
    },
    {
        id: "vinos-01",
        titulo: "Vino Tinto",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 6000
    },
    {
        id: "vinos-02",
        titulo: "Vino Blanco",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 5000
    },
    {
        id: "vinos-03",
        titulo: "Vino Rosado",
        imagen: "./img/vinos.jpeg",
        categoria: {
            nombre: "Vinos",
            id: "VINOS"
        },
        precio: 5500
    },
    {
        id: "cervezas-01",
        titulo: "Cerveza Rubia",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 3500
    },
    {
        id: "cervezas-02",
        titulo: "Cerveza Negra",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 3500
    },
    {
        id: "cervezas-03",
        titulo: "Cerveza Artesanal",
        imagen: "./img/cervezas.jpeg",
        categoria: {
            nombre: "Cervezas",
            id: "CERVEZAS"
        },
        precio: 4000
    },
    
];




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {


        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else {
            tituloPrincipal.innerText = "ELIJE TU BEBIDA";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



