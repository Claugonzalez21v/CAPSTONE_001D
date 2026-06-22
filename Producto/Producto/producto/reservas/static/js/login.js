function login() {

    let usuario =

        document
            .getElementById(
                "user"
            )
            .value.trim();

    let password =

        document
            .getElementById(
                "pass"
            )
            .value.trim();


    if (
        !usuario ||
        !password
    ) {

        alert(
            "Completa todos los campos"
        );

        return;

    }


    let usuarios =

        JSON.parse(
            localStorage.getItem(
                "usuarios"
            )

        ) || [];


    let existe =

        usuarios.find(
            u =>

                u.usuario === usuario &&
                u.password === password

        );


    if (
        !existe
    ) {

        alert(
            "Usuario o contraseña incorrectos"
        );

        return;

    }


    /* guardar sesión */

    sessionStorage.setItem(

        "sesionActiva",
        usuario

    );


    /* entrar al panel */

    window.location.href =

        "/app/";

}

function goRegister() {

    window.location.href =
        "/registro/";

}

