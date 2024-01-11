import express  from "express";
import { 
    createProduct,
    listData, 
    detailData, 
    updateData,
    restoreData,
    softDelete, 
    hardDelete } from "../controller/products.js";

const routes = express.Router();

routes.post("/products/new", createProduct);
routes.get("/products", listData);
routes.get("/products/:id", detailData);
routes.put("/products/:id", updateData);
routes.patch("/products/:id", restoreData);
routes.delete("/products/remove/:id", softDelete);
routes.delete("/products/:id", hardDelete);

export default routes;