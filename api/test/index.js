/**
 * Created by mercuso on 23.12.17.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  res.sendStatus(200)
});

module.exports = router;
