/**
 * Created by mercuso on 28.12.17.
 */
const User = require('../../db/models/user');

async function signup(req, res) {
  let user = await User.create({
    email: req.body.email,
    password: await User.encryptPassword(req.body.password),
    token: await User.generateToken(),
    //username: req.body.username //optional
  });
  res.send(user)
}

async function login(req, res) {

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
}

module.exports = {signup, login};