function register(){

    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();
    let email = document.getElementById("email").value.trim();

    if(!user || !pass || !email){
        alert("Completa todos los campos");
        return;
    }

    if(DB.userExists(user)){
        alert("Ese usuario ya existe");
        return;
    }

    DB.addUser({
        user,
        pass,
        email
    });

    alert("Cuenta creada correctamente");

    window.location.href="login.html";
}

function goLogin(){
    window.location.href="login.html";
}