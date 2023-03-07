import {promises as fs} from 'fs';
import {nanoid} from "nanoid";
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager

class CartManager{
constructor(){
    this.path = "./src/models/carts.json"
}


readCarts = async () => {

    let carts = await fs.readFile(this.path, "utf-8")
   return JSON.parse(carts)

}

writeCarts = async (carts) => {

    await fs.writeFile(this.path,JSON.stringify(carts))

}

exist = async (id) => {
    let carts = await this.readCarts();
   return carts.find(cart => cart.id === id)
}


addCarts = async()=> {

let cartsOld = await this.readCarts();
let id = nanoid()
let cartsConcat = [{id : id, products : []}, ...cartsOld]
await this.writeCarts(cartsConcat)
return "shopping cart added"

}

getCartsById = async(id)=>{
    let cartById = await this.exist(id)
    if(!cartById) return "cart no founded"
    return cartById
  }

addProductInCart = async(cartID,productID)=>{

    let cartById = await this.exist(cartID)
    if(!cartById) return "cart no founded"
    let productById = await productAll.exist(productID)
    if(!cartById) return "product no founded"
    
    let cartsAll = await this.readCarts()
    let cartFilter = cartsAll.filter(cart => cart.id != cartID)
    
    if(cartById.products.some((prod) => prod.id === productID)) { 
    let moreProductInCart = cartById.products.find(prod => prod.id === productID)
        moreProductInCart.cantidad++
    let cartsConcat = [cartById,...cartFilter]
    await this.writeCarts(cartsConcat)
    return "Product added to cart 2"

    }

   cartById.products.push({id: productById.id, cantidad:1}) 

    let cartsConcat = [
        
    cartById, ...cartFilter];
    await this.writeCarts(cartsConcat)
    return "Product added to cart"
}

}




export default CartManager