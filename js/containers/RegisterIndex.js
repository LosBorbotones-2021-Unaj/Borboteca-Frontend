import { PostUsuario } from "../services/FetchRegister"

const CreateUserSusses=()=>{
    console.log("El usuario se creo exitosamente")
}
const CreateUserFailed=()=>{
    console.log("El usuario no fue creado")
}

export const  Createuser= ()=>{
    const usuario = document.getElementById("Usuario").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const contra = document.getElementById("contra").value
    
    const contraseña=document.getElementById("Contra").value
     PostUsuario(usuario,apellido,email,contra,CreateUserSusses,CreateUserFailed)
   
   }