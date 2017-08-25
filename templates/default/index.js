const path = require('path');
const moment = require('moment');

module.exports = function(data) {
  return {
    data: Object.assign(data, {
      require: { moment },
      css: [
        path.resolve(`${__dirname}/css/style.css`),
        path.resolve(`${__dirname}/css/foundation.min.css`),
      ]
    }),
    body: path.resolve(`${__dirname}/body.pug`),
  };
};
