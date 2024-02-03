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
const deleteNombre=async (req,res,next)=>{

    try {

        const {idNombre}=req.params

        const nombreEliminado = await Nombre.findByIdAndDelete(idNombre)

        return res.status(200).json(nombreEliminado)
        
    } catch (error) {
        return next(error)
        
    }
}
const editNombre=async(req,res,next)=>{
    try {
        const {idNombre}=req.params
    
        const nombreToEdit= new Nombre(req.body)
       
        nombreToEdit._id=idNombre
    
        const nombreEditd= await Nombre.findByIdAndUpdate(idNombre,nombreToEdit, {new:true})
    
        return res.status(200).json(nombreEditd)
    
        
    } catch (error) {
        return next(error)
    }
    }
module.exports={postNombre, getNombres, deleteNombre, editNombre}