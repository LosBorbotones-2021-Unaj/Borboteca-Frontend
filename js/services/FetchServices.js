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

export const DeleteVenta = async (UsuarioId) => {
    await fetch(`${UrlBaseVentas}/${UsuarioId}`,{
        method : "DELETE",
        headers : {"Content-type":"application/json"}
    })
}

export const CreateCarro = async (UsuarioId) => {
    await fetch(`${UrlBaseCarro}?UsuarioId=${UsuarioId}`,{
        method : "POST",
        body : JSON.stringify({
            "UsuarioId" : UsuarioId
        }),
        headers: {"Content-type" : "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));
}

export const CreateVenta = async (UsuarioId) => {
    await fetch(`${UrlBaseVentas}?UsuarioId=${UsuarioId}`,{
        method : "POST",
        body : JSON.stringify({
            "UsuarioId" : UsuarioId
        }),
        headers: {"Content-type" : "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));
}

export const CreateCarroLibro = async (LibroId,UsuarioId) => {

    await fetch(`${UrlBaseCarroLibro}`,{
        method : "POST",
        body : JSON.stringify({
            "libroid" : LibroId,
            "usuarioid" : UsuarioId
        }),
        headers: {"Content-type" : "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));
}