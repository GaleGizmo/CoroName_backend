require("dotenv").config();
const express = require("express");

const cors=require("cors")

const server = express();
const PORT = process.env.PORT;

server.use(cors())

server.use(express.json())
server.use(express.urlencoded({extended:true}))

const nombresRoutes=require("./src/api/nombres/nombres.routes")
const sugerenciasRoutes=require("./src/api/sugerencias/sugerencias.routes");
const coristasRoutes = require("./src/api/coristas/coristas.routes.js");
server.use("/nombres",nombresRoutes)
server.use("/sugerencias",sugerenciasRoutes)
server.use("/coristas", coristasRoutes)
const db=require("./src/utils/db.js");

db.connectDB()
server.use("/", (req, res) => {
  res.send("its alive!");
});
server.use((err,req,res,next)=>{
  return res.status(err.status || 500 ).json(err.message || "Error sorpresa")
})

server.use("*", (req,res,next)=>{
  const error =new Error("Route not found")
  error.status = 404
  next(error)
})


server.listen(PORT, () => {
  console.log("El server pita en http://localhost:" + PORT);
});

