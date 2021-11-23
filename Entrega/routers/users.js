const express = require("express");
const router = express.Router(),
const TOKEN_SECRET = require("../middleware/jw-validate");


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

router.post("/login", async(req, res, next)=>{
    try {
        const users = users.find((u) => u.mail === req.body.mail);
        if(!users){
            return res
            .status(400)
            .json({success: false, message: "Usuario sin encontrar"});

        }
            //password comparison
        const validatepassword = await bcrypt.compare(
            req.body.password,
            users.password
        );

        const token = jwt.sign({
            name: users.name,
            mail: users.mail,

        },
        TOKEN_SECRET
        );

        return res.status(200).json({
            success: true,
            data: users,
            token: token,

        });
        if(!validatepassword){
            return res
            .status(400)
            .json({success: false, message: "Password invalido"});
        }
    } catch (error) {
        return next(error);
        
    }

})

module.exports = router;