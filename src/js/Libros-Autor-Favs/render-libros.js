import { CardComponent } from './card-libros.js';
import { pedirLibros } from './libros-index.js';

let _root;
const RenderLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        let resenia = element.resenia;
        let img = element.imagen;
        _root.innerHTML += CardComponent(img,resenia,name);
    });
}
const ChargeLibros = () => {
    pedirLibros(RenderLibros);
}
export const IndexRenderer = () => {
    _root = document.getElementById("root");
    ChargeLibros();

}