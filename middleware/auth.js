var jwt = require('jsonwebtoken');

const withAuth = (handler) => {
    return async (req, res) => {
        console.log(req.body);
        jwt.verify(req.body.token, process.env.JWT_KEY, function(err, decoded) {
            if (err) { 
                console.error(err);
                res.send(500, { error: 'Failed to authenticate token'}); 
            } else {
                req.user = decoded.user;
                req.handle = decoded.handle;
                return handler(req, res)
            };
        });        
    }
};
  
export default withAuth;