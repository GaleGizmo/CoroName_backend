const mongoose=require("mongoose")

const sugerenciasSchema =mongoose.Schema(
    {
        content: {type:String, required:true, unique:true},
        
      
        author: {type: mongoose.Types.ObjectId, ref: "coristas"}

    }
)

const Sugerencia=mongoose.model("sugerencias", sugerenciasSchema)
module.exports=Sugerencia