/**
 * Created by mercuso on 24.12.17.
 */

const express = require('express');
const router = express.Router();

const {asyncControllerWrap} = require('../../common/lib/wrappers');
const userCtrl = require('./user.controller');
const userValidate = require('./user.validation');

router.post('/signup',userValidate.signup, asyncControllerWrap(userCtrl.signup));
router.post('/login', asyncControllerWrap(userCtrl.login));

module.exports = router;