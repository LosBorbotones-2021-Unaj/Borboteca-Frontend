const urlBase = "https://localhost:44363/api/Libro/";

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