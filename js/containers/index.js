import { LibrosDelCarro } from '../components/LibrosDelCarro.js'
import { LibrosDelCarroParticulares } from '../components/LibrosDelCarro.js'
import { GetLibrosDelCarro } from '../services/FetchServices.js'
import { GetLibros } from '../services/FetchServices.js'



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
        GetLibrosDelCarro(3,RenderLibros);
    }

    
    
