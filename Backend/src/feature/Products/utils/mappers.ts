// utils/mappers.ts
import { Product } from "@prisma/client";
import { ProductType, Estado } from "../types/products";

export const mapProductToType = (p: Product): ProductType => ({
  productoId: p.producto_id,
  nombre: p.nombre,
  precio: p.precio,
  imagen: p.imagen ?? undefined,
  descripcion: p.descripcion,
  fechaCreacion: p.fechaCreacion,
  fechaActualizacion: p.fechaActualizacion,
  stock: p.stock,
  stockMinimo: p.stockMinimo,
  estadoId: p.estado_id as Estado,
  isActive: p.is_active,
  codigoSKU: p.codigoSKU ?? undefined,
  categoriaId: p.categoria_id,
  vendedorId: p.vendedor_id,
});
