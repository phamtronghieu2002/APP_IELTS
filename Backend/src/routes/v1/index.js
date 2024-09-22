
import userRoutes from "./AuthRoute";

const initAPIRoutes = (app)=>{
      app.use("/api/v1/auth",userRoutes);
}


module.exports = initAPIRoutes;