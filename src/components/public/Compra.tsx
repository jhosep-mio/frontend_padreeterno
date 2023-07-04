import { useFormik } from 'formik'
import { icon1, icon2, icon3, visa, coti, vacio } from '../shared/images'
import { SchemaCompras } from '../shared/Schemas'
import { Errors } from '../shared/Errors'
import { Total } from '../shared/carrito/Total'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helper/Global'
import { Subtotal } from '../shared/carrito/Subtotal'
import Loading from '../shared/Loading'

const Compra = (): JSX.Element => {
  const procederCompra = (): void => {}
  const { loadingComponents, cart } = useAuth()

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        apellido: '',
        celular1: '',
        celular2: '',
        email: '',
        comentario: ''
      },
      validationSchema: SchemaCompras,
      onSubmit: procederCompra
    })

  // Reemplaza los valores entre corchetes con tu información
  const mensaje = encodeURIComponent('¡Hola! Aquí está mi carrito de compras:')

  // Construye el enlace de WhatsApp con el mensaje y los números de teléfono
  const enlaceWhatsApp = `https://api.whatsapp.com/send?text=${mensaje}`

  // Abre el enlace en una nueva pestaña del navegador
  window.open(enlaceWhatsApp, '_blank')

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
                    <form id="frm_pago" onSubmit={handleSubmit}>
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
                            onBlur={handleBlur}
                          />
                          <Errors
                            errors={errors.celular1}
                            touched={touched.celular1}
                          />
                        </div>

                        <div className="form-group col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="celularUsuario"
                            name="celular2"
                            placeholder="Teléfono (Opcional)"
                            value={values.celular2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Errors
                            errors={errors.celular2}
                            touched={touched.celular2}
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
                            name="comment"
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
                    <div className="mycartotal-2">
                      <table className="table no-margin">
                        <thead>
                          <tr>
                            <td className="no-paddi1 enforce">
                              <h5 className="panel-title">Costo de envío</h5>
                            </td>

                            <td className="no-paddi1 enforce text-right">
                              <h5
                                id="delivery"
                                className="env-pric-x1 precioSoloEnvio"
                              >
                                S/ 0.00
                              </h5>

                              <input
                                type="hidden"
                                name="envioprecio"
                                value="0.00"
                                className="precioEnvio"
                              />
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    <div className="mycartsale1">
                      <h3>
                        Total a pagar:{' '}
                        <b id="totalCart">
                          <Total />
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
                      className="opciondespacho selectpicker"
                    >
                      <option value="">Elige una opción</option>

                      <option value="1">Despacho a domicilio</option>

                      <option value="2">Retira tu compra</option>
                    </select>
                  </div>
                </div>

                <div className="mycartpanel1 mycart-nobotm box_enviodelivery">
                  <div className="mycart-heading">
                    <h5 className="mycart-title">Despacho a domicilio</h5>
                  </div>

                  <div className="mycart-body">
                    <select
                      id="opciondespacho"
                      className="opciondespacho selectpicker"
                    >
                      <option value="">Seccione Departamento</option>

                      <option value="1">Departamento 1</option>

                      <option value="2">Departamento 2</option>
                    </select>
                  </div>

                  <div className="mycart-body">
                    <select
                      name="webDistritoId"
                      id="webDistritoId"
                      className="form-control selectpicker hidden"
                    >
                      <option value="0">Seleccione un Distrito</option>
                    </select>
                  </div>

                  <div className="mycart-body">
                    <input
                      type="text"
                      className="form-control"
                      id="direccionUsuario"
                      name="direccion"
                      placeholder="Dirección"
                      value=""
                    />
                  </div>

                  <div className="mycart-body">
                    <input
                      type="text"
                      className="form-control"
                      id="referenciaUsuario"
                      name="referencia"
                      placeholder="Referencia (Opcional)"
                      value=""
                    />
                  </div>
                </div>

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
                    <button className="countarget-img envioFormulario pagoCulqui">
                      <img src={visa} />
                      <span className="countarget-box">Pague con Tarjeta</span>
                    </button>

                    <button className="countarget-img envioFormulario pagotransfer">
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
