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

    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    servicio = models.CharField(max_length=50)

    barbero = models.CharField(max_length=100)

    fecha = models.DateField()

    hora = models.TimeField()

    precio = models.DecimalField(max_digits=10, decimal_places=0)

    cumplida = models.BooleanField(default=False)

    creada = models.DateTimeField(auto_now_add=True)
    @property
    def cumplida(self):
        return self.fecha < date.today()

    def __str__(self):
        return f"{self.usuario} - {self.fecha}"