import { Router } from "express"
import cartManager from '../dao/cartManager.js'

//isntancio la clase cartManager

const CM = new cartManager()

const cartRouter=Router()

cartRouter.post('/carts/', async (req, resp)=>{

    let newCart= await CM.createCart()
   
    if(newCart){
        resp.status(200).send(`el carrito se creo correctamente`)
    } else{
        resp.status(500).send({status:"error", message:"no se pudo crear el carrito"})
    }

})


cartRouter.get('/carts/:cid', async (req,resp)=>{
    let cid=req.params.cid

    if((cid==undefined)){
        resp.status(500).send({status:'error', message:"no definio un id o el mismo es incorrecto."})
    }else{
        let respuesta=await CM.getCartById(cid)
        if(respuesta==false){
            resp.status(500).send({status:'error', message:"no existe el id"})
            
        }else{
            resp.send(await respuesta)
            
        }
            
    }  

})

cartRouter.get('/carts', async (req,resp)=>{
    resp.send(await CM.getCarts())
})

cartRouter.post('/carts/:cid/product/:pid', async (req,resp)=>{
    const cid=req.params.cid
    const pid=req.params.pid

    const agregarProducto = await CM.addProduct(cid, pid)

    if((await agregarProducto=='productoAgregado')){
        resp.send("se agrego el producto correctamente")
    }else if(await agregarProducto=="pidNotFound"){
        resp.status(500).send({status:'error', message:"no se encontro el producto con ese id"})
    }else{
        resp.status(500).send({status:'error', message:"no se encontro el carrito con ese id"})
    } 

})

export default cartRouter