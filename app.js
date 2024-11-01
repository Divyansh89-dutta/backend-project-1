const express = require('express');
const app = express();
const fs = require('fs');
app.set('view engine', 'ejs');
app.get('/', function(req, res){
    fs.readdir('./file', {withFileTypes: true}, (err , files) =>{
        res.render('home', {files})
    })
})
app.get('/notes', function(req, res){
    res.render(`notes`)
})
app.get('/newnotes', function(req, res){
    fs.writeFile(`./file/${ req.query.filetitle }`, req.query.filedescription, function(err){
        if (err) throw err;
        else res.redirect('/');
    })
})
app.get('/show/:filename', function(req, res){
    fs.readFile(`./file/${req.params.filename}`, 'utf8', (err, data, date) => {
        res.render('detail', {filename: req.params.filename, content: data, date: date});
    });
})
app.get('/delete/:filename', function(req, res){
    fs.unlink(`./file/${req.params.filename}`, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
})
app.get('/edit/:filename', function(req, res){
    fs.readFile(`./file/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) throw err;
        res.render('edit', {filename: req.params.filename, content: data});
    });
})
app.get('/update/:filename', function(req, res){
    fs.writeFile(`./file/${req.params.filename}`, req.query.content, function(err){
        if (err) throw err;
        res.redirect('/');
    });
});


app.listen(2000);