const urlPostUsuario = `https://localhost:44343/api/Usuario`;
export  const PostUsuario=(nombre,apellido,email, contraseña,callback,badRequest) => {
   fetch(urlPostUsuario,
    {
      method:`POST`,
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({nommbre:nombre,apellido:apellido, email:email ,contraseña:contraseña})
    })
    .then((httpresponse)=>{
      if(httpresponse.ok){
        return httpresponse.json()
      }
    })  
    .then(body => {
      if (body==undefined){
        badRequest()
      }else{
        callback(body)
      }
      
    })
  } 
