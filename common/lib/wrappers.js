/**
 * Created by mercuso on 28.12.17.
 */
const { validationResult } = require('express-validator/check');

function asyncControllerWrap(controller) {
  return async (req,res, next)=>{
    try {
      validationResult(req).throw();
      return await controller(req,res)
    } catch(err){
      return next(err)
    }
  }
}

module.exports = {asyncControllerWrap};