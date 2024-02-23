const mongoose=require("mongoose")

const nombresSchema =mongoose.Schema(
    {
        name: {type:String, required:true, unique:true},
        points: {type: Number, default: 0},
        reason: {type: String },
        author: {type: mongoose.Types.ObjectId, ref: "coristas"}

    }
)

const Nombre=mongoose.model("nombres", nombresSchema)
module.exports=Nombre