export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria_id?: number;
  creado_en?: Date;
  slug?: string;
}

export interface ProductResponse {
  products: Product[];
  pagination: {
    totalItems: number;
    limit: number;
    page: number;
    totalPages: number;
  }
}


export interface ProductItemCart {
  product: Product;
  quantity: number;
}

export interface ProductItemOrder {
  id: number;
  cantidad: number;
  nombre: string;
  imagen: string;
  precio: string;
  slug?: string;
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
  usuario_id?: User['id'];
  tipoDocumento: string;
  rut: string;
  nombre: string | User['nombre'];
  apellido: string;
  telefono: string;
  email: string | User['email'];
}

export interface Adress {
  id?: number;
  direccion: string;
  ciudad: string;
  comuna: string;
  depto?: string;
  direccion_id?: number;
}

export interface payMethod {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Payment {
  method: string;
  total: number;
  reference: string;
  payment_state: number;
  shipping_state: number;
}

export interface Shipping {
  id: number;
  nombre_cliente: Client['nombre'];
  rut_cliente: Client['rut'];
  direccion: Adress['direccion'];
  ciudad: Adress['ciudad'];
  comuna: Adress['comuna'];
  reference: string;
  status: number;
  date: string;
}

export interface Order {
  client: Client;
  address: Adress;
  payment: Payment;
  productos: ProductItemOrder[];
}

interface Venta {
  fecha: string;
  estado_envio: number;
  estado_pago: number;
  total: number;
  referencia: string;
}

interface DetalleVenta {
  direccion: string;
  ciudad: string;
  comuna: string;
  depto: number;
}
export interface userOrder {
  id: number;
  venta: Venta;
  user: DetalleVenta;
  productos: ProductItemOrder[];
}

export interface formValue {
  name?: string;
  apellido?: string;
  telefono?: string;
  rut?: string;
}

export interface response {
  message: string,
  orderRef: string
}

interface FirstFlowResponse {
  url: string,
  token: string,
  flowOrder: number
}

export interface ApiFlowResponse {
  orderRef: string,
  responseFlow: FirstFlowResponse,
  urlFlow: string
}

export interface FinalFlowResponse {
  success: boolean;
  message?: string;
  status: number;
  flowError?: {
    code: string;
    message: string;
    mediaCode: string;
  };
  saleId?: number;
}

export interface PaymentResponse {
  id: number;
  status: boolean;
  date: string;
  client: {
    nombre: string;
    rut: string;
  };
  referencia_venta: string;
  referencia: string;
  monto: number;
  metodo_pago?: string;
  venta_id: number;
}