const express = require('express');
const router = express.Router();

const Post = require('../models/post').Post;


const response = require('../config/response');




router.get('/', (req, res, next) => {
    Find({}, (err, results) => {
       if (err) {
           return next(err);
       } 
       const data = result.map(entry => post.asData());
       response.data(req, res, data);
    }); 
}); 