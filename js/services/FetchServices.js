const UrlBase = "https://localhost:44381/api/Carro";
const UrlBaseLibros = "https://localhost:44331/api/Libro?id=";

export const GetLibrosDelCarro = async (UsuarioId,callback) => {
    await fetch(`${UrlBase}/${UsuarioId}`)
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        callback(body);
        
    })

    
}
 export const GetLibros = async (Libros) => {
    let respuesta = await fetch(`${UrlBaseLibros}${Libros[0]}`);
    let json = await respuesta.json();
    return json;
    
 }
