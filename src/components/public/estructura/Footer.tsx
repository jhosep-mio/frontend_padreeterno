import { useState, useEffect } from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../helper/Global'
import { FaTiktok } from 'react-icons/fa'
import { type categoriasValues } from '../../shared/Interfaces'
import { c1, c2, c3, c4, c5, c6, exportandonline, icono } from '../../shared/images'

export const Footer = (): JSX.Element => {
  const [categorias, setCategorias] = useState([])

  const getAllCategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allCategorias`)
    setCategorias(request.data)
  }

  useEffect(() => {
    getAllCategorias()
  }, [])

  return (
    <>
      <footer className="fot-bground1">
          <section className="boxfotter pl-10 md:pt-16 pb-6">
              <div className="container">
                  <div className="row flex-col md:flex md:flex-row">
                      <div className="md:w-1/4 pr-20">
                          <div className="info">
                              <h4>NOSOTROS</h4>
                              <div className="footnoso">
                                  <p className="text-justify">
                                  Nos inspiran las mujeres que lo pueden todo, por ellas el mundo entero. Somos Padre Eterno, una empresa peruana. Tenemos como bandera el amor. Envía flores ¡Hoy!
                                  </p>
                              </div>
                          </div>
                      </div>

                      <div className="w-full  md:w-1/4 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="w-full enlaces">
                              <h4>CATEGORIAS</h4>
                              <ul className="flex-col md:flex-row">
                                {categorias.map((cate: categoriasValues, index) => (
                                  index < 7
                                    ? <li key={cate.id} className='text-white'><Link to={`/categories/${cate.id}-${cate.nombre}`} className='text-white'>{cate.nombre}</Link></li>
                                    : ''
                                ))}
                              </ul>
                          </div>
                      </div>

                      <div className="md:w-1/4 h-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="w-full enlaces">
                              <h4>MENU</h4>
                              <ul>
                                  <li><Link to="/home"> Inicio</Link></li>
                                  <li><Link to="/about-us"> Tienda</Link></li>
                                  <li><Link to="/sales"> Servicios</Link></li>
                                  <li><Link to="/packages"> Contacto</Link></li>
                                  <li><Link to="/support"> Iniciar Sesión</Link></li>
                                  <li><Link to="/support"> Registrate</Link></li>
                              </ul>
                          </div>
                      </div>

                      <div className="md:w-1/4">
                          <div className="contact_us">
                              <h4>PRODUCTOS</h4>
                              <div className="row" style={{ margin: '0' }}>
                                  <ul className="list-colec">
                                      <li><img src={c1}/></li>
                                      <li><img src={c2}/></li>
                                      <li><img src={c3}/></li>
                                      <li><img src={c4}/></li>
                                      <li><img src={c5}/></li>
                                      <li><img src={c6}/></li>
                                  </ul>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </section>

          <section className="fot-bgcopy">
              <div className="container">
                  <div className="row">
                      <div className="col-md-8 ">
                          <p className="fot-copyright1">
                              © 2023 Copyright -
                              <Link to="../../home">Padre eterno</Link>
                              - Todos los derechos reservados
                          </p>
                          <p className="fot-copyright1 flex" >
                             <Link style={{ display: 'flex', color: 'white' }} to="https://logosperu.com/" target="_blank">Design by <img src={exportandonline} width="18" className='ml-3'/></Link>
                          </p>
                      </div>
                      <div className="col-md-4">
                          <ul className="list-redes">
                              <li><Link target='_blank' to="https://www.facebook.com/people/Abrill/100092526204038/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                              {/* <li><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li> */}
                              <li><Link target='_blank' to="https://www.tiktok.com/@abrill_llc?lang=en"><FaTiktok/></Link></li>
                              {/* <li><Link ><i className="fa fa-google-plus-official" aria-hidden="true"></i></Link></li>  */}
                              <li><Link target='_blank' to="https://www.instagram.com/abrillflowers/"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </section>
      </footer>
      <FloatingWhatsApp
        phoneNumber="+12035545219"
        accountName="Padre eterno"
        statusMessage="En linea"
        placeholder="Envianos un mensaje"
        chatMessage ="Hola mucho gusto! 🤝, Como podemos ayudarte?"
        avatar={icono}
        allowEsc
        allowClickAway
        notification
        notificationSound
        />

    </>
  )
}
