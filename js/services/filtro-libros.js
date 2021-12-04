import {buscarLibros, pedirLibros} from '../services/libros-index.js'
import {RenderLibros} from '../containers/render-libros.js'

export const FiltradorInNav = (palabra) =>{
    let busqueda = document.querySelector(".opciones");
            if(palabra.length == 1){
                buscarLibros(palabra);
                showResults(palabra);
            } else if (palabra.length == 0){
                busqueda.innerHTML ='';
            } else{
                busqueda.innerHTML ='';
                showResults(palabra);
            }
}
export const FiltradorBoton = (palabra) =>{
    buscarLibros(palabra);
    RenderLibros(JSON.parse(localStorage.getItem("libros")));
    var indexer = document.getElementById("indexer")
    indexer.innerHTML = '';
}

function autocompleteMatch(input) {
    let libros = JSON.parse(localStorage.getItem("libros"));
    if (input == '') {
      return [];
    }
    localStorage.setItem("libros-filtrados",JSON.stringify(libros.filter( x => x.titulo.includes(input))));
    return libros.filter( x => x.titulo.includes(input));
  }
  function showResults(val) {
    const res = document.querySelector(".opciones");
    res.innerHTML = '';
    var libros = autocompleteMatch(val);
    let index = 0;
    libros.forEach(elemento => {
        if (index < 4){
            $(".opciones").append( 
                `
                    <a id="${elemento.id}" class="opcion" href="#">
                        <div name="${index}" class="contenido-opcion">
                            <img src="${elemento.imagen}" alt="">
                            <div class="textos">
                                <h1 class="titulo">${elemento.titulo}</h1>
                            </div>
                        </div>
                    </a>
                `);

            $(`#${elemento.id}`).click(function (e) { 
                localStorage.setItem("idLibro",elemento.id);
                window.location.href = "../view/vistaInfoLibro.html";
            });
        }
        else{
            return;
        }
            index ++;
    });
    botonExtra();
  }

function botonExtra (){
    $(".opciones").append( 
        `
            <a id="ver-mas" class="opcion" href="#">
                <div class="contenido-opcion">
                    <div class="textos">
                        <h1 class="titulo">Ver mas +</h1>
                    </div>
                </div>
            </a>
        `);
    const ver_mas = document.getElementById("ver-mas");
    ver_mas.addEventListener("click", function(e){
        $("#root").empty();
        let libros = JSON.parse(localStorage.getItem("libros-filtrados"));
        RenderLibros(libros);
    })
}