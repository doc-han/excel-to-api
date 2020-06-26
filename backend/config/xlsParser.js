
class xlsParser {
    constructor(path) {
        this.nodeXls = require('node-xlsx');
        this.fs = require('fs');
        this._ = require('lodash');
        this.path = path
        this.sheets = this.nodeXls.parse(this.fs.readFileSync(this.path));
        this.keys;
    }

    refineSheets = () => {
        // console.log(this.sheets)
        let newsheets = [];
        this.sheets.forEach(sheet => {
            let rows = sheet.data;
            this.keys = rows.splice(0, 1)[0];
            this.keys = this.keys.map(key => this._.camelCase(key));
            let newsheet = [];
            rows.forEach(row => {
                if(!row.length) return;
                let newRow = {};
                for (let i = 0; i < row.length; i++) {
                    newRow[keys[i]] = row[i];
                }
                newsheet.push(newRow);
            })
            newsheets.push(newsheet);
        })
        this.sheets = newsheets;
    }

    getSheet = () => this.sheets;

    static init = _path => new this(_path);

}

module.exports = xlsParser;