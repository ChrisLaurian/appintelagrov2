'use strict'
const app = require("./app");
const server = require('http').Server(app);
const config = require("./config");

  server.listen(config.PORT, () => {
    console.log(`App en el puerto ${config.PORT}`);
  })




module.exports = {

}