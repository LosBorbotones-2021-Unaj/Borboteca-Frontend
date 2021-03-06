import { CardComponent } from '../components/card-libros.js';
import { parseJwt } from '../components/nav-var.js';
import { AgregarQuitarFav } from '../services/FetchFavoritos.js';
import { GetLibros } from '../services/FetchServices.js';
import { pedirPaginas}   from '../services/libros-index.js';
import { DescargarLibro, pedirLibros }   from '../services/libros-index.js';

let indexer = 1;
export const RenderLibros = (json) =>{
    $("#root").empty();
    json.forEach(element => {
        let name = element.titulo;
        let resenia = element.resenia;
        let img = element.imagen;
        let precio=element.precio;
        $("#root").append(
            `
            <div class="wrapper">
                    <div class="container">
                    <a href="/view/vistaInfoLibro.html" class="link_InfoLibro">      
                            <img class="top" id="libroId-${element.id}" src="${img}" alt="">
                            <div class="bottom">
                                <div class="left">
                                    <div class="details">
                                        <h2 class="txt_products">${name}</h2>
                                                
                                    </div>
                                    <div class="libroId-${element.id} buy">
                                        <a href="#">
                                            <i class="fas fa-heart"></i>
                                        </a>
                                    </div>
                                                
                                </div>
                            </div>
                    </a>
                        <div class="inside">
                        <div class="icon">
                            <i class="far fa-eye"></i>
                        </div>
                        <div class="contents">
                            <h1>${name}</h1>
                            <p>${resenia}</p>
                            <p> $${precio}</p>
                        </div>
                        
                    </div>
            </div>
            `
    )
        
        $(`#libroId-${element.id}`).click(function (e) { 
        
            localStorage.setItem("idLibro",element.id)
    
        })

        $(`.libroId-${element.id}`).click(function (e) { 
            localStorage.setItem("idLibro",element.id)
            AgregarAfavoritos();
        })
    });
}


const AgregarAfavoritos=()=>{
    if(verificarSeccion()){
       var usuario= parseJwt(localStorage.getItem("token"))
         AgregarQuitarFav(localStorage.getItem("idLibro"),usuario.id,localStorage.getItem("token"),AgregadoEliminadoExitoso)
    }else{
        window.location.href = "Loggin.html"
    }
}
export const AgregadoEliminadoExitoso=async (statusCode,libroId)=>{
    

    let libroFavorito = await GetLibros(libroId);
    
    if(statusCode == 200)
    {
        toastr.info("",`Se agrego ${libroFavorito.titulo} de tus Favoritos`,{
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            
        })
    }
    else
    {
            toastr.info("",`Se quito ${libroFavorito.titulo} de tus Favoritos`,{
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                
            })
    }
    
}

export const verificarSeccion=()=>{
    if (localStorage.getItem("token")==undefined){
        return false;
    }
    else{
        return true;
    }
}
export const cambiarColor =( )=>{
    let elemento = document.getElementById("linkFavorito");
    elemento.addEventListener("click",()=>{
        elemento.style.color="red"
    })
   
}
export const ChargeLibros = () => {
    pedirLibros(indexer,RenderLibros);
}
export const IndexRenderer = () => {
    ChargeLibros();
    
    $("#descarga").append(
        `
        <a href="#" download="frutas_del_mundo.pdf">Download file</a>
        `);
        $("#descarga").click(function (e) { 
            DescargarLibro();
        });
}
const ContadorPaginas = () => {
   let paginas = (pedirLibros()/9)+1;
}

$("#siguiente").click(function (e) { 
    indexer += 1;
    $("#root").empty();
    pedirLibros(indexer,RenderLibros);
});
$("#anterior").click(function (e) { 
    if (indexer != 1)
    {
        indexer -= 1;
        $("#root").empty();
        pedirLibros(indexer,RenderLibros);
    }
});
export const CambiarColor=()=>{
    const favorito = document.getElementById("linkFavorito")
    favorito.style.color="red";
} 


export const DownloadFile = (fileName,idLibro) => {
    var url = "https://localhost:44331/api/Libro?Guid_Id=" + idLibro;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Authorization",`Bearer ${localStorage.getItem("token")}`);
    req.responseType = "blob";
    req.onload = function () {
        var blob = new Blob([req.response], 
        { 
            type: "application/octetstream",
        });
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var url = window.URL || window.webkitURL;
            let link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
};
    