import { RenderPerfil } from "./containers/PerfilIndex.js"
import { genericNavVar } from './components/nav-var.js';

window.onload = () =>{
    let n = new URLSearchParams(window.location.search);
    let section = n.get("section");
    genericNavVar();
    RenderPerfil(section);
};