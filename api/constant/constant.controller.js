/**
 * Created by mercuso on 23.12.17.
 */
//const mongoose = require('mongoose');
const Constant = require('../../db/models/constant');

async function createConstant(req, res) {
  let constant_info = req.body;
  constant_info.creator_id = req.user._id;

  let constant = new Constant(req.body);
  try{
    let result = await constant.save();
    res.send(result);
  } catch(err){
    res.sendStatus(422)
  }
}

async function edit(req,res) {
  const constant = await Constant.findByIdAndUpdate(
    req.params.id,
    {$set: req.body},
    {new:true});
  if(!constant){
    return res.sendStatus(404)
  }
  return res.send(constant)
}

async function getAll(req, res) {
  const constants = await Constant.find({
    'creator_id':req.user._id
    /*$or:[
      {'public_access':true},
      {'creator_id':req.user._id}
    ]*/
  });
  res.send(constants);
}

async function getById(req, res) {
  const constant = await Constant.findById(req.params.id);
  if(!constant){
    return res.sendStatus(404)
  }
  res.send(constant);
}

module.exports = {createConstant, edit, getAll, getById};
