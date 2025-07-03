// routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export const productRouter = Router();

productRouter.get("/", ProductController.getProd);
productRouter.get("/:id", ProductController.getByIdProd);
productRouter.post("/", ProductController.postProd);
productRouter.delete("/:id", ProductController.deleteProd);
