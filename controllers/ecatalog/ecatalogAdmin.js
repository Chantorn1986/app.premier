const db = require("../../db/db");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

exports.admin = async (req, res) => {
  try {
    res.render('ecatalog/admin/admin', {
      title: 'Admin Catalog'
    })
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
}

exports.getBrands = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) {
        return;
      }
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List brands invalid.' })
  }
}

exports.getAddBrands = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `eCatalogBrands`";
    await db.execute(sqlMaxNo, (err, result) => {
      if (err) {
        return;
      }
      res.render('ecatalog/admin/brandsAdd', {
        title: 'Brands Management',
        maxNo: result[0]['max'] + 1,
        updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        year: moment(new Date()).format('YYYY')
      });
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create brands invalid.' })
  }
}

exports.postAddBrands = async (req, res) => {
  try {
    const { brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, linkMain, brandsYear, brandsCreatedAt, brandsUpdatedAt } = req.body;
    const image = req.file ? req.file.filename : null;
    const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlInsert,
      [uuidv4(), brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, image, brandsYear, linkMain, brandsUpdatedAt]
      , (err, resultAdd) => {
        if (err) {
          return;
        }
      });
    await db.execute(sqlGetAll, (err, results) => {
      if (err) {
        return;
      }
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create brands invalid.' })
  }
}

exports.getEditBrands = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?"
    await db.execute(sqlSelectOne, [req.params.id],
      (err, result) => {
        if (err) {
          return;
        }
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('ecatalog/admin/brandsEdit', {
          title: 'Brands Edit',
          brands: result[0],
          coverDate: coverDate
        });
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
}

exports.postEditBrands = async (req, res) => {
  try {
    const { brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, linkMainE, brandsYearE, brandsCreatedAtE, brandsUpdatedAtE } = req.body;
    const sqlUpdate = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const sqlUpdateNoImg = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const image = req.file ? req.file.filename : null;
    if (image) {
      await db.execute(sqlUpdate,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, image, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) {
            return;
          }
        });
    } else {
      await db.execute(sqlUpdateNoImg,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) {
            return;
          }
        });
    }
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) {
        return;
      }
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
}

exports.delBrands = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `eCatalogBrands` WHERE `id` = ?"
    await db.execute(sqlDelete,
      [req.params.id]
      , (err, resultDel) => {
        if (err) {
          return;
        };
      });
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) {
        return;
      }
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove brands invalid.' })
  }
}