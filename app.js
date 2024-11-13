
const express = require('express');  
const app = express();
var cookieParser = require('cookie-parser');   //Parsing cookies
app.use(cookieParser());
const path = require('path');  

app.set('view engine', 'pug');

const feedRouters = require('./feedRouters');    //ubacivanje ruta iz routes.js
const {pageWrite, pageRead} = require('./mongoDBfunctions'); //ubacivanje funkcija za pisanje po bazi iz mongoDBfunctions
app.use('/feed', feedRouters);

/******************************************** Sesije */

const session = require('express-session');

app.use(session({
  secret: 'securekey123456',  // Replace with a secure key
  resave: false,              // Prevents resaving session if nothing has changed
  saveUninitialized: false,   // Saves uninitialized sessions
  cookie: { 
    httpOnly: true,           // Prevents JavaScript access to cookies
    secure: false,            // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60    // 1-hour expiry
  }
}));

/****************************************** Password hashing */

const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const saltRounds = 10;           
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

async function comparePasswords(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match; 
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

  const allowedPaths = ['/', '/login', '/login/send', '/signup', '/signup/send', '/servererror']; // Add more exceptions as needed
  if (!req.session.userId && !allowedPaths.includes(req.originalUrl)) {
    res.redirect('/login');
  }else{
     next();
  }
})
/***************************** GET Redirects ************************/
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

app.get('/feed', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'red.html'));
})

/*******************************  LOGIN ******************************/
app.post('/login/send', (req, res) => {
  const user ={
   Password: req.body.pw,
   Username: req.body.username
  }
    loginUser(user).then(result =>{
      if(result){
        req.session.userId = user.Username;  
        console.log('Login SUCESSFULL');
        res.redirect('/feed');
      }
      else{
        console.log('Login NOT successfull, ERROR');
        res.send(JSON.stringify({alert: 'Wrong Password'}));
      }
  });
})



app.post('/signup/send', async (req,res) =>{
  const user ={
    Password: req.body.pw,
    Username: req.body.username,
    Email: req.body.email
   }
   const sameUserName = await checkSameUsername(user);
   if(!sameUserName){
    const alert = {
      alert: 'Username not avaliable'
    }
       res.send(JSON.stringify(alert));
    return
   }
   const hashedPassword = await hashPassword(user.Password)
   
    console.log('Hashed Password:', hashedPassword);
    user.Password = hashedPassword;
    console.log('signup');
    await pageWrite('users', user, res);
    if(loginUser(user)){
      req.session.userId = user.Username;  
      console.log('login')
      res.redirect('/feed');
    }
    else{
      res.redirect('/login');
    }
});

/**Funkcija uzime dokument user sa frontenda i na onovu njegove unesene sifre i username-a projerava sifru*/
async function loginUser(user){
  pass = user.Password;
  username = user.Username
  try {
    const DBdoc = await pageRead('users', { Username: username }); 
    if (DBdoc == null) {
      console.log('loginUser function -- Empty document');
      return false; 
    }
    const DBpass = DBdoc.Password;
    const truePass = await comparePasswords(pass, DBpass)
    if (truePass) {  
      console.log('loginUser function -- CORRECT pass');
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function checkSameUsername(user){
  username = user.Username
  try {
    const DBdoc = await pageRead('users', { Username: username }); 
    if (DBdoc == null) {
      //console.log('checkSameUsername function -- Unique username');
      return true; 
    }else{
      //console.log('checkSameUsername function -- NOT Unique username');
      return false;
    }

  } catch (error) {
    console.error(error);
    return false;
  }
}

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
  
  