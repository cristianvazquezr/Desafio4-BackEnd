
import  express  from 'express'
import handlebars from 'express-handlebars'
import productRouter from './Routes/products.router.js'
import cartRouter from './Routes/cart.router.js'
import __dirname from './utils.js'
import viewsRouter from './Routes/views.router.js' 
import {Server} from 'socket.io'
import ProductManager from './ProductManager.js'


//Creo el servidor

const puerto=8080

const app=express()

const httpServer= app.listen(puerto,async ()=>{
    console.log(`servidor conectado al puerto ${puerto}`)
})
const socketServer = new Server(httpServer)

app.use(express.static(__dirname + "/public"))
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views" )
app.set("view engine","handlebars")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", viewsRouter)
app.use("/", productRouter)
app.use("/", cartRouter)


// instancio la clase para poder enviar a todos los clientes los productos


socketServer.on('connection',async socket=>{
    let PM = new ProductManager("./productos.json")
    let productos= await PM.getProducts()
    console.log("nueva conexion realizada")
    socketServer.emit("productos",productos)

    socket.on("agregarProducto", async(product)=>{
        let PM = new ProductManager("./productos.json")
        await PM.addProduct(product.title, product.description, product.category, product.price, product.thumbnail, product.code, product.stock);
        let productos= await PM.getProducts()
        socketServer.emit("productos",productos);    
    });
    
    socket.on("eliminarProducto",async(id)=>{
        let PM = new ProductManager("./productos.json")
        await PM.deleteProduct(id)
        let PmNEW = new ProductManager("./productos.json")
        let productos=await PmNEW.getProducts()
        await socketServer.emit("productos",productos); 
    })

});
    
