exports.filter = (data, filterObj) =>{
    let keys = Object.keys(filterObj);
    let ndata = data;
    keys.forEach(key => {
        ndata = ndata.filter(datael =>{
            return datael[key] == filterObj[key];
        })
    })
    return ndata;
}