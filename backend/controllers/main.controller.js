const xlsParser = require('../config/xlsParser');
const dataModel = require('../model/dataModel');
const { filter } = require('../config/dataFilter');

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

exports.data = (req, res, next) => {
    const { slug } = req.params;
    let { query } = req;
    let nquery = {};
    let qkeys = Object.keys(query);
    dataModel.findOne({ slug }).then(resp => {
        if(!resp){
            next();
            return;
        }
        let { keys, data } = resp;
        qkeys = qkeys.filter(el=>{
            if(keys.indexOf(el) > -1){
                nquery[el] = query[el];
                return true;
            }
            return false;
        });
        if(qkeys.length){
            data = filter(data, nquery);
            res.json(data);
        }else res.json(data);
    })

}

/*

 model {
     id - path
     data
 }

*/