const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');
require('dotenv').config({ path: './config/.env' });

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};


module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
        console.log(`Utilisateur ${user.pseudo} a bien été inscrit! ✅`)
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(500).send({errors});
    }
}


module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = signInErrors(err);
        res.status(500).json({ errors });
    }
}


module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
