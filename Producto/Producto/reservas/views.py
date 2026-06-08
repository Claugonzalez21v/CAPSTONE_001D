from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login as auth_login
from django.contrib.auth.models import User
from django.conf import settings
from .models import Reserva
from .forms import ReservaForm

import calendar
from datetime import datetime
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# ===== LOGIN =====

def login(request):

    if request.method=="POST":

        username=request.POST.get(
            "user"
        )

        password=request.POST.get(
            "pass"
        )

        usuario=authenticate(
            request,
            username=username,
            password=password
        )

        if usuario is not None:

            auth_login(
                request,
                usuario
            )
            print("LOGIN CORRECTO")

            return redirect(
                "/app/"
            )
        else:

            print("LOGIN FALLÓ")


    return render(
        request,
        "login.html"
    )


# ===== REGISTRO =====

def registro(request):

    if request.method=="POST":

        username=request.POST.get(
            "user"
        )

        password=request.POST.get(
            "pass"
        )

        email=request.POST.get(
            "email"
        )

        if not User.objects.filter(
            username=username
        ).exists():

            User.objects.create_user(
                username=username,
                password=password,
                email=email
            )

            return redirect(
                "login"
            )

    return render(
        request,
        "registro.html"
    )


# ===== APP =====

@login_required
def app(request):

    reservas=Reserva.objects.filter(
        usuario=request.user
    )

    return render(
        request,
        "app.html",
        {
            "reservas":reservas
        }
    )


# ===== CREAR RESERVA =====

@login_required
def crearReserva(request):

    if request.method=="POST":

        form=ReservaForm(
            request.POST
        )

        if form.is_valid():

            reserva=form.save( commit=False )

            reserva.usuario=(
                request.user
            )

            lista_precios = {
                "Caballero": 10000,
                "Dama": 15000,
                "Barba": 6000,
                "Completo": 20000 }

            lista_precios.get(
            reserva.servicio,
            0)
            
            reserva.save()

            return redirect(
                "agendas"
            )

    else:

        form=ReservaForm()

    return render(
        request,
        "reservas.html",
        {
            "form":form
        }
    )


# ===== AGENDAS =====

@login_required
def agendasRegistradas(request):

    reservas=Reserva.objects.filter(
        usuario=request.user
    ).order_by(
        "fecha",
        "hora"
    )

    return render(
        request,
        "app.html",
        {
            "reservas":reservas
        }
    )


# ===== CALENDARIO =====

# ===== CALENDARIO =====

from django.http import JsonResponse

@login_required
def calendarioReserva(request):

    reservas=Reserva.objects.filter(
        usuario=request.user
    )

    data=[]

    for r in reservas:

        data.append({

            "id":r.id,
            "servicio":r.servicio,
            "fecha":str(r.fecha),
            "hora":str(r.hora),
            "precio":float(r.precio),
            "cumplida":r.cumplida

        })

    return JsonResponse({

        "reservas":data

    })

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Reserva
import json


@csrf_exempt
@login_required
def guardar_reserva(request):

    if request.method=="POST":

        data=json.loads(
            request.body
        )

        reserva=Reserva.objects.create(

           usuario=request.user,
           servicio=data["servicio"],
           fecha=data["fecha"],
           hora=data["hora"],
           precio=data["precio"]

        )

        return JsonResponse({

            "ok":True,
            "id":reserva.id

        })

    return JsonResponse({

        "ok":False

    })

@login_required
def eliminarReserva(request,id):

    if request.method=="DELETE":

        try:

            reserva=Reserva.objects.get(
                id=id,
                usuario=request.user
            )

            reserva.delete()

            return JsonResponse({

                "ok":True

            })

        except:

            return JsonResponse({

                "ok":False

            })

    return JsonResponse({

        "ok":False

    })
    
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@login_required
def create_payment_intent(request):

    if request.method == "POST":

        data = json.loads(request.body)

        intent = stripe.PaymentIntent.create(
            amount=int(data["amount"]),
            currency="clp"
        )

        return JsonResponse({
            "clientSecret": intent.client_secret
        })

    return JsonResponse({
        "error": "Método no permitido"
    }, status=405)