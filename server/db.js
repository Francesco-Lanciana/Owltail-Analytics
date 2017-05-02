var mysql = require('mysql');
//var async = require('async');

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
  mode: null,
  pool: null
};

exports.connect = function(done) {
  state.pool = mysql.createPool(process.env.JAWSDB_URL);

  state.mode = 'normal';
  done()
}

exports.get = function() {
  return state.pool
}
