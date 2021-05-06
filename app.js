const express = require('express');
//error class
const ExpressError = require('./expressError');
//routers
const userRoutes = require('./userRoutes');
//middlewares
const middleware = require('./middleware');
//morgan
const morgan = require('morgan');

const app = express();

//json parsing
app.use(express.json());
//morgan logger
app.use(morgan('dev'));

//logger middleware
app.use(middleware.logger);

//response to favicon.ico
app.get('/favicon.ico', (req, res)=> res.sendStatus(404));

//user router
app.use("/users", userRoutes);

app.get('/secret', middleware.checkForPassword, (req, res, next)=>{
    return res.send("I LOVE YOU <3 FOR REALL MARRY ME!");
})

app.get('/private', middleware.checkForPassword, (req, res, next)=>{
    return res.send("You Have Reached the Private Page! It is Private", 402);
})


//404 handler
app.use((req, res)=>{
    return new ExpressError("Not found", 404);
})

//generic errors handler
app.use((err, req, res, next)=>{
    let status = err.status || 500;
    let msg = err.msg || "THIS IS AN ERROR!";

    return res.status(status).json({
        err:{
            msg: msg,
            status: status
        }
    })
})

app.listen('3000', ()=>{
    console.log("Running on port 3000");
})