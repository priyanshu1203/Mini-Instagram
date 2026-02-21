const Post = require("../models/Post");
const fs = require("fs");

// HOME WITH PAGINATION
exports.home = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate("user")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        res.render("home", {
            posts,
            currentPage: page,
            totalPages
        });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// CREATE PAGE
exports.createPostPage = (req, res) => {
    res.render("createPost");
};

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        await Post.create({
            caption: req.body.caption,
            image: "/uploads/" + req.file.filename,
            user: req.user._id,
            likes: []
        });

        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// EDIT PAGE
exports.editPostPage = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.redirect("/");
        if (post.user.toString() !== req.user._id) return res.redirect("/");

        res.render("editPost", { post });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.redirect("/");
        if (post.user.toString() !== req.user._id) return res.redirect("/");

        post.caption = req.body.caption;

        if (req.file) {
            fs.unlinkSync("./public" + post.image);
            post.image = "/uploads/" + req.file.filename;
        }

        await post.save();
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.redirect("/");
        if (post.user.toString() !== req.user._id) return res.redirect("/");

        fs.unlinkSync("./public" + post.image);
        await post.deleteOne();

        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

// ❤️ LIKE / UNLIKE
exports.toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.redirect("/");

        const userId = req.user._id;

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};