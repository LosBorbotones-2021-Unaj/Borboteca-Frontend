const url=`https://localhost:44343/api/Favorito`
export const AgregarQuitarFav=(idLibro,userId,token,callback)=>{
    fetch(url, { 
        method: 'post', 
        headers: new Headers({
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }), 
        body:JSON.stringify({libro:idLibro ,idUsuario:userId})
      })
      .then((httpresponse)=>{
        if(httpresponse.ok){
          return httpresponse.json()
        }
      })  
      .then(body => {
        if(body==undefined){
            alert("No se agrego una mierda")
        }else{
            callback()
      
        }
          
        
      })
}
