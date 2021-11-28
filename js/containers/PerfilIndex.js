import { AgregarQuitarFav, GetFavoritosById } from "../services/FetchFavoritos.js"
import { parseJwt } from "../components/nav-var.js";
import { GetLibros } from "../services/FetchServices.js";
import { FavoritoParticular,SinFavoritos } from "../components/PerfilComponents.js";

const tab2 = document.querySelector(".tab2");
const content2 = document.querySelector(".content2");

export const RenderPerfil = () => {
    var decoded = parseJwt(localStorage.getItem("token"));
    GetFavoritosById(decoded.id,localStorage.getItem("token"),RenderFavoritos);
}

const RenderFavoritos = async (json) => {
    
    if(json[0].length != 0)
    {
        for (const favorito of json[0]) {
            console.log(favorito);
            let container_Favoritos = document.createElement("DIV");
            container_Favoritos.classList.add("container_Favoritos");
            let libro = await GetLibros(favorito.libro);
            container_Favoritos.innerHTML += FavoritoParticular(libro.titulo,libro.imagen);
            container_Favoritos.classList.add(`${libro.id}`);
            tab2.appendChild(container_Favoritos);
        }

        var btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");
        var divList = document.querySelectorAll(".container_Favoritos");

        btnDeleteLibros.forEach((cadaButton,i)=>{
                    
                    
            btnDeleteLibros[i].addEventListener('click',()=>{

                        
                    
                let Usuario = parseJwt(localStorage.getItem("token"));

                AgregarQuitarFav(divList[i].classList.item(1),Usuario.id,localStorage.getItem("token"),callback);    
                            
                tab2.removeChild(divList[i]);



                if(tab2.childElementCount <= 0)
                {
                    
                    tab2.innerHTML = SinFavoritos();
                    content2.style.height = "100%";
                    tab2.style.height= "100%";
                    
                }
            
                        
            });
                
        })
    }
    else{
        
        tab2.innerHTML = SinFavoritos();
        content2.style.height = "100%";
        tab2.style.height= "100%";
    }
}

const callback = () => {

}

const RenderMisLibros = () => {
    
}

const RenderMisCompras = () => {

}
const label = document.querySelectorAll(".label_Tab");
const tab = document.querySelectorAll(".tab");
const content = document.querySelectorAll(".content");

label.forEach((cadalabel, i )=>{

    label[i].addEventListener("click",()=>{
        
        label.forEach((cadalabel, i)=>{
            tab[i].classList.remove("activo");
            content[i].classList.remove("activo");
            content[i].classList.remove("contentActivo");
            label[i].classList.remove("labelActivo");
        })
        
        tab[i].classList.add("activo");
        content[i].classList.add("activo");
        content[i].classList.add("contentActivo");
        label[i].classList.add("labelActivo");
    }) 

    
})