const express = require('express');
const mysql = require('mysql');

// Create connection mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});

const app = express();

// create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});

// create table
app.get('/posttable', (req, res) => {
    let sql = 'CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    
    db.query (sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post table created');
    });
});

// insert post 1
app.get('/addpost1', (req, res) => {
    let post = {
        title: 'Post One',
        body: 'This is post number one'
    };

    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql, post, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post 1 added');
    });
});

// insert post HAPPY
app.get('/addposthappy', (req, res) => {
    let post = {
        title: 'Post Happy',
        body: 'This is post happy'
    };

    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql, post, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post happy added');
    });
});

// select posts
app.get('/getpost', (req, res) => {
        let sql = 'SELECT * FROM post';
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched');
    });
});

// select single post
app.get('/getpost/:id', (req, res) => {
        let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('single post fetched');
    });
});

// update post
app.get('/updatepost/:id', (req, res) => {
    // specify what you want to update
    let newTitle = 'Updated Title';
    
        let sql = `UPDATE post SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post updated');
    });
});

// delete post
app.get('/deletepost/:id', (req, res) => {
    // specify what you want to update
    let newTitle = 'Updated Title';
    
        let sql = `DELETE FROM post WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post deleted');
    });
});

app.listen('3000', () => {
    console.log('server started on port 3000');
});

//  NOTE: on BUILDING ACTUAL APP
// one might use template engine EJS / HBS
// make query grab results pas to template loop through them and output result



//  IMPORTANT NOTE:
// ======= THIS IS ONLY PLAIN IMPLIMENTATION OF SQL WITH NODE EXPRESS 