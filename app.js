const express = require("express");

const morgan = require("morgan")  //lector de peticiones

const router = require("../router/product.router")

const app = express();

app.use(morgan("dev"))  //siempre antes de las rutas y peticiones

app.get("/", (req, res) => {
    res.send("Hello World, from Express Lugares ROMÁN!");
})

//leer peticiones http (body)
app.use(express.json())

app.use("/api/v1", router)

module.exports = app;
