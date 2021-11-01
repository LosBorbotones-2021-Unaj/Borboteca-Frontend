import { LibrosDelCarro } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro } from '../services/FetchServices.js'
import { GetLibros } from '../services/FetchServices.js'



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