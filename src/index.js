import express from "express";
import ProductManager from "./controllers/ProductManager.js";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

const product = new ProductManager()

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended :true}))

app.get("/products", async(req, res)=>{
    res.send(await product.getProducts())
})

app.post("/products", async (req, res)=> {
   let newProduct = req.body
   res.send(await product.addProducts(newProduct))
})

app.use("/api/products", productRouter)
app.use("/api/cart", CartRouter)


app.listen (PORT, ()=>{
    console.log(`servidor express puerto ${PORT}`)
})