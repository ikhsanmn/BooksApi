/* eslint-disable no-console */
// console.log('Hallo kita akan membuat RESTful API');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    // host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  // eslint-disable-next-line no-console

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
