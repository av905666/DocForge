const express=require("express");
const cors=require("cors");

const pdfRoutes = require("./routes/pdfRoutes");

const app=express();


//Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/pdf", pdfRoutes);


app.get("/",(req,res)=>{
    res.send("DocForge API Running");
});

module.exports = app;