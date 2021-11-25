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
        console.log(httpresponse);
        if(httpresponse.status==200){
          return httpresponse.json()
        }
        else{
          alert("Fue borrado de favoritos")
        }

      })  
      .then(body => {
        if(body==undefined){
        }else{
            callback()
      
        }
          
        
      })
}
