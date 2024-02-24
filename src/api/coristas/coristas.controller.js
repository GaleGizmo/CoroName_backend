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

        const {logged, name, voted, namesVoted} = req.body
    
        const coristaToEdit={}
       
      

        if (logged!== undefined){
            coristaToEdit.logged=logged
        }
        if (name!== undefined){
            coristaToEdit.name=name
        }
        if (voted!== undefined){
            coristaToEdit.voted=voted
        }
        if (namesVoted!== undefined){
            coristaToEdit.namesVoted=namesVoted
        }
    
        const coristaUpdated = await Corista.findOneAndUpdate(
            { _id: idCorista },
            coristaToEdit,
            { new: true }
        );
        if (!coristaUpdated) {
            return res.status(404).json({ error: "Corista no encontrado." });
        }

    
        return res.status(200).json(coristaUpdated)
    
        
    } catch (error) {
        return next(error)
    }
    }
module.exports={getCoristas, postCorista, deleteCorista, editCorista }