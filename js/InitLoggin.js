import { EnterUser } from "./containers/logginIndex.js";

window.onload=()=>{
    var boton = document.getElementById("BtnRegistrar");
    boton.onclick=EnterUser;
}