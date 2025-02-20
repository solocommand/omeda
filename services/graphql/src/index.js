require('./newrelic');
const bootService = require('@parameter1/terminus/boot-service');
const { log } = require('@parameter1/terminus/utils');
const { buildIndexes } = require('@parameter1/omeda-mongodb');
const newrelic = require('./newrelic');
const mongodb = require('./mongodb');
const server = require('./server');
const pkg = require('../package.json');
const { HOST, PORT, isDevelopment } = require('./env');

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

bootService({
  name: pkg.name,
  version: pkg.version,
  server,
  host: HOST,
  port: PORT,
  onError: newrelic.noticeError.bind(newrelic),
  onStart: async () => {
    await mongodb.connect().then((client) => log(`MongoDB connected ${client.s.url}`));
    if (isDevelopment) {
      log('Creating MongoDB indexes...');
      await buildIndexes({ client: mongodb });
      log('Indexes created.');
    }
  },
  onSignal: () => mongodb.close(),
  onHealthCheck: () => mongodb.ping({ id: pkg.name }).then(() => 'db okay'),
}).catch((e) => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
