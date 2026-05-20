require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* ===== CONFIGURAR CORREO ===== */

const transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

});

/* ===== CREAR PAGO ===== */

app.post("/create-payment-intent", async(req,res)=>{

    try{

        const {amount} = req.body;

        const paymentIntent =
        await stripe.paymentIntents.create({

            amount,
            currency:"CLP",

            automatic_payment_methods:{
                enabled:true
            }

        });

        res.send({
            clientSecret:
            paymentIntent.client_secret
        });

    }catch(err){

        console.log(err);

        res.status(500).send({
            error:err.message
        });

    }

});

/* ===== ENVIAR CORREO ===== */

app.post("/enviar-correo", async(req,res)=>{

    try{

        const {
            email,
            servicio,
            fecha,
            hora,
            precio
        } = req.body;

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:email,

            subject:"Reserva confirmada ✂️",

            html:`

            <h2>Reserva Confirmada</h2>

            <p><b>Servicio:</b> ${servicio}</p>
            <p><b>Fecha:</b> ${fecha}</p>
            <p><b>Hora:</b> ${hora}</p>
            <p><b>Total:</b> $${precio}</p>

            <hr>

            <p>Gracias por preferir nuestra barbería 💈</p>

            `
        });

        res.send({
            ok:true
        });

    }catch(err){

        console.log(err);

        res.status(500).send({
            error:err.message
        });

    }

});

/* ===== SERVIDOR ===== */

app.get("/", (req, res) => {
  res.send("Backend ReservaFacil funcionando correctamente");
});

app.listen(3000,()=>{

    console.log(
        "Servidor corriendo en puerto 3000"
    );

});