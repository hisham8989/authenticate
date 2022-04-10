const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next()

    console.log(`password for ${this.name} before encryption ${this.password} @ signing up`);
    this.password = await bcrypt.hash(this.password, 10)
    console.log(`After encryption ${this.password}`);

    return next()
  } catch (error) {
    return next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
