/**
 * Created by mercuso on 24.12.17.
 */

require('../../common/lib/env').checkForExistence(['SECRET']);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  role: {
    type: Number,
    required: true,
    default: 0
  }
});

class UserClass {

  static async encryptPassword(password){
    return await bcrypt.hash(password, saltRounds);
  }

  async checkPassword(password){
    return await bcrypt.compare(password, this.password)
  }

  static async generateToken(){
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (72 * 60 * 60),//after 72 hrs
      role: 'user'
    }, process.env.SECRET);
  }
  async verifyToken(){
    return jwt.verify(this.token, process.env.SECRET)
  }

}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);