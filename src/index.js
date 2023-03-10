import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";

const app = express()
const PORT = 8080
const product = new ProductManager();
 
app.use(express.json())
app.use(express.urlencoded({ extended :true}))


app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname+ "/public"))

app.get("/", async(req, res) => {
let allProducts = await product.getProducts()
    res.render("home", {
        title: "express avanzado",
        productslist: allProducts
    })
})

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)


const httpServer = app.listen (PORT, ()=>{
    console.log(`servidor express puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket)=> {
console.log('socket conectado')


// socket.on('mensaje individual',(data)=>{
//     console.log('mensaje del servidor', (data))
// })



})