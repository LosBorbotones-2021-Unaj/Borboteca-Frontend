export const CardComponent = (imagen,resenia,titulo) => `
        <div class="card" style="width: 18rem;">
                <img src="${imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${resenia}</p>
                <a href="#" class="btn btn-primary">+ info</a>
                </div>
        </div>
`