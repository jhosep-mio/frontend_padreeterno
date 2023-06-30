import { useEffect, useState } from 'react'
import logo from '../../../assets/images/logos/logo.png'
import icon from '../../../assets/images/logos/icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { GrClose, GrMenu } from 'react-icons/gr'

// import producto from '../../../assets/public/img/producto/producto-1.jpg';
import { BsFillTrashFill } from 'react-icons/bs'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Global } from '../../../helper/Global'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const Header = (): JSX.Element => {
  const [abrirModal, setAbrirModal] = useState(false)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = (): void => { setShow(false) }
  const handleShow = (): void => { setShow(true) }
  //   const { cart, removeItemFromCart, decreaseItemQuantity, increaseItemQuantity, calculateItemSubtotal, calculateTotal } = useAuth({})

  useEffect(() => {
    const header = document.querySelector('.eonav-cntfluid')
    const header2 = document.querySelector('.nav-Bar1')
    let alturaHeader = null
    if (header !== null) {
      alturaHeader = parseFloat(getComputedStyle(header).height)
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        header2.classList.remove('headerbackroud')
      } else if (window.scrollY >= (alturaHeader - 20)) {
        header2.classList.add('headerbackroud')
      }
    })
  })

  return (
    <>
    <header>
        <div className="ambosmenu">
      <div className="eonav-cntfluid">
          <div className="main-barBox">
              <nav className="nav-Bar1" id="navhead1">
                <div className="container nav-Barwrap">
                    <Link to="/" className="nav-LogoUp" title="Plantilla 2">
                      <img src={logo} className="nav-LogoScroll" alt="Plantilla 2" title="Plantilla 2"/>
                    </Link>
                    {!abrirModal
                      ? <button className="nav-Barpull toggle-bar c-hamburger c-hamburger--htx" id="main-over1" onClick={() => { setAbrirModal(true) }}>
                        <GrMenu className='icon_menu_Bar'/>
                      </button>
                      : <button className="nav-Barpull toggle-bar c-hamburger c-hamburger--htx" id="main-over1" onClick={() => { setAbrirModal(false) }}>
                        <GrClose className='icon_menu_Bar'/>
                      </button>
                    }
                    <ul className="nav-crumbList">
                      <li>
                          <Link to="#" className="botlink-Bar">
                          <h4 className="nav-myLinkbar"></h4>
                          </Link>
                      </li>
                      <li>
                          <Link to="#" className="botlink-Bar pageCurrent">
                          <h4 style={{ color: '#000' }}>Browser</h4>
                          </Link>
                      </li>
                    </ul>
                    <ul className="nav-Listright">
                      {/* <li>
                          <Link to="./login.php">
                            <h4>
                                <span className="fa fa-user icon_ih"></span>
                            </h4>
                          </Link>
                      </li> */}
                      <li>
                          <Link onClick={handleShow}>
                            <h4 className='content_relative'>
                                <span className="fa fa-shopping-cart icon_ih"></span>
                                <span className='contador_num'>{cart.length}</span>
                            </h4>
                          </Link>
                      </li>
                      {/* <li>
                          <Link to="https://api.whatsapp.com/send?phone=51999999999" target="_blank">
                            <h4>
                                <span className="fa fa-whatsapp icon_ih"></span>
                            </h4>
                          </Link>
                      </li> */}
                    </ul>

                </div>

                      <div className="top-search">
                          <div className="container">
                              <div className="input-group">
                                  <span className="input-group-addon buscar1" ><i className="fa fa-search"></i></span>
                                  <input type="text" className="form-control buscardor1" placeholder="Buscar" />
                                  <span className="input-group-addon close-search"><i className="fa fa-times"></i></span>
                              </div>
                          </div>
                      </div>

              </nav>
          </div>
          {
            abrirModal
              ? <div className="overlay-menufloat-open" id="overlay" style={{ background: 'white' }}>
                <div className="overlay-menu">
                  <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                            <div id="nvgs-menu">
                              <nav role="navigation">
                                  <ul className="nav-gs1">
                                    <li>
                                        <Link to="/" className="page-scroll" onClick={() => { setAbrirModal(false) }}>
                                          <span className="itemline-m">Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about-us" className="page-scroll" onClick={() => { setAbrirModal(false) }}>
                                          <span className="itemline-m">About us</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sales" className="page-scroll" onClick={() => { setAbrirModal(false) }}>
                                          <span className="itemline-m">Sales</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/packages" className="page-scroll" onClick={() => { setAbrirModal(false) }}>
                                          <span className="itemline-m">Packages</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/support" className="page-scroll" onClick={() => { setAbrirModal(false) }}>
                                          <span className="itemline-m">Support</span>
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
                                          <span className="itemline-m">About Us</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sales" className="page-scroll">
                                          <span className="itemline-m">Sales</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/packages" className="page-scroll">
                                          <span className="itemline-m">Packages</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/support" className="page-scroll">
                                          <span className="itemline-m">Support</span>
                                        </Link>
                                    </li>
                                  </ul>
                              </nav>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
              : ''
          }

        </div>
        </div>
        <Modal show={show} onHide={handleClose} className='modal_carrito' >
            <Modal.Header>
                <div className='content_title_carrrito'>
                    <img src={icon} alt="" width="80" />
                    <h5 className="modal-title" id="exampleModalLabel" style={{
                      top: '10px',
                      left: '-33px',
                      position: 'relative'
                    }}>Cart</h5>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                {
                  cart.length === 0
                    ? <div className="no-products">
                      <h2>You have not added any products 😟</h2>
                  </div>
                    : cart.map((producto) => (
                    <div className="main-product_carrito" key={producto.id}>
                        <div className="img-product_carrito">
                          {
                            producto.color === 'otros'
                              ? <img src={`${Global.urlImages}/otros/${producto.imagen}`} alt="" width="100%"/>
                              : <img src={`${Global.urlImages}/productos/${producto.imagen}`} alt="" width="100%"/>
                          }
                        </div>
                        <div className="info-product_carrito">
                            <div className="title-product_carrito" >
                            <h4 >{producto.nombre}</h4>
                            </div>
                            <div className="texto-product_carrito">
                                <div className="desc_carrito">
                                    <div className="title-desc" style={{ textAlign: 'center' }}>
                                        <h5>Precio</h5>
                                    </div>
                                    <div className="data_desc">
                                        <p>$ <span>{producto.precio}</span></p>
                                    </div>
                                </div>
                                <div className="desc_carrito">
                                    <div className="title-desc">
                                        <h5>Cantidad</h5>
                                    </div>
                                    <div className="data_desc" style={{ justifyContent: 'space-between' }}>
                                        <FaMinus onClick={() => { decreaseItemQuantity(producto.id, producto.color, producto.precio, producto.imagen) }}/>
                                        <p>{producto.quantity}</p>
                                        <FaPlus onClick={() => { increaseItemQuantity(producto.id, producto.color, producto.precio, producto.imagen) }}/>
                                    </div>
                                </div>
                                <div className="desc_carrito">
                                    <div className="title-desc subtotal-title__carrito">
                                        <h5>Subtotal</h5>
                                    </div>
                                    <div className="data_desc subtotal-title__carrito" >
                                        <p>$ <span>{calculateItemSubtotal(producto.precio, producto.quantity)}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btn-eliminar_carrito">
                        <button onClick={() => { removeItemFromCart(producto.id, producto.color, producto.precio, producto.imagen) }}><BsFillTrashFill/></button>
                        </div>
                    </div>
                    ))

                }
                <div className="total-products">
                    <p><span>Total: </span>  <span className='price_total'>$. {calculateTotal(cart)}</span></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn-close-m btn-m" data-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="button" className="btn-ir btn-m" onClick={() => { navigate('/cart') }}>Continue</button>
            </Modal.Footer>
        </Modal>

    </header>
    <div cla