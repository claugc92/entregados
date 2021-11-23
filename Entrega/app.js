const express = require("express");
const app = express();
const PORT = 4000;
const routers = require("./routers/users");
const auth = require("./routers/auth");


//format reading json


app.get("/", (req,res) =>{
    res.send("Hola mundo:D")
});

app.use("/auth", auth);

app.use("/users", routers);

app.listen(PORT, ()=>{
    console.log(`Escuchando desde el puerto ${PORT}`)
});