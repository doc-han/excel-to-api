const xlsParser = require('../config/xlsParser');

exports.upload = (req, res) => {
    // file: contains the uploaded file
    let { file } = req;
    let a = xlsParser.init(file.path);
    res.send(a.getSheet());
}