import { CardComponent } from '../components/card-libros.js';
import { pedirLibros }   from '../services/libros-index.js';
import { pedirPaginas}   from '../services/libros-index.js';

let indexer = 1;
let paginas = 1;
export const RenderLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        let resenia = element.resenia;
        let img = element.imagen;
        $("#root").append(
            `
             
                <div class="card" style="width: 16rem;">
                <a id="linkFavorito"class="linkFav" href="#" ><i class="Favorito far fa-heart"></i></a>
                <img src="${img}" class="card-img-top" alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${name}</h5>
                <p class="card-text">${resenia}</p>
                <div class="mt-auto">
                <a href="#" class="btn btn-primary mt-2">Agregar a carrito</a>
                <a href="#" class="btn btn-primary mt-2"><button class="btn_card card_btn" id="libroId-${element.id}">+ info</button></a>
                
                </div>
                
                 </div>
                </div>




            `
        )
        
        $(`#libroId-${element.id}`).click(function (e) { 
            localStorage.setItem("idLibro",element.id)
        })
        
    });
}
export const cambiarColor =( )=>{
    let elemento = document.getElementById("linkFavorito");
    elemento.addEventListener("click",()=>{
        elemento.style.color="red"
    })
   
}
export const ChargeLibros = () => {
    pedirLibros(indexer,RenderLibros);
}
export const IndexRenderer = () => {
    ChargeLibros();
    ContadorPaginas();
}
const ContadorPaginas = () => {
    paginas = (pedirLibros()/9)+1;
}

$("#siguiente").click(function (e) { 
    indexer += 1;
    $("#root").empty();
    pedirLibros(indexer,RenderLibros);
});
$("#anterior").click(function (e) { 
    if (indexer != 1)
    {
        indexer -= 1;
        $("#root").empty();
        pedirLibros(indexer,RenderLibros);
    }
});
export const CambiarColor=()=>{
    const favorito = document.getElementById("linkFavorito")
    favorito.style.color="red";
}
