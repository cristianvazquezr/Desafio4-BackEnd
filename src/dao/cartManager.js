import ProductManager from './ProductManager.js'
import { cartModel } from './models/cart.model.js'

let PM=new ProductManager()

class cartManager{

    constructor(){
        this.cart=''
    }

    async getCarts(){
        let listaCarritos=[]
        try{
            listaCarritos = await cartModel.find().lean()
        }
        catch(err){
            console.log("fallo la consulta" + err)
        }
        return await listaCarritos
        
    }


    async createCart(){
        //creo un objeto nuevo con atributos nuevos
        let carrito= {productos:[]}      
        await cartModel.create(carrito)
        return true
        

    }
    async getCarts(){
     
        let resultado=await  cartModel.find({}).lean()
        return resultado

    }
    async getCartById(id){

        // llamo la funcion para obtener los productos y buscar por id
     
        const cartBuscado= await  cartModel.find({_id:id})
        if(await cartBuscado!=undefined){
            return (await cartBuscado)
        }
        else{
           console.log("Not found")
           return (false)
        }
    }

    async addProduct(cid,pid){
        //accedo a la lista de productos para ver si existe el id buscado

        const productId= await PM.getProductById(pid)
        const cartId= await this.getCartById(cid)
        // como me traer un array en vez del objeto directamente, tomo la posicion 0 para tener el objeto
        let objCart = await cartId[0]
        if (objCart){
            if(productId){
                let arrayProducts=await objCart.productos
                let positionProduct=await arrayProducts.findIndex(product=>product.id==pid)
            
                if (positionProduct!=-1){
                    arrayProducts[await positionProduct].cantidad=arrayProducts[positionProduct].cantidad+1
                }
                else{
                    arrayProducts.push({id:pid,cantidad:1})
                }
                await cartModel.updateOne({_id:cid},{productos:arrayProducts})
                return ('productoAgregado')
                
            }else{
                return ('pidNotFound')
            }
        }else{
            return ("cidNotFound")
        }

    }  
}


export default cartManager