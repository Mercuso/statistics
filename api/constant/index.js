/**
 * Created by mercuso on 23.12.17.
 */

const express = require('express');
const router = express.Router();
const constantCtrl = require('./constant.controller');
const {checkAuth} = require('../../common/lib/auth');

function fetchAsync(asyncController) {
  return async (req,res)=>{
    try {
      return await asyncController(req,res)
    } catch(err){
      return res.status(500).send(err)
    }
  }
}
//Private requests::::::
router.post('/', checkAuth, fetchAsync(constantCtrl.createConstant));
router.get('/', checkAuth, fetchAsync(constantCtrl.getAll));

router.get('/:id', checkAuth, fetchAsync(constantCtrl.getById));
router.put('/:id', checkAuth, fetchAsync(constantCtrl.edit));
//::::::::::::::::::::::

module.exports = router;