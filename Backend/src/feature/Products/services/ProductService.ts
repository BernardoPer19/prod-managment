// services/ProductService.ts
import { prisma } from "../../../config/prisma";
import { CreateProductInput, ProductType } from "../types/products";
import { mapProductToType } from "../utils/mappers";

class ProductService {
    private handleError(method: string, error: unknown, message: string): never {
        console.error(`[ProductService] ${method} error:`, error);
        throw new Error(message);
    }

    private async ensureProductExists(productId: string) {
        const product = await prisma.product.findUnique({ where: { producto_id: productId } });
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    public async getProducts(): Promise<ProductType[]> {
        try {
            const products = await prisma.product.findMany();
            return products.map(mapProductToType);
        } catch (error) {
            this.handleError("getProducts", error, "Error al obtener los productos");
        }
    }

    public async getProductById(productId: string): Promise<ProductType> {
        try {
            const product = await this.ensureProductExists(productId);
            return mapProductToType(product);
        } catch (error) {
            this.handleError("getProductById", error, "Error al obtener el producto");
        }
    }

    public async insertProduct(productData: CreateProductInput): Promise<ProductType> {
        try {
            const {
                categoriaId,
                isActive,
                estadoId,
                ...rest
            } = productData;

            const data: any = {
                ...rest,
                stockMinimo: productData.stockMinimo ?? 5,
                is_active: isActive,
                estado_id: estadoId,
                ...(categoriaId && { categoria: { connect: { categoria_id: categoriaId } } }),
            };

            const newProduct = await prisma.product.create({ data });
            return mapProductToType(newProduct);
        } catch (error) {
            this.handleError("insertProduct", error, "Error al insertar el producto");
        }
    }

    public async updateProduct(productId: string, productData: Partial<CreateProductInput>): Promise<ProductType> {
        try {
            const {
                categoriaId,
                isActive,
                estadoId,
                ...rest
            } = productData;

            const data: any = {
                ...rest,
                ...(categoriaId && { categoria: { connect: { categoria_id: categoriaId } } }),
                ...(isActive !== undefined && { is_active: isActive }),
                ...(estadoId && { estado_id: estadoId }),
            };

            const updatedProduct = await prisma.product.update({
                where: { producto_id: productId },
                data,
            });

            return mapProductToType(updatedProduct);
        } catch (error) {
            this.handleError("updateProduct", error, "Error al actualizar el producto");
        }
    }

    public async deleteProduct(productId: string): Promise<ProductType> {
        try {
            await this.ensureProductExists(productId);
            const deletedProduct = await prisma.product.delete({
                where: { producto_id: productId },
            });
            return mapProductToType(deletedProduct);
        } catch (error) {
            this.handleError("deleteProduct", error, "Error al eliminar el producto");
        }
    }
}

export const productService = new ProductService();
