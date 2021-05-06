const ExpressError = require("./expressError");

function logger(req, res, next){
    console.log(`Received a ${req.method} request to ${req.path}.`);
    return next();
}

function checkForPassword(req, res, next){
    try {
        if (!req.query.password){
            throw new ExpressError("password is required", 404);
        }
        if (req.query.password !=='monkeybreath'){
            throw new ExpressError("Missing Password", 402);
        }
        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = {logger, checkForPassword};