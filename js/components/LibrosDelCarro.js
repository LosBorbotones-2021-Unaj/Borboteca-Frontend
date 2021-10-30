export const LibrosDelCarro = () =>
`<div class="Libros_Grid_Item Libros_Info_General"> 
        <p class="nombre_Libro_General">Item</p>
        <p class="precio_Libro_General">Precio</p>
    </div>`

export const LibrosDelCarroParticulares = (Titulo,Autor,Precio) => 
`<div class="Libros_Grid_Item Libros_Info_Particular">
    <div>
        <p class="nombre_Libro_Particular">${Titulo}</p>
        <p class="nombre_Libro_Particular">${Autor}</p>
    </div>
    <p class="precio_Libro_Particular">${Precio}</p>
  </div>`
