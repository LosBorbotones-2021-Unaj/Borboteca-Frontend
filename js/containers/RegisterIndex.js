import { PostUsuario } from "../services/FetchRegister.js"

const CreateUserSuccess=()=>{

    
    window.location.href = "Loggin.html"

}
const CreateUserFailed=()=>{
    toastr["error"]("Error", "Ha acurrido un error",{
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        
    })
}

export const  Createuser= ()=>{
   
    const usuario = document.getElementById("Usuario").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const contraseña=document.getElementById("Contra").value

     PostUsuario(usuario,apellido,email,contraseña,CreateUserSuccess,CreateUserFailed)
   
   }