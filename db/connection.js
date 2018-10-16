// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/tweeter");
// mongoose.Promise = Promise;
// module.exports = mongoose;



const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/tweeter");



if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/tweeter");

  // mongoose.connect("mongodb://localhost/express-twitter");
  // mongoose.connect('mongodb://admin2:admin2@ds253891.mlab.com:53891/test1');
}
// mongodb://<dbuser>:<dbpassword>@ds253891.mlab.com:53891/test1

mongoose.Promise = Promise;
module.exports = mongoose;
