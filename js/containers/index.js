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
                 var decoded = parseJwt(localStorage.getItem("token"));
                 CompraFinalizada(decoded.id);
                 CerrarCarroActual(decoded.id);
            }) 
        
    }
    else 
    {
        CarritoContainer.innerHTML += SinLibros();
    }
}
export const IndexRender = () => {
    var decoded = parseJwt(localStorage.getItem("token"));
    GetLibrosDelCarro(decoded.id,RenderLibros);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

