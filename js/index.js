import { genericNavVar } from './components/nav-var.js';
import {cambiarColor, IndexRenderer} from './containers/render-libros.js'

window.onload = () =>{
    genericNavVar();
    IndexRenderer();
    var elemento = document.getElementById("linkFavorito")
    elemento.onclick=cambiarColor;
    
}