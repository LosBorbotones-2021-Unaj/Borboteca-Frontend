const urlGetUsuario = `https://localhost:44343/api/login`;
export  const getUsuario=(email, contraseña,callback,badRequest) => {
   fetch(urlGetUsuario,
    {
      method:`POST`,
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({Email:email ,Password:contraseña})
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

