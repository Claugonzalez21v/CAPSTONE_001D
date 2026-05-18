function register(){

    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();

    if(!user || !pass){
        alert("Completa todos los campos");
        return;
    }

    if(DB.userExists(user)){
        alert("Ese usuario ya existe");
        return;
    }

    DB.addUser({user, pass});

    alert("Cuenta creada correctamente");

    window.location.href = "login.html";
}

function goLogin(){
    window.location.href = "login.html";
}