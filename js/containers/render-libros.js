import { CardComponent } from '../components/card-libros.js';
import { parseJwt } from '../components/nav-var.js';
import { AgregarQuitarFav } from '../services/FetchFavoritos.js';
import { pedirLibros }   from '../services/libros-index.js';
import { pedirPaginas}   from '../services/libros-index.js';

let indexer = 1;
let paginas = 1;
export const RenderLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        let resenia = element.resenia;
        let img = element.imagen;
        let precio=element.precio;
        $("#root").append(
            `
            
    <div class="wrapper">
        <div class="container">
            <img class="top" src="${img}" alt="">
            <div class="bottom">
                <div class="left">
                    <div class="details">
                        <h2 class="txt_products">${name}</h2>
                                
                    </div>
                    <div id="libroId-${element.id}" class="buy">
                        <a href="#">
                            <i class="fas fa-heart"></i>
                        </a>
                    </div>
                                
                </div>
            </div>
                    
            <div class="inside">
            <div class="icon">
                <i class="far fa-eye"></i>
            </div>
            <div class="contents">
                <h1>${name}</h1>
                <p>${resenia}</p>
                <p> $${precio}</p>
            </div>
        </div>
   </div>


            `
        )
        
        $(`#libroId-${element.id}`).click(function (e) { 
        
            localStorage.setItem("idLibro",element.id)
            AgregarAfavoritos();
        })
        
    });
}
const AgregarAfavoritos=()=>{
    if(verificarSeccion){
       var usuario= parseJwt(localStorage.getItem("token"))
         AgregarQuitarFav(localStorage.getItem("idLibro"),usuario.id,localStorage.getItem("token"),AgregadoExitoso)
    }
}
const AgregadoExitoso=()=>{
    alert("Se agrego")
}

const verificarSeccion=()=>{
    if (localStorage.getItem("token")==undefined){
        return false;
    }
    else{
        return true;
    }
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
