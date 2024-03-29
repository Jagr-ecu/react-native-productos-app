export interface LoginData{
    correo: string;
    password: string;
}

export interface RegisterData{
    correo: string;
    password: string;
    nombre: string;
}

export interface LoginResponse {
    usuario: Usuario;
    token: string;
}

export interface Usuario{
    rol: string;
    estado: string;
    google: string;
    nombre: string;
    correo: string;
    uid: string;
    img?: string;
}

//Productos
export interface ProductosResponse {
    total:     number;
    productos: Producto[];
}

export interface Producto {
    precio:    number;
    _id:       string;
    nombre:    string;
    categoria: Categoria;
    usuario:   Categoria;
    img?:       string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}

