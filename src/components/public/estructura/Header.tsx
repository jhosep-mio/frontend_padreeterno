import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrClose, GrMenu } from 'react-icons/gr'
import Modal from 'react-bootstrap/Modal'
import { icono, logo } from '../../shared/images'
import { IoCall } from 'react-icons/io5'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helper/Global'
import { DecrementProducto } from '../../shared/carrito/DecrementProducto'
import { IncrementProducto } from '../../shared/carrito/IncrementProducto'
import { Subtotal } from '../../shared/carrito/Subtotal'
import { RemoveItem } from '../../shared/carrito/RemoveItem'
import { Total } from '../../shared/carrito/Total'
export const Header = (): JSX.Element => {
  const [abrirModal, setAbrirModal] = useState(false)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = (): void => {
    setShow(false)
  }
  const handleShow = (): void => {
    setShow(true)
  }
  const { cart } = useAuth()

  useEffect(() => {
    const header = document.querySelector('.eonav-cntfluid') as Element
    const header2 = document.querySelector('.ambosmenu') as Element
    const alturaHeader = parseFloat(getComputedStyle(header).height)

    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        header2.classList.remove('headerbackroud')
      } else if (window.scrollY >= alturaHeader - 20) {
        header2.classList.add('headerbackroud')
      }
    })
  })

  return (
    <>
      <header>
        <div className="ambosmenu">
          <div className="bg-gray-100 w-full py-5 z-[9999999]">
            <div className="w-[80%] flex flex-row justify-between mx-auto">
              <div className="flex items-center gap-10">
                <span className="flex items-center text-xl text-black">
                  <IoCall className="text-main" /> (01) 4792367
                </span>
                <span className="md:flex items-center text-xl text-black">
                  {' '}
                  <IoCall className="text-main" /> (+51) 994181726
                </span>
              </div>
              <div>
                <span className="flex items-center text-xl text-black">
                  7 Días a la Semana desde 9:00 am hasta 7:00 pm
                </span>
              </div>
            </div>
          </div>
          <div className="eonav-cntfluid">
            <div className="main-barBox">
              <nav className="nav-Bar1" id="navhead1">
                <div className="container nav-Barwrap">
                  <Link to="/" className="nav-LogoUp" title="Plantilla 2">
                    <img
                      src={logo}
                      className="nav-LogoScroll"
                      alt="Plantilla 2"
                      title="Plantilla 2"
                    />
                  </Link>
                  {!abrirModal
                    ? (
                    <button
                      className="nav-Barpull toggle-bar c-hamburger c-hamburger--htx"
                      id="main-over1"
                      onClick={() => {
                        setAbrirModal(true)
                      }}
                    >
                      <GrMenu className="icon_menu_Bar" />
                    </button>
                      )
                    : (
                    <button
                      className="nav-Barpull toggle-bar c-hamburger c-hamburger--htx"
                      id="main-over1"
                      onClick={() => {
                        setAbrirModal(false)
                      }}
                    >
                      <GrClose className="icon_menu_Bar" />
                    </button>
                      )}
                  <ul className="nav-crumbList">
                    <li>
                      <Link to="#" className="botlink-Bar">
                        <h4 className="nav-myLinkbar"></h4>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="botlink-Bar pageCurrent">
                        <h4 className="text-main font-semibold">Navegador</h4>
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav-Listright">
                    <li>
                      <Link to="login">
                        <h4>
                          <span className="fa fa-user icon_ih"></span>
                        </h4>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={handleShow}>
                        <h4 className="content_relative">
                          <span className="fa fa-shopping-cart icon_ih"></span>
                          <span className="contador_num">{cart.length}</span>
                        </h4>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://api.whatsapp.com/send?phone=51999999999"
                        target="_blank"
                      >
                        <h4>
                          <span className="fa fa-whatsapp icon_ih"></span>
                        </h4>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="top-search">
                  <div className="container">
                    <div className="input-group">
                      <span className="input-group-addon buscar1">
                        <i className="fa fa-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control buscardor1"
                        placeholder="Buscar"
                      />
                      <span className="input-group-addon close-search">
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            {abrirModal
              ? (
              <div
                className="overlay-menufloat-open"
                id="overlay"
                style={{ background: 'white' }}
              >
                <div className="overlay-menu">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div id="nvgs-menu">
                          <nav role="navigation">
                            <ul className="nav-gs1">
                              <li>
                                <Link
                                  to="/"
                                  className="page-scroll"
                                  onClick={() => {
                                    setAbrirModal(false)
                                  }}
                                >
                                  <span className="itemline-m">Inicio</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/tienda"
                                  className="page-scroll"
                                  onClick={() => {
                                    setAbrirModal(false)
                                  }}
                                >
                                  <span className="itemline-m">Tienda</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/servicios"
                                  className="page-scroll"
                                  onClick={() => {
                                    setAbrirModal(false)
                                  }}
                                >
                                  <span className="itemline-m">Servicios</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/contacto"
                                  className="page-scroll"
                                  onClick={() => {
                                    setAbrirModal(false)
                                  }}
                                >
                                  <span className="itemline-m">Contacto</span>
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                        <div className="nvgs-mobileal">
                          <nav>
                            <ul className="nav-mobilgs1">
                              <li>
                                <Link to="/about-us" className="page-scroll">
                                  <span className="itemline-m text-center w-full">
                                    About Us
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/sales" className="page-scroll">
                                  <span className="itemline-m text-center w-full">
                                    Sales
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/packages" className="page-scroll">
                                  <span className="itemline-m text-center w-full">
                                    Packages
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/support" className="page-scroll">
                                  <span className="itemline-m text-center w-full">
                                    Support
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <ul className="flex items-center justify-center gap-10 py-8">
                                  <li>
                                    <Link to="login">
                                      <h4>
                                        <span className="fa fa-user icon_ih text-main"></span>
                                      </h4>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="" onClick={handleShow}>
                                      <h4 className="content_relative">
                                        <span className="fa fa-shopping-cart icon_ih text-main"></span>
                                        <span className="contador_num">11</span>
                                      </h4>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="https://api.whatsapp.com/send?phone=51999999999"
                                      target="_blank"
                                    >
                                      <h4>
                                        <span className="fa fa-whatsapp icon_ih text-main"></span>
                                      </h4>
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                )
              : (
                  ''
                )}
          </div>
        </div>
        <Modal show={show} onHide={handleClose} className="modal_carrito">
          <Modal.Header>
            <div className="flex items-center justify-left gap-5">
              <img src={icono} alt="" width="80" />
              <h5 className="modal-title" id="exampleModalLabel">
                Carrito
              </h5>
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body className="modal_boy_scroll">
            {cart.length === 0
              ? (
              <div className="no-products">
                <h2>No has añadido ningun producto 😟</h2>
              </div>
                )
              : (
                  cart.map((producto) => (
                <div className="main-product_carrito" key={producto.id}>
                  <div className="img-product_carrito">
                    <img
                      src={`${Global.urlImages}/productos/${producto.imagen1}`}
                      alt=""
                      width="100%"
                    />
                  </div>
                  <div className="info-product_carrito">
                    <div className="title-product_carrito">
                      <h4>{producto.nombre}</h4>
                    </div>
                    <div className="texto-product_carrito">
                      <div className="desc_carrito">
                        <div
                          className="title-desc"
                          style={{ textAlign: 'center' }}
                        >
                          <h5>Precio</h5>
                        </div>
                        <div className="data_desc">
                          <p>
                            S/. <span>{producto.precio}</span>
                          </p>
                        </div>
                      </div>
                      <div className="desc_carrito">
                        <div className="title-desc">
                          <h5>Cantidad</h5>
                        </div>
                        <div
                          className="data_desc"
                          style={{ justifyContent: 'space-between' }}
                        >
                          <DecrementProducto producto={producto} />
                          <p>{producto.cantidad}</p>
                          <IncrementProducto producto={producto} />
                        </div>
                      </div>
                      <div className="desc_carrito">
                        <div className="title-desc subtotal-title__carrito">
                          <h5>Subtotal</h5>
                        </div>
                        <div className="data_desc subtotal-title__carrito">
                          <Subtotal
                            precio={producto.precio}
                            contador={producto.cantidad}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="btn-eliminar_carrito">
                    <RemoveItem producto={producto} />
                  </div>
                </div>
                  ))
                )}
          </Modal.Body>
          <Modal.Footer className="flex flex-col">
            <div className="total-products">
              <p>
                <span>Total: </span>
                <Total />
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn-close-m btn-m"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn-ir btn-m"
                onClick={() => {
                  const handleOnClick = (): void => {
                    handleClose()
                    navigate('/carrito')
                  }
                  handleOnClick()
                }}
              >
                Continuar
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </header>
      <div className="wrapsection"></div>
    </>
  )
}
