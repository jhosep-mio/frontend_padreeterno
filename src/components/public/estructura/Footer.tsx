import { useState, useEffect } from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Global } from '../../../helper/Global'
import { FaFacebookF, FaLinkedin, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { type categoriasValues } from '../../shared/Interfaces'
import {
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  exportandonline,
  icono
} from '../../shared/images'

export const Footer = (): JSX.Element => {
  const [categorias, setCategorias] = useState([])
  const [configuracion, setConfiguracion] = useState<any>({})

  const getAllCategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allCategorias`)
    setCategorias(request.data)
  }
  const getConfiguracion = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneConfi/1`)
    setConfiguracion(request.data)
  }

  function formatearURL (nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim()

    // Convertir todo el string a minúsculas
    url = url.toLowerCase()

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, '-')

    // Retornar la URL formateada
    return url
  }

  useEffect(() => {
    getAllCategorias()
    getConfiguracion()
  }, [])

  return (
    <>
      <footer className="fot-bground1">
        <section className="boxfotter lg:pl-10 lg:pt-16 pb-6">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-5 gap-5">
              <div className="lg:pr-20 w-full">
                <div className="info">
                  <h4>NOSOTROS</h4>
                  <div className="footnoso">
                    <p className="text-justify">
                      Nos inspiran las mujeres que lo pueden todo, por ellas el
                      mundo entero. Somos Padre Eterno, una empresa peruana.
                      Tenemos como bandera el amor. Envía flores ¡Hoy!
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full  flex items-start justify-center">
                <div className="w-full enlaces">
                  <h4 className="md:w-full md:text-center lg:text-left">
                    CATEGORIAS
                  </h4>
                  <ul className="flex-col md:flex-row">
                    {categorias.map((cate: categoriasValues, index) =>
                      index < 7
                        ? (
                        <li
                          key={cate.id}
                          className="text-white md:w-full md:text-center lg:text-left"
                        >
                          <Link
                           to={`/categorias/${cate.id}-${formatearURL(
                            cate.nombre
                          )}`}
                            className="text-white"
                          >
                            {cate.nombre}
                          </Link>
                        </li>
                          )
                        : (
                            ''
                          )
                    )}
                  </ul>
                </div>
              </div>

              <div className="w-full  flex items-start justify-center">
                <div className="w-full enlaces">
                  <h4 className="md:w-full md:text-center lg:text-left">
                    MENU
                  </h4>
                  <ul>
                    <li className="text-white md:w-full md:text-center lg:text-left">
                      <Link to="/tienda"> Tienda</Link>
                    </li>
                    <li className="text-white md:w-full md:text-center lg:text-left">
                      <Link to="/"> Inicio</Link>
                    </li>
                    <li className="text-white md:w-full md:text-center lg:text-left">
                      <Link to="/servicios"> Servicios</Link>
                    </li>
                    <li className="text-white md:w-full md:text-center lg:text-left">
                      <Link to="/contacto"> Contacto</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:full">
                <div className="contact_us">
                  <h4>PRODUCTOS</h4>
                  <div className="row" style={{ margin: '0' }}>
                    <ul className="list-colec">
                      <li>
                        <img src={c1} />
                      </li>
                      <li>
                        <img src={c2} />
                      </li>
                      <li>
                        <img src={c3} />
                      </li>
                      <li>
                        <img src={c4} />
                      </li>
                      <li>
                        <img src={c5} />
                      </li>
                      <li>
                        <img src={c6} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fot-bgcopy">
          <div className="container">
            <div className="row flex flex-col lg:flex-row items-center justify-center">
              <div className="col-md-8 md:flex justify-center items-center">
                <p className="fot-copyright1 text-xl md:text-2xl">
                  © 2023 Copyright -<Link to="../../home">Padre eterno</Link>-
                  Todos los derechos reservados
                </p>
                <p className="fot-copyright1 flex text-xl md:text-2xl  text-center">
                  <Link
                    className="w-full text-center flex justify-center text-white mt-4 md:mt-0"
                    to="https://logosperu.com/"
                    target="_blank"
                  >
                    Design by{' '}
                    <img src={exportandonline} width="18" className="ml-3" />
                  </Link>
                </p>
              </div>
              <div className="col-md-4 mt-4 lg:mt-0">
                <ul className="list-redes">
                  {configuracion.facebook && (
                    <li>
                      <Link target="_blank" to={configuracion.facebook}>
                        <FaFacebookF className="fa" />
                      </Link>
                    </li>
                  )}

                  {configuracion.instagram && (
                    <li>
                      <Link target="_blank" to={configuracion.instagram}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Link>
                    </li>
                  )}
                  {configuracion.twiter && (
                    <li>
                      <Link target="_blank" to={configuracion.twiter}>
                        <FaTwitter className="fa" />
                      </Link>
                    </li>
                  )}
                  {configuracion.linkedin && (
                    <li>
                      <Link target="_blank" to={configuracion.linkedin}>
                        <FaLinkedin className="fa" />
                      </Link>
                    </li>
                  )}
                  {configuracion.youtube && (
                    <li>
                      <Link target="_blank" to={configuracion.youtube}>
                        <FaYoutube className="fa" />
                      </Link>
                    </li>
                  )}
                  {configuracion.whatsapp && (
                    <li>
                      <Link target="_blank" to={configuracion.whatsapp}>
                        <FaWhatsapp className="fa" />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </footer>
      <FloatingWhatsApp
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        phoneNumber={`+51${configuracion.celular1}`}
        accountName="Padre eterno"
        statusMessage="En linea"
        placeholder="Envianos un mensaje"
        chatMessage="Hola mucho gusto! 🤝, Como podemos ayudarte?"
        avatar={icono}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </>
  )
}
