const mainController = require('../controllers/main.controller');
const upload = require('../config/upload');
const path = require('path');

exports.routesConfig = (app) => {
    app.post('/upload', [
        upload.single('xlsfile'),
        mainController.upload
    ]);
    app.get('/', (req, res) => {
        res.send('<center><h1>xls-2-API</h1><a href="/test">Test xls upload here</a><br/></center>')
    });
    app.get('/test', (req,res) => {
        res.sendFile(path.join(__dirname, '../', '/testpage.html'));
    });
    app.get('/:slug', [
      mainController.data  
    ]);
    app.use((req, res) => res.status(404).send("Page not found! <a href='/'>Go to home</a>"));
}