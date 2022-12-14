const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id)
    }

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID UNKNOW ' + err);
    }).select('-password');
};

module.exports.updateUser = (req, res) => {
    UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                ...req.body,
                picture: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "",
            },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    )
        .select("-password")
        .then((x) => res.status(200).json(x))
        .catch((error) => res.status(404).json({ error }));
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow :' + req.params.id)

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "User deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}