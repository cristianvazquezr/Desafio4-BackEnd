import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
 productos:Array

})

export const cartModel=mongoose.model("carts", cartSchema)  