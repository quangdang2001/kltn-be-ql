const asyncHandler = require("express-async-handler");
const catchAsyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Comment = require("../models/comment/comment.js");

class commentControllers {
  // @desc Create new comment
  // @route   POST /api/comments
  // @access  Private
  addComment = catchAsyncHandler(async (req, res) => {
    const { comment, productId } = req.body;
    const cmt = {
      user: req.user._id,
      name: req.user.name,
      avatarUrl: req.user.avatar.url,
      product: Object(productId),
      comment,
    };
    const addComment = await Comment.create(cmt);
    if (addComment) {
      res.status(201).json({
        success: true,
        addComment,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ERROR: Couldn't add comment",
      });
    }
  });
  // @desc Update  comment
  // @route   Put /api/comments/:id
  // @access  Private
  updateComment = catchAsyncHandler(async (req, res) => {
    const { comment } = req.body;
    const cmt = await Comment.findById(req.params.id);
    if (cmt.user.toString() === req.user._id.toString()) {
      cmt.comment = comment;
      await cmt.save();
      res.status(201).json({
        success: true,
        comment: cmt,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ERROR: Couldn't add comment",
      });
    }
  });
  // @desc DELETE  comment
  // @route   Delete /api/comments/:id
  // @access  Private
  deleteComment = catchAsyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      await comment.remove();
      res.status(201).json({
        success: true,
        message: "Deleted comment",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "not found comment",
      });
    }
  });
  // @desc add reply  comment
  // @route   POST /api/comments/:id/reply
  // @access  Private
  addReplyComment = catchAsyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    const reply = req.body.reply;

    if (comment && reply) {
      const replyComment = {
        user: req.user._id,
        name: req.user.name,
        avatarUrl: req.user.avatar.url,
        reply,
      };
      comment.replies.push(replyComment);
      await comment.save();
      res.status(201).json({
        success: true,
        comment,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ERROR",
      });
    }
  });
  updateReplyComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    const { replyId, repUpdate } = req.body;
    const checkReply = comment.replies.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (checkReply) {
      comment.replies.forEach(async (reply) => {
        if (reply._id.toString() === replyId) {
          try {
            reply.reply = repUpdate;
            await comment.save();
            res.status(201).json({
              success: true,
              comment,
            });
          } catch (error) {
            res.status(201).json({
              success: false,
              message: "ERROR: Could not update",
            });
          }
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ERROR: authenticated",
      });
    }
  });
  getCommentByProductId = asyncHandler(async (req, res) => {
    const comment = await Comment.find({ product: req.params.id });
    if (comment) {
      res.status(201).json({
        success: true,
        comment,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "not found message",
      });
    }
  });
}

module.exports = new commentControllers();
