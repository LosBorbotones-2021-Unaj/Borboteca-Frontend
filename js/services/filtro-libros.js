let _booklist;
document.getElementById("myInput").onkeyup = function() {IsKeyUp()};


// JavaScript code
function search_animal() {
	let input = document.getElementById('searchbar').value
	input=input.toLowerCase();
	let x = document.getElementsByClassName('animals');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="list-item";				
		}
	}
}

window.onload = () =>{
    GetList();
}

function GetList()
{
    _booklist = document.getElementById("booklist");
    ChargeNombreLibros(RenderNombreLibros);
}

const ChargeNombreLibros = () => {
    pedirNombreLibros(RenderNombreLibros);
}

const pedirNombreLibros = (callback) => 
{
    fetch("https://localhost:44363/api/Libro/PedirLibros")
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json();
    })
    .then(body => {
        callback(body);
    })
}

let _root;
const RenderNombreLibros = (json) =>{
    json.forEach(element => {
        let name = element.titulo;
        $("#booklist").append
        (
            ` <li><a href="#">${name}</a></li>`
        )
    });
}


function IsKeyUp() 
{
    // Declare variables
    _booklist = [];
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("booklist");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
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