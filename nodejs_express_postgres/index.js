var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

// Post example
app.post('/user/add', function(req, res) { 
  res.send('OK');
});

app.get('/getQuestion', function(req, res) { 
  const { Pool } = require('pg');

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'postgres',
    port: 5432
  });

  pool.query('SELECT * FROM questions;', (sqlErr, sqlRes) => {
    let response = '';
    if (sqlErr) {
      console.log(sqlErr);
      res.send(sqlErr);
    } else {
      for (let row of sqlRes.rows) {
        response += `${row.content}<br/>`
      }
    }
    pool.end();
    res.send(response);
  });
});

app.get(/^(.+)$/, function(req, res){ 
  console.log('Static file request : ' + req.params);
  res.sendFile(__dirname + req.params[0]); 
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});