const urlBase = "https://localhost:44331/api/Libro/";
const urlBase2 = "https://localhost:44331/api/Libro"

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
export const DescargarLibro = () => {
    fetch(urlBase2 + `?Guid_Id=${localStorage.getItem("idLibro")}`, {
        method : 'GET',
        headers: new Headers({
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        })
    })
    .then((httpResponse)=>{
        if(httpResponse.ok == 200){
            console.log("hola");
            return httpResponse.json();
        }
    })
}