import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Express.js REST API Documentation with Swagger",
    version: "0.1.0",
    description:
      "This is a simple REST API documentation build with Express.js and Swagger",
    license: {
      name: "MIT",
    },
    contact: {
      name: "John Doe",
      email: "john.doe@example.com",
      url: "https://johndoe.example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8888",
      description: "Development Server",
    },
  ],
  tags: [{ name: "Authentication" }, { name: "Home" }],
};

const outputFile = "./swagger-output.json";
const routes = ["../index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
