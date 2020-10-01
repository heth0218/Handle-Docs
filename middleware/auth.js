const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    //Get the token from the header

    const token = req.header('x-auth-token');

    //Check if not token

    if (!token) {
        return res.status(401).json({ msg: 'No token ,authorization denied' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const user = await User.findById(decoded.user.id)
    req.user = user;
    res.locals.user = user
    next();
}