const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const env = require("./config/env");
const corsOptions = require("./config/cors");
const configViewEngine = require("./config/viewEngines");
const initAPIRoutes = require("./routes/v1");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
const mongoose = require('mongoose');
//init app
const app = express();
const filesDirectory = path.join(__dirname, 'files');


//define host,port and build mode
const hostname = env.LOCAL_APP_HOST;
const port = env.LOCAL_APP_PORT;
const build_mode = env.BUILD_MODE;


configViewEngine(app);


//config static file ex:css,js,images in public folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/files', express.static(filesDirectory));
//config body parse
app.use(bodyParser.json({ limit: '50mb' })); // Cho phép request body JSON đến 50MB
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Ch

//configs cors
app.use(cors(corsOptions))


// connection to database

mongoose
  .connect(env?.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  });


//configs routes
initAPIRoutes(app);










if (build_mode === "dev") {
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Trong Hieu Dev, I am running at ${hostname}:${port}/`);
  });
} else {
  app.listen(port, () => {
    console.log(`Hello Trong Hieu Prod, I am running at ${hostname}:${port}/`);
  });
}
