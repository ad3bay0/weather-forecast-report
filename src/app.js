const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//express function
const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectory = path.join(__dirname,'../public');
const  viewsPath = path.join(__dirname,'./templates/views');
const  partialsPath = path.join(__dirname,'./templates/partials');

//set handle bars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directoty to serve assets
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{

    res.render('index',{
        title:'Home',
        content:'This application helps you get weather forecast by location',
        author:'Adebayo'});

});

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About',
        content:'This application helps you get weather forecast by location',
        author:'Adebayo'});

});

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        content:'ask adebeslick@gmail.com',
        author:'Adebayo'});

});


app.get('/weather',(req,res)=>{

    const address = req.query.address;
    if(!address){

        return res.send({
            error:'please provide an address parameter'
        });
    }

    geocode(address,(error,{longitude,latitude,location}={})=>{

        if(error){

            return res.send({
                error
            });
        }

        forecast(longitude,latitude,(err,forecast)=>{

            if(err){

                return res.send({error:err});
            }

            res.send({
                forecast,
                location,
                address
            });

        });
        
    });

});

app.get('*',(req,res)=>{

res.render('404',{
    title:'',
    content:'Page Not Found',
    author:'Adebayo'})
});

app.listen(port,()=>{

    console.log(`server is up at port ${port}`);
});