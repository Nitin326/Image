const express = require('express');
const app = express();
const path = require('path');
const User = require('./Detail');
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
app.use('/Public', express.static(path.join(__dirname, './public/')))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Storage = multer.diskStorage({
  destination: './public/upload/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: Storage,
}).single('file');


app.get('/', (req, res) => {
  User.find({}, function (err, data) {
    if(err) throw err;
    res.render('Dashboard',{records: data});
}).clone().catch(function (err) { console.log(err) })
})

app.post('/upload', upload, (req, res) => {
  var success = req.file.filename;
  console.log(success + " " + "File Uploded");
  const userData = new User({
    image: req.file.filename
  })
  console.log(userData);
  userData.save();
  res.redirect('/')
})

app.get('/upload', (req, res) => {
  res.render('Home');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})