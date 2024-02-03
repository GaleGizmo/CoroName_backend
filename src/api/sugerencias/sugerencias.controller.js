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

module.exports={postSugerencia, getSugerencias}