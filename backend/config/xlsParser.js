
class xlsParser {
    constructor(path) {
        this.nodeXls = require('node-xlsx');
        this.fs = require('fs');
        this.path = path
        this.sheets = this.nodeXls.parse(this.fs.readFileSync(this.path));
    }

    getSheet = () => this.sheets;

    static init = _path => new this(_path);

}

module.exports = xlsParser;