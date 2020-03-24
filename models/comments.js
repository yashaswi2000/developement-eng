const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const CommentsSchema = new mongoose.Schema({
  postId: ObjectId,
  userId: ObjectId,
  text: String,
  user: {
    name: String,
    image: String,
  }
});

const Comments = new mongoose.model("comments", CommentsSchema);

const getAll = async () => {
  const comments = await Comments.find({});

  return comments;
};

const getAllPostComments = async postId => {
  const comments = await Comments.find({ postId });

  return comments;
};

const add = async newComment => {
  return await Comments.create(newComment);
};

const update = async (_id, updatedComment) => {
  return await Comments.updateOne({ _id }, updatedComment);
};

const deleteOne = async _id => {
  return await Comments.deleteOne({ _id });
};

module.exports = {
  getAll,
  getAllPostComments,
  add,
  update,
  deleteOne
};
