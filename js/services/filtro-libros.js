import {pedirLibros} from '../services/libros-index.js'
import {RenderLibros} from '../containers/render-libros.js'

let limpieza = 0;
$("#myInput").ready(function () {
    $("#myInput").keyup(function (e) { 
        IsKeyUp();
    });
});

const RenderNombreLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        $("#booklist").append
        (
            ` <li><a href="#">${name}</a></li>`
        )
    });
}

async function IsKeyUp()  
{
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("booklist");
    li = ul.getElementsByTagName('li');
    if (filter.length != 0){
        for (i = 0; i < li.length; i++) 
        {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) 
            {
                li[i].style.display = "";
            } 
            else 
            {
                li[i].style.display = "none";
            }
        }
    }
    else{
        pedirLibros(1,RenderLibros);
    }
    if (limpieza == 0){
        pedirLibros(1,RenderNombreLibros);
        limpieza++;
    }
    
    
    $("#root").empty();
}