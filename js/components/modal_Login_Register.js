
export const ModalLoginRegister = () => {
    `<div class="modal modal_Close">
    <p class="close">X</p>
    <div class="login_Container">
        <form class="login_Form">
            <h2 class="h2_Login">INGRESAR</h2>
            <input class="input_Login" type="text" placeholder="Usuario" required>
            <input class="input_Login" type="password" placeholder="Contraseña" required>
            <button class="button_Login"type="submit" disabled class="button_Login">Login</button>
            <a class="login_Forgot_Password">Olvidé mi contraseña</a>           
        </form>
        <form class="Register_Form">
            <h2 class="h2_Register">CREAR CUENTA</h2>
            <input class="input_Register" type="text" placeholder="Nombre" required>
            <input class="input_Register" type="text" placeholder="apellido" required>
            <input class="input_Register" type="email" placeholder="email" required>                     
            <input class="input_Register" type="password" placeholder="Contraseña" required>   
            <button class="button_Register" type="submit" disabled >Registrarse</button>                   
        </form>
    </div>
</div>`;
}