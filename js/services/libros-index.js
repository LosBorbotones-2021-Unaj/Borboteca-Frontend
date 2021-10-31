const urlBase = "https://localhost:44363/api/Libro/PedirLibros";

export const pedirLibros = (callback) => {
    fetch(urlBase)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json();
    })
    .then(body => {
        callback(body);
    })
}