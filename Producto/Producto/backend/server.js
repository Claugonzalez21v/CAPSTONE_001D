require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* ===== CREAR PAGO ===== */
app.post("/create-payment-intent", async (req, res) => {

    try {

        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "CLP",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (err) {

        console.log(err);

        res.status(500).send({
            error: err.message
        });

    }

});

app.get("/", (req, res) => {
  res.send("Backend ReservaFacil funcionando correctamente");
});

/* ===== SERVER ===== */
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});