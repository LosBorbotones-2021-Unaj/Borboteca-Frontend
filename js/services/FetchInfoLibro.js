import {parseJwt} from "../components/nav-var.js";
import { AgregarQuitarFav } from '../services/FetchFavoritos.js';
import {CreateCarro} from "../services/FetchServices.js";
import {CreateVenta} from "../services/FetchServices.js";
import {CreateCarroLibro} from "../services/FetchServices.js";
import {AgregarAlCarroMessage} from "../containers/CarroIndex.js";

let token = localStorage.getItem('token');
let idLibro = localStorage.getItem("idLibro");
let decoded = parseJwt(token);

const url = 'https://localhost:44331/api/Libro/PedirLibroId?id=';
const urlLibrosAutor = 'https://localhost:44331/api/Libro/FiltroLibros/autor?busqueda=';
const urlLibroGenero = 'https://localhost:44331/api/Libro/PedirLibroGenero?LibroGuid=';

const gc5 = document.querySelector('.content__main_grid #gridChild5');

export const getInfoLibro = () =>{
    fetch(url + idLibro)
    .then(response => response.json())
    .then(libro => {

        //gridChild
        let newDiv = document.createElement("div");
        newDiv.id = "content";

        let newImage = document.createElement("img");
        newImage.id = "libroImagen";
        newImage.src = libro.imagen;
        newImage.setAttribute("data-bs-toggle","modal");
        newImage.setAttribute("data-bs-target","#exampleModal");
        newImage.addEventListener("click", function(e){
            let bodyModal = document.getElementById("modalId");
            bodyModal.appendChild(newImage2);
        },false);
        newDiv.appendChild(newImage);

        let newImage2 = document.createElement("img");
        newImage2.id = "libroImagenModal";
        newImage2.src = libro.imagen;

        let newDivButtons = document.createElement("div");
        newDivButtons.id = "contentButtons";

        let newDivSN = document.createElement("div");
        newDivSN.id = "RedesSociales";

        let facebook = document.createElement("a");
        facebook.href = "https://www.facebook.com/";
        facebook.id = "facebookBtn";
        let fb = document.createElement("i");
        fb.className = "fab fa-facebook-f";
        facebook.appendChild(fb);

        let twitter = document.createElement("a");
        twitter.href = "https://twitter.com/?lang=en";
        twitter.id = "twitterBtn";
        let tt = document.createElement("i");
        tt.className = "fab fa-twitter";
        twitter.appendChild(tt);

        let instagram = document.createElement("a");
        instagram.href = "https://www.instagram.com/";
        instagram.id = "instagramBtn";
        let ig = document.createElement("i");
        ig.className = "fab fa-instagram";
        instagram.appendChild(ig);

        let favorito = document.createElement("a");
        favorito.id = "favoritoBtn";
        let fav = document.createElement("i");
        fav.className = "fas fa-heart";
        favorito.appendChild(fav);
        favorito.addEventListener("click", function(e){
            AgregarAfavoritos();
        },false);

        let volver = document.getElementById("botonVolver");
        volver.addEventListener("click", function(e){
            window.location.href = "Index.html";
        },false);
        
        newDivButtons.appendChild(newDivSN);
        newDivSN.appendChild(facebook);
        newDivSN.appendChild(twitter);
        newDivSN.appendChild(instagram);
        newDivSN.appendChild(favorito);

        let currentDiv = document.getElementById("gridChild");
        currentDiv.appendChild(newDiv);
        currentDiv.appendChild(newDivButtons);

        //gridChild2
        let title = document.createElement("h1");
        title.id = "titulo";
        let newContentTitle = document.createTextNode(libro.titulo);
        title.appendChild(newContentTitle);
        title.appendChild(document.createElement("hr"));

        let autor = document.createElement("h1");
        autor.id = "libroAutor";
        autor.appendChild(document.createTextNode("Autor: " + libro.nombreAutor));
        
        let resenia = document.createElement("h1");
        resenia.id = "libroResenia";
        let newContentResenia = document.createTextNode(libro.resenia);
        if(libro.resenia.length > 800){
            resenia.id = "libroResenia2";
        }
        resenia.appendChild(newContentResenia);


        let fichaTecnica = document.createElement("h1");
        fichaTecnica.id = "fichaT";
        fichaTecnica.appendChild(document.createTextNode("Detalles del libro"));

        let editorial = document.createElement("h4");
        editorial.id = "libroEditorial";
        
        let editorialText = document.createElement("b");
        editorialText.appendChild(document.createTextNode("Editorial: "));
        let editorialText2 = document.createTextNode(libro.editorial);
        editorial.appendChild(editorialText);
        editorial.appendChild(editorialText2);
        // editorial.appendChild(hrEditorial);

        let fechaPublicacion = document.createElement("h1");
        fechaPublicacion.id = "fechaPublicacionLibro";;
        let fechaPublicacionText = document.createElement("b");
        fechaPublicacionText.appendChild(document.createTextNode("Fecha de publicación: "));
        let fechaPublicacionText2 = document.createTextNode(libro.fechaDePublicacion);
        fechaPublicacion.appendChild(fechaPublicacionText);
        fechaPublicacion.appendChild(fechaPublicacionText2);

        let genero = document.createElement("h1");
        genero.id = "generoLibro";
        traerGenero(genero);

        let isbn = document.createElement("h1");
        isbn.id = "isbnLibro";
        let isbnText = document.createElement("b");
        isbnText.appendChild(document.createTextNode("ISBN: "));
        let isbnText2 = document.createTextNode(idLibro);
        isbn.appendChild(isbnText);
        isbn.appendChild(isbnText2);

        let currentDiv2 = document.getElementById("gridChild2");
        currentDiv2.appendChild(title);
        currentDiv2.appendChild(autor);
        currentDiv2.appendChild(resenia);
        currentDiv2.appendChild(fichaTecnica);
        currentDiv2.appendChild(editorial);
        currentDiv2.appendChild(fechaPublicacion);
        currentDiv2.appendChild(genero);
        currentDiv2.appendChild(isbn);

        //gridChild3
        let newDiv3 = document.createElement("div");
        newDiv3.id = "gc3Compra";

        let precio =  document.createElement("h1");
        precio.id = "libroPrecio";
        let newLibroPrecio = document.createTextNode("$ "+ libro.precio + ",00");
        precio.appendChild(newLibroPrecio);

        let cuotas = document.createElement("h1");
        cuotas.id = "cuotas";
        let cuotasText = document.createTextNode("Hasta ");
        let cuotasText2 = document.createElement("b");
        cuotasText2.appendChild(document.createTextNode(("6 cuotas sin interés de $" + parseFloat(libro.precio/6)).substring(0, 31)));
        cuotas.appendChild(document.createTextNode(cuotasText.nodeValue));
        cuotas.appendChild(cuotasText2);

        let mediosPago =  document.createElement("h1");
        mediosPago.id = "libroMP";
        mediosPago.appendChild(document.createTextNode("Medios de pago:"));

        let mediosPagoDiv =  document.createElement("div");
        mediosPagoDiv.id = "DivMP";

        let MP =  document.createElement("img");
        MP.src = "../img/mediosPago.png";

        let PP =  document.createElement("img");
        PP.id = "paypal";
        PP.src = "../img/mediosPago2.png";

        mediosPagoDiv.appendChild(MP);
        mediosPagoDiv.appendChild(PP);

        let newButtonGC3 = document.createElement("button");
        newButtonGC3.id = "libroBoton";
        let newContentButtonGC3 = document.createTextNode("Comprar");
        newButtonGC3.appendChild(newContentButtonGC3);
        newButtonGC3.addEventListener("click", async function(e){
            if(verificarSeccion){
                await CreateCarro(decoded.id,token);
                await CreateVenta(decoded.id,token);   
                await CreateCarroLibro(idLibro,decoded.id,token,AgregarAlCarroMessage);

                setTimeout(function(){
                    window.location.href = "Carro.html"; 
                }, 200);
            }
            else{
                alert("El usuario no está logueado");
            }
            
        },false);



        let newButtonGC3_2 = document.createElement("button");
        newButtonGC3_2.id = "libroBoton";
        let newContentButtonGC3_2 = document.createTextNode("Agregar al Carrito");
        newButtonGC3_2.appendChild(newContentButtonGC3_2);
        newButtonGC3_2.addEventListener("click",async function(e){
            if(verificarSeccion){
                await CreateCarro(decoded.id,token);
                
                await CreateVenta(decoded.id,token); 
                          
                await CreateCarroLibro(idLibro,decoded.id,token,AgregarAlCarroMessage);

                alert("Se agrego el libro al carrito");
            }
            else{
                alert("El usuario no está logueado");
            }
        },false);

        newDiv3.appendChild(precio);
        newDiv3.appendChild(cuotas);
        newDiv3.appendChild(mediosPago);
        newDiv3.appendChild(mediosPagoDiv);
        newDiv3.appendChild(newButtonGC3);
        newDiv3.appendChild(newButtonGC3_2);

        let currentDiv3 = document.getElementById("gridChild3");
        currentDiv3.appendChild(newDiv3);

        //gridChild5
        traerLibrosAutor(libro.nombreAutor);
    })
    .catch(err => console.log(err));
}

