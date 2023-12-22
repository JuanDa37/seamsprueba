import express from "express";

import dotenv from "dotenv";

import stripe from "stripe";

import path from 'path';

import morgan from 'morgan';

import mysql from 'mysql';

import myConnection from 'express-myconnection';

//load variables

dotenv.config();

//Start server

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

/*app.set('public', path.join(__dirname, 'public'));
app.use(express.static('public'));
app.use(express.json());*/

app.use(morgan('dev'));

/*app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sea'
}, 'single'));*/


//Home route

app.get('/', (req, res) => {
    res.sendFile('tienda.html', {
        root: 'public'
    });
})

//tienda

app.get("/tienda", (res, req) => {
    req.sendFile("tienda.html", {
        root: "public"
    });
})

//servicios

app.get("/servicios", (res, req) => {
    req.sendFile("servicios.html", {
        root: "public"
    });
})

//EspecificacionProdutco

app.get("/EspecificacionProdutco", (res, req) => {
    req.sendFile("EspecificacionProdutco.html", {
        root: "public"
    });
})

//Quienes-somos

app.get("/Quienes-Somos", (res, req) => {
    req.sendFile("Quienes-Somos.html", {
        root: "public"
    });
})

//PolíticaDePrivacidad

app.get("/Politica-De-Privacidad", (res, req) => {
    req.sendFile("PoliticaDePrivacidad.html", {
        root: "public"
    });
})

//PoliticaDeEnvios

app.get("/Politica-De-Envios", (res, req) => {
    req.sendFile("PoliticaDeEnvios.html", {
        root: "public"
    });
})

//PoliticaDeGarantia

app.get("/Politica-De-Garantia", (res, req) => {
    req.sendFile("PoliticaDeGarantia.html", {
        root: "public"
    });
})

//PoliticaDeDevoluciones

app.get("/Politica-De-Devoluciones", (res, req) => {
    req.sendFile("PoliticaDeDevoluciones.html", {
        root: "public"
    });
})

//TiendaVestidos

app.get("/TiendaVestidos", (res, req) => {
    req.sendFile("TiendaVestidos.html", {
        root: "public"
    });
})

//TiendaCamisas

app.get("/TiendaCamisas", (res, req) => {
    req.sendFile("TiendaCamisa.html", {
        root: "public"
    });
})

//TiendaAccesorios

app.get("/TiendaAccesorios", (res, req) => {
    req.sendFile("TiendaAccesorios.html", {
        root: "public"
    });
})

//TiendaZapatos

app.get("/TiendaZapatos", (res, req) => {
    req.sendFile("TiendaZapatos.html", {
        root: "public"
    });
})

//Success

app.get("/success", (req, res) => {
    res.sendFile("success.html", {
        root: "public"
    });
});

//Cancel
app.get("/cancel", (req, res) => {
    res.sendFile("cancel.html", {
        root: "public"
    });
});

//Stripe

//Tomamos la api key de stripe
let stripeGateway = stripe('sk_test_51OKKBQGfch5pufi1z1rHVFxcKrVMBSR04oES0rRjZDOUJ88wRWpLnK4rBeH0lQ6b4AZ4LiwOLFvqlcILwjlecjvl00Hnu7PjP6');

let DOMAIN = process.env.DOMAIN;


//Método para conectar con las pasarela y mnadar los productos
app.post("/stripe-checkout", async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        console.log("item-price:", item.price);
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "")* 100)
        console.log("unitAmount:", unitAmount);
        return{
            price_data:{
                currency: "cop",
                product_data:{
                    name: item.title,
                    images: [item.productImg]
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        }
    })
    console.log("lineItems:", lineItems);

    //Create checkout sesion
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
        line_items: lineItems,
        //Asking address in checkout page
        billing_address_collection: "required"
    })
    res.json(session.url);
})

//Puerto en el que sorre el sitio web
app.listen(3000, () => {
    console.log("listening on port 3000;");
})