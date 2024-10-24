export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen?: string;
  categoria_id?: number;
  creado_en?: Date;
}

export interface ProductItemCart {
  product: Product;
  quantity: number;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  token?: string;
  creado_en?: Date;
  imagen?: string;
}