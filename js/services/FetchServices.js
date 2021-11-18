import { SinLibros } from "../components/LibrosDelCarro.js";

const UrlBaseCarro = "https://localhost:44381/api/Carro";
const UrlBaseVentas = "https://localhost:44381/api/Ventas";
const UrlBaseLibros = "https://localhost:44331/api/Libro?id=";


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
    console.log(xjson);
}

export const CerrarCarroActual = async (UsuarioId) =>{

    await fetch(`${UrlBaseCarro}/${UsuarioId}`,{
        method : "PUT",
        body : "",
        headers : {"Content-type":"application/json"}
    })
    
    

}
