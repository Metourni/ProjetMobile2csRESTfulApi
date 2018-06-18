const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        /*
            // We can use the header of the request
            // When you use this middleware you should pass the token inside the header of the request
            // In the param Authorization.

        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY, null);

        */
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY, null);
        req.userDecodedData = decoded;
        next()
    } catch (e) {
        return res.status(401).json({
            error: "A non valid token"
        });
    }
};