const AgregarAfavoritos=()=>{
    if(verificarSeccion){
       var usuario= parseJwt(localStorage.getItem("token"))
         AgregarQuitarFav(idLibro,usuario.id,localStorage.getItem("token"),AgregadoExitoso)
    }
}

const AgregadoExitoso=()=>{
    alert("Se agregó el libro a favoritos");
}

const verificarSeccion=()=>{
    if (localStorage.getItem("token")==undefined){
        return false;
    }
    else{
        return true;
    }
}

function traerLibrosAutor(nombreAutor){
    fetch(urlLibrosAutor + nombreAutor + '&LibroGuid=' + idLibro)
        .then(response => response.json())
        .then(response => {
            if(response.length != 0){
                const texto = document.createElement("h1");
                texto.appendChild(document.createTextNode("Otros libros del autor:"));

                const newDiv = document.createElement("div");
                newDiv.id = "contenedorLibrosAutor";

                gc5.appendChild(texto);
                gc5.appendChild(newDiv);

                response.forEach(libro => {
                    const newDiv2 = document.createElement("div");
                    newDiv2.id = "divLibros";
                    const newImage = document.createElement("img");
                    newImage.src = libro.imagen;
                    newImage.id = "libroImagen";
                    newImage.title = libro.titulo;
                    newImage.addEventListener("click", function(e){
                        guardarLocalStorageLibro(libro.id);
                        window.location.href = "vistaInfoLibro.html";
                    },false);

                    const newTxt = document.createElement("p");
                    newTxt.id = "tituloLibroRecomendado";
                    newTxt.appendChild(document.createTextNode(libro.titulo));
                    const newTxt2 = document.createElement("b");
                    newTxt2.appendChild(document.createTextNode("$ " + libro.precio));
                        
                    newDiv2.appendChild(newImage);
                    newDiv2.appendChild(newTxt);
                    newDiv2.appendChild(newTxt2);

                    newDiv.appendChild(newDiv2);
                });
            }
            
        })
        .catch(err => console.log(err));
}

