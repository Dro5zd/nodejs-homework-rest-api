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


const authRouter = require('./routes/api/user');
const contactsRouter = require('./routes/api/contacts');


app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
});

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json({message});
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
