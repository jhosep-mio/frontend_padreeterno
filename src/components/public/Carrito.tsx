// import React from 'react'
import { useEffect } from 'react'
import { Global } from '../../helper/Global'
import useAuth from '../../hooks/useAuth'
import { DecrementProducto } from '../shared/carrito/DecrementProducto'
import { IncrementProducto } from '../shared/carrito/IncrementProducto'
import { RemoveItemCart } from '../shared/carrito/RemoveItemCart'
import { Subtotal } from '../shared/carrito/Subtotal'
import { Total } from '../shared/carrito/Total'
import { icon1, icon2, icon3, vacio } from '../shared/images'
import { Link } from 'react-router-dom'

export const Carrito = (): JSX.Element => {
  const { cart } = useAuth()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
     {cart.length > 0
       ? <div className="icart-bgs1">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-12">
              <ul className="list_pasos">
                <li className="active">
                  <figure className="box-pasfig1">
                    <img src={icon1} />
                  </figure>
                  <div className="box_pasos">
                    <span>1</span>
                    <h4>CARRITO DE COMPRAS</h4>
                  </div>
                </li>

                <li>
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
                    <span>3</span>
                    <h4>COMPRA REALIZADA</h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <span className="respuesta" id="agregarmensaje1"></span>
          <div className="row">
            <div className="col-md-12 cart-tabtotal1 ">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Imagen</td>
                      <td className="text-left" style={{ minWidth: '200px' }}>
                        Nombre del Producto
                      </td>
                      <td className="text-center">Cantidad</td>
                      <td className="text-center">Precio Unitario</td>
                      <td className="text-center">Total</td>
                      <td style={{ width: '0' }}></td>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((producto) => (
                      <tr key={producto.id}>
                        <td className="text-center vcenter">
                          <div className="image">
                              <img
                                className="crt-thmb1"
                                src={`${Global.urlImages}/productos/${producto.imagen1}`}
                                alt={producto.imagen1}
                              />
                          </div>
                        </td>

                        <td>
                          <a
                            className="crt-tblehref1"
                            href="{$base_url}producto-descripcion/{$i.id}_{$i.options.url}"
                          ></a>

                          <div className="tb-prodatos1">
                            <p className="text-center">
                              <strong>{producto.nombre}</strong>
                            </p>
                            <br />
                          </div>
                        </td>

                        <td className="text-center">
                          <div
                            className="btn-block clearfix gap-5"
                            style={{ maxWidth: '200px' }}
                          >
                            <DecrementProducto producto={producto} />
                            <p>{producto.cantidad}</p>
                            <IncrementProducto producto={producto} />
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="crt-nmprice1">
                            S/ {producto.precio}
                          </div>

                          {/* <div className="crt-offprice1"><small>S/ 200</small> </div> */}
                        </td>

                        <td className="text-center">
                          <Subtotal
                            precio={producto.precio}
                            contador={producto.cantidad}
                          />
                        </td>

                        <td className="text-center" style={{ width: '0' }}>
                          <RemoveItemCart producto={producto} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-sm-offset-8 col-md-4 col-md-offset-8">
              <div className="cart-tabtotal1">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="text-right">
                        <b className="cart-tabto1">Total: </b>
                      </td>
                      <td className="text-right">
                        <b className="cart-tabto2">
                          <Total />
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-12 col-md-12">
              <div className="buttons">
                <div className="pull-left">
                  <Link to="/tienda" className="btn cnt-ueshp1">
                    Seguir Comprando
                  </Link>
                </div>
                <div className="pull-right">
                  <Link
                    to="/compra"
                    className="btn log-bot1"
                  >
                    Realizar Pago
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       : <section className="empty_bag">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="contenedor_empty">
                <img src={vacio} alt="Padre Eterno" />
                <p>TU CARRITO ESTA VACÍO !</p>
                <a href="/tienda" className="btn log-bot1">
                  Volver a la tienda
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
    </>
  )
}

export default Carrito
