const express = require('express');
const router = express.Router();
const Materials = require("../../db/models/Materials");


router.get('/', async function(req, res, next) {
  let materials= await Materials.find({});
  res.json(materials);
});

router.post('/', async function(req, res, next) {
  try {
    if(!Object.keys(req.body).length) {
      return res.status(400).json({error: 'body is empty'});
    }
    let material = new Materials({...req.body});
    await material.save();
    res.json({success: true, material});
  } catch(err) {
    res.json(err);
  }
});

(async() => {
  // console.log(await Materials.deleteMany({}))
})();

module.exports = router;

