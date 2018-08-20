const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
 //Middleware
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Bila middleware tidak memanggil method next(), maka Handler lain tidak akan berfungsi
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = (now+" : "+req.method+" "+req.url);
    console.log(res);
    fs.appendFileSync('log', log+"\n");
    next();
});

 
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) =>{
    return text.toUpperCase();
});

app.get('/', (req,res) => { //Setup Handler for http get request
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to The Home Page!'
    });
});

// app.get("/maintence",(req,res)=>{
//     res.render("maintence.hbs");
// })

app.get("/", (req,res)=>{
    res.render("home.hbs");
})

app.get("/about", (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get("/bad", (req,res) => {
    res.send({
        errorMessage : "Bad Gatewaty",
        code : 404,
    });
})

app.listen(port, () =>{
    var now = new Date().toString();
    //console.log(now);
    console.log("Server is up on port "+port);
}); //Listen ke Sebuah port

