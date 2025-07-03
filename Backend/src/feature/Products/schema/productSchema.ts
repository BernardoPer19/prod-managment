import { z } from "zod";

// Define or import the Estado enum
export enum Estado {
  Activo = "activo",
  Inactivo = "inactivo",
  Agotado = "agotado"
}

export const ProductCreateSchema = z.object({
  nombre: z.string().min(2).max(100),
  descripcion: z.string().max(500).optional(),
  precio: z.number().positive().max(100_000),
  stock: z.number().int().nonnegative(),
  stockMinimo: z.number().int().min(0).default(1),
  estadoId: z.nativeEnum(Estado).default(Estado.Activo),
  isActive: z.boolean().default(true),
  categoriaId: z.number().int().positive().optional(),
  imagen: z.string().url().optional(),
  codigoSKU: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof ProductCreateSchema>;


export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;

export function safeParseProduct(data: unknown) {
  return ProductCreateSchema.safeParse(data);
}
