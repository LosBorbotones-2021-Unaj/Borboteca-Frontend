import { LibrosDelCarro,TotalYBotonComprar } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares,SinLibros } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro,CompraFinalizada } from '../services/FetchServices.js'
import { GetLibros,CerrarCarroActual } from '../services/FetchServices.js'

/*
let UsuarioId =parseInt(localStorage.getItem("UsuarioId"));
let LibroId = parseInt(localStorage.getItem("idLibro"));
*/
let btn;

const RenderLibros = async (json) => {

    let CarritoContainer = document.querySelector(".carrito_SubContainer");
    let total=0;
    if(json.librosIds != undefined && json.librosIds != null)
    {
        CarritoContainer.innerHTML = LibrosDelCarro();
        for(let libro of json.librosIds)
        {
            let respuesta = await GetLibros(libro);
            total += respuesta.precio;
            CarritoContainer.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.imagen,respuesta.nombreAutor,respuesta.precio);
        }


        CarritoContainer.innerHTML += TotalYBotonComprar(total);
        btn = document.querySelector(".BotonCompra");

            btn.addEventListener('click',()=>{
                 
                 CompraFinalizada(27);
                 CerrarCarroActual(27);
            }) 
        
    }
    else 
    {
        CarritoContainer.innerHTML += SinLibros();
    }
}
export const IndexRender = () => {
    
    GetLibrosDelCarro(27,RenderLibros);
}

