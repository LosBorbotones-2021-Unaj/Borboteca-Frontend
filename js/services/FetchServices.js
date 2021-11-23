import { SinLibros } from "../components/LibrosDelCarro.js";

const UrlBaseCarro = "https://localhost:44381/api/Carro";
const UrlBaseVentas = "https://localhost:44381/api/Ventas";
const UrlBaseLibros = "https://localhost:44331/api/Libro/PedirLibroId?id=";
const UrlBaseCarroLibro = "https://localhost:44381/api/CarroLibro";


export const GetLibrosDelCarro = async (UsuarioId,callback) => {
    await fetch(`${UrlBaseCarro}/${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        console.log(body);
        callback(body);
        
    })
    
}
 export const GetLibros = async (Libro) => {
    let respuesta = await fetch(`${UrlBaseLibros}${Libro}`);
    let json = await respuesta.json();
    return json;
    
 }

export const CompraFinalizada = async (UsuarioId) => {

    let respuesta = await fetch(`${UrlBaseVentas}/${UsuarioId}`,{
        method : "PUT",
        body : "",
        headers : {"Content-type":"application/json"}
    });
    let xjson = await respuesta.json();
   
}

export const CerrarCarroActual = async (UsuarioId) =>{

    await fetch(`${UrlBaseCarro}/${UsuarioId}`,{
        method : "PUT",
        body : "",
        headers : {"Content-type":"application/json"}
    })
    
    

}

export const DeleteLibroFromCarro = async (datos) => {

     await fetch(`${UrlBaseCarroLibro}/EliminarLibro`,{
        method : "DELETE",
        body : datos,
        headers : {"Content-type":"application/json"}
    })
   
    
}
