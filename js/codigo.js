const aplicacion = document.querySelector('.content__main_grid div');
const gc2 = document.querySelector('.content__main_grid #gridChild2');
const gc3 = document.querySelector('.content__main_grid #gridChild3 .libroPrecio');

const url = 'https://localhost:44331/api/Libro?id=';
const url2 = 'https://localhost:44381/api/CarroLibro';
const url3 = 'https://localhost:44381/api/Ventas?UsuarioId=';

function obtenerLocalStorage(){
    let userId = localStorage.getItem("usuarioId");
    let idLibro = localStorage.getItem("libroId");
}

function InfoLibro(idLibro){
    fetch(url + idLibro)
    .then(response => response.json())
    .then(response => {
        aplicacion.innerHTML = `
            <img class="libroImagen" src="${response.imagen}">
            `;

        gc2.innerHTML = `
            <h1 class="titulo">${response.titulo}</h1>
            <h1 class="libroAutor">Autor: ${response.nombreAutor}</h1>
            <h1 class="libroReseña">${response.resenia}</h1>
            <h1 class="titulo">Ficha Técnica:</h1>
            <h1 class="libroEditorial">Editorial: ${response.editorial}</h1>
            <h1 class="fechaPublicacionLibro">Fecha publicación: ${response.fechaDePublicacion}</h1>
        `;

        gc3.innerHTML = `
            <h1 class="libroPrecio">$ ${response.precio},00</h1>
        `;
    })
    .catch(err => console.log(err));
}

var boton = document.getElementById('btn');
boton.addEventListener("click", clicked);

function clicked(){
    fetch(url3 + userId, {
        method : "POST",
        headers: {"Content-type" : "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));

    fetch(url2, {
        method : "POST",
        body : JSON.stringify({
            "libroid" : idLibro,
            "usuarioId" : userId
        }),
        headers: {"Content-type" : "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));

    alert("Se agregó el libro al carro");
}

