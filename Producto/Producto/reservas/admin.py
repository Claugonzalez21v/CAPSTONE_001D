from django.contrib import admin
from .models import Reserva


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):

    list_display=(

        "usuario",
        "servicio",
        "fecha",
        "hora",
        "precio"

    )

    search_fields=(

        "usuario__username",
        "servicio"

    )

    list_filter=(

        "fecha",
        "servicio"

    )