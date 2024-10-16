
import userRoutes from "./AuthRoute";
import categoryRoutes from "./CategoryRoute";
import lessonRoutes from "./LessonRoute";
import testRoutes from "./TestRoute";
import questionRoutes from "./QuestionRoute";
import testResultRoute from "./TestResultRoute";
import audioRoute from "./AudioRoute";
import privacyRoute from "./PrivacyAndTermRoute";
import tipRoute from "./TipRoute";
import { veryfyUser } from "~/middlewares/authMiddleware";
const initAPIRoutes = (app) => {

      app.use("/api/v1/auth", userRoutes);
      app.use("/api/v1/category", categoryRoutes);
      app.use("/api/v1/lesson", lessonRoutes);
      app.use("/api/v1/test", testRoutes);
      app.use("/api/v1/question", questionRoutes);
      app.use("/api/v1/testResult", testResultRoute);
      app.use("/api/v1/audio", audioRoute);
      app.use("/api/v1/privacy_term", privacyRoute);
      app.use("/api/v1/tip", tipRoute);

}


module.exports = initAPIRoutes;