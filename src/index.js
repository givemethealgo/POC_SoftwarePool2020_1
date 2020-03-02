const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function startServer() {
  app.get('/hello', (req, res) => res.send('word'));
  app.get('/repeat-my-fixed', (req, res) => res.send(('For better and for worst').repeat(200)));
  app.get('/repeat-my-query', (req, res) => {
    const { message } = req.query;
    if (message === '') {
      res.send('Bad Reques');
      res.status = 400;
    } else {
      res.send(message);
    }
  });
  app.post('/repeat-my-body', (req, res) => {
    const message = req.body;
    if (Object.values(message).length !== 0) {
      res.send(message);
    } else {
      res.send('Bad Request');
      res.status = 400;
    }
  });
  app.get('/repeat-my-header', (req, res) => {
    const message = req.headers;
    const test = Object.keys(message);
    const test2 = test.indexOf('x-message');
    if (test2 !== -1) {
      const final = Object.values(message);
      res.send(final[test2]);
    } else {
      res.send('Bad Request');
      res.status = 400;
    }
  });
  app.listen(PORT);
}
startServer();
