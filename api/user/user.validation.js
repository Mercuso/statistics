/**
 * Created by mercuso on 28.12.17.
 */

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const signup = [
  check('email', 'missing email').exists(),
  check('email')
    .isEmail().withMessage('wrong email format').optional(),
  check('password','missing password').exists(),
  check('password')
    .isLength({ min: 5 }).withMessage('too weak password').optional()
];



module.exports = {signup};