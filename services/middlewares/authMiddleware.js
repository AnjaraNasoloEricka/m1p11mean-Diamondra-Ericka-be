const responseHandler = require("../handler/responseHandler");
const { publicRoutes } = require("../../data/const")
const jwt = require("jsonwebtoken");

module.exports = {
    checkToken(req, res, next) {

        /* Check if the current url is one of publicRoutes */
        if (publicRoutes.some( (value) => req.url.includes(value))){
            next();
            return;
        }
            
        /* Check if the current url is one of publicRoutes */

        try{
            /* Check the token */
            let token = req.headers['authorization'];
            if (!token) throw new responseHandler(401, 'No token provided');

            token = token.toString().split(' ');

            if (token.length < 2 || token[0]!== "Bearer") throw new responseHandler(401, 'Access denied');
            req.token = token[1];

            jwt.verify(token[1], process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) throw new responseHandler(403, 'Authentication failed')
                
                // TO DO : Add req that you need to use
                req.user = decoded;
                
                next();
            });
            /* Check the token */

        }
        catch(error){
            return res.status(error.status).json(error);

        }
        

    }
}