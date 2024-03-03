const { model, Schema, Types } = require("mongoose");

const Link = new Schema({
  from: { type: String, required: true, unique: true },
  to: { type: String, required: true },
  short: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  clicks: {type:Number, default: 0},
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", Link);
