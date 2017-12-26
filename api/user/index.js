/**
 * Created by mercuso on 24.12.17.
 */

const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');

router.post('/', async (req,res)=>{
  let user_info = req.body;
  user_info.password = await User.encryptPassword(user_info.password);
  user_info.token = await User.generateToken();

  try{
    let user = await User.create(user_info);
    res.send(user)
  } catch(err){
    res.status(400).send(err)
  }
});

router.post('/login', async (req,res)=>{
  console.log(req.body);
  let user = await User.findOne({
    email:req.body.email
  });
  if(!user){
    return res.status(404).send({
      message: "User not found"
    })
  }
  if(! await user.checkPassword(req.body.password)){
    return res.sendStatus(401);
  }
  try{
    await user.verifyToken()
  } catch(err){
    user.token = await User.generateToken();
    await user.save()
  }

  res.send(user);

});

module.exports = router;