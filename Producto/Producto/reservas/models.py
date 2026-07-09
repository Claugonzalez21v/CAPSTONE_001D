from django.db import models
from django.contrib.auth.models import User
from datetime import date


class Reserva(models.Model):

    SERVICIOS=[

        ('Caballero','Caballero'),
        ('Dama','Dama'),
        ('Barba','Barba'),
        ('Completo','Completo')

    ]

    usuario=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    email = models.EmailField(blank=True, null=True)

    servicio=models.CharField(
        max_length=100,
        choices=SERVICIOS
    )

    fecha=models.DateField()

    hora=models.TimeField()

    precio=models.DecimalField( max_digits=10, decimal_places=2    )

    creada=models.DateTimeField(
        auto_now_add=True
    )
    barbero = models.CharField(
    max_length=100,
    default="Sin asignar"
)
    

    @property
    def cumplida(self):
        return self.fecha < date.today()

    def __str__(self):
        return f"{self.usuario} - {self.fecha}"