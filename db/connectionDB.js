const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/code-talkerz", { useNewUrlParser: true });
// mongoose.connect("mongodb://alsqoor:mlab120130123@ds217678.mlab.com:17678/oca-blog", { useNewUrlParser: true });
// mongodb://<dbuser>:<dbpassword>@ds217678.mlab.com:17678/oca-blog
//
module.exports = function() {
  mongoose.connect("mongodb://localhost:27017/hello", { useNewUrlParser: true });
  const db = mongoose.connection;

  db.on("error", function() {
    console.log("mongoose connection error");
  });

  db.once("open", function() {
    console.log("mongoose connected successfully");
  });
};
