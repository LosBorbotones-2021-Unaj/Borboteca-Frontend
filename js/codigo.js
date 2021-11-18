function InfoLibro () {
    //Libro
    fetch(url + localStorage.getItem('idLibro'))
        .then(response => response.json())
        .then(response => {
            console.log(response);
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

const aplicacion = document.querySelector('.content__main_grid div');
const gc2 = document.querySelector('.content__main_grid #gridChild2');
const gc3 = document.querySelector('.content__main_grid #gridChild3 .libroPrecio');

const url = 'https://localhost:44363/api/Libro/PedirLibroId?id=';
const url2 = 'https://localhost:44381/api/CarroLibro';


var boton = document.getElementById('btn2');
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


window.onload= () => {
    console.log(localStorage);
    InfoLibro();
}


