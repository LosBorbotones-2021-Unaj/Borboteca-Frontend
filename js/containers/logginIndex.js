import { getUsuario } from "../services/FetchLoggin.js"

const GuardarEnLocalStorage=(json)=>{
        localStorage.setItem("token",json[0].token)  
        window.location.href = "index.html"
}
const Usuarioinexistente=()=>{
 const loggin = document.getElementById("informacion")
  loggin.innerHTML='<h4 id="informacion" class="animate__animated animate__heartBeat">Usuario no encontrado en la base de datos</h4>';
}

export const  EnterUser= ()=>{
 const usuario = document.getElementById("Usuario").value
 const contraseña=document.getElementById("Contra").value
  getUsuario(usuario,contraseña,GuardarEnLocalStorage,Usuarioinexistente)

}
