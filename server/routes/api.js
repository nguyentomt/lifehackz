const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/:category',
  apiController.getData,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  })

router.post('/',
  apiController.makeHack,
  (req, res, next) => {
    res.status(200).send([])
  })

router.post('/user/:username',
  apiController.getUser,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  })

router.post('/user',
  apiController.makeUser,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  })

// router.patch('/user',
//   apiController.changeDisplayName,
//   (req, res, next) => {
//     res.status(200).json(res.locals.data);
//   })

router.patch('/likes',
  apiController.updateLikes,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  })
  
router.patch('/dislikes',
  apiController.updateDislikes,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  })

module.exports = router
