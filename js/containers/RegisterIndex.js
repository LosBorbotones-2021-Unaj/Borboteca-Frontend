import { PostUsuario } from "../services/FetchRegister.js"

const CreateUserSusses=()=>{
    console.log("El usuario se creo exitosamente")
    window.location.href = "Loggin.html"
}
const CreateUserFailed=()=>{
    console.log("El usuario no fue creado")
}

export const  Createuser= ()=>{
    console.log("hola perro")
    const usuario = document.getElementById("Usuario").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const contraseña=document.getElementById("Contra").value

     PostUsuario(usuario,apellido,email,contraseña,CreateUserSusses,CreateUserFailed)
   
   }