from django.urls import path
from . import views


urlpatterns=[

    # LOGIN
    path(
        '',
        views.login,
        name='login'
    ),

    # REGISTRO
    path(
        'registro/',
        views.registro,
        name='registro'
    ),

    # APP PRINCIPAL
    path(
        'app/',
        views.app,
        name='app'
    ),

    # CREAR RESERVA
    path(
        'reservar/',
        views.crearReserva,
        name='reservar'
    ),

    # AGENDAS REGISTRADAS
    path(
        'agendas/',
        views.agendasRegistradas,
        name='agendas'
    ),

    # CALENDARIO
    path(
        'calendario/',
        views.calendarioReserva,
        name='calendario'
    ),

    path(
        "guardar/",
        views.guardar_reserva,
        name="guardar"
    ),
    
    path(
    "eliminar/<int:id>/",
    views.eliminarReserva,
    name="eliminar"
    ),
    
    path(
    "create-payment-intent/",
    views.create_payment_intent,
    name="create_payment_intent"
),

]

