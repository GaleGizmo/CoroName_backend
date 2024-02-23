const mongoose=require("mongoose")

const coristasSchema =mongoose.Schema(
    {
        name: {type:String, required:true, unique:true},
        voted: {type: Boolean, default: false},
        namesVoted:{type: Array}
            }
)

const Corista=mongoose.model("coristas", coristasSchema)
module.exports=Corista