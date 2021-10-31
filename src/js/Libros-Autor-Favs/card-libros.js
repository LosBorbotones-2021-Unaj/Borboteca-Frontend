export const CardComponent = (imagen,resenia,titulo) => `
        <div class="container">
        <div class="banner-img"></div>
        <img src= "${imagen}" class="profile-img">
        <h1 class="name">${titulo}</h1>
        <p class="description">${resenia}</p>
        <button href="www.youtube.com" class="btn">+ Info</button> 
        </div>
`