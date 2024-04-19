const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    giftName: {
      type: String,
      required: [true, "GiftName type require"]
    },
    point: {
      type: Number,
      require: [true, "point is require"],
    },
    remain: {
      type: Number,
      require: [true, "Remain is require"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Gift", giftSchema);

// model gift
// 3 parameters
