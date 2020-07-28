const express = require('express');
const routes = express.Router();
const db = require('./database/db');

routes.get('/', (req, res) => {
  return res.render('index.html');
});

routes.get('/create-point', (req, res) => {
  //req.query: Query Strings da nossa url
  //console.log(req.query)

  return res.render('create-point.html');
});

routes.post('/savepoint', (req, res) => {
  //req.body: o corpo do nosso formulário
  //console.log(req.body)

  //inserir dados no banco de dados

  //Inserir dados na tabela

  const query = `
     INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
     ) VALUES (?, ?, ?, ?, ?, ?, ?);
     `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro!');
    }

    console.log('Cadastrado com sucesso');
    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

routes.get('/search', (req, res) => {
  const search = req.query.search;

  if (search == '') {
    //Pesquisa vazia
    return res.render('search-results.html', { total: 0 });
  }
  // pegar os dados do bd
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }
    return res.render('search-results.html', {
      places: rows,
      total: rows.length,
    });
  });
});

module.exports = routes;
