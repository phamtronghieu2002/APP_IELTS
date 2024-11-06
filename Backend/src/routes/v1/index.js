
import userRoutes from "./AuthRoute";
import categoryRoutes from "./CategoryRoute";
import lessonRoutes from "./LessonRoute";
import testRoutes from "./TestRoute";
import questionRoutes from "./QuestionRoute";
import testResultRoute from "./TestResultRoute";
import audioRoute from "./AudioRoute";
import imageRoute from "./ImageRoute";

import privacyRoute from "./PrivacyAndTermRoute";
import tipRoute from "./TipRoute";
import toturialRoute from "./totutialRoute";
import vocRoute from "./VocRoute";
import gptRoute from "./GPTRoute";
import learningTimeRoute from "./LearningTimeRoute";
import commentRoute from "./CommentRoute";
import { veryfyUser } from "~/middlewares/authMiddleware";
const initAPIRoutes = (app) => {

      app.use("/api/v1/auth", userRoutes);
      app.use("/api/v1/category", categoryRoutes);
      app.use("/api/v1/lesson", lessonRoutes);
      app.use("/api/v1/test", testRoutes);
      app.use("/api/v1/question", questionRoutes);
      app.use("/api/v1/testResult", testResultRoute);
      app.use("/api/v1/audio", audioRoute);
      app.use("/api/v1/image", imageRoute);

      app.use("/api/v1/privacy_term", privacyRoute);
      app.use("/api/v1/tip", tipRoute);
      app.use("/api/v1/toturial", toturialRoute);
      app.use("/api/v1/voc", vocRoute);
      app.use("/api/v1/gpt", gptRoute);
      app.use("/api/v1/learning_time", learningTimeRoute);
      app.use("/api/v1/comment", commentRoute);

}


module.exports = initAPIRoutes;