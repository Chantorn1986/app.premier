const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const {list,getCreate,postCreate,getUpdate,putUpdate,getRemove,getView} = require('../controllers/index')

router.get('/',list)
router.get('/Add',getCreate)
router.post('/Add',postCreate)
router.get('/Edit/:id',getUpdate)
router.post('/Edit/:id',putUpdate)
router.get('/Del/:id',getRemove)
router.get('/View/:id',getView)

module.exports = router;