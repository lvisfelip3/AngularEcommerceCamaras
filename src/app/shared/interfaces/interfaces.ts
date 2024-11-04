export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen: string;
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

export interface Ciudad {
  id: number;
  nombre: string;
  estado: number;
}
export interface Comuna {
  id: number;
  nombre: string;
  ciudad_id: Ciudad["id"];
  estado: number;
}

export interface Client {
  rut: string;
  nombre: string | User['nombre'];
  apellido: string;
  telefono: string;
  email: string | User['email'];
}

export interface Adress {
  direccion: string;
  ciudad: string;
  comuna: string;
}

export interface payMethod {
  id: number;
  name: string;
  imageUrl: string;
}