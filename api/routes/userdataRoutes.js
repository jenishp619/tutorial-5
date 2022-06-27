const express = require('express');

const { v4 : uuidv4 } = require('uuid');

let userdata = require("../data/userdata");
let Userdata = userdata;
const fs = require('fs');
const router = express.Router();

router.get("",(req,res)=>{
  try{
      if(!Userdata || Userdata.length ===0){

        return res.status(404).json({message:"no users found",success:false, data:"No data here"});
      }
      else{
          return res.status(200).json({message:"Users retrieved",success:true, data:Userdata});
      }
  }
  catch(err){
      return res.status(500).json({message:"Internal error"});
  }
});

router.post("/add",(req,res)=>{
       const userid = uuidv4();
           const email = req.body.email;
           const firstname = req.body.firstName;

           var userbody = {
               "id": userid,
               "firstName":firstname,
               "email": email  
           }
           for( var i = 0 ; i< Userdata.length ; i++){
                 if(!Userdata[i].email.includes(email)){
                     Userdata.push(userbody);
                     var jsonContent = JSON.stringify(Userdata[i]);
                   console.log(Userdata);
                   fs.writeFileSync('api/data/userdata.js',"const users = "+JSON.stringify(Userdata)+"; module.exports = users;",{encoding:'utf8',flag:'w'})
                     return res.status(200).json({message:"User added",success:true});
                 }          

           }
           return res.status(200).json({message:"User not added check if already exists",success:false});
        
    });

    router.put("/update/:id", async function(req, res) {
        const user = req.params.id;
        for (var i = 0; i < Userdata.length; i++) {
            if (user == Userdata[i].id) {
                Userdata[i].email = req.body.email;
                Userdata.firstName = req.body.firstName;
                return res.status(200).json({message: "User Updated", success: "true"});
            }
        }
        return res.status(200).json({message: "User Not Updated. Some error occured", success: "false"});
    });

    router.get("/user/:id", (req, res) => {

        const useridfetch = req.params.id;
        try{
            for (var i = 0; i < Userdata.length; i++) {
                if (useridfetch == Userdata[i].id) {
                    return res.status(200).json({ message: "User Retrieved", success: "true", data: Userdata[i] });
                }
            }
            return res.status(200).json({sucess: "false", message: "No Such User Found"});
        }
        catch (err){
            return res.status(500).json({ mesage: "Internal Server Error!!"});
        }
    });

module.exports = router;