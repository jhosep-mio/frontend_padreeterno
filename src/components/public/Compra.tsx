import { useFormik } from 'formik'
import { icon1, icon2, icon3, coti, vacio, visa } from '../shared/images'
import { SchemaCompras } from '../shared/Schemas'
import { Errors } from '../shared/Errors'
import { Total } from '../shared/carrito/Total'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helper/Global'
import { Subtotal } from '../shared/carrito/Subtotal'
import Loading from '../shared/Loading'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import Swal from 'sweetalert2'
import { ErrorsBig } from '../shared/ErrorsBig'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'
import { TotalDelivery } from '../shared/carrito/TotalDelivery'

const Compra = (): JSX.Element => {
  const { loadingComponents, cart, setLoadingComponents } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [preferenceId, setPreferenceId] = useState('')
  const [customization, setCustomization] = useState<any>(null)
  const [validation, setValidation] = useState<boolean>(false)
  const encryptionKey = 'qwerasd159'
  const [departamentos, setDepartamentos] = useState([])
  const [distritos, setDistritos] = useState([])
  const [loadinDistrito, setLoadingDistrito] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoadingComponents(false)
    getDepartamentos()
    // Inicializa Mercado Pago con tu clave pública
    initMercadoPago('APP_USR-5fa8de4e-a417-44da-815f-ea88392ea2b8', {
      locale: 'es-PE'
    })

    const walletCustomization = {
      texts: {
        action: 'pay',
        valueProp: 'security_safety'
      }
    }

    setCustomization(walletCustomization)
  }, [])

  function calculateTotal (): string {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]
      if (item.precio !== null && item.cantidad) {
        const subtotal = item.precio * item.cantidad
        total += subtotal
      }
    }
    return total.toFixed(2) // Redondeamos a dos decimales
  }

  const handleClickPagar = async (): Promise<void> => {
    if (
      values.despacho == '2' ||
      (values.despacho == '1' &&
        values.departamento != '' &&
        values.distrito != '' &&
        values.direccion != '')
    ) {
      setLoading(true)
      setValidation(true)
      const uniqueId = uuidv4()
      try {
        const costoEnvio: number =
          values.distrito && values.despacho === '1'
            ? distritos.reduce(
              (
                precioEnvio: number,
                distrito: { id: string, precio: any }
              ) => {
                if (distrito.id == values.distrito) {
                  return parseFloat(distrito.precio)
                }
                return precioEnvio
              },
              0
            )
            : 0
        const nombreDistrito: string =
          values.distrito && values.despacho == '1'
            ? distritos.reduce(
              (nombre: string, distrito: { id: string, nombre: string }) => {
                if (distrito.id == values.distrito) {
                  return distrito.nombre
                }
                return nombre
              },
              ''
            )
            : ''

        const nombreDepartamento: string =
            departamentos.reduce(
              (nombre: string, departamento: { id: string, nombre: string }) => {
                if (departamento.id == values.departamento) {
                  return departamento.nombre
                }
                return nombre
              },
              ''
            )

        console.log(nombreDistrito)
        console.log(nombreDepartamento)

        const preferenceData = {
          items: cart.map((producto) => ({
            id: producto.id,
            title: producto.nombre,
            unit_price:
              producto.precio !== null
                ? parseFloat(String(producto.precio))
                : 0,
            quantity: producto.cantidad,
            description: 'Descripción del Item',
            picture_url: `${Global.urlImages}/productos/${producto.imagen1}`
          })),
          payment_methods: {
            installments: 1,
            excluded_payment_types: [
              {
                id: 'ticket'
              },
              {
                id: 'atm'
              }
            ]
          },
          statement_descriptor: 'Padre eterno',
          payer: {
            name: values.nombre,
            surname: values.apellido,
            email: values.email,
            phone: {
              area_code: '51',
              number: values.celular1
            }
          },
          external_reference: `${
            values.despacho == '1'
              ? `Retiro a domicilio, Departamento: ${nombreDepartamento}, Distrito: ${nombreDistrito}  dirección: ${values.direccion}. `
              : 'Retiro en tienda'
          },   ${values.comentario}`,
          back_urls: {
            success: `https://padreeterno.com/success-pago/${String(uniqueId)}`,
            failure: 'https://padreeterno.com/error-pago'
          },
          metadata: {
            comment: uniqueId
          },
          shipments: {
            cost: costoEnvio
          },
          auto_return: 'approved',
          notification_url: 'https://api.padreeterno.com/public/api/webhook'
        }

        const response = await axios.post(
          'https://api.mercadopago.com/checkout/preferences',
          preferenceData,
          {
            headers: {
              Authorization:
                'Bearer APP_USR-1350303465211636-071311-10135799088adbf367177ff21e11b31e-400611542',
              'Content-Type': 'application/json'
            }
          }
        )

        const preferenceId: string = response.data.id
        setPreferenceId(preferenceId)
        const dataArray = []
        const dataObject = {
          id_unique: uniqueId
        }
        dataArray.push(dataObject)
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(dataArray),
          encryptionKey
        ).toString()
        localStorage.setItem('data', encryptedData)
      } catch (error) {
        console.error('Error al generar la preferencia de pago:', error)
      }
      setLoading(false)
    } else {
      Swal.fire(
        'Debe completar todos los datos del retiro a domicilio',
        '',
        'warning'
      )
    }
  }

  function enviarPorWhatsApp (): void {
    // Obtén la información del carrito de compras y formátala
    const carrit = cart
      .map(
        (producto) =>
          `Nombre: ${producto.nombre}\nCantidad: ${
            producto.cantidad != null ? producto.cantidad : 1
          }\nPrecio: ${producto.precio != null ? producto.precio : 0}\n`
      )
      .join('\n')
    // Genera el enlace o mensaje de WhatsApp
    const telefono = '+51994181726' // Número de teléfono al que deseas enviar el mensaje
    const mensaje = `¡Hola! Estoy interesado en comprar los siguientes productos:\n\n${carrit} \n\n TOTAL = ${calculateTotal()}`

    // Crea el enlace completo para abrir WhatsApp con el mensaje predefinido
    const enlaceWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(
      mensaje
    )}`

    // Abre WhatsApp en una nueva ventana o pestaña
    window.open(enlaceWhatsApp)
  }

  const getDepartamentos = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allDepartamentos`)
    setDepartamentos(request.data)
    setLoadingComponents(false)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting
  } = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      celular1: '',
      email: '',
      comentario: '',
      despacho: '',
      direccion: '',
      departamento: '',
      distrito: ''
    },
    validationSchema: SchemaCompras,
    onSubmit: handleClickPagar
  })

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0]
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0]
      if (firstErrorElement) {
        firstErrorElement.focus()
        Swal.fire('Complete todos los campos', '', 'error')
      }
    }
  }, [touched, errors, isSubmitting])

  useEffect(() => {
    if (values.departamento) {
      setLoadingDistrito(true)
      const getDistrito = async (): Promise<void> => {
        const request = await axios.get(
          `${Global.url}/allDistritosGroup/${values.departamento}`
        )
        setDistritos(request.data)
      }
      setLoadingDistrito(false)
      getDistrito()
    }
  }, [values.departamento])

  return (
    <>
      {loadingComponents && <Loading />}

      {cart.length > 0
        ? (
        <div className="icart-bgs1">
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-12">
                <ul className="list_pasos">
                  <li>
                    <figure className="box-pasfig1">
                      <img src={icon1} />
                    </figure>
                    <div className="box_pasos">
                      <span>1</span>
                      <h4>CARRITO DE COMPRAS</h4>
                    </div>
                  </li>

                  <li className="active">
                    <figure className="box-pasfig1">
                      <img src={icon2} />
                    </figure>
                    <div className="box_pasos">
                      <span>2</span>
                      <h4>FORMULARIO DE ENVÍO</h4>
                    </div>
                  </li>

                  <li>
                    <figure className="box-pasfig1">
                      <img src={icon3} />
                    </figure>
                    <div className="box_pasos">
                      <span>3 </span>
                      <h4>COMPRA REALIZADA</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 sect-login order1">
                <div className="mycartpanel1">
                  <div className="mycart-heading">
                    <h5 className="mycart-title">Datos de Comprador</h5>
                  </div>

                  <div className="box-pasform i-contacregistro">
                    <form id="frm_pago">
                      <span className="respuesta"></span>

                      <div className="row">
                        <div className="form-group col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="nombreUsuario"
                            name="nombre"
                            placeholder="Nombres"
                            value={values.nombre}
                            onChange={handleChange}
                            disabled={!!validation}
                            onBlur={handleBlur}
                          />
                          <Errors
                            errors={errors.nombre}
                            touched={touched.nombre}
                          />
                        </div>

                        <div className="form-group col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="apellidoUsuario"
                            name="apellido"
                            placeholder="Apellidos"
                            value={values.apellido}
                            onChange={handleChange}
                            disabled={!!validation}
                            onBlur={handleBlur}
                          />
                          <Errors
                            errors={errors.apellido}
                            touched={touched.apellido}
                          />
                        </div>

                        <div className="form-group col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="telefonoUsuario"
                            name="celular1"
                            placeholder="Celular"
                            value={values.celular1}
                            onChange={handleChange}
                            disabled={!!validation}
                            onBlur={handleBlur}
                          />
                          <Errors
                            errors={errors.celular1}
                            touched={touched.celular1}
                          />
                        </div>

                        <div className="form-group col-sm-12 col-md-12">
                          <input
                            type="email"
                            className="form-control"
                            id="correoUsuario"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!!validation}
                          />
                          <Errors
                            errors={errors.email}
                            touched={touched.email}
                          />
                        </div>

                        <div className="form-group col-sm-12 col-md-12">
                          <textarea
                            className="form-control"
                            id="commentarioUsuario"
                            name="comentario"
                            placeholder="Déjanos tu comentario..."
                            value={values.comentario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></textarea>
                          <Errors
                            errors={errors.comentario}
                            touched={touched.comentario}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 order3">
                <div className="mycartpanel1 mycart-nobotm">
                  <div className="mycart-heading">
                    <h5 className="mycart-title">Total</h5>
                  </div>

                  <div className="mycart-body">
                    {values.despacho == '1' && values.distrito
                      ? (
                      <div className="mycartotal-2">
                        <table className="table no-margin">
                          <thead>
                            <tr className="m-0">
                              <td className="no-paddi1 enforce">
                                <h5 className="panel-title text-center">
                                  Precio del delivery: S/.{' '}
                                  {distritos.map(
                                    (distrito: { id: string, precio: any }) =>
                                      distrito.id == values.distrito && (
                                        <span key={'precio_distrito'}>
                                          {distrito.precio}
                                        </span>
                                      )
                                  )}
                                </h5>
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                        )
                      : (
                          ''
                        )}

                    <div className="mycartsale1">
                      <h3>
                        Total a pagar:{' '}
                        <b id="totalCart">
                          {values.distrito && values.despacho == '1'
                            ? (
                                distritos.map(
                                  (distrito: { id: string, precio: any }) =>
                                    distrito.id == values.distrito && (
                                  <TotalDelivery
                                    delivery={distrito.precio}
                                    key={distrito.id}
                                  />
                                    )
                                )
                              )
                            : (
                            <Total />
                              )}
                        </b>
                      </h3>

                      <input
                        type="hidden"
                        name="totalcarrito"
                        value=""
                        className="totalCarrito"
                      />

                      <input
                        type="hidden"
                        name="totalcart"
                        value=""
                        className="totalCart"
                      />
                    </div>
                  </div>
                </div>

                <div className="mycartpanel2">
                  <div className="mycart-heading2">
                    <h5 className="mycart-title">Orden de Pago</h5>
                  </div>

                  <div className="mycart-body2">
                    <div className="carrit-ototxt1">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <td
                              colSpan={2}
                              width="276"
                              className="text-left"
                              style={{ fontWeight: '500' }}
                            >
                              Producto
                            </td>

                            <td colSpan={1} width="51" className="text-left">
                              Cant.
                            </td>
                          </tr>
                        </thead>

                        <tbody className="tb_dy">
                          {cart.map((producto) => (
                            <tr key={producto.id}>
                              <td className="text-center">
                                <img
                                  className="crt-thmb1"
                                  src={`${Global.urlImages}/productos/${producto.imagen1}`}
                                  alt={producto.imagen1}
                                />
                              </td>

                              <td className="text-left">
                                <a
                                  className="cartiname1"
                                  href="{$base_url}producto-descripcion/{$i.id}_{$i.options.url}"
                                ></a>

                                <p className="car1tpric1 ">
                                  <Subtotal
                                    precio={producto.precio}
                                    contador={producto.cantidad}
                                  />
                                  <br />
                                  <small>
                                    <b>Nombre:</b> {producto.nombre}
                                  </small>
                                </p>
                              </td>

                              <td className="">
                                <div className="crt-nmprice1">
                                  {' '}
                                  {producto.cantidad}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 order2">
                <div className="mycartpanel1 mycart-nobotm">
                  <div className="mycart-heading">
                    <h5 className="mycart-title">
                      Elige tu opción de despacho
                    </h5>
                  </div>

                  <div className="mycart-body">
                    <select
                      id="opciondespacho"
                      className={`opciondespacho selectpicker border ${
                        errors.despacho && touched.despacho
                          ? 'bg-main text-white'
                          : ''
                      } `}
                      name="despacho"
                      value={values.despacho}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!!validation}
                    >
                      <option value="">Elige una opción</option>

                      <option value="1" className="bg-white text-black">
                        Despacho a domicilio
                      </option>

                      <option value="2" className="bg-white text-black">
                        Retira tu compra
                      </option>
                    </select>
                  </div>

                  <ErrorsBig
                    errors={errors.despacho}
                    touched={touched.despacho}
                  />
                </div>
                {values.despacho == '1' && (
                  <>
                    {loadinDistrito
                      ? (
                      <p>cargando ...</p>
                        )
                      : (
                      <div className="mycartpanel1 mycart-nobotm box_enviodelivery">
                        <div className="mycart-heading">
                          <h5 className="mycart-title">Despacho a domicilio</h5>
                        </div>

                        <div className="mycart-body">
                          <h5 className="mycart-title">Departamento</h5>
                          <select
                            id="opciondespacho"
                            className={`opciondespacho selectpicker border mt-3 py-1 ${
                              errors.departamento && touched.departamento
                                ? 'bg-main text-white'
                                : ''
                            } `}
                            name="departamento"
                            value={values.departamento}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!!validation}
                          >
                            <option value="">Elige una opción</option>

                            {departamentos.map(
                              (departamento: {
                                id: number
                                nombre: string
                              }) => (
                                <option
                                  value={departamento.id}
                                  key={departamento.id}
                                >
                                  {departamento.nombre}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        {values.departamento && (
                          <div className="mycart-body">
                            <h5 className="mycart-title">Distrito</h5>
                            <select
                              id="opciondespacho"
                              className={`opciondespacho selectpicker border mt-3 py-1 ${
                                errors.distrito && touched.distrito
                                  ? 'bg-main text-white'
                                  : ''
                              } `}
                              name="distrito"
                              value={values.distrito}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!!validation}
                            >
                              <option value="">Elige una opción</option>
                              {distritos.map(
                                (distrito: {
                                  id: number
                                  nombre: string
                                  precio: number
                                }) => (
                                  <option value={distrito.id} key={distrito.id}>
                                    {distrito.nombre}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        )}

                        {values.distrito && values.departamento
                          ? (
                          <div className="mycart-body">
                            <input
                              type="text"
                              className="form-control"
                              id="direccionUsuario"
                              name="direccion"
                              placeholder="Dirección y Referencia"
                              value={values.direccion}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Errors
                              errors={errors.direccion}
                              touched={touched.direccion}
                            />
                          </div>
                            )
                          : (
                              ''
                            )}
                      </div>
                        )}
                  </>
                )}

                <div className="mycartpanel1 mycart-nobotm box_retirocompra">
                  <div className="mycart-heading">
                    <h5 className="mycart-title">Retira tu compra</h5>
                  </div>

                  <div className="mycart-body">
                    Av. Megarejo cdra. 1 N° 108 Urb. Santa Patricia Campo Verde
                    - La Molina - Lima - Lima
                  </div>
                </div>

                <div className="mycartpanel2">
                  <div className="mycart-heading2">
                    <h5 className="mycart-title">Método de Pago</h5>
                  </div>

                  <div className="mycart-body2">
                    {loading
                      ? (
                      <button
                        type="submit"
                        className="countarget-img envioFormulario pagoCulqui outline-none text-center flex items-center justify-center"
                      >
                        <span className="countarget-box">Cargando ...</span>
                      </button>
                        )
                      : (
                      <button
                        type="submit"
                        className="countarget-img envioFormulario pagoCulqui outline-none text-center flex items-center justify-center"
                        onClick={() => {
                          handleSubmit()
                        }}
                      >
                        <img src={visa} />
                        <span className="countarget-box">
                          Pagar con tarjeta
                        </span>
                      </button>
                        )}
                    {preferenceId && (
                      <Wallet
                        initialization={{
                          preferenceId,
                          redirectMode: 'modal'
                        }}
                        customization={customization}
                      />
                    )}

                    <button
                      className="countarget-img envioFormulario pagotransfer flex items-center justify-center"
                      onClick={() => {
                        enviarPorWhatsApp()
                      }}
                    >
                      <img src={coti} title="Voucher" />
                      <span className="countarget-box">
                        Cotización por Whatsapp
                      </span>
                    </button>

                    <h5 style={{ color: 'black', fontSize: '13px' }}>
                      <strong>* Pago: Transferencia Bancaria</strong>
                    </h5>

                    <ul>
                      <li>
                        <h6 style={{ fontSize: '12px' }}>
                          <b>Paso 1:</b> Le llegara un mail (al correo
                          registrado) con el detalle de la compra.
                        </h6>
                      </li>

                      <li>
                        <h6 style={{ fontSize: '12px' }}>
                          <b>Paso 2:</b> Debera depositar el monto de la compra
                          a los números de cuenta que le llegará en el mail.
                        </h6>
                      </li>

                      <li>
                        <h6 style={{ fontSize: '12px' }}>
                          <b>Paso 3:</b> Enviar captura del comprobante de pago
                          al número que se indica en el mail.
                        </h6>
                      </li>
                    </ul>

                    <h5 style={{ color: 'black', fontSize: '13px' }}>
                      <strong>
                        El correo puede demorar entre 5 a 10 minutos, de lo
                        contrario también revisar su bandeja de SPAM
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )
        : (
        <section className="empty_bag">
          <div className="container">
            <div className="row">
              <div className="col-md-12"></div>

              <div className="contenedor_empty">
                <img src={vacio} alt="Organizate Ya" />

                <p>TU CARRITO ESTA VACÍO !</p>

                <a href="/tienda" className="btn log-bot1">
                  Volver a la tienda
                </a>
              </div>
            </div>
          </div>
        </section>
          )}
    </>
  )
}

export default Compra
