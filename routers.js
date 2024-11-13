const path = require('path');  

const express = require('express');
const router = express.Router();               //For joining paths

router.use(express.json());

router.all('*', (req,res, next)=>{

    next();
  
  })

  

router.post('/routerred', (req, res) =>{
   
    res.send(JSON.stringify('ismar'));
    
   // res.sendFile(path.join(__dirname, 'public', 'red.html'));
   
 })


 module.exports = router;
