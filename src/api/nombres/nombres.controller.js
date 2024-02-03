const Nombre=require("./nombres.model")

const getNombres=async(req,res, next)=>{
try {
    const nombres=await Nombre.find().populate("author")
    return res.json(nombres)
} catch (error) {
    return next(error)
}
}

const postNombre =async (req,res,next)=>{

    try {
        const newNombre = await new Nombre(req.body)
        await newNombre.save()
        return res.status(201).json(newNombre)
        
    } catch (error) {
        return next(error)
    }
}

module.exports={postNombre, getNombres}