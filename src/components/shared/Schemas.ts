import * as Yup from 'yup'

export const SchemaCompras = Yup.object().shape({
  nombre: Yup.string()
    .required('Este campo es requerido')
    .min(3, 'Debe tener como minimo 3 digitos'),
  apellido: Yup.string()
    .required('Este campo es requerido')
    .min(3, 'Debe tener como minimo 3 digitos'),
  celular1: Yup.string()
    .required('Este campo es requerido')
    .min(9, 'El numero debe tener 9 digitos')
    .max(9, 'El numero debe tener 9 digitos'),
  celular2: Yup.string()
    .required('Este campo es requerido')
    .min(7, 'El telefono debe tener al menos 7 digitos')
    .max(9, 'Telefono invalido'),
  email: Yup.string()
    .email('Email invalido')
    .required('Este campo es requerido'),
  comentario: Yup.string()
})
