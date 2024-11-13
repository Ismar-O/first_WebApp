
const express = require('express');  
const app = express();
var cookieParser = require('cookie-parser');   //Parsing cookies
app.use(cookieParser());
const path = require('path');  

app.set('view engine', 'pug');

const routers = require('./routers');    //ubacivanje ruta iz routes.js
const {pageWrite, pageRead} = require('./mongoDBfunctions'); //ubacivanje funkcija za pisanje po bazi iz mongoDBfunctions
app.use('/redirect', routers);

/******************************************** Sesije */

const session = require('express-session');

app.use(session({
  secret: 'securekey123456',  // Replace with a secure key
  resave: false,              // Prevents resaving session if nothing has changed
  saveUninitialized: false,    // Saves uninitialized sessions
  cookie: { 
    httpOnly: true,           // Prevents JavaScript access to cookies
    secure: false,            // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60    // 1-hour expiry
  }
}));

/****************************************** */

/****************************************** Password hashing */

const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const saltRounds = 10;           // Defines the cost factor; 10 is a reasonable default
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}


/***************************************** */

app.use(express.json());


const port = 8000;   
// Starting server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/images')));



app.all('*', (req,res, next)=>{

  const allowedPaths = ['/', '/login', '/login/send', '/signup', '/signup/send']; // Add more exceptions as needed
  if (!req.session.userId && !allowedPaths.includes(req.originalUrl)) {
    res.redirect('/login');
  }else{
     next();
  }
})

app.post('', (req, res) =>{
  console.log('default')
})

app.get('/', (req, res) =>{
  console.log('default')
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.get('/signup', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})

app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})


app.post('/login/send', (req, res) => {
  const user ={
   Password: req.body.pw,
   Username: req.body.username
  }
  console.log('login');
  
  if(loginUser(user)){
    req.session.userId = user.Username;  
    console.log('login')
    res.redirect('/redirect');
  }
  else{
    res.redirect('/servererror');
  }
})


/**Funkcija uzime dokument user sa frontenda i na onovu njegove unesene sifre i username-a projerava sifru*/
async function loginUser(user){
  pass = user.Password;
  username = user.Username
  pageRead('users',{Username: username}).then(DBdoc =>{
    DBpass = DBdoc.Password;
    console.log(DBdoc);
    if(pass == DBpass){
      return true;
    }else{
      return false;
    }
  }).catch(error => {
    console.error(error);
});
}

app.post('/signup/send', (req,res) =>{
  const user ={
    Password: req.body.pw,
    Username: req.body.username,
    Email: req.body.email
   }

   hashPassword(user.Password).then(hashedPassword => {
    console.log('Hashed Password:', hashedPassword);
    user.Password = hashedPassword;
    console.log('signup');
   pageWrite('users', user, res).then(result=>{
    if(loginUser(user)){
      req.session.userId = user.Username;  
      console.log('login')
      res.redirect('/redirect');
    }
    else{
      res.redirect('/login');
    }

   });
  });

   
   

});
/*
app.post('/newpost', (req, res) => {

  let data = "users";
  
  const myobj = { Username: req.body.name, Password: req.body.pw, Email: req.body.email };
 
    pageRead('users', {Username: 'ime'}).then(result => {
      console.log('vracena');
      console.log(result);
  }).catch(error => {
      console.error(error);
  });;

    console.log('Redirectam');
  //  pageWrite(data, myobj , res);
    console.log('koookie');
   
    res.cookie('rememberme', '1', { 
      expires: new Date(Date.now() + 36000000),
      sameSite: 'None', 
      secure: 'false'
    });

    res.redirect('/redirect');

    
  
    
  });

*/
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
  
  