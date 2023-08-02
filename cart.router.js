import { Router } from "express"
import cartManager from "./cartManager.js"

//isntancio la clase cartManager

const CM = new cartManager("./cart.json")

const cartRouter=Router()


cartRouter.post('/carts/', async (req, resp)=>{

    let newCart= await CM.createCart()
    let listaCarts=await CM.getCarts()
   
    if(newCart){
        resp.status(200).send(`el carrito con id ${listaCarts.length} se creo correctamente correctamente`)
    } else{
        resp.status(500).send({status:"error", message:"no se pudo crear el carrito"})
    }

})


cartRouter.get('/carts/:cid', async (req,resp)=>{
    let cid=Number(req.params.cid)

    if((cid==undefined || isNaN(cid) )){
        resp.status(500).send({status:'error', message:"no definio un id o el formato es incorrecto. Recuerde ingresar un numero entero"})
    }else{
        let respuesta=await CM.getCartById(cid)
        if(respuesta==false){
            resp.status(500).send({status:'error', message:"no existe el id"})
            
        }else{
            resp.send(respuesta)
            
        }
            
    }  

})

cartRouter.post('/carts/:cid/product/:pid', async (req,resp)=>{
    const cid=Number(req.params.cid)
    const pid=Number(req.params.pid)

    const agregarProducto = await CM.addProduct(cid, pid)

    if((agregarProducto=='productoAgregado')){
        resp.send("se agrego el producto correctamente")
    }else if(agregarProducto=="pidNotFound"){
        resp.status(500).send({status:'error', message:"no se encontro el producto con ese id"})
    }else{
        resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
    } 

})

export default cartRouter