function traerGenero(genero){
    fetch(urlLibroGenero + idLibro)
        .then(response => response.json())
        .then(response => {
        
            let generoText = document.createElement("b");
            generoText.appendChild(document.createTextNode("Género: "));
            let generoText2 = document.createTextNode(response.descripcion);
            genero.appendChild(generoText);
            genero.appendChild(generoText2);
            console.log(response.descripcion);

            traerLibrosGenero(response.descripcion);
        })
        .catch(err => console.log(err));
}

function traerLibrosGenero(generoId){
    fetch(urlLibrosAutor + generoId + '&LibroGuid=' + idLibro)
    .then(response => response.json())
    .then(response => {
        if(response.length != 0){
            const texto = document.createElement("h1");
            texto.appendChild(document.createTextNode("Otros libros del género " + generoId + ":"));

            const newDiv = document.createElement("div");
            newDiv.id = "contenedorLibrosAutor";

            gc5.appendChild(texto);
            gc5.appendChild(newDiv);

            response.forEach(libro => {
                const newDiv2 = document.createElement("div");
                newDiv2.id = "divLibros";
                const newImage = document.createElement("img");
                newImage.src = libro.imagen;
                newImage.id = "libroImagen";
                newImage.title = libro.titulo;
                newImage.addEventListener("click", function(e){
                    guardarLocalStorageLibro(libro.id);
                    window.location.href = "vistaInfoLibro.html";
                },false);

                const newTxt = document.createElement("p");
                newTxt.appendChild(document.createTextNode(libro.titulo));
                const newTxt2 = document.createElement("b");
                newTxt2.appendChild(document.createTextNode("$ " + libro.precio));
                const newTxt3 = document.createElement("p");
                newTxt3.id = "nombreAutorLista";
                newTxt3.appendChild(document.createTextNode(libro.nombreCompleto));
                    
                newDiv2.appendChild(newImage);
                newDiv2.appendChild(newTxt);
                newDiv2.appendChild(newTxt3);
                newDiv2.appendChild(newTxt2);

                newDiv.appendChild(newDiv2);
            });
        }
        
    })
    .catch(err => console.log(err));
}

function guardarLocalStorageLibro(libroId){
    localStorage.setItem("idLibro", libroId);
}
