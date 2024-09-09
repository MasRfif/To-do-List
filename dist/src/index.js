"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth-route"));
const not_found_middleware_1 = __importDefault(require("./middlewares/not-found-middleware"));
const error_Middleware_1 = __importDefault(require("./middlewares/error-Middleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./docs/swagger-output.json"));
const PORT = process.env.PORT || 8888;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to our site!");
});
app.use("/api/v1/api-dawgs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use("/api/v1/auth", auth_route_1.default);
app.use(not_found_middleware_1.default);
app.use(error_Middleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
