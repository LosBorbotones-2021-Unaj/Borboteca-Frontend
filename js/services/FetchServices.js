import { SinLibros } from "../components/LibrosDelCarro.js";

const UrlBaseCarro = "https://localhost:44381/api/Carro";
const UrlBaseVentas = "https://localhost:44381/api/Ventas";
const UrlBaseLibros = "https://localhost:44331/api/Libro/PedirLibroId?id=";
const UrlBaseCarroLibro = "https://localhost:44381/api/CarroLibro";
const UrlBaseUsuarios = "https://localhost:44343/api/Usuario";
const UrlLibroDescargas = "https://localhost:44331/api/Libro/";


export const GetLibrosDelCarro = async (UsuarioId,callback) => {
    await fetch(`${UrlBaseCarro}/${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        
        callback(body);
        
    })
    
}

export const GetLibrosComprados = async (UsuarioId,callback) => {
    await fetch(`${UrlBaseCarro}/Mislibros/${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
       
        callback(body);
        
    })
    
}

 export const GetLibros = async (Libro) => {
    let respuesta = await fetch(`${UrlBaseLibros}${Libro}`);
    let json = await respuesta.json();
    return json;
    
 }

export const CompraFinalizada = async (UsuarioId,token) => {

    let respuesta = await fetch(`${UrlBaseVentas}/${UsuarioId}`,{
        method : "PUT",
        body : "",
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    });
    let xjson = await respuesta.json();
   
}

export const CerrarCarroActual = async (UsuarioId,token) =>{
  
    await fetch(`${UrlBaseCarro}/${UsuarioId}`,{
        method : "PUT",
        body : "",
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
    
    

}

export const DeleteLibroFromCarro = async (datos,token) => {

     await fetch(`${UrlBaseCarroLibro}/EliminarLibro`,{
        method : "DELETE",
        body : datos,
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
   
    
}

export const DeleteVenta = async (UsuarioId,token) => {
    await fetch(`${UrlBaseVentas}/${UsuarioId}`,{
        method : "DELETE",
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
}

export const CreateCarro = async (UsuarioId,token) => {
    await fetch(`${UrlBaseCarro}?UsuarioId=${UsuarioId}`,{
        method : "POST",
        body : JSON.stringify({
            "UsuarioId" : UsuarioId
        }),
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        
    })
    
}

export const CreateVenta = async (UsuarioId,token) => {
    await fetch(`${UrlBaseVentas}?UsuarioId=${UsuarioId}`,{
        method : "POST",
        body : JSON.stringify({
            "UsuarioId" : UsuarioId
        }),
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
       
    })
   
}

export const CreateCarroLibro = async (LibroId,UsuarioId,token) => {

    await fetch(`${UrlBaseCarroLibro}`,{
        method : "POST",
        body : JSON.stringify({
            "libroid" : LibroId,
            "usuarioid" : UsuarioId
        }),
        headers : {
            'Authorization': `Bearer ${token}`,
            "Content-type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        
    })
    
}

export const GetUsuarioByid = async (UsuarioId,callback) => {
    await fetch(`${UrlBaseUsuarios}/FindById?id=${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        
        callback(body);
        
    })
}

export const GetAllVentas = async (UsuarioId,callback) => {
    await fetch(`${UrlBaseVentas}/Compras/${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        
        callback(body);
        
    })
}

export const GetVentaByFechaEstado = async (UsuarioId,xFecha,xEstado,callback) => {
    let parameters = {};
    if(xFecha != "" && xEstado != "")
    {
        parameters = {
            Fecha : xFecha,
            estado : xEstado
        };
    }
    else if( xEstado != "" && xFecha == "")
    {
        parameters = {
            estado : xEstado,
            Fecha : ""
        };
    }
    else if(xEstado == "" && xFecha != "")
    {
        parameters = {
            Fecha : xFecha,
            estado : ""
        };
    }
    else if(xEstado == "" && xFecha == "")
    {
        parameters = {
            Fecha : "",
            estado : ""
        };
    }
    await fetch(`${UrlBaseVentas}/MiCompra/${UsuarioId}?Fecha=${parameters?.Fecha}&estado=${parameters?.estado}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        
        callback(body);
        
    })
}

export const DescargarLibro = (libroid) =>{
    fetch((UrlLibroDescargas +`${libroid}`),{
        method : 'GET',
        headers: new Headers({
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        })
    })
    .then((httpResponse)=>{
        if(httpResponse.ok == 200){
            console.log("Hola");
            return httpResponse.json();
        }
        else{
            console.log(libro);
        }
    })
}