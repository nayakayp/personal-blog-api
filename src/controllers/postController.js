const Post = require("../models/postModel");

exports.getAllPost = async (_, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ status: 200, message: "success", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ status: 404, message: "not found", data: req.params.id });
    }

    res.status(200).json({ status: 200, message: "success", data: post });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNewPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    excerpt: req.body.excerpt,
    slug: req.body.slug,
    image_cover: req.body.image_cover,
  });

  try {
    const newPost = await post.save();
    res.status(201).json({ status: 201, message: "created", data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.editPostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ status: 404, message: "not found", data: req.params.id });
    }

    res
      .status(204)
      .json({ status: 204, message: "updated", data: updatedPost });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const findId = await Post.findById(req.params.id);

    if (!findId) {
      return res
        .status(404)
        .json({ status: 404, message: "not found", data: req.params.id });
    }

    await Post.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ status: 204, message: "deleted", data: req.params.id });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
