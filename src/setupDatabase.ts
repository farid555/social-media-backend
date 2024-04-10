import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('server');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Successfullly connected to database.');
      })
      .catch((error) => {
        log.error('Error connection to database', error);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnection', connect);
};
