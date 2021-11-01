const aplicacion = document.querySelector('.content__main_grid div');
const gc2 = document.querySelector('.content__main_grid #gridChild2');
const gc3 = document.querySelector('.content__main_grid #gridChild3 .libroPrecio');

const idLibro = '39997959-8979-482E-BC70-B7D86941B634'
const idLibro2 = '520B445B-81D4-4D67-AB10-C303D1DE3282'

const url = 'https://localhost:44331/api/Libro?id=' + idLibro;
const url2 = 'https://localhost:44381/api/CarroLibro';

//Libro
fetch(url)
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

var boton = document.getElementById('btn');
boton.addEventListener("click", clicked);

function clicked(){
    fetch(url2, {
        method : "POST",
        body : JSON.stringify({
            "libroid" : "55",
            "carroid" : "2"
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

