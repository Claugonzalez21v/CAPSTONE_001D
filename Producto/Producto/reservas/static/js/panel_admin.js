function cerrarSesionAdmin(){

    sessionStorage.removeItem(
        "sesionAdmin"
    );

    sessionStorage.removeItem(
        "sesionActiva"
    );

    window.location.href="/";

}

function irPanelPrincipal(){

    sessionStorage.setItem(
        "sesionActiva",
        "claudioadmin"
    );

    sessionStorage.removeItem(
        "sesionAdmin"
    );

    window.location.href="/app/";

}