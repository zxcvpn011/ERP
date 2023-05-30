const express = require('express');
const router = express.Router();
const Product = require("../../db/models/Product")


router.get('/', async function(req, res, next) {
  let products= await Product.find({})
  res.json(products);
});
/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    if(!Object.keys(req.body).length) {
      return res.status(400).json({error: 'body is empty'})
    }
    let product = new Product(req.body)
    await product.save()
    res.json({success: true});
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;

