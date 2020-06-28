const xlsParser = require('../config/xlsParser');
const dataModel = require('../model/dataModel');

exports.upload = (req, res) => {
    // file: contains the uploaded file
    let { file, body } = req;
    let xls = xlsParser.init(file.path);
    xls.refineSheets();
    let newData = new dataModel({
        slug: body.slug,
        data: xls.getSheets(),
        keys: xls.getKeys()
    });
    newData.save((err, resp) => {
        if (err) res.status(500).send("Error saving data");
        res.status(200).send("Data has been saved!");
    })
}

exports.data = (req, res) => {
    const { slug } = req.params;
    console.log(req.query)
    dataModel.findOne({ slug }).then(resp => {
        let {keys, data} = resp;
        res.send(data)
    })
}

/*

 model {
     id - path
     data
 }

*/