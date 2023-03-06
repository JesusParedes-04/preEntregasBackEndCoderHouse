import {promises as fs} from 'fs'
import {nanoid} from "nanoid"

class ProductManager {
    constructor(){
        this.path = "./src/models/products.json"
    }

readProducts = async () => {

    let products = await fs.readFile(this.path, "utf-8")
   return JSON.parse(products)

}

writeProducts = async (product) => {

    await fs.writeFile(this.path,JSON.stringify(product))

}

addProducts = async (product) => {
let productsOld = await this.readProducts()
product.id = nanoid()
let productAll = [...productsOld, product]
await this.writeProducts(productAll)
return "producto agregado"
}



exist = async (id) => {
    let products = await this.readProducts();
   return products.find(prod => prod.id === id)
}


addProducts = async (product)=>{
let productsOld = await this.readProducts()

product.id = nanoid()
let productAll = [...productsOld, product];
   await this.writeProducts(productAll)
   return "Producto Agregado"
};


getProducts = async ()=> {
return await this.readProducts()
}

getProductsById = async(id)=>{
  let productById = await this.exist(id)
  if(!productById) return "product no founded"
  return productById
}


updateProducts = async (id,product)=>{
    let productById = await this.exist(id)
    if(!productById) return "product no founded"

await this.deleteProducts(id)
let productsOld = await this.readProducts()
let products = [{...product, id: id}, ...productsOld]
await this.writeProducts(products)
return "Product Updated"
}


deleteProducts = async (id) => {
    let products = await this.readProducts();
let existProducts = products.some(prod => prod.id === id)
if(existProducts){
let filterProducts = products.filter(prod => prod.id !=id)
await this.writeProducts(filterProducts)
return "deleted product"
}
return "The product to be removed does not exist"
}

}

export default ProductManager
