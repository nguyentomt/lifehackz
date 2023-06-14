const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const PORT = 3000;
const app = express();

// app.use(express.static('client'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
