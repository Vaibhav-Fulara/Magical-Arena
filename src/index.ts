import express  from 'express';
import { constants } from './constants/constants';

const server = express();
server.listen(constants.PORT, () => {
  return console.log(`Service is availabe on port : ${constants.PORT}`);
})