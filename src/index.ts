import express from "express";
import router from "./routes/auth-route";
import notFound from "./middlewares/not-found-middleware";
import error from "./middlewares/error-Middleware";
import swaggerUI from "swagger-ui-express";
import swaggerDawg from "./docs/swagger-output.json";
const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to our site!");
});

app.use("/api/v1/api-dawgs", swaggerUI.serve, swaggerUI.setup(swaggerDawg));
app.use("/api/v1/auth", router);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
