/**
 * Created by mercuso on 24.12.17.
 */

const jwt = require('jsonwebtoken');
const User = require('../../db/models/user');

async function checkAuth(req, res, next) {
  const token =  req.header("Authorization");
  if(!token){
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.SECRET, async (err, decoded)=> {
    if (err) {
      res.status(403).send(err)
    } else {
      const user = await User.findOne({token});
      if(!user){
        res.status(403).send({name:"UserNotFound", message:"user with such token doesn't exist"})
      } else {
        req.user = user;
        return next()
      }
    }
  });
}

module.exports = {checkAuth};