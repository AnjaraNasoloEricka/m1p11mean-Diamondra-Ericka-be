const responseHandler = require("../handler/responseHandler");
const { publicRoutes } = require("../../data/const")

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
            const token = req.headers['authorization'];
            if (!token) throw new responseHandler(401, 'No token provided');
            if (token.length<2 || token[0]!=="Bearer") throw new responseHandler(401, 'Access denied');
            req.token = token[1];

            jwt.verify(token[1], process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) throw new responseHandler(403, 'Authentication failed')
                
                // TO DO : Add req that you need to use
                
                next();
            });
            /* Check the token */

        }
        catch(error){
            return res.status(error.status).json(error);

        }
        

    }
}