const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

// parse application/json
app.use(express.json());
// cors
app.use(cors());


const contactsRouter = require('./routes/api/contacts');
app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const{DB_HOST, PORT = 3000} = process.env

mongoose.set('strictQuery', false)

mongoose.connect(DB_HOST)
.then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. Server running on port: ${PORT}`);
    });
  })
  .catch(err => {
      console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    }
  );
