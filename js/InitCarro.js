import { IndexRender } from './containers/CarroIndex.js'

window.onload = () =>{
    IndexRender();
};

const LoggedMenuUl = document.querySelector(".Logged_Menu_Links");
const LoggedUserContainer = document.querySelector(".Logged_User_Container");
const UserIconPath = document.querySelector(".userIconPath");
const UserMenuDownIconPath = document.querySelector(".userMenuDownIconPath");

LoggedMenuUl.addEventListener("mousemove",(e)=>
{
    LoggedUserContainer.classList.add("change_background_Logged_User");
    UserIconPath.classList.add("change_icons_Logged_User");
    UserMenuDownIconPath.classList.add("change_icons_Logged_User");
});
LoggedMenuUl.addEventListener("mouseleave",(e)=>{
    LoggedUserContainer.classList.remove("change_background_Logged_User");
    UserIconPath.classList.remove("change_icons_Logged_User");
    UserMenuDownIconPath.classList.remove("change_icons_Logged_User");
})
