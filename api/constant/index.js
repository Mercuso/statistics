/**
 * Created by mercuso on 23.12.17.
 */

const express = require('express');
const router = express.Router();
const constantCtrl = require('./constant.controller');
const {checkAuth} = require('../../common/lib/auth');

const Constant = require('../../db/models/constant');

router.post('/', checkAuth, async (req,res)=>{
  try {
    return await constantCtrl.createConstant(req,res)
  } catch(err){
     return res.status(500).send(err)
  }
});

router.get('/', constantCtrl.getAll);

router.get('/:id', constantCtrl.getById);

router.put('/:id', constantCtrl.edit);


module.exports = router;