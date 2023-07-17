var express = require('express');
var router = express.Router();
let Post = require('../models/post');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

// Creating one post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one post
router.put('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }

    if (req.body.content != null) {
        res.post.content = req.body.content;
    }

    if (req.body.author != null) {
        res.post.author = req.body.author;
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.deleteOne();
        res.json({ message: 'Post has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting post object by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.post = post;
    next();
}

module.exports = router;