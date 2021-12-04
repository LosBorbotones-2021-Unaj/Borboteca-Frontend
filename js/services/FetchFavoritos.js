

const url=`https://localhost:44343/api/Favorito`
export const AgregarQuitarFav= async (idLibro,userId,token,callback)=>{
  let statusCode;
     await fetch(url, { 
                  method: 'post', 
                  headers: new Headers({
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  }), 
                  body:JSON.stringify({libro:idLibro ,idUsuario:userId})
                })
                .then(respueta =>  { return statusCode = respueta.status;})

      
      

      callback(statusCode,idLibro);

        
}

export const GetFavoritosById  = async (idUsuario,token,callback) => {
    await fetch(`${url}/${idUsuario}`,{
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        })
        
    })
    .then((httpResponse) => {
        if(httpResponse.ok)
            return httpResponse.json()
    })
    .then(body => {
        callback(body);
        
    })
}
