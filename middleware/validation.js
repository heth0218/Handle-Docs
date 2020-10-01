module.exports = async (req, res, next) => {
    const { name, email, password } = req.body;
    const emailVal = email.length < 256 && /^[^@]+@[^@]{2,}\.[^@]{2,}$/.test(email)
    if (!name) {
        return res.status(404).send({ msg: 'Kindly enter your name!' });
    }
    if (!emailVal) {
        return res.status(501).send({ msg: 'Invalid email' })
    }
    if (password.length <= 5) {
        return res.send({ msg: 'Password too short' });
    }
    next();
}