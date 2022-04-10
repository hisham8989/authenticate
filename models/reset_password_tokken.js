const mongoose = require('mongoose')

const resetTokkenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tokken:{
      type:String,
      required:true,
      unique:true
  },
  isValid:{
      type:Boolean,
      default:true
  }
},{
    timestamps:true
})

const Tokken  = mongoose.model('Tokken', resetTokkenSchema)

module.exports = Tokken
