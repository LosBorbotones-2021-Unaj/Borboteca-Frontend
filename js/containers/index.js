import { LibrosDelCarro,TotalYBotonComprar } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro } from '../services/FetchServices.js'
import { GetLibros } from '../services/FetchServices.js'




const RenderLibros = async (json) => {
    let CarritoContainer = document.querySelector(".carrito_SubContainer");
    let total=0;
    CarritoContainer.innerHTML = LibrosDelCarro();
    for(let libro of json.librosIds)
    {
        let respuesta = await GetLibros(libro);
        total += respuesta.precio;
        CarritoContainer.innerHTML += LibrosDelCarroParticulares(respuesta.titulo,respuesta.imagen,respuesta.nombreAutor,respuesta.precio);
    }


    CarritoContainer.innerHTML += TotalYBotonComprar(total);
}
export const IndexRender = () => {
    var IdUsuario=parseInt(localStorage.getItem("UsuarioId")) 
    GetLibrosDelCarro(IdUsuario,RenderLibros);
}
