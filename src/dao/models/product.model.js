import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnail:String,
    code:Number,
    stock:Number,
    category:String,
    status:Boolean

})

export const productModel=mongoose.model("products", productSchema)