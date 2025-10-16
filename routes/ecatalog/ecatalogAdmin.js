const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
// const {isAuthenticated} = require('../middlewares/authCheck')
const {admin,getBrands,getAddBrands,postAddBrands,getEditBrands,postEditBrands,delBrands} = require('../../controllers/ecatalog/ecatalogAdmin')

const { uploadBrands}= require('../../middleware/uplodePic');

router.get('/admin', admin)

router.get('/brands', getBrands)
router.get('/brands/Add', getAddBrands)
router.post('/brands/Add',uploadBrands, postAddBrands)
router.get('/brands/Edit/:id', getEditBrands)
router.post('/brands/Edit/:id',uploadBrands, postEditBrands)
router.get('/brands/Del/:id', delBrands)

module.exports = router;