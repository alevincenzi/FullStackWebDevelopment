var mongo = process.env.VCAP_SERVICES;
var conn_str = "";

if (mongo) {
  var env = JSON.parse(mongo);
  if (env['mongodb']) {
    mongo = env['mongodb'][0]['credentials'];
    if (mongo.url) {
      conn_str = mongo.url;
    } else {
      console.log("No mongo found");
    }  
  } else {
    conn_str = 'mongodb://localhost:27017';
  }
} else {
  conn_str = 'mongodb://localhost:27017';
}

module.exports = {
  'secretKey': '12345-67890-09876-54321',
  'mongoUrl' : conn_str
}