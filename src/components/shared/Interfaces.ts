export interface carrito {
  id: number | null
  nombre: string
  cantidad: number | null
  precio: number | null
  imagen1: string
}

export interface ConfiguracionValues {
  id: number | null
  telefono: string
  celular1: string
  celular2: string
  correo1: string
  correo2: string
  horario1: string
  horario2: string
  direccion: string
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
  youtube: string
  whatsapp: string
}

export interface Values {
  nombres: string
  celular: string
  email: string
  base_proyecto: string
  nombre_empresa: string
  historia_empresa: string
  principales_servicios: string
  colores: string
  referencias: string
  transmitir: string
}

export interface ImagenState {
  archivo: File | null
  archivoName: string
}

export interface ImagePreviewProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  boton: boolean
  setBoton: React.Dispatch<React.SetStateAction<boolean>>
  setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
  clase: string
}

export interface ImagePreviewPropsUdpdate {
  globalUrl: string
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  boton: boolean
  setBoton: React.Dispatch<React.SetStateAction<boolean>>
  imagen: string
  setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
  clase: string
}

export interface interfaceListaDiseño {
  id: number
  nombres: string
  celular: number
  email: string
  nombre_empresa: string
  created_at: string
  uptated_at: string
}

// PAGINACION
export interface paginacionValues {
  totalPosts: number
  cantidadRegistros: number
  paginaActual: number
  setpaginaActual: (pagina: number) => void
}

// DELETE
export interface deleteValues {
  ruta: string
  id: number
  token: string | null
  getData: () => Promise<void>
  totalPosts: number
  cantidadRegistros: number
  paginaActual: number
  setpaginaActual: (pagina: number) => void
}

// BANNERS
export interface bannersValues {
  id: number
  titulo: string
  subtitulo: string
  imagen1: string
  created_at: string | null
  updated_at: string | null
}

// MARCAS
export interface marcasValue {
  id: number
  imagen1: string
  imagen2: string
  created_at: string | null
  updated_at: string | null
}

// CATEGORIAS
// LISTA
export interface categoriasValues {
  id: number
  nombre: string
  imagen1: string
  created_at: string | null
  updated_at: string | null
}
// CREACION - UPDATE
export interface categoriasValuesMoficate {
  nombre: string
}

// PRODUCTOS
export interface productosValuesModificate {
  nombre: string
  descripcion: string
  idCategoria: string
}

// UPDATE-CREATE
export interface segundaSeccionValuesModificate {
  titulo: string
  descripcion: string
}

export interface valoresValues {
  titulo: string
}

export interface mapaValues {
  mapa: string
  mapa2: string
}

export interface editorValues {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export interface arrayValues {
  id: number | null
  medida: string
  precio: string
  cantidad: string
  oferta: string
}

// PRODUCTOS
export interface productosValues {
  id: number
  nombre: string
  id_categoria: string
  categoria: string
  descripcion: string
  precio: number
  cantidad: number
  oferta: number
  imagen1: string
  imagen2: string
  imagen3: string
  created_at: string | null
  updated_at: string | null
}
