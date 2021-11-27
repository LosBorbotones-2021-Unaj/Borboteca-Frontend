import { RenderPerfil } from "./containers/PerfilIndex.js"

window.onload = () =>{
    let n = new URLSearchParams(window.location.search);
    let section = n.get("section");
    console.log(section);
    console.log(n);
    RenderPerfil();
};