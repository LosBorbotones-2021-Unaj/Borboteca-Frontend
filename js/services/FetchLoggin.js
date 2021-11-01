const urlGetUsuario = `https://localhost:44363/api/usuarios/getUsuario`;
export  const getUsuario=(email, contraseña,callback)=> {
   fetch(urlGetUsuario + `?email=${email}&contrase%C3%B1a=${contraseña}`)
    .then((httpresponse)=>{
      if(httpresponse.ok){
        return httpresponse.json()
      }
        

    })  
    .then(body => {
      console.log(body)
      callback(body)
    })
  } 

