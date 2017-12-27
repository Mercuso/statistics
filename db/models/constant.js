/**
 * Created by mercuso on 23.12.17.
 */
const mongoose = require('mongoose');

let ConstantSchema = new mongoose.Schema({
  name: String,
  value: Number,
  dimension: String,
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  public_access: {
    type: Boolean,
    default: false
  }
});

class ConstantClass {
  isOwnedBy(user_id){
    if (typeof user_id !== String ){
      user_id = user_id.toString();
    }
    return user_id === this.creator_id.toString()
  }
}

ConstantSchema.loadClass(ConstantClass);

module.exports = mongoose.model('Constant', ConstantSchema);