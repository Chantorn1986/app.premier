const express = require('express');
const app = express();
const path = require('path');
const dbConfig  = require('./db/dbConfig');
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'nodesecret',
  resave: false,
  saveUninitialized: true
}))
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/ecatalogBrands', require('./routes/ecatalog/brands'));
app.use('/ecatalog', require('./routes/ecatalog/ecatalogAdmin'));


app.listen(3000,async () => {
  console.log(`Server is running... http://localhost:${dbConfig.port}`);
});