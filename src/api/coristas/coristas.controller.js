const Corista=require("./coristas.model")

const getCoristas=async(req,res, next)=>{
try {
    const coristas=await Corista.find()
    return res.json(coristas)
} catch (error) {
    return next(error)
}
}
module.exports={getCoristas}