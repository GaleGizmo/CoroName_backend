const Sugerencia=require("./sugerencias.model")

const getSugerencias=async(req,res, next)=>{
try {
    const sugerencias=await Sugerencia.find().populate("author")
    return res.json(sugerencias)
} catch (error) {
    return next(error)
}
}

const postSugerencia =async (req,res,next)=>{

    try {
        const newSugerencia = await new Sugerencia(req.body)
        await newSugerencia.save()
        return res.status(201).json(newSugerencia)
        
    } catch (error) {
        return next(error)
    }
}
const deleteSugerencia=async (req,res,next)=>{

    try {

        const {idSugerencia}=req.params

        const sugerenciaEliminado = await Sugerencia.findByIdAndDelete(idSugerencia)

        return res.status(200).json(sugerenciaEliminado)
        
    } catch (error) {
        return next(error)
        
    }
}
const editSugerencia=async(req,res,next)=>{
    try {
        const {idSugerencia}=req.params
    
        const sugerenciaToEdit= new Sugerencia(req.body)
       
        sugerenciaToEdit._id=idSugerencia
    
        const sugerenciaEditd= await Sugerencia.findByIdAndUpdate(idSugerencia,sugerenciaToEdit, {new:true})
    
        return res.status(200).json(sugerenciaEditd)
    
        
    } catch (error) {
        return next(error)
    }
    }
module.exports={postSugerencia, getSugerencias, deleteSugerencia, editSugerencia}