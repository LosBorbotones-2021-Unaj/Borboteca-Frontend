import { getUsuario } from "../services/FetchLoggin.js"

const GuardarEnLocalStorage=(json)=>{
        console.log(json)
        localStorage.setItem("IdUsuario",json[0].id)    
       location.href="http://127.0.0.1:5501/Borboteca-Frontend/view/index.html"
}

export const  EnterUser= ()=>{
 const usuario = document.getElementById("Usuario").value
 const contraseña=document.getElementById("Contra").value
  getUsuario(usuario,contraseña,GuardarEnLocalStorage)

}
