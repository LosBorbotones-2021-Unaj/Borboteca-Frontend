import { LibrosDelCarro } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro } from '../services/FetchServices.js'
import { GetLibros } from '../services/FetchServices.js'



<<<<<<< HEAD
const RenderLibros = async (json) => {    
    let respuesta = await GetLibros(json.librosIds);
    let CarritoContainer = document.querySelector(".carrito_SubContainer");
    CarritoContainer.innerHTML = LibrosDelCarro();
    CarritoContainer.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.nombreAutor,respuesta.precio);
}
export const IndexRender = () => {
    var IdUsuario=parseInt(localStorage.getItem("UsuarioId")) 
    GetLibrosDelCarro(IdUsuario,RenderLibros);
}
=======
    const RenderLibros = async (json) => {
        let CarritoContainer = document.querySelector(".carrito_SubContainer");
        CarritoContainer.innerHTML = LibrosDelCarro();
        for(let libro of json.librosIds)
        {
            let respuesta = await GetLibros(libro);
            CarritoContainer.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.imagen,respuesta.nombreAutor,respuesta.precio);
        }
    }

   

    export const IndexRender = () => {
        GetLibrosDelCarro(1,RenderLibros);
    }

    
    
>>>>>>> main
