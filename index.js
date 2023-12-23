const express = require('express');

const dotenv = require('dotenv');
const stripe = require('stripe');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

app.use(express.json());

app.use(morgan('dev'));


const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });
});

app.get("/tienda", (res, req) => {
    req.sendFile("tienda.html", {
        root: path.join(__dirname, 'public')
    });
})

//servicios

app.get("/servicios", (res, req) => {
    req.sendFile("servicios.html", {
        root: path.join(__dirname, 'public')
    });
})

//EspecificacionProdutco

app.get("/EspecificacionProdutco", (res, req) => {
    req.sendFile("EspecificacionProdutco.html", {
        root: path.join(__dirname, 'public')
    });
})

//Quienes-somos

app.get("/Quienes-Somos", (res, req) => {
    req.sendFile("Quienes-Somos.html", {
        root: path.join(__dirname, 'public')
    });
})

//PolíticaDePrivacidad

app.get("/Politica-De-Privacidad", (res, req) => {
    req.sendFile("PoliticaDePrivacidad.html", {
        root: path.join(__dirname, 'public')
    });
})

//PoliticaDeEnvios

app.get("/Politica-De-Envios", (res, req) => {
    req.sendFile("PoliticaDeEnvios.html", {
        root: path.join(__dirname, 'public')
    });
})

//PoliticaDeGarantia

app.get("/Politica-De-Garantia", (res, req) => {
    req.sendFile("PoliticaDeGarantia.html", {
        root: path.join(__dirname, 'public')
    });
})

//PoliticaDeDevoluciones

app.get("/Politica-De-Devoluciones", (res, req) => {
    req.sendFile("PoliticaDeDevoluciones.html", {
        root: path.join(__dirname, 'public')
    });
})

//TiendaVestidos

app.get("/TiendaVestidos", (res, req) => {
    req.sendFile("TiendaVestidos.html", {
        root: path.join(__dirname, 'public')
    });
})

//TiendaCamisas

app.get("/TiendaCamisas", (res, req) => {
    req.sendFile("TiendaCamisa.html", {
        root: path.join(__dirname, 'public')
    });
})

//TiendaAccesorios

app.get("/TiendaAccesorios", (res, req) => {
    req.sendFile("TiendaAccesorios.html", {
        root: path.join(__dirname, 'public')
    });
})

//TiendaZapatos

app.get("/TiendaZapatos", (res, req) => {
    req.sendFile("TiendaZapatos.html", {
        root: path.join(__dirname, 'public')
    });
})

//Success

app.get("/success", (req, res) => {
    res.sendFile("success.html", {
        root: path.join(__dirname, 'public')
    });
});

//Cancel
app.get("/cancel", (req, res) => {
    res.sendFile("cancel.html", {
        root: path.join(__dirname, 'public')
    });
});

app.get("/hola", (req, res) => {
    const htmlResponse = `
    <html>
        <head>
            <title> NodeJS y express en vercel </title>
        </head>
        <body>
        <h1>Soy un proyecto back end en vercel hola</h1>
        </body>
    </html>
    `;
    res.send(htmlResponse);
});

app.listen(port, () =>{
    console.log(`post running in http://localhost:${port}`);
});

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