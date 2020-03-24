const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    image: String,
    posts: [ObjectId]
});

const Users = new mongoose.model("users", UsersSchema);

const getOne = async (_id) => {
  const user = await Users.find({_id})
  return user;
};

const getAll = async () => {
  const users = await Users.find({})
  return users;
};

const add = async (newUser) => {
  const result = await Users.create(newUser);

  return result;
};

const auth = async (userToCheck) => {
  const result = await Users.find(userToCheck);

  return result;
}

const update = async (_id, updatedUser) => {
  const result = await Users.updateOne({ _id }, { $set: updatedUser });

  return result 
}

const deleteOne = async (_id) => {
  const result = await Users.deleteOne({ _id });

  return result;
};

module.exports = {
  getAll,
  add,
  update,
  deleteOne,
  auth,
  getOne
};
