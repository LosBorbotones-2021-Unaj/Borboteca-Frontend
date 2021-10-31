import { getUsuario } from "../services/FetchLoggin.js"


export const  EnterUser= async()=>{
 const usuario = document.getElementById("Usuario").value
 const contraseña=document.getElementById("Contra").value
 var elemento = await getUsuario(usuario,contraseña)
 console.log(elemento);
 localStorage.setItem("IdUsuario",elemento.id)

}