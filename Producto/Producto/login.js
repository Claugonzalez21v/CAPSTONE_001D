function login(){

    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();

    let encontrado = DB.findUser(user, pass);

    if(encontrado){

        localStorage.setItem("user", user);
        sessionStorage.setItem("active", "true");

        localStorage.removeItem("notifs");

        window.location.href = "index.html";

    } else {

        alert("Usuario o contraseña incorrectos");

    }
}

function goRegister(){
    window.location.href = "registro.html";
}