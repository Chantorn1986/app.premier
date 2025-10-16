const db = require("../../db/db");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
const sqlGetOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?";

exports.list = async (req, res) => {
  try {
    await db.execute(sqlGetAll, (err, result) => {
      if (err) {
        return;
      }
      res.status(200).json({
        message: "เรียบร้อย",
        data: result
      });
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List leave type invalid.' })
  }
}

exports.getAdd = async (req, res) => {
  try {
    res.status(200).json({
      message: "Get Create"
    });
  } catch {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create users invalid.' })
  }
}

exports.postAdd = async (req, res) => {
  try {
    const { no, code, nameTH, nameEN, shortKeyword, keyword, img, year, linkMain } = req.body
    const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const timeStamp = moment(new Date()).format();
    const image = req.file ? req.file.filename : null;
    await db.execute(sqlInsert,
      [uuidv4(), no, code, nameTH, nameEN, shortKeyword, keyword, image, year, linkMain, timeStamp]
      , (err, resultNew) => {
        if (err) {
          return;
        }

      });
    await db.execute(sqlGetAll, (err, result) => {
      if (err) {
        return;
      }
      res.status(200).json({
        message: "เรียบร้อย",
        data: result
      });
    });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create user invalid.' })
  }
}