function InfoLibro () {
    fetch(url + localStorage.getItem('idLibro'))
        .then(response => response.json())
        .then(libro => {
            console.log(libro);

            //gridChild

            let newDiv = document.createElement("div");
            newDiv.id = "content";

            let newImage = document.createElement("img");
            newImage.id = "libroImagen";
            newImage.src = libro.imagen;
            newImage.addEventListener("click", function(e){
                getFullscreen(this);
            },false);
            newDiv.appendChild(newImage);

            let newDivButtons = document.createElement("div");
            newDivButtons.id = "contentButtons";

            let newButton = document.createElement("button");
            let newContentButton = document.createTextNode("Agregar a favoritos");
            newButton.appendChild(newContentButton);
            newButton.addEventListener("click", function(e){
                clickedFav();
            },false);

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
            
            newDivButtons.appendChild(newButton);
            newDivButtons.appendChild(newButton3);
            newDivButtons.appendChild(newDivSN);
            newDivSN.appendChild(facebook);
            newDivSN.appendChild(twitter);
            newDivSN.appendChild(instagram);
            

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
            let newDiv2 = document.createElement("div");
            newDiv2.id = "content";

            let text = document.createElement("h1");
            text.id = "libroReseña";
            let newContentText = document.createTextNode("Evelyn Hugo, el ícono de Hollywood que se ha recluido en su edad madura, decide al fin contar la verdad sobre su vida llena de glamour y de escándalos. Pero cuando elige para ello a Monique Grant, una periodista desconocida, nadie se sorprende más que la misma Monique. Por qué ella ? Por qué ahora ? Monique no está precisamente en su mejor momento. Su marido la abandonó, y su vida profesional no avanza. Aún ignorando por que Evelyn la ha elegido para escribir su biografía.");
            text.appendChild(newContentText);

            let text2 = document.createElement("h1");
            text2.id = "libroReseña";
            let newContentText2 = document.createTextNode("Monique esta decidida a aprovechar esa oportunidad para dar impulso a su carrera. Convocada al lujoso apartamento de Evelyn, Monique escucha fascinada mientras la actriz le cuenta su historia. Desde su llegada a Los Angeles en los años 50 hasta su decisión de abandonar su carrera en el espectáculo en los 80 - y desde luego, los siete maridos que tuvo en ese tiempo - Evelyn narra una historia de ambición implacable, amistad inesperada y un gran amor prohibido.");
            text2.appendChild(newContentText2);

            let spanText = document.createElement("span");
            spanText.className = "hide";
            spanText.id = "hideText";
            spanText.appendChild(text2);

            let newButtonSee = document.createElement("button");
            newButtonSee.id = "hideText-btn";
            let newContentButtonSee = document.createTextNode("Leer mas");
            newButtonSee.appendChild(newContentButtonSee);
            newButtonSee.addEventListener("click", function(e){
                toggleText(spanText, this);
            },false);

            newDiv2.appendChild(text);
            newDiv2.appendChild(spanText);
            newDiv2.appendChild(newButtonSee);

            //hr
            let fichaT = document.createElement("hr");

            //Editorial
            let editorial = document.createElement("h1");
            editorial.id = "libroEditorial";
            editorial.appendChild(document.createTextNode("Editorial: " + libro.editorial));

            //Fecha Publicación
            let fechaPublicacion = document.createElement("h1");
            fechaPublicacion.id = "fechaPublicacionLibro";
            fechaPublicacion.appendChild(document.createTextNode("Fecha publicación: " + libro.fechaDePublicacion));

            //Género
            let genero = document.createElement("h1");
            genero.id = "generoLibro";
            genero.appendChild(document.createTextNode("Genero: " + libro.generos));

            //ISBN
            let isbn = document.createElement("h1");
            isbn.id = "isbnLibro";
            isbn.appendChild(document.createTextNode("ISBN: " + localStorage.getItem('idLibro')));

            let currentDiv2 = document.getElementById("gridChild2");
            currentDiv2.appendChild(title);
            currentDiv2.appendChild(autor);
            currentDiv2.appendChild(newDiv2);
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

            let metodoPago = document.createElement("h1");
            metodoPago.id = "metodoPago";
            let newMPContent = document.createTextNode("Metodos de pago:");
            metodoPago.appendChild(newMPContent);

            let newButtonGC3 = document.createElement("button");
            newButtonGC3.id = "libroBoton";
            let newContentButtonGC3 = document.createTextNode("Descargar");
            newButtonGC3.appendChild(newContentButtonGC3);
            newButtonGC3.addEventListener("click", function(e){
                clickedFav();
            },false);

            let newButtonGC3_2 = document.createElement("button");
            newButtonGC3_2.id = "libroBoton";
            let newContentButtonGC3_2 = document.createTextNode("Agregar al carrito");
            newButtonGC3_2.appendChild(newContentButtonGC3_2);
            newButtonGC3_2.addEventListener("click", function(e){
                clickedFav();
            },false);

            newDiv3.appendChild(precio);
            newDiv3.appendChild(metodoPago);
            newDiv3.appendChild(newButtonGC3);
            newDiv3.appendChild(newButtonGC3_2);

            let currentDiv3 = document.getElementById("gridChild3");
            currentDiv3.appendChild(newDiv3);

            gc4.innerHTML += "Hola<br>Tomi";

        })
        .catch(err => console.log(err));
}

const aplicacion = document.querySelector('.content__main_grid div');
const gc2 = document.querySelector('.content__main_grid #gridChild2');
const gc3 = document.querySelector('.content__main_grid #gridChild3');
const gc4 = document.querySelector('.content__main_grid #gridChild4');

const url = 'https://localhost:44331/api/Libro/PedirLibroId?id=';
const url2 = 'https://localhost:44381/api/CarroLibro';

// var boton = document.getElementById('btn2');
// boton.addEventListener("click", clicked);

// function clicked(){
    
//     fetch(url2, {
//         method : "POST",
//         body : JSON.stringify({
//             "libroid" : "55",
//             "carroid" : "2"
//         }),
//         headers: {"Content-type" : "application/json"}
//     })
//     .then(response => response.json())
//     .then(response => {
//         console.log(response);
        
//     })
//     .catch(err => console.log(err));

//     alert("Se agregó el libro al carro");
// }

window.onload= () => {
    console.log(localStorage);
    InfoLibro();
}

function clickedFav(){
    alert('Se agregó el libro a favoritos');
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

//Para imagen en pantalla completa
function getFullscreen(element){
    if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
}






