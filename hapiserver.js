'use strict';
import Hapi from 'hapi';
import Inert from 'inert';

// import fs from 'fs';
// import http from 'http';
import _ from 'lodash';

import serverConfig from './config/webserver.config.json';

const restServer = Hapi.server(serverConfig.serverConf);

restServer.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, h) {
    return 'World!';
  }
});

restServer.route({
  method: 'GET',
  path: '/',
  // handler: {
  // directory: {
  //   path: 'Application/html',
  //   index: ['index.html', 'default.html']
  // }
  // }
  handler: function (request, h) {
    // Inert.
    return h.file('Application/html/index.html');
  }
});

restServer.route({
  method: 'GET',
  path: '/img/{imgName}',
  handler: function (request, h) {
    return 'image ' + request.params.imgName + ' requested';
  }
});

restServer.route({
  method: 'GET',
  path: '/js/{fileName}',
  handler: function (request, h) {
    return 'js file ' + request.params.fileName + ' requested';
  }
});

async function start() {
  try {
    await restServer.start();
  } catch (err) {
    console.log(err);
  }
  console.log('Server running at:', restServer.info.uri);
};

start();