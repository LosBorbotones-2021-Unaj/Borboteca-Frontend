let URLCarga = "https://localhost:44331/api/Libro";
let URLGenero = "https://localhost:44331/api/Genero";
let URLAutor = "https://localhost:44331/api/Autor";

export const CargarLibro = (libro) =>{
    fetch(URLCarga, {
        method : 'POST',
        body: libro,
        headers: new Headers({
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        })
    })
    .then((httpResponse)=>{
        if(httpResponse.ok == 200){
            console.log("El librito se agrego");
            return httpResponse.json();
        }
        else{
            console.log(libro);
        }
    })
}

export const PedirGenero = (callback) => {
    fetch (URLGenero,{
        method: 'GET',
    })
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json();
    })
    .then(body=> {
        callback(body);
    })
}
export const PedirAutor = (callback) => {
    fetch(URLAutor,{
        method: 'GET',
    })
    .then((httpResponse) =>{
        if(httpResponse.ok){
            return httpResponse.json();
        }
    })
    .then((body=> {
        callback(body);
    }))
}