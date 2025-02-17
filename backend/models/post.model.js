const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter product name"]
    },
    author: {
        type: String,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true,
        default: 0
    },
    content: {
        type: String,
        required: true,

    },
},
    {
        timestamps: true,
    }
);
const Post = mongoose.model('Post', PostSchema, 'users');
module.exports = Post;