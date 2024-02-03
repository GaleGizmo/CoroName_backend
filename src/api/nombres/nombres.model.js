const mongoose=require("mongoose")

const nombresSchema =mongoose.Schema(
    {
        name: {type:String, required:true, unique:true},
        
        reason: {type: String },
        author: {type: mongoose.Types.ObjectId, ref: "coristas"}

    }
)

const Nombre=mongoose.model("nombres", nombresSchema)
module.exports=Nombre