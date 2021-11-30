import { AgregarQuitarFav, GetFavoritosById } from "../services/FetchFavoritos.js"
import { parseJwt } from "../components/nav-var.js";
import { DeleteVenta, GetLibros,CreateCarro,CreateVenta,CreateCarroLibro,GetLibrosComprados,GetUsuarioByid, GetAllVentas, GetVentaByFechaEstado } from "../services/FetchServices.js";
import { FavoritoParticular,InfoUsuario,InfoVentaGeneral,MiLibroParticular,SinFavoritos,UsuarioSinLibros,InfoVentaParticular,libroCompradoInfo,libroCompradoInfoGeneral,SinCompras,CompraNoEncontrada } from "../components/PerfilComponents.js";
import { AgregadoEliminadoExitoso } from "./render-libros.js";
import { AgregarAlCarroMessage } from "./CarroIndex.js";

var decoded = parseJwt(localStorage.getItem("token"));

const tab1 = document.querySelector(".tab1");
const content1 = document.querySelector(".content1");
const label1 = document.querySelector(".label1");

const tab2 = document.querySelector(".tab2");
const content2 = document.querySelector(".content2");
const label2 = document.querySelector(".label2");

const tab3 = document.querySelector(".tab3");
const content3 = document.querySelector(".content3");
const label3 = document.querySelector(".label3");


let ComprasCards = document.querySelector(".Compras_Cards");

export const RenderPerfil = (section) => {
    
    GetUsuarioByid(decoded.id,RenderInfoUsuario);
    GetFavoritosById(decoded.id,localStorage.getItem("token"),RenderFavoritos);
    GetLibrosComprados(decoded.id,RenderMisLibros);
    GetAllVentas(decoded.id,RenderMisCompras);
    if(section == "libros")
    {
        tab1.classList.add("activo");
        content1.classList.add("activo");
        content1.classList.add("contentActivo");
        label1.classList.add("labelActivo");

    }
    else if(section == "favoritos")
    {
        tab2.classList.add("activo");
        content2.classList.add("activo");
        content2.classList.add("contentActivo");
        label2.classList.add("labelActivo");

    }
    else if(section == "compras")
    {
        tab3.classList.add("activo");
        content3.classList.add("activo");
        content3.classList.add("contentActivo");
        label3.classList.add("labelActivo");

    }
    else{

    }
}

const RenderInfoUsuario = (UsuarioActual) => {
    const header = document.querySelector(".header");
    header.innerHTML = InfoUsuario(UsuarioActual.nombre,UsuarioActual.apellido,UsuarioActual.email);
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

                        
                    
                

                await AgregarQuitarFav(divList[i].classList.item(1),Usuario.id,localStorage.getItem("token"),AgregadoEliminadoExitoso);    
                            
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
                await CreateCarroLibro(divList[i].classList.item(1),Usuario.id,token,AgregarAlCarroMessage);
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
    else
    {
        tab1.style.alignItems="center";
        tab1.innerHTML = UsuarioSinLibros();
    }
}

const RenderMisCompras = (Fechas) => {
    console.log(Fechas);
        if(Fechas[0] != null)
        {
            const FechaSelection = document.querySelector("#fecha_Selection");
            const EstadoSelection = document.querySelector("#estado_Selection");
            let ListaNoRepetirFechas = [];
            let fragment = document.createDocumentFragment();
            for (let Fecha of Fechas) 
            {
                let Fecha1 = Fecha.split("/");
                let Date1 = new Date(Fecha1[0],Fecha1[1],Fecha1[2]);
               
                if(ListaNoRepetirFechas.filter(xfecha => SonIguales(Date1,xfecha)).length == 0 || ListaNoRepetirFechas.length == 0)
                {
                    let NuevaFecha = CambiarFormato(Fecha1);
                    let OptionFecha = document.createElement("OPTION");
                    OptionFecha.classList.add("fecha_Option");
                    OptionFecha.innerHTML = Fecha;
                    OptionFecha.value = NuevaFecha;      
                    fragment.appendChild(OptionFecha);
                    ListaNoRepetirFechas.push(Fecha);
                    
                }
                
            }
            FechaSelection.appendChild(fragment);

            const ButtonSearchFunction = document.querySelector(".Button_Search_Compras");
            ButtonSearchFunction.addEventListener('click',async ()=>{
        
                tab3.removeChild(ComprasCards); 
                ComprasCards = document.createElement("DIV");
                await ComprasCards.classList.add("Compras_Cards");
                ComprasCards.style.boxShadow ="0px 1px 2px 1px rgb(0 0 0 / 24%)";
                tab3.appendChild(ComprasCards);
                GetVentaByFechaEstado(decoded.id,FechaSelection.value,EstadoSelection.value,RenderComprasCards);
                
            });
        }
        else{
            content3.style.height = "100%";
            tab3.style.height = "100%";
            tab3.innerHTML = SinCompras();
        }

       
}

const RenderComprasCards = async (ResponseCompras) => {

    if(ResponseCompras.length != 0)
    {
        let divSeparador = document.createElement("DIV");
        let hr = document.createElement("HR");
        divSeparador.classList.add("separador");
        ComprasCards.innerHTML += InfoVentaGeneral();

        for (const Compra of ResponseCompras) {
            ComprasCards.appendChild(divSeparador);
            divSeparador.appendChild(hr);
            let div_libro_Info = document.createElement("DIV");
            div_libro_Info.classList.add("divLibroInfo");
            div_libro_Info.innerHTML += libroCompradoInfoGeneral();
            ComprasCards.innerHTML += InfoVentaParticular(Compra.fecha,Compra.comprobante,Compra.estado);

            for (const libroComprado of Compra.librosId) {
                let libro = await GetLibros(libroComprado);
                let divSeparadorLibros = document.createElement("DIV");
                divSeparadorLibros.classList.add("separadorLibros");
                let hrLibros = document.createElement("HR");
                divSeparadorLibros.appendChild(hrLibros);
                div_libro_Info.appendChild(divSeparadorLibros);
                div_libro_Info.innerHTML += libroCompradoInfo(libro.titulo,libro.precio);
                ComprasCards.appendChild(div_libro_Info);
            }
            
            

        }
    }
    else
    {
        ComprasCards.innerHTML = CompraNoEncontrada();
        ComprasCards.style.border="none";    
    }
    
}

const SonIguales = (Date1,fecha2) => {
    let fecha2Nueva = fecha2.split("/");
    let Date2 = new Date(fecha2Nueva[0],fecha2Nueva[1],fecha2Nueva[2]);
    if(Date1.getTime() == Date2.getTime())
        return true;

    return false;
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

function CambiarFormato (fecha) {
    let newFormato = `${fecha[2]}-${fecha[1]}-${fecha[0]}`
    return newFormato;
}
