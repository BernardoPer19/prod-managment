import { Request, Response } from "express";
import { productService } from "../services/ProductService";
import { safeParseProduct } from "../schema/productSchema";
import { handleError } from "../utils/handleerror";

export class ProductController {

    static async getProd(req: Request, res: Response) {
        try {
            const data = await productService.getProducts();
            res.status(200).json({
                success: true,
                message: "Productos obtenidos correctamente",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los productos",
                error: (error as Error).message,
            });
        }
    }

    static async postProd(req: Request, res: Response) {
        try {
            const result = safeParseProduct(req.body);

            if (!result.success) {
                res.status(400).json({
                    success: false,
                    message: "Datos inválidos del producto",
                    errors: result.error.format(),
                });
                return
            }

            const data = await productService.insertProduct(result.data);

            res.status(201).json({
                success: true,
                message: "Producto creado correctamente",
                data,
            });
        } catch (error) {
            handleError(res, error, "Error al crear el producto");
        }
    }


    static async getByIdProd(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await productService.getProductById(id);

            if (!data) {
                res.status(404).json({
                    success: false,
                    message: "Producto no encontrado",
                });
                return
            }

            res.status(200).json({
                success: true,
                message: "Producto obtenido correctamente",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener el producto",
                error: (error as Error).message,
            });
        }
    }

    static async deleteProd(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existingProduct = await productService.getProductById(id);

            if (!existingProduct) {
                res.status(404).json({
                    success: false,
                    message: "Producto no encontrado",
                });
                return
            }

            res.status(200).json({
                success: true,
                message: "Producto eliminado correctamente (simulado)",
                data: existingProduct,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el producto",
                error: (error as Error).message,
            });
        }
    }
}
