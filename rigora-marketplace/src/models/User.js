const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform(_document, returned) {
    delete returned.passwordHash;
    delete returned.__v;
    return returned;
  }
});

module.exports = mongoose.model("User", userSchema);
