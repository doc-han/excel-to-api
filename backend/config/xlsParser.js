
class xlsParser {
    constructor(path) {
        this.nodeXls = require('node-xlsx');
        this.fs = require('fs');
        this._ = require('lodash');
        this.path = path
        this.sheets = this.nodeXls.parse(this.fs.readFileSync(this.path));
        this.keys = [];
    }

    refineSheets = () => {
        // console.log(this.sheets)
        let newsheet = [];
        this.sheets.forEach(sheet => {
            let rows = sheet.data;
            this.keys = [...this.keys, ...rows.splice(0, 1)[0]];
            this.keys = this.keys.map(key => this._.camelCase(key));
            rows.forEach(row => {
                if(!row.length) return;
                let newRow = {};
                for (let i = 0; i < row.length; i++) {
                    newRow[this.keys[i]] = row[i];
                }
                newsheet.push(newRow);
            })
        })
        this.sheets = newsheet;
    }

    getSheets = () => this.sheets;
    getKeys = () => this.keys;

    static init = _path => new this(_path);

}

module.exports = xlsParser;