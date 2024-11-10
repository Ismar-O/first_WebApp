
const express = require('express');  
const app = express();
var cookieParser = require('cookie-parser');   //Parsing cookies
app.use(cookieParser());
const path = require('path');  

app.set('view engine', 'pug');

const routers = require('./routers');    //ubacivanje ruta iz routes.js
const {pageWrite, pageRead} = require('./mongoDBfunctions'); //ubacivanje funkcija za pisanje po bazi iz mongoDBfunctions
app.use('/redirect', routers);



/****************************************** */

app.use(express.json());

const port = 8000;   



console.log(Date());

// Starting server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});






app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static(path.join(__dirname, '/public/js'))); Nije potrebno 
//app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



app.post('/newpost', (req, res) => {

  let data = "users";
  const myobj = { Username: req.body.name, Password: req.body.pw, Email: req.body.email };
  

    console.log('Redirectam');
    pageWrite(data, myobj , res);
    console.log('koookie');
   
    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 36000000),  sameSite: 'None', secure: 'false'});

    res.redirect('/redirect');

    
  
    
  });


  app.get('/redirect', (req, res) =>{
   
     res.sendFile(path.join(__dirname, 'public', 'red.html'));

    
  })

  app.post('/redirect', (req,res)=>{
    res.redirect('/getred');
    console.log(req.body);
    res.end();

  })

  app.get('/getred', (req,res) =>{

    res.render('test', { title: 'Hey', message: 'Hello there!', paragraph: 'Ismar Osmanovic Ismar Osmanovic Ismar Osmanovic' })


  })




  app.get('/servererror', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
 })
  
  