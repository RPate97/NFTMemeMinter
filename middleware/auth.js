var jwt = require('jsonwebtoken');

const withAuth = (handler) => {
    return async (req, res) => {
        console.log(req.body);
        jwt.verify(req.body.token, process.env.JWT_KEY, function(err, decoded) {
            if (err) { 
                res.send(500, { error: 'Failed to authenticate token'}); 
            } else {
                req.user = decoded.user;
                return handler(req, res)
            };
        });        
    }
};
  
export default withAuth;