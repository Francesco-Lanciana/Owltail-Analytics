var mysql = require('mysql');
//var async = require('async');

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
  mode: null,
  pool: null
};

exports.connect = function(done) {
  console.log(process.env.JAWSDB_URL);
  state.pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user            : 'budoi4pbm8nt7exx',
    password        : 'zbxgrkejwu21yd0d',
    database        : 'xon579hsknob2lyt'
  });
  console.log(state.pool);
  state.mode = 'normal';
  done()
}

exports.get = function() {
  return state.pool
}
