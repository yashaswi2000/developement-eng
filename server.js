const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const connectToDb = require("./db/connectionDB");

connectToDb();

app.use(express.json({limit:'50mb'}));
app.use(cors());

routes(app);

app.get("/test", (req, res) => {
  res.json("TEST: server is working");
});


const path = require("path");
app.use(express.static(path.join(__dirname, "view/build")));

app.get("*", (req, res) => {
res.sendFile(path.join(__dirname + "/view/build/index.html"));
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));

module.exports = app;
