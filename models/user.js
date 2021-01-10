const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, trim: true, unique: true, required: true },
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "conversation" },
  ],
  picture: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
