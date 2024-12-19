let jwt= require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    try {
        const decoded = jwt.verify(token, SECRET)
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Authentication Failed'
        });
    }
  }else{
    return res.status(403).json({
        success: false,
        message: 'Authentication Failed'
    });
  }
}
