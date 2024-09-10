const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const env = require("./config/env");
const corsOptions = require("./config/cors");
const configViewEngine = require("./config/viewEngines");
const initAPIRoutes = require("./routes/v1");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

//init app
const app = express();

//define host,port and build mode
const hostname = env.LOCAL_APP_HOST;
const port = env.LOCAL_APP_PORT;
const build_mode = env.BUILD_MODE;


configViewEngine(app);


//config static file ex:css,js,images in public folder
app.use(express.static(path.join(__dirname, "public")));

//config body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configs cors
app.use(cors(corsOptions))


//configs routes
initAPIRoutes(app);







//config error handling middleware
app.use(errorHandlingMiddleware);




if (build_mode === "dev") {
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Trong Hieu Dev, I am running at ${hostname}:${port}/`);
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Hello Trong Hieu Prod, I am running at ${hostname}:${port}/`);
  });
}
