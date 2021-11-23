import { LibrosDelCarro,TotalYBotonComprar } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares,SinLibros } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro,CompraFinalizada, DeleteLibroFromCarro } from '../services/FetchServices.js'
import { GetLibros,CerrarCarroActual } from '../services/FetchServices.js'
import {parseJwt} from '../components/nav-var.js'

/*
let UsuarioId =parseInt(localStorage.getItem("UsuarioId"));
let LibroId = parseInt(localStorage.getItem("idLibro"));
*/

let CarritoContainer = document.querySelector(".carrito_SubContainer");
let div = document.createElement("DIV");
let hr = document.createElement("HR");
div.classList.add("container_Info_Libro");
const RenderLibros = async (json) => {

    
    let total=0;
    if(json.librosIds != undefined && json.librosIds != null && json.librosIds.length != 0)
    {
        div.innerHTML = LibrosDelCarro();
        CarritoContainer.appendChild(div);
        CarritoContainer.appendChild(hr);
        for(let libro of json.librosIds)
        {
            div = document.createElement("DIV");
            div.classList.add("container_Libro");
            let respuesta = await GetLibros(libro);
            total += respuesta.precio;
            div.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.imagen,respuesta.nombreAutor,respuesta.precio);
            div.classList.add(`${respuesta.id}`);
            CarritoContainer.appendChild(div);
                    
            
        }

        let ContainerComprar = document.createElement("DIV");
        ContainerComprar.classList.add("container_TotalCompra");
        ContainerComprar.innerHTML = TotalYBotonComprar(total);
        CarritoContainer.appendChild(ContainerComprar);
        let btn = document.querySelector(".BotonCompra");
        
            btn.addEventListener('click',()=>{
                 var decoded = parseJwt(localStorage.getItem("token"));
                 CarritoContainer.innerHTML = SinLibros();
                 CompraFinalizada(95/*decoded.id*/);
                 CerrarCarroActual(95/*decoded.id*/);
                 
            }) 
            
            let btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");
            
            btnDeleteLibros.forEach((cadaButton,i)=>{
                btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");

                btnDeleteLibros[i].addEventListener('click',()=>{

                    let divList = document.querySelectorAll(".container_Libro");
                    let Usuario = parseJwt(localStorage.getItem("token"));
                    let datos ={ libroid : divList[i].classList.item(1) , usuarioid : 95/*Usuario.id*/ };

                    DeleteLibroFromCarro(JSON.stringify(datos));         

                    CarritoContainer.removeChild(divList[i]);
                    divList = document.querySelectorAll(".container_Libro");


                    if(divList.length == 0)
                    {
                        CarritoContainer.innerHTML = SinLibros();
                    }
                    else
                    {
                        total = 0 ;
                        total = PromiseToLibro(divList,total,ContainerComprar);
                        
                    }
                    
                });
            
            })
                
                    
               
            
    }
    else 
    {
        CarritoContainer.innerHTML += SinLibros();
    }
}
export const IndexRender = () => {
    var decoded = parseJwt(localStorage.getItem("token"));
    GetLibrosDelCarro(95/*decoded.id*/,RenderLibros);
}


const PromiseToLibro = async (divList,total,ContainerComprar) => {

    for (let div of divList) {
        let libro = await GetLibros(div.classList.item(1));
        total += libro.precio;              
                            
    }

    ContainerComprar.innerHTML = TotalYBotonComprar(total);
    let btn = document.querySelector(".BotonCompra");
        
            btn.addEventListener('click',()=>{
                 var decoded = parseJwt(localStorage.getItem("token"));
                 CarritoContainer.innerHTML = SinLibros();
                 CompraFinalizada(95/*decoded.id*/);
                 CerrarCarroActual(95/*decoded.id*/);
                 
            }) 
}