const express = require('express'),
app = express(),
path = require('path'),
PORT = process.env.PORT || 8080;

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) =>{
    res.render('index');
})

app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
})