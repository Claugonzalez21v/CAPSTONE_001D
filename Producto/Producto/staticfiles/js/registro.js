function register(){

let usuario=

document
.getElementById(
"user"
)
.value.trim();

let password=

document
.getElementById(
"pass"
)
.value.trim();

let correo=

document
.getElementById(
"email"
)
.value.trim();


/* campos vacíos */

if(
!usuario||
!password||
!correo
){

alert(
"Completa todos los campos"
);

return;

}


/* validar correo */

if(
!correo.includes("@")
){

alert(
"Correo inválido (debe contener @)"
);

return;

}


/* máximo contraseña */

if(
password.length>20
){

alert(
"La contraseña permite máximo 20 caracteres"
);

return;

}


/* obtener usuarios */

let usuarios=

JSON.parse(
localStorage.getItem(
"usuarios"
)

)||[];


/* usuario repetido */

let existe=

usuarios.find(
u=>u.usuario===usuario
);


if(
existe
){

alert(
"El usuario ya existe"
);

return;

}


/* guardar */

usuarios.push({

usuario:usuario,
password:password,
correo:correo

});


localStorage.setItem(

"usuarios",

JSON.stringify(
usuarios)

);


alert(
"Cuenta creada correctamente"
);

window.location.href=
"/";

}



/* volver login */

function goLogin(){

window.location.href=
"/";

}



/* si ya inició sesión */

let sesion=

sessionStorage.getItem(
"sesionActiva"
);

if(
sesion
){

window.location.href=
"/app/";

}