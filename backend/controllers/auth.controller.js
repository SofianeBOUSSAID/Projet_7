const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');
require('dotenv').config({ path: './config/.env' });

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, "1", {
        expiresIn: maxAge
    })
};


module.exports.signUp = async (req, res) => {

    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
        console.log(`Utilisateur ${user.pseudo} a bien été inscrit! ✅`)
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(500).send({ errors });
    }
}


module.exports.signIn = (req, res) => {

    UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            const message = "L'utilisateur n'existe pas";
            return res.status(404).json({ message });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    const message = "Mot de passe incorrect";
                    return res.status(401).json({ message });
                }
                const token = jwt.sign(
                    { userId: user.id, pseudo: user.pseudo, imageProfil: user.picture },
                    "1",
                    {
                        expiresIn: "24h",
                    }
                );
                const message = "L'utilisateur a été connecté avec succès";
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                const userReturn = {
                    email: user.email,
                    pseudo: user.pseudo,
                    id: user.id,
                    création: user.createdAt,
                };
                res.status(200).json({ message, data: userReturn });
            })
            .catch((error) => {
                const message = "L'authentification a échoué";
                res.status(500).json({ message, data: error });
            });
    });
};


module.exports.logout = (req, res) => {
    res.clearCookie("jwt", { path: "/" });
    res.json({ message: "Vous vous êtes bien déconnecté" });
}

module.exports.getAuth = (req, res) => {
    const authorizationHeader = req.cookies.jwt;
    if (!authorizationHeader) {
        const message = "Non autorisé";
        return res.status(401).json({ message });
    }
    try {
        const decodedToken = jwt.verify(authorizationHeader, "1");

        const userId = decodedToken.userId;
        UserModel.findById(userId).select("-password").then((user) => {
            if (user == null) {
                message = "L'utilisateur est introuvable";
                res.status(404).json({ message });
            } else {

                const connect = true;
                res.json({ connect, info: user });
            }
        });
    } catch (err) {
        console.error(err)
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
    ;
};