import {parseJwt} from "../components/nav-var.js";
import { AgregarQuitarFav } from '../services/FetchFavoritos.js';
import {CreateCarro} from "../services/FetchServices.js";
import {CreateVenta} from "../services/FetchServices.js";
import {CreateCarroLibro} from "../services/FetchServices.js";

let token = localStorage.getItem('token');
let idLibro = localStorage.getItem("idLibro");
// let decoded = parseJwt(token);

const url = 'https://localhost:44331/api/Libro/PedirLibroId?id=';
const urlLibrosAutor = 'https://localhost:44331/api/Libro/FiltroLibros/autor?busqueda=';
const urlLibroGenero = 'https://localhost:44331/api/Libro/PedirLibroGenero?LibroGuid=';

const gc5 = document.querySelector('.content__main_grid #gridChild5');

export const getInfoLibro = () =>{
    fetch(url + idLibro)
    .then(response => response.json())
    .then(libro => {
        console.log(libro);

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

        let newButton3 = document.createElement("button");
        let newContentButton3 = document.createTextNode("Marcar como leído");
        newButton3.appendChild(newContentButton3);
        newButton3.addEventListener("click", function(e){
            clickedRead(this);
        },false);

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
        // favorito.addEventListener("click", function(e){
        //     AgregarAfavoritos();
        // },false);
        agregadoFavorito(favorito);

        //VolverBtn
        let volver = document.getElementById("botonVolver");
        volver.addEventListener("click", function(e){
            window.location.href = "../view/Index.html";
        },false);
        
        newDivButtons.appendChild(newButton3);
        newDivButtons.appendChild(newDivSN);
        newDivSN.appendChild(facebook);
        newDivSN.appendChild(twitter);
        newDivSN.appendChild(instagram);
        newDivSN.appendChild(favorito);

        let currentDiv = document.getElementById("gridChild");
        currentDiv.appendChild(newDiv);
        currentDiv.appendChild(newDivButtons);

        //gridChild2

        //Título
        let title = document.createElement("h1");
        title.id = "titulo";
        let newContentTitle = document.createTextNode(libro.titulo);
        title.appendChild(newContentTitle);
        title.appendChild(document.createElement("hr"));

        //Autor
        let autor = document.createElement("h1");
        autor.id = "libroAutor";
        autor.appendChild(document.createTextNode("Autor: " + libro.nombreAutor));

        //Reseña
        let resenia = document.createElement("h1");
        resenia.id = "resenia";
        let newContentResenia = document.createTextNode(libro.resenia);
        resenia.appendChild(newContentResenia);

        // let newDiv2 = document.createElement("div");
        // newDiv2.id = "content";

        // let text = document.createElement("h1");
        // text.id = "libroReseña";
        // let newContentText = document.createTextNode("Evelyn Hugo, el ícono de Hollywood que se ha recluido en su edad madura, decide al fin contar la verdad sobre su vida llena de glamour y de escándalos. Pero cuando elige para ello a Monique Grant, una periodista desconocida, nadie se sorprende más que la misma Monique. Por qué ella ? Por qué ahora ? Monique no está precisamente en su mejor momento. Su marido la abandonó, y su vida profesional no avanza. Aún ignorando por que Evelyn la ha elegido para escribir su biografía.");
        // text.appendChild(newContentText);

        // let text2 = document.createElement("h1");
        // text2.id = "libroReseña";
        // let newContentText2 = document.createTextNode("Monique esta decidida a aprovechar esa oportunidad para dar impulso a su carrera. Convocada al lujoso apartamento de Evelyn, Monique escucha fascinada mientras la actriz le cuenta su historia. Desde su llegada a Los Angeles en los años 50 hasta su decisión de abandonar su carrera en el espectáculo en los 80 - y desde luego, los siete maridos que tuvo en ese tiempo - Evelyn narra una historia de ambición implacable, amistad inesperada y un gran amor prohibido.");
        // text2.appendChild(newContentText2);

        // let spanText = document.createElement("span");
        // spanText.className = "hide";
        // spanText.id = "hideText";
        // spanText.appendChild(text2);

        // let newButtonSee = document.createElement("button");
        // newButtonSee.id = "hideText-btn";
        // let newContentButtonSee = document.createTextNode("Leer mas");
        // newButtonSee.appendChild(newContentButtonSee);
        // newButtonSee.addEventListener("click", function(e){
        //     toggleText(spanText, this);
        // },false);

        // newDiv2.appendChild(text);
        // newDiv2.appendChild(spanText);
        // newDiv2.appendChild(newButtonSee);

        //hr
        let fichaT = document.createElement("hr");

        //Editorial
        let editorial = document.createElement("h1");
        editorial.id = "libroEditorial";
        editorial.appendChild(document.createTextNode("Editorial: " + libro.editorial));

        //Fecha Publicación
        let fechaPublicacion = document.createElement("h1");
        fechaPublicacion.id = "fechaPublicacionLibro";
        fechaPublicacion.appendChild(document.createTextNode("Fecha de publicación: " + libro.fechaDePublicacion));

        //Género
        let genero = document.createElement("h1");
        genero.id = "generoLibro";
        traerGenero(genero);

        //ISBN
        let isbn = document.createElement("h1");
        isbn.id = "isbnLibro";
        isbn.appendChild(document.createTextNode("ISBN: " + localStorage.getItem('idLibro')));

        let currentDiv2 = document.getElementById("gridChild2");
        currentDiv2.appendChild(title);
        currentDiv2.appendChild(autor);
        currentDiv2.appendChild(resenia);
        currentDiv2.appendChild(fichaT);
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
        let cuotasContent = document.createTextNode(("6 cuotas sin interés de $" + parseFloat(libro.precio/6)).substring(0, 31));
        cuotas.appendChild(cuotasContent);

        let newButtonGC3 = document.createElement("button");
        newButtonGC3.id = "libroBoton";
        let newContentButtonGC3 = document.createTextNode("Comprar");
        newButtonGC3.appendChild(newContentButtonGC3);
        newButtonGC3.addEventListener("click", async function(e){
            //fijarce si el usuario esta logueado y si tiene carro activo
            if(verificarSeccion){
                await CreateCarro(decoded.id,token);
                
                await CreateVenta(decoded.id,token); 
                            
                await CreateCarroLibro(idLibro,decoded.id,token);

                setTimeout(function(){
                    window.location.href = "../view/Carro.html"; 
                }, 200);
            }
            else{
                alert("El usuario No está logueado");
            }
            
        },false);

        let newButtonGC3_2 = document.createElement("button");
        newButtonGC3_2.id = "libroBoton";
        let newContentButtonGC3_2 = document.createTextNode("Agregar al carrito");
        newButtonGC3_2.appendChild(newContentButtonGC3_2);
        newButtonGC3_2.addEventListener("click",async function(e){
            //fijarce si el usuario esta logueado y si tiene carro activo
            if(verificarSeccion){
                await CreateCarro(decoded.id,token);
                
                await CreateVenta(decoded.id,token); 
                            
                await CreateCarroLibro(idLibro,decoded.id,token);

                alert("Se agrego el libro al carrito");
            }
            else{
                alert("El usuario No está logueado");
            }
        },false);

        newDiv3.appendChild(precio);
        newDiv3.appendChild(cuotas);
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
    // agregadoFavorito(document.getElementById("favoritoBtn"));
}

const verificarSeccion=()=>{
    if (localStorage.getItem("token")==undefined){
        return false;
    }
    else{
        return true;
    }
}

function agregadoFavorito(boton){
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
    }

    if (boton) {
        boton.addEventListener('click', function () {
        alert('Se agregó el libro a favoritos')
    })
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
                    console.log(response);

                    const newDiv2 = document.createElement("div");
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
            genero.appendChild(document.createTextNode("Género: " + response.descripcion));
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
                console.log(libro);
                const newDiv2 = document.createElement("div");
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

function toggleText(hideText, hideText_btn){
    hideText.classList.toggle('show');

    if(hideText.classList.contains('show')){
        hideText_btn.innerHTML = 'Leer menos';
    }
    else
        hideText_btn.innerHTML = 'Leer mas';
}

function clickedRead(object){
    if(object.textContent == 'Marcar como leído'){
        object.innerHTML = `Desmarcar como leído`;
        alert('Se marcó el libro como leído');
    }
    else{
        object.innerHTML = `Marcar como leído`;
        alert('Se desmarcó el libro como leído');
    }
}

function guardarLocalStorageLibro(libroId){
    localStorage.setItem("idLibro", libroId);
}
