const mongoose=require("mongoose")

const coristasSchema =mongoose.Schema(
    {
        name: {type:String, required:true, unique:true},
            }
)

const Corista=mongoose.model("coristas", coristasSchema)
module.exports=Corista