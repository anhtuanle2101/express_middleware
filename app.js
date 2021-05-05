const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());


app.use((req, res)=>{
    return new ExpressError("Not found", 404);
})

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