import info from '../../package.json';

const EMPTY_STRING = '';
export const constants = {
  SERVICE_NAME: info.name || EMPTY_STRING,
  SERVICE_VERSION: info.version || EMPTY_STRING,
  PORT: process.env.PORT || EMPTY_STRING
};