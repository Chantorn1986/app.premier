const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const {list,getAdd,postAdd} = require('../../controllers/ecatalog/brands')
const { uploadBrands }= require('../../middleware/uplodePic');

router.get('/',list)
router.get('/Add',getAdd)
router.post('/Add',postAdd)
router.get('/Edit/:id',postAdd)
// router.post('/Edit/:id',putUpdate)
// router.get('/Del/:id',getRemove)
// router.get('/View/:id',getView)

module.exports = router;