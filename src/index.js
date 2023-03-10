import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";

const app = express()
const PORT = 8080
const product = new ProductManager();
 
app.use(express.json())
app.use(express.urlencoded({ extended :true}))

app.engine('handlebars', engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname+ "/public"))

app.get("/", async(req, res)=>{
let allProducts = await product.getProducts()
    res.render("home", {
        title: "express avanzado",
        products: allProducts
    })
})

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)


app.listen (PORT, ()=>{
    console.log(`servidor express puerto ${PORT}`)
})