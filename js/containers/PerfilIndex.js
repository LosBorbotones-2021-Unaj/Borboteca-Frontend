import { AgregarQuitarFav, GetFavoritosById } from "../services/FetchFavoritos.js"
import { parseJwt } from "../components/nav-var.js";
import { DeleteVenta, GetLibros,CreateCarro,CreateVenta,CreateCarroLibro,GetLibrosComprados } from "../services/FetchServices.js";
import { FavoritoParticular,MiLibroParticular,SinFavoritos } from "../components/PerfilComponents.js";

const tab1 = document.querySelector(".tab1");
const content1 = document.querySelector(".content1");

const tab2 = document.querySelector(".tab2");
const content2 = document.querySelector(".content2");

export const RenderPerfil = () => {
    var decoded = parseJwt(localStorage.getItem("token"));
    GetFavoritosById(decoded.id,localStorage.getItem("token"),RenderFavoritos);
    GetLibrosComprados(decoded.id,RenderMisLibros);
}

const RenderFavoritos = async (json) => {
    
    if(json[0].length != 0)
    {
        for (const favorito of json[0]) {
            
            let container_Favoritos = document.createElement("DIV");
            container_Favoritos.classList.add("container_Favoritos");
            let libro = await GetLibros(favorito.libro);
            container_Favoritos.innerHTML += FavoritoParticular(libro.titulo,libro.imagen);
            container_Favoritos.classList.add(`${libro.id}`);
            tab2.appendChild(container_Favoritos);
        }

        var btnDeleteLibros = document.querySelectorAll(".btn_Delete_Libro");
        var divList = document.querySelectorAll(".container_Favoritos");
        var btn_Agregar_Carrito = document.querySelectorAll(".btn_Agregar_Carrito");
        let token = localStorage.getItem("token");
        let Usuario = parseJwt(token);     
        btnDeleteLibros.forEach((cadaButton,i)=>{
                    
                    
            btnDeleteLibros[i].addEventListener('click',async ()=>{

                        
                    
                

                await AgregarQuitarFav(divList[i].classList.item(1),Usuario.id,localStorage.getItem("token"),callback);    
                            
                tab2.removeChild(divList[i]);



                if(tab2.childElementCount <= 0)
                {
                    
                    tab2.innerHTML = SinFavoritos();
                    content2.style.height = "100%";
                    tab2.style.height= "100%";
                    
                }
            
                        
            });

            btn_Agregar_Carrito[i].addEventListener('click',async ()=>{
                await CreateCarro(Usuario.id,token);
                await CreateVenta(Usuario.id,token);
                await CreateCarroLibro(divList[i].classList.item(1),Usuario.id,token);
                await AgregarQuitarFav(divList[i].classList.item(1),Usuario.id,localStorage.getItem("token"),callback);
                tab2.removeChild(divList[i]);

                if(tab2.childElementCount <= 0)
                {
                    
                    tab2.innerHTML = SinFavoritos();
                    content2.style.height = "100%";
                    tab2.style.height= "100%";
    
                }
            })
                
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

const RenderMisLibros = async (MisLibros) => {
    if(MisLibros.librosIds != undefined && MisLibros.librosIds != null && MisLibros.librosIds.length != 0)
    {
        for (let miLibro of MisLibros.librosIds) 
        {
            
            let container_MiLibro = document.createElement("DIV");
            container_MiLibro.classList.add("container_MiLibro");
            let libro = await GetLibros(miLibro);
            container_MiLibro.innerHTML += MiLibroParticular(libro.titulo,libro.imagen);
            tab1.appendChild(container_MiLibro);
        }
    }
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