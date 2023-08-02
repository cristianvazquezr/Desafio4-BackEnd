
import  express  from 'express'
import productRouter from './products.router.js'
import cartRouter from './cart.router.js'



//Creo el servidor

const puerto=8080

const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", productRouter)
app.use("/", cartRouter)

app.listen(puerto,async ()=>{
    console.log(`servidor conectado al puerto ${puerto}`)
})