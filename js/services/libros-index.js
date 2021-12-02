const urlBase = "https://localhost:44331/api/Libro/";
const urlBase2 = "https://localhost:44331/api/Libro";
// https://localhost:44331/api/Libro/Busqueda?busqueda=La
export const pedirLibros = (indice,callback) => {
    fetch(urlBase + `PedirLibros/${indice}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json();
    })
    .then(body => {
        callback(body);
    })
}
export const pedirPaginas = () => {
    fetch(urlBase + `Contador`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json();
    })
}

export const buscarLibros = (letra) =>{
    fetch(urlBase + "Busqueda?busqueda="+ letra)
    .then((httpResponse) => {
        if (httpResponse.ok){
            return httpResponse.json();
        }
    })
    .then(body => {
        localStorage.setItem("libros",JSON.stringify(body));
    })
}

export const DescargarLibro = (callback) => {
    fetch ("https://localhost:44331/api/Libro?Guid_Id=2550e1b1-9e48-43b4-875f-14634d4c07f1",{
        responseType : 'blob',
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
          'Content-Type': 'application/pdf'
        })
    })
    .then((httpResponse) => {
        return httpResponse.blob();
    })
    .then((data) =>{
        fileDownload(data, 'filename.pdf');
    });
}