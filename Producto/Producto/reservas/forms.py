from django import forms
from .models import Reserva


class ReservaForm(forms.ModelForm):

    class Meta:

        model = Reserva

        fields = [
            'servicio',
            'barbero',
            'fecha',
            'hora',
            'precio'
        ]

        widgets = {

            'fecha':forms.DateInput(

                attrs={
                    'type':'date',
                    'class':'form-control'
                }

            ),

            'hora':forms.TimeInput(

                attrs={
                    'type':'time',
                    'class':'form-control'
                }

            ),

            'servicio':forms.Select(

                attrs={
                    'class':'form-control'
                }

            )

        }