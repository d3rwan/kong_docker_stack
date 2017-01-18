import express from 'express';
import { v4 as uuid } from 'node-uuid';
import moment from 'moment';

const app = express();
const port = 3000;

app.get('/api/uuid', (req, res) => {
  res.json({
    timestamp: moment(),
    uuid: uuid()
  });
});

app.get('/api/info', (req, res) => {
  res.json(req.headers);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
