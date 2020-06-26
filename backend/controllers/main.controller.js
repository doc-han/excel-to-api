const xlsParser = require('../config/xlsParser');

exports.upload = (req, res) => {
    // file: contains the uploaded file
    let { file } = req;
    let xls = xlsParser.init(file.path);
    xls.refineSheets();
    res.send(xls.getSheet());
}