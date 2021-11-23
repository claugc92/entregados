const express = require("express");
const router = express.Router(),


users = [
    {
    id: 1,
    name: "Claudio",
    age: 28,
}, {
    name: "Sebastian",
    age: 25
},
{   
    id: 2,
    name: "Santiago",
    age: 29,

},
{
    id: 3,
    name: "Mauricio",
    age: 23,
}
];

//users check

router.get("/", (req,res) =>{
    res.send({success: true, users: users})
});

router.post("/", (req, res)=>{
    const nuevoUsuario = req.body;

    if ( nuevoUsuario.id && nuevoUsuario.name && nuevoUsuario.age ) {
        //insert new customer
        users.push(nuevoUsuario);
        res.send({success: true, users: users});
    } else {
        res.send({success: false, error: "Falta completar los campos"})
    }
});

module.exports = router;