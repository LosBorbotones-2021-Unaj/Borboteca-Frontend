import { LibrosDelCarro,TotalYBotonComprar } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares,SinLibros } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro,CompraFinalizada, DeleteLibroFromCarro } from '../services/FetchServices.js'
import { GetLibros,CerrarCarroActual,DeleteVenta } from '../services/FetchServices.js'
import {parseJwt} from '../components/nav-var.js'

let token = localStorage.getItem("token");
let Usuario = parseJwt(token);
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
                
                 CarritoContainer.innerHTML = SinLibros();
                 CompraFinalizada(Usuario.id,token);
                 CerrarCarroActual(Usuario.id,token);
                 
            }) 
            
            var btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");
            var divList = document.querySelectorAll(".container_Libro");
            btnDeleteLibros.forEach((cadaButton,i)=>{
                
                
                btnDeleteLibros[i].addEventListener('click',()=>{
                   
                    
                    let datos ={ libroid : divList[i].classList.item(1) , usuarioid : Usuario.id };

                    DeleteLibroFromCarro(JSON.stringify(datos),token);    
                        
                    CarritoContainer.removeChild(divList[i]);



                    if(CarritoContainer.childElementCount <= 3)
                    {
                        CarritoContainer.innerHTML = SinLibros();
                        DeleteVenta(Usuario.id,token);
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
    
    GetLibrosDelCarro(Usuario.id,RenderLibros);
}


const PromiseToLibro = async (divList,total,ContainerComprar) => {

    for (let div of divList) {
        let libro = await GetLibros(div.classList.item(1));
        total += libro.precio;              
                            
    }

    ContainerComprar.innerHTML = TotalYBotonComprar(total);
    let btn = document.querySelector(".BotonCompra");
        
            btn.addEventListener('click',()=>{
                 
                 CarritoContainer.innerHTML = SinLibros();
                 CompraFinalizada(Usuario.id,token);
                 CerrarCarroActual(Usuario.id,token);
                 
            }) 
}