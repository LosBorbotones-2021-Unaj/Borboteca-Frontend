import { Createuser } from "./containers/RegisterIndex.js";

window.onload=()=>{
    var boton = document.getElementById("BtnRegistrarUser").onclick=Createuser;
}