const multer  = require('multer')
const fs = require('fs').promises; // ใช้ .promises เพื่อเข้าถึงเวอร์ชันที่เป็น Promise

const storageBrands = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/brands')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
});



exports.uploadBrands = multer({ storage: storageBrands }).single('file')