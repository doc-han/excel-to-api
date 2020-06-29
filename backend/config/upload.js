var multer = require('multer');

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var xlsFilter = function (req, file, cb) {
    // filter and make sure only xls files pass
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: xlsFilter});

module.exports = upload;