const { verify } = require('../helpers/JWT')
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        req.isAuth = false;
        return next();
    }
    try {

        const decodedToken = verify(token)
        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        req.isAuth = false;
        return next();
    }
}