const urlGetUsuario = `https://localhost:44363/api/usuarios/getUsuario`;
export async function getUsuario(email, contraseña,callback) {

    const url= urlGetUsuario + `?email=${email}&contrase%C3%B1a=${contraseña}`
    console.log(url)
await fetch (url,{method:'GET'})
  .then(httpResponse => {
      if(httpResponse.ok){
        return httpResponse.json()
      }
      
  })
    
  .then(body => {
      console.log(body)
    callback(body)
  });

}