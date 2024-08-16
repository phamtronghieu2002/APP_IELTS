
import userRoutes from "./UserRoutes";

const initAPIRoutes = (app)=>{
      app.use("/api/v1/users",userRoutes);
}


module.exports = initAPIRoutes;