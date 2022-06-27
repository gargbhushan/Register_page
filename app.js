const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 3000;
require("./db/conn");
const Register1 = require("./models/userregister.js");

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templetes/views");
const partials_path = path.join(__dirname,"../templetes/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));  

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
// app.post("/register",async(req,res)=>{
//     console.log(req.body.psw);

// });
app.post("/register",async(req,res)=>{
    try{
        const password = req.body.psw;
        const cpassword = req.body.pswrepeat;
        if(password == cpassword){
            const registerEmplye = new Register1({
                firstname : req.body.firstname,
                middlename: req.body.middlename,
                lastname : req.body.lastname,
                gender : req.body.gender,
                country_code : req.body.country_code,
                phone: req.body.phone,
                currentad : req.body.currentad,
                email: req.body.email,
                psw : password,
                pswrepeat: cpassword, 
            })
            const registerd = await registerEmplye.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        };        
    } catch(error){
        res.status(400).send(error);
    }
});
app.listen(port,()=>{
    console.log(`server is runnig at port no ${port}`);
});  