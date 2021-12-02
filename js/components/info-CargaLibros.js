
import { genericNavVar } from "../components/nav-var.js";
import { PedirGenero,CargarLibro, PedirAutor } from "../services/CargaLibros.js";

window.onload = () =>{
    localStorage.removeItem("lista-generos");
    localStorage.removeItem("id-autor");
    genericNavVar();
    InfoLibro();
    var boton = document.getElementById("BtnSubirLibro").onclick= ConvertirLibro;
}

const ConvertirLibro = () =>{
    let titulo = document.getElementById("titulo-libro").value;
    let reseña = document.getElementById("reseña-libro").value;
    let editorial = document.getElementById("editorial-libro").value;
    let fechaPublicacion = document.getElementById("fecha-libro").value;
    let imagen = document.getElementById("imagen-libro").value;
    let urlLibro = document.getElementById("url-libro").value;
    let precio = parseInt(document.getElementById("precio-libro").value);
    let autor = parseInt(localStorage.getItem("id-autor"),10);
    let genero = JSON.parse(localStorage.getItem("lista-generos"));
    var libroConvertido = JSON.stringify({
        "titulo" : titulo,
        "resenia" : reseña,
        "editorial" : editorial,
        "fechaDePublicacion" : fechaPublicacion,
        "imagen" : imagen,
        "path" : urlLibro,
        "precio" : precio,
        "idAutor" : autor,
        "generos" : genero
    });
    CargarLibro(libroConvertido);
}

const InfoLibro = () =>{
    PedirGenero(cargaGeneros);
    PedirAutor(cargaAutores);
}
const cargaAutores = (json) =>{
    console.log(json);
    var init = 0;
    json.forEach(elemento => {
        if(init == 0){
            $("#seleccionar-autor").append(`<option value="0">Seleccionar`);
            init++;
        }
        $("#seleccionar-autor").append(
            `
              <option value="${elemento.id}">${elemento.nombreCompleto}
            `);
            $("#seleccionar-autor").change(function (e) { 

                localStorage.setItem("id-autor", $("#seleccionar-autor").val());
            });
    });
}
const cargaGeneros = (json) =>{
    console.log(json);
    var generos = [];
    var init = 0;
    json.forEach(elemento => {
        if(init == 3){
            $("#genero-id").append(`<br>`);
        }
        $(`#genero-id`).append(
            `
            <input id=${elemento.id} type="checkbox" required> ${elemento.descripcion}
            `);
            $(`#${elemento.id}`).on('click', function () {
                if($(this).is(':checked')){
                    generos.push(elemento.id);
                }
                else{
                    for (let index = 0; index < generos.length; index++) {
                        if(generos[index] == elemento.id){
                            generos.splice(index,1);
                        }
                    }
                }
                localStorage.setItem('lista-generos',JSON.stringify(generos));
            });
        init++;
    });
}



