
const sqlSelectAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`"
const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?"
const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
const sqlUpdate = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
const sqlDelete = "DELETE FROM `eCatalogBrands` WHERE `id` = ?"

class eCatalogBrands {
  // Constructor: เมธอดที่ใช้สร้างและเริ่มต้น Object
  constructor(id, no, code, nameTH, nnameEN, shortKeyword, keyword, img, year, linkMain, createdAt, updatedAt) {
    this.id = id;
    this.no = no;
    this.code = code;
    this.nameTH = nameTH;
    this.nameEN = nnameEN;
    this.shortKeyword = shortKeyword;
    this.keyword = keyword;
    this.img = img;
    this.year = year;
    this.linkMain = linkMain;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Method (ฟังก์ชันของ Object)
  getAll() {
  }

  // Method สำหรับการกระทำ
  getOne() {
    return `Hello, my name is ${this.name} and my role is ${this.role}.`;
  }
  getCreate() {
    return `Hello, my name is ${this.name} and my role is ${this.role}.`;
  }
  getUpdate() {
    return `Hello, my name is ${this.name} and my role is ${this.role}.`;
  }

  getDelete() {
    return `Hello, my name is ${this.name} and my role is ${this.role}.`;
  }
  // Static Method (เรียกใช้จาก Class โดยตรง ไม่ต้องสร้าง Object)
  static info() {
    return 'This is the base User class.';
  }
}

module.exports = eCatalogBrands;