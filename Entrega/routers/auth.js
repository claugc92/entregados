const express = require("express");
const auth = express.Router();
const bcrypt = require("bcrypt");
const TOKEN_SECRET = require("../middleware/jw-validate");

module.exports = auth;

auth.get("/", (req,res) =>{
    res.send("hola desde auth");
});


auth.post("/registro", async (req, res, next) =>{
 //mail validate
    try {

        if(req.body.mail && req.body.name && req.body.password) {
            if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false){
                res
                .status(400)
                .json( {success: false, message: "Formato de mail incorrecto"});
                return;
            }
                // traveled by all users
            const usuarioExistente = usuario.find((u) =>{
                return (u.mail = req.body.mail);
            });
            if (usuarioExistente) {
                res.status(400).json({success: false, message: "Mail repetido"});
                
            }
            //password security
            const salt = await bcrypt.genSalt(10);

            const password = await bcrypt.hash(req.body.password, salt);

            const nuevoUsuario = {
                name: req.body.name,
                mail: req.body.mail,
                password,
            }

           usuario.push(nuevoUsuario);
        } else {
            return res.status(400).json({
                success: false,
                message: "Faltan datos requeridos",
            });
        }
    } catch (error) {
        return next(error);
    } 
});


