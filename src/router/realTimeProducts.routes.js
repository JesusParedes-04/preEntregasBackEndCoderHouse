
import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const realTimeProductsRouter = Router()
const product = new ProductManager();
const products = await product.getProducts()


realTimeProductsRouter.get("/home", (req, res) =>{
    res.render("home", {products})
})

realTimeProductsRouter.get("/home", (req, res) =>{
    res.render("realTimeProducts", {products})
})



export default realTimeProductsRouter
