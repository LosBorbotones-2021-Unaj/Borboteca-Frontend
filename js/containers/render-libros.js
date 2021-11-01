import { CardComponent } from '../components/card-libros.js';
import { pedirLibros } from '../services/libros-index.js';

const RenderLibros = (json) =>{
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
const ChargeLibros = () => {
    pedirLibros(RenderLibros);
}
export const IndexRenderer = () => {
    
    ChargeLibros();

}