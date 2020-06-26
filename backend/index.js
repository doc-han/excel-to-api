const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// configurations
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('combined'));


// routes
require('./routes/routes.config').routesConfig(app);


app.listen(PORT, (err) => {
	if(err) throw err;
	console.log(`running at localhost:${PORT}`);
});
