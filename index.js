const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const wax = require('wax-on');

require('dotenv').config();

// Create connection mysql
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});

const app = express();
const port = process.env.PORT || 5000

// set static folder w/ file name === public
app.use(express.static('public'));

// set up wax-on: templating engine
app.set('view engine', 'hbs');
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({
    extended: false
    })
);

// import ROUTES
const landingRoutes = require('./routes/landing');

async function main() {
    app.use('/', landingRoutes);
    // test route
    // app.get('/', (req, res) => {
    //     res.send("It is ALIVEEAAH! ~")
    // })

}
main();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

//  NOTE: on BUILDING ACTUAL APP
// one might use template engine EJS / HBS
// make query grab results pas to template loop through them and output result



//  IMPORTANT NOTE:
// ====== THIS IS ONLY PLAIN IMPLEMENTATION OF SQL WITH NODE EXPRESS 