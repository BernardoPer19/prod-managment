export enum Estado {
  Activo = "activo",
  Inactivo = "inactivo",
  Agotado = "agotado",
}

export interface Category {
  categoriaId: number;        // matches categoria_id
  categoria: string;          // matches categoria
  createdAt?: Date;           // si tienes fechas en la BD para categorías, agregar
  updatedAt?: Date;
  productos?: ProductType[];      // productos relacionados (opcional)
}



export interface ProductType {
  productoId: string;         // producto_id (UUID)
  nombre: string;
  precio: number;             // Float -> number
  imagen?: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  stock: number;
  stockMinimo: number;
  estadoId: Estado;           // enum Estado
  isActive: boolean;
  codigoSKU?: string;
  categoriaId: number;
  vendedorId: string;
  categoria?: Category;
  vendedor?: User;
}

export type CreateProductInput = {
  nombre: string;
  precio: number;
  stock: number;
  categoriaId?: number;
  descripcion?: string;
  imagen?: string;
  codigoSKU?: string;
  stockMinimo?: number;
  estadoId?: Estado;
  isActive?: boolean;
};

