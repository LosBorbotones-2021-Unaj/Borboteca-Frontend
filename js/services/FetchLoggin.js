const urlGetUsuario = `https://localhost:44363/api/usuarios/getUsuario`;
const resto = `?email=emajulio.ej%40gmail.com&contrase%C3%B1a=blablabla`;
export async function getUsuario(email, contraseña) {
  var elemento = [];
  try {
    await fetch(
      urlGetUsuario + `?email=${email}&contrase%C3%B1a=${contraseña}`,
      { method: "GET" }
    )
    .then((response) => response.json())
    .then((data) => {
      elemento = data.map((element) => element);
    });

  return elemento;
} catch (error) {}
}

