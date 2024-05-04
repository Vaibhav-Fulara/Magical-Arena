import info from '../../package.json';

const EMPTY_STRING = '';
export const constants = {
  SERVICE_NAME: info.name || EMPTY_STRING,
  SERVICE_VERSION: info.version || EMPTY_STRING,
  PORT: process.env.PORT || EMPTY_STRING,
  AWSConfig: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY || EMPTY_STRING,
    SECRET_KEY: process.env.AWS_SECRET_KEY || EMPTY_STRING,
    REGION: process.env.AWS_REGION || EMPTY_STRING,
    S3: {
      BUCKET_NAME: process.env.S3_BUCKET_NAME || EMPTY_STRING
    }
  },
  Authorization: {
    SERVICE_URL: process.env.AUTHORIZATION_SERVICE_URL || EMPTY_STRING,
    WHITELIST: process.env.WHITELIST || EMPTY_STRING
  },
  PUSH_TO_CLOUDWATCH: process.env.PUSH_TO_CLOUDWATCH || EMPTY_STRING
};
