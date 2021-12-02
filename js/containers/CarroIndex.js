import { LibrosDelCarro,MetodosDePago,TotalYBotonComprar } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares,SinLibros } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro,CompraFinalizada, DeleteLibroFromCarro } from '../services/FetchServices.js'
import { GetLibros,CerrarCarroActual,DeleteVenta } from '../services/FetchServices.js'
import {parseJwt} from '../components/nav-var.js'

let token = localStorage.getItem("token");
let Usuario = parseJwt(token);
let CarritoContainer = document.querySelector(".carrito_Container");
let CarritoSubContainer = document.querySelector(".carrito_SubContainer");
let div = document.createElement("DIV");
let hr = document.createElement("HR");
div.classList.add("container_Info_Libro");
const RenderLibros = async (json) => {

    
    let total=0;
    if(json.librosIds != undefined && json.librosIds != null && json.librosIds.length != 0)
    {
        div.innerHTML = LibrosDelCarro();
        CarritoSubContainer.appendChild(div);
        CarritoSubContainer.appendChild(hr);
        for(let libro of json.librosIds)
        {
            div = document.createElement("DIV");
            div.classList.add("container_Libro");
            let respuesta = await GetLibros(libro);
            total += respuesta.precio;
            div.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.imagen,respuesta.nombreAutor,respuesta.precio);
            div.classList.add(`${respuesta.id}`);
            CarritoSubContainer.appendChild(div);
                    
            
        }
        
        let ContainerComprar = document.querySelector(".carrito_Venta");
        ContainerComprar.innerHTML += MetodosDePago();
        ContainerComprar.innerHTML += TotalYBotonComprar(total);
        let btn = document.querySelector(".BotonCompra");
        
            btn.addEventListener('click', ()=>{
                
                 toastr["success"]("Compra realizada exitosamente", "Felicidades!",{
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                    
                })
                CarritoContainer.innerHTML = SinLibros();
                CarritoContainer.style.justifyContent = "center";
                CarritoContainer.style.boxShadow = "0px 1px 2px 1px rgb(0 0 0 / 24%)";
                CarritoContainer.style.borderRadius = "6px";
                 CompraFinalizada(Usuario.id,token);
                 CerrarCarroActual(Usuario.id,token);
                 
            }) 
            
            var btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");
            var divList = document.querySelectorAll(".container_Libro");
            btnDeleteLibros.forEach((cadaButton,i)=>{
                
                
                btnDeleteLibros[i].addEventListener('click',()=>{
                   
                    
                    let datos ={ libroid : divList[i].classList.item(1) , usuarioid : Usuario.id };

                    DeleteLibroFromCarro(JSON.stringify(datos),token);    
                        
                    CarritoSubContainer.removeChild(divList[i]);



                    if(CarritoSubContainer.childElementCount <= 2)
                    {
                        CarritoContainer.innerHTML = SinLibros();
                        CarritoContainer.style.justifyContent = "center";
                        CarritoContainer.style.boxShadow = "0px 1px 2px 1px rgb(0 0 0 / 24%)";
                        CarritoContainer.style.borderRadius = "6px";
                        DeleteVenta(Usuario.id,token);
                    }
                    else
                    {
                        total = 0 ;
                        let divlist2 = document.querySelectorAll(".container_Libro");
                        total = PromiseToLibro(divlist2,total,ContainerComprar);
                        
                    }
                    
                });
            
            })
                
                    
               
            
    }
    else 
    {
        CarritoContainer.innerHTML = SinLibros();
        CarritoContainer.style.justifyContent = "center";
        CarritoContainer.style.boxShadow = "0px 1px 2px 1px rgb(0 0 0 / 24%)";
        CarritoContainer.style.borderRadius = "6px";
    }
}
export const IndexRender = () => {
    
    GetLibrosDelCarro(Usuario.id,RenderLibros);
}


const PromiseToLibro = async (divlist2,total,ContainerComprar) => {

    for (let div of divlist2) {
        let libro = await GetLibros(div.classList.item(1));
        total += libro.precio;              
        console.log(total);              
    }
    
    ContainerComprar.innerHTML = MetodosDePago();
    ContainerComprar.innerHTML += TotalYBotonComprar(total);
    let btn = document.querySelector(".BotonCompra");
        
            btn.addEventListener('click',()=>{
                
                toastr["success"]("Compra realizada exitosamente", "Felicidades!",{
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                    
                })
                 CarritoContainer.innerHTML = SinLibros();
                 CarritoContainer.style.justifyContent = "center";
                 CarritoContainer.style.boxShadow = "0px 1px 2px 1px rgb(0 0 0 / 24%)";
                 CarritoContainer.style.borderRadius = "6px";
                 CompraFinalizada(Usuario.id,token);
                 CerrarCarroActual(Usuario.id,token);
                 
            }) 
}

export const AgregarAlCarroMessage = async (json) => {
    let mensaje;
    
    if(json[0] == undefined)
    {
    let libroAlCarro = await GetLibros(json.libroid);
    mensaje = `Se agrego ${libroAlCarro.titulo} a tu carro`;
    
    }
    else{
        mensaje = json[0];
       
    }
        
    
        toastr.info("",mensaje,{
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            
        })
   
}