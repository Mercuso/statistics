/**
 * Created by mercuso on 23.12.17.
 */
const Constant = require('../../db/models/constant');

async function createConstant(req, res) {
  let constant = new Constant(req.body);
  let result = await constant.save();

  res.send(result);
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
  const constants = await Constant.find({});
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
