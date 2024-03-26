let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const DB_USER = process.env.MONGO_DB_USERNAME
const DB_PASS = process.env.MONGO_DB_PWD

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, "index.html"));
//  });

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/:path', function(req, res) {
  //let path = req.params.path;
  
  // Normalize the path and resolve it against the base directory
  //  filePath = path.resolve('/base/directory', filePath);
  let path = path.resolve('', req.params.path);

  if (isValidPath(path))
    res.sendFile(path);
});

// when starting app locally, use "mongodb://admin:password@localhost:27017" URL instead
let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// the following db and collection will be created on first connect
let databaseName = "my-db";
let collectionName = "my-collection";

app.get('/fetch-data', function (req, res) {
  let response = {};
  MongoClient.connect(mongoUrlDockerCompose, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { myid: 1 };

    db.collection(collectionName).findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

