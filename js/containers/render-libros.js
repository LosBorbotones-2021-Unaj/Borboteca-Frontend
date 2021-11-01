import { CardComponent } from '../components/card-libros.js';
import { pedirLibros } from '../services/libros-index.js';
import { pedirPaginas} from '../services/libros-index.js';

let indexer = 1;
let paginas = 1;
export const RenderLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        let resenia = element.resenia;
        let img = element.imagen;
        $("#root").append(
            `
                <li class="cards_item">
                    <div class="card">
                    <div class="card_image"><img src="${img}"></div>
                    <div class="card_content">
                        <h2 class="card_title">${name}</h2>
                        <p class="card_text">${resenia}</p>
                        <button class="btn_card card_btn" href="#">+ info</button>
                        <button class="btn_card card_btn" href="#">Agregar al carro</button>
                    </div>
                    </div>
                </li>
            `
        )
    });
}
export const ChargeLibros = () => {
    pedirLibros(indexer,RenderLibros);
}
export const IndexRenderer = () => {
    ChargeLibros();
    ContadorPaginas();
}
const ContadorPaginas = () => {
    paginas = (pedirLibros()/9)+1;
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