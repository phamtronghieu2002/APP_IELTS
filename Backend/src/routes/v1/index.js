
import userRoutes from "./AuthRoute";
import categoryRoutes from "./CategoryRoute";
import lessonRoutes from "./LessonRoute";
import testRoutes from "./TestRoute";
import questionRoutes from "./QuestionRoute";
import testResultRoute from "./TestResultRoute";
import { veryfyUser } from "~/middlewares/authMiddleware";
const initAPIRoutes = (app) => {

      app.use("/api/v1/auth", userRoutes);
      app.use("/api/v1/category", categoryRoutes);
      app.use("/api/v1/lesson", lessonRoutes);
      app.use("/api/v1/test", testRoutes);
      app.use("/api/v1/question", questionRoutes);
      app.use("/api/v1/testResult", testResultRoute);

}


module.exports = initAPIRoutes;