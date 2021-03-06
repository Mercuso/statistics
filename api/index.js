/**
 * Created by mercuso on 22.12.17.
 */
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
  const options = {
    root: path.resolve(__dirname,  '../dist'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  console.log(options.root);
  const fileName = 'index.html';
  res.sendFile(fileName, options)
});
app.use('/test', require('./test'));
app.use('/constants', require('./constant'));
app.use('/users', require('./user'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log('no--------');
  res.status(err.status || 500);
  if (err.status===404){

    res.sendStatus(404)
  } else if(err.message === 'Validation failed'){
    res.status(422).send(err.array())
  } else {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = app;

