const { model, Schema, Types } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Link" }],
});

module.exports = model("User", User);
