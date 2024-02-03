const Corista=require("./coristas.model")

const getCoristas=async(req,res, next)=>{
try {
    const coristas=await Corista.find()
    return res.json(coristas)
} catch (error) {
    return next(error)
}
}

const postCorista=async(req,res,next)=>{
    try{
        const newCorista = await new Corista(req.body)
        await newCorista.save()
        return res.status(201).json(newCorista)

    } catch(error){
        return next(error)
    }
}
const deleteCorista=async (req,res,next)=>{

    try {

        const {idCorista}=req.params

        const coristaEliminado = await Corista.findByIdAndDelete(idCorista)

        return res.status(200).json(coristaEliminado)
        
    } catch (error) {
        return next(error)
        
    }
}
const editCorista=async(req,res,next)=>{
    try {
        const {idCorista}=req.params
    
        const coristaToEdit= new Corista(req.body)
       
        coristaToEdit._id=idCorista
    
        const coristaEditd= await Corista.findByIdAndUpdate(idCorista,coristaToEdit, {new:true})
    
        return res.status(200).json(coristaEditd)
    
        
    } catch (error) {
        return next(error)
    }
    }
module.exports={getCoristas, postCorista, deleteCorista, editCorista }