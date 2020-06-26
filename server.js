
require('dotenv').config();
const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
User = require('./models/user'),
mongoose = require('mongoose'),
methodOverride = require('method-override'),
expressSession = require('express-session'),
localAuth = require('./auth/localauth'),
passport = require('passport'),
path = require('path'),
isAuthenticated = require('./middleware').isAuthenticated;
PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>{
    console.log('connected to the db');
})
.catch(err =>{
    console.log('Some error occured while connecting to the db',err);
})

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(expressSession({
    secret:'My secret!!',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res) =>{
    res.render('index');
})

app.post('/',(req,res) =>{
    User.register(new User({username:req.body.username}),req.body.password)
    .then(user =>{
        console.log(user);
        passport.authenticate("local")(req,res,() =>{
            res.redirect("/profile");
        })
    })
    .catch(err =>{
        console.log(err);
        res.redirect('/');
    })
})

app.get('/logout',(req,res) =>{
    req.logOut();
    res.redirect('/');
})

app.get('/profile',isAuthenticated,(req,res) =>{
    res.render('profile',{currentUser:req.user});
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/"
}) ,function(req,res){
});

app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
})