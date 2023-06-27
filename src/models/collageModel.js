import mongoose from "mongoose";

const {Schema, model} = mongoose

const collageSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    fullName : {
        type : String,
        required : true,
    },
    logoLink: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
},{timestamps : true})



const Collage = model('Collage', collageSchema)


export default Collage