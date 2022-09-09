const postModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "",
        video: req.body.video,
        likers: [],
        comments: []
    })
    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        console.error(err)
        return res.status(400).send(err)
    }
}


module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id);
    }
    const updateRecord = {
        message: req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Update error : ' + err);
            }
        }
    )
}


module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id);
    }

    postModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Delete error : ' + err);
            }
        }
    )
}


module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id);
    }
    console.log(req.body);

    await postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $addToSet: { likers: req.body.id },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    )
        .catch((err) => res.status(404).json({ err }));

    await UserModel.findOneAndUpdate(
        { _id: req.body.id },
        {
            $addToSet: { likes: req.params.id },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    )
        .then((x) => res.status(200).json(x))
        .catch((err) => res.status(404).json({ err }));
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id);
    }

    postModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Delete error : ' + err);
            }
        }
    )
}


module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID UNKNOW ' + req.params.id);
    }

    await postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: { likers: req.body.id },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    )
        .catch((err) => res.status(404).json({ err }));

    await UserModel.findOneAndUpdate(
        { _id: req.body.id },
        {
            $pull: { likes: req.params.id },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    )
        .then((x) => res.status(200).json(x))
        .catch((err) => res.status(404).json({ err }));
}
