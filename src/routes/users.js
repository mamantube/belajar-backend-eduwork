import express from "express";
import { allData, detailData, createData, updateData } from "../controller/users.js";

const routes = express.Router();

routes.get("/users", allData);
routes.get("/users/:id", detailData);
routes.post("/users/new", createData);
routes.patch("/users/:id", updateData);

export default routes;